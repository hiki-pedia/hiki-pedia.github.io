---
title: "ChartMaster: Airflow와 AWS를 활용한 주식 데이터 기반 AI 분석 시스템"
date: 2026-08-15 09:00:00 +0900
categories:
  - projects
tags:
  - personal-project
  - data-engineering
  - airflow
  - docker
  - postgresql
  - stock-data
  - mlops
project_group: personal
project_order: 2
project_list_title: "Airflow와 AWS를 활용한 주식 데이터 기반 AI 분석 시스템"
---

## 프로젝트 개요

한국·미국 주식 데이터를 수집·저장하는 파이프라인이다. 이 주제를 선정한 이유는 차트로 미래 가격을 예측한다는 것은 주식에서 굉장히 위험한 것이다. 하지만 매일매일 일정한 데이터를 생성해내는 분야이기 때문에 airflow를 사용해보기 적합할 것 같았다. 

Ubuntu 서버 2대를 실행 계층과 저장 계층으로 나눴다.

| 항목 | 현재 상태 |
| --- | --- |
| 데이터 소스 | yfinance |
| 관리 자산 | 한국·미국 주식 및 ETF 29개 |
| 실행 환경 | Ubuntu 홈서버 2대, Docker Compose |
| 오케스트레이션 | Apache Airflow 2.10.5, LocalExecutor |
| 파일 저장소 | Server 2의 SSH 파일 저장소 |
| 메타데이터 DB | Server 2의 PostgreSQL 16 |
| 구현 범위 | Phase 1 완료, Phase 2 운영 중 |
| 다음 단계 | Electron 대시보드 Mock Prototype |

> 투자 추천용이 아니다. 모델의 예측 성능보다 데이터 수집·재처리·운영 검증에 초점을 뒀다.

## 프로젝트를 시작한 이유

매일 갱신되는 주식 데이터로 Airflow 수집·재처리를 실습하려고 시작했다. 채용공고 수집보다 모델 재학습과 외부 요인 분석까지 확장하기 좋다고 판단했다.

한국장·미국장은 거래 시간이 다르고, 신규 종목은 이력이 짧다. 제공자가 과거 데이터를 정정하기도 한다. 기업 실적·금리·환율·뉴스는 이후 분석 대상으로 남겼다.

다음 순서로 확장할 계획이다.

```text
정기 수집과 백필
  -> 누락·중복 처리
  -> Raw / Processed / Curated 저장 계층
  -> 실행 및 데이터셋 메타데이터
  -> 모델 학습과 평가 이력
  -> 뉴스·리포트 기반 외부 요인 분석
  -> API와 데스크톱 대시보드
  -> AWS 관리형 서비스 이전
```

우선 목표는 재실행과 장애 복구가 가능한 수집 파이프라인이다.

## 전체 Phase 계획

| Phase | 작업 | 구현 항목 | 상태 |
| --- | --- | --- | --- |
| 1 | 데이터 수집·저장 | 종목 설정, OHLCV 백필, SSH 저장, 피처 생성, 메타데이터 기록 | 완료 |
| 2 | 수집 자동화 | 시장별 DAG, Catchup, 10일 재수집, 중복 제거, 재시도 | 운영 중 |
| 3 | 화면 초안 | Electron 화면, Mock JSON | 다음 단계 |
| 4 | 데이터 API | FastAPI, Mock·실데이터 전환 | 계획 |
| 5 | 품질 검사 | 기간·누락·중복 검사, 백필·재처리 | 계획 |
| 6 | 백업·복구 | 파일·DB 백업, 복원·장애 훈련, 모니터링 | 계획 |
| 7 | 모델 학습 | 기준 모델, 시계열 검증, 평가 지표·버전 기록 | 계획 |
| 8 | 외부 요인 분석 | 뉴스·문서 수집, RAG, 감성 분석, 리포트 | 계획 |
| 9 | AWS 저장소 | S3·RDS 이전 | 계획 |
| 10 | AWS 학습·운영 | SageMaker 학습, CloudWatch 로그·지표·비용 점검 | 계획 |

## 기술 구성

| 영역 | 현재 사용 | 이후 도입 계획 |
| --- | --- | --- |
| Language | Python 3.10 | TypeScript |
| Data Collection | yfinance | pykrx 등 국내 데이터 소스 비교 |
| Data Processing | pandas | 필요 시 Parquet 기반 처리 |
| Workflow | Apache Airflow 2.10.5 | AWS 연동 Operator |
| Runtime | Docker, Docker Compose | AWS 관리형 실행 환경 검토 |
| Storage | Server 2 SSH 파일 저장소 | Amazon S3 |
| Metadata DB | PostgreSQL 16 | Amazon RDS PostgreSQL |
| ML | scikit-learn | SageMaker, 시계열 딥러닝 실험 |
| API | 미구현 | FastAPI |
| Desktop | 미구현 | Electron |
| AI/RAG | 구조 및 모듈 초안 | 문서 수집, Embedding, Vector Index, AI Report |

## 현재 아키텍처

```text
                         Server 1
                  Compute / Orchestration
                ┌─────────────────────────┐
                │ Docker Compose          │
                │ ├─ Airflow Webserver    │
                │ ├─ Airflow Scheduler    │
                │ └─ Airflow PostgreSQL   │
                │                         │
                │ Python ETL              │
                │ Feature Engineering     │
                └────────────┬────────────┘
                             │
                    SSH      │      PostgreSQL
               file read/write        metadata
                             │
                ┌────────────▼────────────┐
                │        Server 2         │
                │ Data / Persistence      │
                │                         │
                │ File Storage            │
                │ ├─ raw                  │
                │ ├─ processed            │
                │ ├─ curated              │
                │ └─ models               │
                │                         │
                │ PostgreSQL 16           │
                └─────────────────────────┘
```

Airflow 내부 상태와 프로젝트 메타데이터의 수명주기가 달라 DB를 분리했다.

| 저장소 | 위치 | 역할 |
| --- | --- | --- |
| Airflow Metadata DB | Server 1 Docker | DAG Run, Task Instance 등 Airflow 내부 상태 |
| ChartMaster Metadata DB | Server 2 Docker | 자산, 파이프라인 실행, 데이터셋 위치와 행 수 |
| ChartMaster File Storage | Server 2 파일시스템 | OHLCV 원본과 피처 데이터 |

## 데이터 저장 규칙

시계열은 파일에, 실행·파일 메타데이터는 PostgreSQL에 저장했다.

```text
/home/dnhs02/iwantdataengineer/chartmaster/
├── raw/
│   └── market_data/
│       └── provider=yfinance/
│           └── symbol={symbol}/
│               └── data.csv
├── processed/
│   └── features/
│       └── symbol={symbol}/
│           └── data.csv
├── curated/
├── models/
├── reports/
├── logs/
└── backups/
```

`provider`와 `symbol`을 경로에 넣었다. AWS 이전 시 같은 구조를 S3 Prefix로 사용할 계획이다.

```text
local  /raw/market_data/provider=yfinance/symbol=005930.KS/data.csv
AWS    s3://<bucket>/raw/market_data/provider=yfinance/symbol=005930.KS/data.csv
```

## Phase 1. 시장 데이터 백필과 저장 계층 구현

### 목표

먼저 독립 실행 ETL을 만들었다. ETL 오류와 Airflow 오류를 나눠 진단하기 위해서다.

### 1. 자산 레지스트리

`config/assets.json`에서 종목을 관리한다. 설정 필드는 다음과 같다.

```text
symbol
display_name
market
exchange
asset_type
group
modeling_tier
notes
```

`--market`, `--tier`, `--symbols`로 대상을 선택한다. 일반 자산은 `core`, 신규·레버리지 자산은 `experimental`로 구분했다.

### 2. OHLCV 수집과 정규화

`YFinanceMarketDataProvider`가 자산과 날짜 범위를 받아 다음 열을 반환한다.

```text
date, open, high, low, close, adjusted_close, volume
```

수집 결과는 저장 전에 다음 순서로 정규화한다.

1. 필요한 일곱 개 열만 선택한다.
2. `date`를 날짜 타입으로 통일한다.
3. 날짜 오름차순으로 정렬한다.
4. 동일 날짜가 여러 번 존재하면 마지막 행을 유지한다.
5. 인덱스를 다시 생성한다.

기존 파일과 새 수집 데이터에 같은 정규화를 적용했다.

### 3. 기존 데이터와 병합

기존 raw CSV와 새 데이터를 합친 뒤 날짜로 정렬하고 중복을 제거했다.

```text
existing raw CSV
       +
newly fetched rows
       │
       ▼
concat -> sort by date -> deduplicate -> overwrite merged CSV
```

같은 기간을 재수집해도 날짜별 행은 하나만 남는다. 전체 교체는 `--replace-existing`로 실행한다.

### 4. SSH 기반 파일 저장소

Server 1에서 SSH로 Server 2 파일을 읽고 쓴다. 저장소는 `ObjectStorage` 인터페이스로 분리했다.

| 구현체 | 사용 상황 |
| --- | --- |
| `LocalObjectStorage` | 격리된 로컬 테스트와 디버깅 |
| `SshObjectStorage` | 홈랩 Server 2에 실제 데이터 저장 |

SSH Batch Mode와 전용 키를 사용한다. 파일은 표준 입력으로 쓰고 DataFrame으로 읽는다.

S3 저장소 구현을 추가해도 수집·피처 생성 코드는 유지할 수 있다.

### 5. 피처 생성

raw OHLCV에서 다음 피처를 생성한다.

| 피처 | 계산 방식 |
| --- | --- |
| `turnover_value` | `close × volume` |
| `return_1d` | 1거래일 수익률 |
| `return_5d` | 5거래일 수익률 |
| `return_20d` | 20거래일 수익률 |
| `volume_change_1d` | 거래량 1일 변화율 |
| `moving_average_5` | 종가 5일 이동평균 |
| `moving_average_20` | 종가 20일 이동평균 |
| `volatility_5` | 1일 수익률의 5일 이동 표준편차 |
| `volatility_20` | 1일 수익률의 20일 이동 표준편차 |

초기 분류 모델을 위한 타깃도 함께 생성한다.

```text
future_5d_return = close(t+5) / close(t) - 1
target_positive_5d_return = future_5d_return > 0
```

미래 가격이 없는 마지막 5개 행은 타깃을 결측값으로 두고 학습에서 제외했다.

### 6. PostgreSQL 메타데이터 기록

ETL 시작 시 `pipeline_runs`에 `running` 상태를 기록하고, 처리 완료 후 `success`, `partial_success`, `failed` 중 하나로 갱신한다.

```text
pipeline start
  -> pipeline_runs: running
  -> asset registry upsert
  -> asset별 raw 저장
  -> asset별 processed 저장
  -> datasets metadata 기록
  -> pipeline_runs 상태 갱신
```

현재 구현된 테이블은 다음과 같다.

| 테이블 | 구현한 역할 |
| --- | --- |
| `assets` | 심볼, 시장, 거래소, 자산 유형, 모델링 티어 관리 |
| `pipeline_runs` | 파이프라인명, 시작·종료 시각, 상태, 메시지 기록 |
| `datasets` | 데이터 유형, provider, symbol, URI, 행 수, 날짜 범위 기록 |
| `model_versions` | 모델명, 버전, artifact URI, 학습·검증 행 수 기록 |
| `model_metrics` | 모델 버전별 평가 지표 기록 |

`model_versions`와 `model_metrics`는 스키마·저장 코드만 준비했다. 자동 수집에서는 아직 레코드를 만들지 않는다.

### 7. 종목별 실패 격리

종목별 예외를 수집했다. 일부 종목이 실패해도 정상 결과는 저장하고 `partial_success`로 기록한다. 첫 오류에서 중단하려면 `--fail-fast`를 사용한다.

### Phase 1 실행 결과

| 지표 | 결과 |
| --- | ---: |
| 등록 자산 | 29개 |
| Raw 파일 영역 | 약 21 MB |
| Processed 피처 영역 | 약 64 MB |
| `assets` | 29 rows |
| `pipeline_runs` | 34 rows |
| 성공한 Pipeline Run | 34건 |
| `datasets` | 712 rows |

## Phase 2. Airflow 자동화 구현

### 목표

기존 ETL에 날짜 범위와 시장을 전달하는 Airflow DAG를 만들었다. 시장별 시간대, 미실행 기간, 과거 데이터 정정을 처리했다.

### 1. Docker Compose 실행 환경

Server 1에서 다음 컨테이너 3개를 실행한다.

| 서비스 | 역할 |
| --- | --- |
| `airflow-webserver` | Airflow UI와 상태 확인 |
| `airflow-scheduler` | DAG 스케줄 계산과 Task 실행 |
| `airflow-postgres` | Airflow 내부 메타데이터 저장 |

`airflow-init`가 DB Migration과 관리자 생성을 마친다. PostgreSQL Health Check까지 통과하면 Webserver와 Scheduler를 시작한다.

| 항목 | 설정 |
| --- | --- |
| Airflow | 2.10.5, Python 3.10 |
| Executor | LocalExecutor |
| 기본 시간대 | Asia/Seoul |
| 예제 DAG | 비활성화 |
| 새 DAG 기본 Pause | 비활성화 |
| 재시작 정책 | `unless-stopped` |
| Web UI | 호스트 8081 → 컨테이너 8080 |

소스·DAG·로그·환경 설정·SSH 키를 볼륨으로 연결했다. 재부팅 시 systemd와 Docker의 `unless-stopped` 정책으로 서비스를 다시 띄운다.

### 2. 시장별 DAG 분리

| DAG | Schedule | Timezone | Task |
| --- | --- | --- | --- |
| `daily_kr_market_data_etl` | 평일 16:10 | Asia/Seoul | `collect_kr_daily_ohlcv` |
| `daily_us_market_data_etl` | 평일 17:30 | America/New_York | `collect_us_daily_ohlcv` |

시장별 Timezone으로 장 마감과 일광절약시간을 처리했다. `BashOperator`가 같은 ETL에 `--market KR` 또는 `--market US`를 전달한다.

### 3. Catchup으로 누락 실행 복구

두 DAG에 `catchup=True`를 설정했다. Scheduler 재시작 시 누락된 Data Interval의 Run을 만든다.

`max_active_runs=1`로 동시 실행을 제한했다. CPU 2코어·메모리 약 8 GB에서 자원 경합을 줄이기 위해서다.

### 4. 10일 Overlap 수집

Data Interval 종료일 기준 최근 10일을 재수집한다.

```text
start = market timezone 기준 data_interval_end - 10일
end   = market timezone 기준 data_interval_end + 1일
```

새 데이터와 기존 파일을 병합하고 날짜별 마지막 행을 남긴다. 누락분과 제공자의 정정값을 반영한다.

| 기능 | 역할 |
| --- | --- |
| Airflow Catchup | 미실행 날짜의 Run 복구 |
| 10일 Overlap | 최근 데이터의 누락·정정 반영 |
| 날짜 기준 병합·중복 제거 | 반복 실행 시 중복 방지 |

### 5. 재시도와 동시 실행 제어

실패 시 최대 3회 재시도하고 20분 간격을 둔다. 일시적인 네트워크·제공자 오류에 재시도한다.

| 항목 | 값 |
| --- | --- |
| `retries` | 3 |
| `retry_delay` | 20분 |
| `depends_on_past` | false |
| `max_active_runs` | 1 |

`depends_on_past=False`로 이전 실행의 실패가 다음 실행을 막지 않게 했다. 오류는 Airflow 로그와 `pipeline_runs`에서 확인한다.

### 6. 컨테이너와 원격 저장소 연결

접속 설정은 읽기 전용 환경 파일로 전달한다. 파일 저장은 SSH 공개키 인증, 메타데이터 기록은 PostgreSQL 5432 포트를 사용한다.

```text
Airflow Scheduler container
  -> Python ETL process
  -> yfinance market data
  -> SSH -> Server 2 file storage
  -> PostgreSQL -> Server 2 metadata DB
```

### Phase 2 운영 상태

| 항목 | 상태 |
| --- | --- |
| Airflow Webserver | Healthy |
| Airflow Scheduler | Running |
| Airflow Metadata PostgreSQL | Healthy |
| 한국장 DAG | 운영 중 |
| 미국장 DAG | 운영 중 |
| 컨테이너 자동 재시작 | 적용 |
| ETL Pipeline Run | 34건 모두 success |

Phase 2는 운영 검증 중이다. 네트워크 단절·Server 2 중단·강제 Task 실패에 대한 복구 시험은 남아 있다.

## 구현 과정에서 해결한 문제

| 문제 | 조치 |
| --- | --- |
| Airflow 상태와 프로젝트 메타데이터의 역할 혼재 | DB를 분리해 Airflow 재구성 시 프로젝트 기록 보존 |
| 서버 중단으로 인한 미실행 | Catchup으로 Run 복구, Overlap으로 데이터 재확인 |
| 재실행 시 중복 행 발생 | 날짜별 마지막 행만 유지 |
| 일부 종목 수집 실패 | 정상 결과 저장, `partial_success`로 기록 |

## 다음 구현: Phase 3

다음 단계는 Electron 대시보드 Mock 화면이다.

- 전체·시장별 관리 자산 수
- 최신 데이터 기준일과 수집 상태
- 상승·하락·거래량 급증·고변동성 자산
- 종목별 가격, 거래량, 이동평균과 이벤트
- Airflow DAG 최근 실행 상태
- Server 2와 PostgreSQL 연결 상태
- 이후 추가할 예측 결과와 AI 리포트의 Placeholder

Mock JSON을 FastAPI 응답 계약의 초안으로 쓸 계획이다. Electron은 DB·파일에 직접 연결하지 않고 FastAPI만 호출할 계획이다.

## 현재 한계

- yfinance 데이터의 교차 검증이 필요하다.
- 저장 규모와 조회 패턴이 커지면 CSV에서 Parquet으로 전환을 검토한다.
- SSH 마운트를 호스트 전체 디렉터리에서 서비스 전용 키로 줄여야 한다.
- Server 2 DB 포트의 방화벽 허용 대상을 제한해야 한다.
- 자동 백업은 디렉터리 설계 단계다. 실제 복원 훈련은 아직 하지 않았다.
- 강제 실패·네트워크 단절·DB 중단의 재시도·복구 시험이 남아 있다.
- 실행 가능한 자동 테스트가 없다. 병합·중복 제거·피처 계산·저장소 테스트가 필요하다.
- 모델 스키마·저장 코드는 준비했지만 학습 자동화는 미구현이다.
- AWS·RAG·FastAPI·Electron은 계획 단계다.

## 요약

시장 데이터를 반복 수집·병합·저장하는 파이프라인을 만들었다.

```text
yfinance OHLCV 수집
  -> 기존 이력과 날짜 기준 병합
  -> 중복 제거
  -> Server 2 raw 저장
  -> 피처 생성
  -> Server 2 processed 저장
  -> PostgreSQL 실행·데이터셋 메타데이터 기록
  -> Airflow 시장별 스케줄 및 실패 재시도
```

독립 ETL을 만들고 Airflow로 자동화했다. 이후 단계는 구현·검증이 끝날 때 갱신한다.

---

마지막 확인일: 2026-08-15
