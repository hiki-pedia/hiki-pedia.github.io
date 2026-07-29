---
title: "I/O 최적화"
date: 2026-07-29 15:05:00 +0900
categories:
  - projects
tags:
  - operating-system
  - scheduling
  - io
  - machine-learning
  - python
---

작업의 실행 특성을 측정한 뒤 CPU-bound, I/O-bound, Mixed 작업으로 분류하고 각 작업 유형에 맞는 스케줄링 전략을 비교

## 프로젝트 개요

현대 컴퓨팅 환경에서는 CPU 연산이 많은 작업과 I/O 대기가 많은 작업이 함께 실행된다. 하지만 모든 작업에 같은 스케줄링 정책을 적용하면 응답 지연, 대기 시간 증가, 자원 낭비가 발생할 수 있다.

이 프로젝트의 목표는 각 작업의 실행 특성을 측정하고, 머신러닝 모델을 이용해 작업 유형을 분류한 뒤, 분류 결과에 따라 어떤 스케줄링 방식이 더 적합한지 비교하는 것이다.

분석에서 중점적으로 본 질문은 다음과 같다.

* 작업의 실행 시간, CPU 사용 시간, 메모리 변화량만으로 작업 유형을 분류할 수 있는가?
* CPU-bound 작업에는 어떤 스케줄링 방식이 더 적합한가?
* I/O-bound 작업에는 어떤 디스크 스케줄링 방식이 더 적합한가?
* 작업 유형을 먼저 분류하면 스케줄링 최적화에 활용할 수 있는가?

## 벤치마크 설계

작업 유형은 `CPU-bound`, `I/O-bound`, `Mixed` 세 가지로 나누었다. 각 유형별로 50개씩 작업을 만들어 총 150개의 태스크를 구성하였다.

| 작업 유형 | 예시 |
| --- | --- |
| CPU-bound | 대량 정수 연산, 정렬, 소수 판별, 해시 계산 |
| I/O-bound | 파일 쓰기/읽기, 텍스트 및 바이너리 입출력, 네트워크 요청, `sleep()` 지연 |
| Mixed | CPU 연산과 I/O 대기가 함께 포함된 작업 |

작업 측정에는 `psutil`을 사용하였다. 각 태스크를 실행하기 전후로 CPU 시간, 메모리 사용량, 실행 시간을 측정하고 결과를 JSON으로 저장한 뒤 CSV로 통합하였다.

```python
def measure(task_func, task_name):
    process = psutil.Process()

    cpu_start = process.cpu_times()
    mem_start = process.memory_info().rss
    time_start = time.time()

    task_func()

    time_end = time.time()
    cpu_end = process.cpu_times()
    mem_end = process.memory_info().rss

    result = {
        "task": task_name,
        "duration_sec": round(time_end - time_start, 4),
        "cpu_user_time": round(cpu_end.user - cpu_start.user, 4),
        "memory_diff_bytes": abs(mem_end - mem_start)
    }
```

CPU-bound 작업은 실제 연산량을 늘려 CPU 사용 시간이 커지도록 설계하였다.

```python
def cpu_bound_task_v1():
    sum([i**2 for i in range(10**6)])
```

I/O-bound 작업은 파일 접근, 네트워크 요청, 지연 시간처럼 CPU보다는 대기 시간이 크게 발생하는 상황을 만들었다.

```python
def io_bound_task_v1():
    import time
    for _ in range(5):
        time.sleep(0.5)
```

## 작업 유형 분류 모델

수집한 데이터에서는 `duration_sec`, `cpu_user_time`, `memory_diff_bytes`를 입력값으로 사용하고, 작업 유형 라벨을 타겟으로 사용하였다. 입력 특성은 `MinMaxScaler`로 스케일링한 뒤 학습 데이터와 테스트 데이터로 나누었다.

```python
X = df[["duration_sec", "cpu_user_time", "memory_diff_bytes"]]
y = df["label"]

scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled,
    y,
    test_size=0.2,
    random_state=42
)
```

분류 모델로는 랜덤포레스트를 사용하였다. 트리 개수는 200개, 최대 깊이는 5로 제한하여 모델이 지나치게 복잡해지지 않도록 하였다.

```python
clf = RandomForestClassifier(
    n_estimators=200,
    max_depth=5,
    min_samples_split=2,
    random_state=42
)
clf.fit(X_train, y_train)
```

PCA로 특성을 2차원에 시각화했을 때 CPU, IO, MIXED 작업이 완전히 분리되지는 않았지만, 작업 유형별로 어느 정도 다른 분포를 보였다.

![PCA Visualization of Task Features](/assets/images/io-optimization-pca.png)

테스트 결과 전체 정확도는 0.70이었다. CPU와 IO는 비교적 잘 분류되었지만, MIXED 작업은 두 성격이 섞여 있어 상대적으로 분류가 어려웠다.

![작업 유형 분류 결과](/assets/images/io-optimization-classification-report.png)

| 작업 유형 | Precision | Recall | F1-score |
| --- | --- | --- | --- |
| CPU | 0.73 | 0.80 | 0.76 |
| IO | 0.80 | 0.80 | 0.80 |
| MIXED | 0.56 | 0.50 | 0.53 |
| 전체 정확도 | - | - | 0.70 |

이 결과를 보면 단순한 세 개의 특성만으로도 CPU-bound와 I/O-bound는 어느 정도 구분할 수 있었다. 반면 Mixed 작업은 CPU와 I/O 특성이 동시에 나타나기 때문에 더 많은 특성이나 별도 모델이 필요하다고 판단하였다.

## 스케줄링 알고리즘 비교

작업 유형을 분류한 뒤, CPU-bound 작업과 I/O-bound 작업에 대해 서로 다른 스케줄링 방식을 비교하였다. CPU-bound 작업에는 Round-Robin과 SJF를 적용하였고, I/O-bound 작업에는 FCFS, SSTF, SCAN을 적용하였다.

### CPU-bound 작업

CPU-bound 작업에서는 Round-Robin과 SJF를 비교하였다.

| 알고리즘 | 평균 대기 시간 | 평균 서비스 시간 |
| --- | --- | --- |
| Round-Robin | 326.7ms | 17.1ms |
| SJF | 79.7ms | 17.1ms |

![CPU 스케줄링 평균 대기 시간 및 서비스 시간 비교](/assets/images/io-optimization-cpu-scheduling.png)

실험 결과 SJF는 Round-Robin보다 평균 대기 시간을 크게 줄였다. 서비스 시간은 두 방식이 거의 같았지만, 짧은 작업을 먼저 처리하는 SJF의 특성상 평균 대기 시간이 줄어드는 효과가 있었다.

다만 SJF는 작업 실행 시간을 미리 알아야 한다는 한계가 있다. 실제 운영체제 환경에서는 정확한 실행 시간을 사전에 알기 어렵기 때문에, 예측 기반 추정이나 하이브리드 스케줄링 방식과 함께 사용하는 것이 더 현실적이다.

### I/O-bound 작업

I/O-bound 작업에서는 FCFS, SSTF, SCAN을 비교하였다.

| 알고리즘 | 평균 대기 시간 | 평균 서비스 시간 |
| --- | --- | --- |
| FCFS | 264.7ms | 482.3ms |
| SSTF | 205.6ms | 61.0ms |
| SCAN | 265.9ms | 120.8ms |

![I/O 스케줄링 평균 대기 시간 및 서비스 시간 비교](/assets/images/io-optimization-io-scheduling.png)

실험 결과 SSTF가 평균 대기 시간과 평균 서비스 시간 모두에서 가장 좋은 결과를 보였다. FCFS는 요청 순서를 그대로 처리하기 때문에 구현은 단순하지만, 요청 위치가 크게 흔들릴 경우 이동 비용이 커졌다. SCAN은 한 방향으로 훑어가며 처리하기 때문에 FCFS보다 서비스 시간은 줄었지만, 이 실험에서는 SSTF보다 좋은 결과를 내지는 못했다.

## 결과 정리

이번 실험에서 얻은 핵심 결과는 다음과 같다.

* CPU-bound 작업은 SJF를 적용했을 때 Round-Robin보다 평균 대기 시간이 크게 감소하였다.
* I/O-bound 작업은 SSTF가 FCFS와 SCAN보다 평균 서비스 시간이 낮게 나타났다.
* 작업 유형 분류 모델은 CPU와 IO 작업을 비교적 잘 구분했지만, Mixed 작업 분류에는 한계가 있었다.
* 작업 유형을 먼저 분류한 뒤 스케줄링 방식을 다르게 적용하는 접근은 운영 효율을 높이는 방향으로 확장 가능성이 있다.

즉, 모든 작업에 하나의 스케줄링 정책을 적용하기보다 작업 특성을 먼저 파악하고, CPU 중심 작업과 I/O 중심 작업에 서로 다른 전략을 적용하는 것이 더 효율적일 수 있다.

## 한계점

이 프로젝트에는 몇 가지 한계가 있다.

첫째, 벤치마크 작업이 실제 운영체제의 모든 작업 패턴을 대표하지는 않는다. 실험용으로 만든 CPU-bound, I/O-bound, Mixed 작업이므로 실제 서비스 환경과는 차이가 있을 수 있다.

둘째, 작업 분류에 사용한 특성이 `duration_sec`, `cpu_user_time`, `memory_diff_bytes` 세 가지로 제한되어 있다. 문맥 전환 수, 디스크 I/O 횟수, 네트워크 대기 시간, 캐시 영향 같은 추가 특성이 있으면 분류 성능을 더 높일 수 있다.

셋째, SJF와 SSTF는 성능은 좋게 나타났지만, 특정 작업이 오래 기다릴 수 있는 starvation 문제가 발생할 수 있다. 따라서 실제 환경에서는 공정성과 성능을 함께 고려해야 한다.

넷째, Mixed 작업은 CPU와 I/O 특성이 섞여 있어 단순 분류 모델만으로는 명확하게 구분하기 어려웠다.

## 향후 과제

향후에는 Multilevel Feedback Queue 같은 하이브리드 스케줄링 알고리즘을 설계하고 비교할 수 있다. 또한 Mixed 작업 전용 스케줄러를 구현하거나, XGBoost, SVM, 신경망 모델을 적용해 분류 성능을 개선할 수 있다.

하이퍼파라미터 튜닝도 추가할 수 있다. `GridSearchCV`나 `RandomizedSearchCV`를 사용하면 랜덤포레스트의 깊이, 트리 수, 분할 기준 등을 더 체계적으로 조정할 수 있다.

## 회고

이 프로젝트를 하면서 운영체제의 스케줄링 개념을 단순 이론으로만 보는 것이 아니라, 실제 작업 데이터를 만들어 측정하고 비교할 수 있다는 점이 흥미로웠다.

특히 같은 작업이라도 CPU 중심인지 I/O 중심인지에 따라 적합한 스케줄링 전략이 달라진다는 것을 확인했다. 머신러닝 분류 모델을 운영체제 스케줄링 문제와 연결해보면서, 시스템 최적화에서도 데이터 기반 접근이 가능하다는 점을 배울 수 있었다.
