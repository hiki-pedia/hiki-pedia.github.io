# ChartMaster AI 활용 계획

## 1. AI를 사용하는 이유

주가 예측은 가격과 거래량만으로 설명하기 어렵다. 뉴스, 산업 이슈, 금리, 환율, 실적 발표 같은 외부 요인이 가격에 영향을 주기 때문이다.

ChartMaster에서 AI는 “정답을 맞히는 마법”이 아니라 다음 역할을 맡는다.

- 외부 요인을 찾고 요약한다.
- 뉴스와 문서를 수치 피처로 바꾼다.
- 가격 기반 모델과 텍스트 기반 신호를 비교한다.
- 모델 예측 결과를 사람이 이해할 수 있는 리포트로 정리한다.

## 2. AI 기능 구분

| 기능 | 역할 | 우선순위 |
| --- | --- | --- |
| 기본 ML 모델 | OHLCV 기반 상승/하락 예측 | 1 |
| RAG | 뉴스/문서 근거 검색과 요약 | 2 |
| 감성 분석 | 텍스트를 종목별 점수로 변환 | 3 |
| 딥러닝 | LSTM/Transformer 기반 시계열 실험 | 4 |
| AI 리포트 | 예측 결과와 외부 요인 설명 | 5 |

## 3. RAG 사용 위치

RAG는 다음 질문에 답하는 데 사용한다.

- 최근 종목에 영향을 줄 만한 뉴스는 무엇인가?
- 이번 주 섹터 단위 리스크는 무엇인가?
- 모델 예측 방향과 뉴스 흐름이 같은가?
- 예측 결과를 설명할 만한 근거 문서는 무엇인가?

RAG 결과는 예측 모델의 정답이 아니라 설명 자료다.

## 4. 감성 분석 사용 위치

뉴스와 문서를 다음 값으로 변환한다.

- 긍정 뉴스 수
- 부정 뉴스 수
- 중립 뉴스 수
- 종목별 감성 점수
- 산업별 감성 점수
- 매크로 리스크 점수

이 값은 이후 모델 피처로 사용할 수 있다.

## 5. 딥러닝 사용 위치

딥러닝은 기본 ML 모델 이후 비교 실험으로 추가한다.

초기 입력 구조는 다음과 같다.

```text
최근 60거래일 OHLCV/피처
  -> LSTM 또는 Transformer
  -> 5거래일 뒤 상승 여부 예측
```

딥러닝 실험의 목적은 높은 수익률을 보장하는 것이 아니라, 시계열 모델링과 MLOps 학습 범위를 확장하는 것이다.

## 6. AI 리포트 구조

AI 리포트는 다음 형식을 따른다.

```text
요약
주요 외부 요인
모델 예측 신호
주의할 리스크
데이터 한계
```

리포트는 투자 추천이 아니라 분석 결과 설명이다.

------------------------------------

# ChartMaster 아키텍처

## v1 방향

ChartMaster는 기존 채용공고 ETL 프로젝트를 대체하는 시장 데이터 기반 MLOps + AI 학습 프로젝트다. 주식 데이터는 정기적으로 갱신되고 데이터 양도 누적되기 때문에, 스케줄 기반 수집, 재학습, 평가, 배포, RAG, 감성 분석, AI 리포트 생성을 연습하기 좋다.

v1의 핵심은 완성된 투자 서비스를 만드는 것이 아니라, 데이터가 수집되고 가공되고 모델 학습으로 이어지는 전체 흐름을 직접 설계하고 설명할 수 있게 만드는 것이다.

## 전체 역할 분리

초기 홈서버 단계에서는 서버1과 서버2의 역할을 나눈다.

```text
서버1
  -> 개발 환경
  -> Airflow 실행
  -> ETL 코드 실행
  -> 모델 학습 실행
  -> FastAPI/Electron 개발

서버2
  -> 파일 저장소
  -> PostgreSQL
  -> 프로젝트별 데이터 영역
```

서버2는 실행 서버가 아니라 데이터 서버로 본다. 나중에 AWS로 확장하면 서버2의 파일 저장소는 S3로, 서버2의 PostgreSQL은 RDS PostgreSQL로 대체된다.

## 시장 데이터 흐름

```text
market data provider
  -> Airflow collection task
  -> raw data storage
  -> feature engineering task
  -> processed feature storage
  -> curated training dataset
  -> model training job
  -> evaluation task
  -> model artifact / prediction result
  -> FastAPI
  -> Electron dashboard
```

초기에는 `yfinance`를 사용해 OHLCV 데이터를 수집한다. 이후 한국장 데이터 품질을 높이고 싶으면 `pykrx` 같은 KRX 중심 데이터 소스로 확장할 수 있다.

## 외부 요인 분석 흐름

```text
news / reports / macro documents
  -> Airflow document collection task
  -> raw document storage
  -> cleaning and chunking
  -> embeddings / vector index
  -> RAG summary
  -> sentiment and event features
  -> FastAPI
  -> Electron dashboard
```

외부 요인 분석은 가격 예측 모델을 대신하지 않는다. 뉴스, 산업 리포트, 매크로 이벤트를 근거로 예측 결과를 해석하는 보조 계층이다.

## 저장소 구조

서버2 파일 저장소는 S3로 옮기기 쉬운 구조로 설계한다.

```text
/home/dnhs02/iwantdataengineer/chartmaster/
  raw/
    market_data/
    external_documents/
  processed/
    features/
    text_features/
  curated/
    training_sets/
  models/
  reports/
  logs/
  backups/
```

각 영역의 의미는 다음과 같다.

- `raw`: 원본 데이터
- `processed`: 피처 생성이 끝난 가공 데이터
- `curated`: 모델 학습에 바로 사용할 최종 데이터셋
- `models`: 학습된 모델 산출물
- `reports`: AI 분석 리포트
- `logs`: ETL 실행 로그
- `backups`: 백업 파일

## PostgreSQL 역할

PostgreSQL은 실제 대용량 파일을 담는 곳이 아니라, 데이터의 위치와 상태를 관리하는 메타데이터 DB로 사용한다.

주요 테이블 후보는 다음과 같다.

- `assets`: 관리 대상 자산 목록
- `pipeline_runs`: ETL/Airflow 실행 이력
- `datasets`: raw/processed/curated 파일 위치와 행 수
- `model_versions`: 모델 버전과 산출물 위치
- `model_metrics`: 모델 평가 지표
- `predictions`: 최신 예측 결과
- `external_documents`: 외부 문서 메타데이터
- `ai_reports`: AI 리포트 메타데이터

핵심은 실제 데이터와 메타데이터를 분리하는 것이다.

```text
파일 저장소 = 실제 데이터 보관
PostgreSQL = 데이터 위치, 상태, 실행 이력 관리
```

## 초기 자산

한국장 core:

- SK하이닉스
- 삼성전자
- 포스코DX
- 현대차

미국장 core:

- Micron Technology
- Western Digital

미국장 experimental:

- SanDisk
- SOXL
- NASA
- SPCX
- RAM

## Core와 Experimental을 나누는 이유

Core 자산은 첫 모델 학습과 평가에 사용할 만큼 데이터 기간이 충분하고 해석이 비교적 쉽다고 가정한다.

Experimental 자산은 데이터 수집과 시각화에는 유용하지만, 다음 이유로 초기 모델 학습에는 약할 수 있다.

- 상장 이력이 짧다.
- 레버리지 ETF는 일일 리셋 구조 때문에 장기 수익률 해석이 어렵다.
- ETF는 여러 기초 자산의 영향을 함께 받는다.

## 첫 모델

첫 모델은 정확한 종가를 예측하지 않는다. 대신 다음 이진 분류 문제로 시작한다.

```text
future_5d_return > 0
```

즉, “5거래일 뒤 수익률이 양수인가?”를 예측한다. 이 방식은 과한 가격 예측을 피하고, 반복 가능한 모델 학습과 평가에 집중하게 해준다.

## AI 계층

AI 기능은 다음 순서로 확장한다.

- Baseline ML: 해석 가능한 기본 모델과 naive baseline부터 시작한다.
- Deep Learning: 기본 파이프라인이 안정된 뒤 LSTM/GRU/Transformer 실험을 추가한다.
- RAG: 관련 뉴스와 문서를 검색해 외부 요인을 설명한다.
- Sentiment Analysis: 뉴스 텍스트를 일별 종목 감성 피처로 변환한다.
- AI Report Generation: 예측 결과, 외부 맥락, 리스크, 데이터 한계를 요약한다.

AI 리포트는 투자 추천이 아니라 모델 결과를 설명하기 위한 학습 산출물이다.

-----------------------------------

# Electron Dashboard 설계 메모

이 문서는 ChartMaster Phase 3에서 만들 Electron Dashboard의 화면 구성과 설계 방향을 정리한 문서다.

Phase 3의 목적은 실제 모델, RAG, AI 리포트가 완성되기 전에 먼저 앱의 화면 구조와 정보 흐름을 고정하는 것이다. 데이터 품질 검증, 모델링, RAG는 계속 바뀔 수 있으므로, 먼저 나중에도 크게 바뀌지 않을 화면과 API 계약을 mock data 기반으로 만든다.

## 1. Phase 3 목표

```text
Electron 앱에서 시장 데이터, 종목 차트, 급등/급락 이벤트, 예측 결과, Airflow 파이프라인 상태를 볼 수 있는 화면 구조를 mock data 기반으로 설계한다.
```

핵심은 다음과 같다.

- 실제 데이터 연결보다 화면 구조를 먼저 정한다.
- 모델 결과가 없어도 예측 화면의 자리를 만든다.
- RAG가 없어도 급등/급락 원인 분석 화면의 자리를 만든다.
- FastAPI가 나중에 어떤 형태로 응답해야 하는지 mock data shape으로 먼저 정한다.
- Electron 앱이 직접 서버2 파일 저장소나 PostgreSQL에 접근하지 않는 구조를 전제로 한다.

## 2. 전체 디자인 방향

전체적인 시각 스타일은 어두운 금융 터미널 느낌으로 잡는다.

```text
배경:
  black / near-black

텍스트:
  white / gray 계열

차트:
  neon cyan
  neon green
  electric blue
  magenta
  red/orange warning color

분위기:
  차분하지만 기술적인 대시보드
  데이터가 많은 화면도 읽기 쉬운 구조
  장식보다 정보 밀도와 상태 파악을 우선
```

차트 색상 후보:

```text
가격 라인:
  cyan 또는 lime

거래량:
  muted violet 또는 blue-gray

급등 이벤트:
  neon green marker

급락 이벤트:
  neon red marker

예측 구간:
  electric blue 또는 magenta
```

## 3. 앱 실행 구조

Electron 앱은 로컬 PC에 설치 가능한 클라이언트로 만든다.

```text
로컬 PC
  -> Electron App 실행
  -> 서버1 FastAPI 호출

서버1
  -> FastAPI Backend
  -> Airflow 실행
  -> ETL 코드 실행
  -> 서버2 접근

서버2
  -> raw/processed 파일 저장
  -> PostgreSQL metadata 저장
```

초기 Phase 3에서는 FastAPI 없이 mock data를 사용한다.

```text
Phase 3
Electron UI
  -> mock JSON

Phase 4
Electron UI
  -> FastAPI
  -> 서버2 PostgreSQL / 파일 저장소
```

## 4. 주요 화면 구조

추천 메뉴 구조는 다음과 같다.

```text
Dashboard
Assets
Asset Detail
Events
Predictions
Airflow / Pipelines
Reports
Settings
```

Phase 3에서 우선 구현할 화면:

```text
1. Dashboard
2. Assets
3. Asset Detail
4. Events
5. Airflow / Pipelines
```

Phase 3에서 mock 자리만 잡을 화면:

```text
6. Predictions
7. Reports
8. Settings
```

## 5. Dashboard 화면

앱을 켰을 때 가장 먼저 보는 화면이다.

보여줄 정보:

```text
전체 자산 수
한국장 자산 수
미국장 자산 수
최신 데이터 기준일
가장 많이 오른 종목 TOP 5
가장 많이 내린 종목 TOP 5
거래량 급증 종목
변동성 높은 종목
최근 Airflow 수집 상태
서버2 / PostgreSQL 연결 상태
```

목적:

- 시장 전체 상태를 빠르게 파악한다.
- 데이터 수집이 정상인지 확인한다.
- 어떤 종목을 더 자세히 봐야 하는지 힌트를 준다.

## 6. Assets 화면

관리 대상 종목 목록을 보여주는 화면이다.

필터:

```text
시장:
  KR / US

자산 유형:
  stock / ETF / leveraged ETF

모델링 등급:
  core / experimental

섹터 또는 그룹:
  semiconductor
  financial
  energy
  consumer
  technology
  utilities
  automotive
  etc.

검색:
  ticker
  name
```

정렬:

```text
상승률
하락률
거래량
변동성
데이터 시작일
row count
```

목록에서 보여줄 기본 컬럼:

```text
symbol
display_name
market
asset_type
group
modeling_tier
start_date
end_date
row_count
latest_return_1d
latest_volume
```

## 7. Asset Detail 화면

종목별 상세 분석 화면이다.

필수 구성:

```text
종목 기본 정보
가격 차트
거래량 차트
기간 선택
기본 지표 요약
급등/급락 이벤트 마커
예측 결과 카드
관련 리포트 링크
```

기간 선택:

```text
1M
3M
6M
1Y
5Y
ALL
```

차트 옵션:

```text
종가
거래량
MA5
MA20
MA60
급등/급락 이벤트 표시
예측 구간 표시
```

기본 지표:

```text
1D return
5D return
20D return
YTD return
volatility_20d
volume_change_1d
turnover_value
latest_close
```

## 8. Events 화면

급등/급락이 왜 일어났는지 보는 화면이다.

이 화면은 ChartMaster를 단순 차트 앱이 아니라 AI 분석 프로젝트로 만드는 핵심 화면이다.

보여줄 정보:

```text
event_id
symbol
event_date
event_type
daily_return
volume_change
price_change_5d
severity
cause_summary
cause_candidates
confidence
related_news
related_report
```

이벤트 유형:

```text
sharp_rise
sharp_drop
volume_spike
volatility_spike
earnings_related
macro_related
industry_related
unknown
```

원인 후보:

```text
실적 발표
금리
환율
업황
경쟁사 이슈
규제
전쟁/공급망
ETF 리밸런싱
기업 공시
원인 미확인
```

초기 Phase 3에서는 실제 RAG 분석 대신 mock 원인 후보를 보여준다. 이후 Phase 8에서 뉴스/RAG/감성 분석과 연결한다.

## 9. Predictions 화면

예측 결과를 보여주는 화면이다.

주의:

이 화면은 투자 추천 화면이 아니다. 매수/매도 같은 표현은 사용하지 않는다.

사용할 표현:

```text
상승 가능성
하락 가능성
모델 신호
불확실성
참고용 분석
```

보여줄 정보:

```text
symbol
prediction_date
horizon
up_probability
down_probability
confidence
model_version
model_metric_summary
top_features
uncertainty_note
```

예측 기간:

```text
1D
5D
20D
```

Phase 3에서는 mock prediction을 사용하고, 실제 모델은 Phase 7 이후 연결한다.

## 10. Airflow / Pipelines 화면

Airflow는 별도 페이지로 구성한다.

앱 안에서는 Airflow 운영 상태 요약을 보여주고, 상세 로그와 Graph/Grid 화면은 기존 Airflow UI로 이동할 수 있게 한다.

보여줄 DAG:

```text
daily_kr_market_data_etl
daily_us_market_data_etl
weekly_model_training
```

현재 Phase 3에서는 `weekly_model_training`은 mock 또는 planned 상태로 둔다.

보여줄 정보:

```text
dag_id
status
last_run_at
next_run_at
duration_seconds
success_count
failed_count
retry_count
collected_assets
written_rows
latest_log_summary
```

상태:

```text
success
running
failed
queued
paused
planned
unknown
```

추가 기능:

```text
Open Airflow UI 버튼
최근 실행 이력 목록
실패 task 강조
서버 재시작 후 catchup 실행 여부 표시
```

Airflow UI 연결:

```text
http://server1:8081
```

## 11. Reports 화면

AI 리포트와 이벤트 리포트를 보는 화면이다.

Phase 3에서는 mock report를 사용하고, 실제 외부 요인 요약과 리포트 생성은 Phase 8 이후 붙인다.

보여줄 정보:

```text
report_id
symbol
report_date
title
summary
market_context
event_summary
prediction_summary
source_count
created_at
```

리포트 유형:

```text
daily_asset_report
market_summary
event_explanation
model_summary
rag_external_factor_summary
```

주의 문구:

```text
이 리포트는 투자 조언이 아니라 데이터 엔지니어링과 모델링 학습을 위한 분석 결과입니다.
```

## 12. Settings 화면

연결 정보와 앱 설정을 관리하는 화면이다.

보여줄 정보:

```text
API base URL
server1 status
server2 storage status
PostgreSQL metadata status
Airflow UI URL
theme mode
data refresh interval
app version
```

초기 Phase 3에서는 mock status를 보여준다.

## 13. Mock Data

mock data는 실제 서버, DB, 모델, RAG가 없어도 화면을 만들기 위해 사용하는 가짜 JSON 데이터다.

예를 들어 실제 예측 모델이 없어도 예측 화면은 먼저 만들 수 있다.

```json
{
  "symbol": "005930.KS",
  "prediction_date": "2026-08-04",
  "horizon": "5d",
  "up_probability": 0.62,
  "down_probability": 0.38,
  "confidence": "medium",
  "model_version": "mock-baseline-v0"
}
```

mock data를 쓰는 이유:

```text
화면 개발을 데이터/모델 개발과 분리할 수 있다.
어떤 정보가 필요한지 먼저 알 수 있다.
나중에 FastAPI가 같은 모양으로 진짜 데이터를 주면 쉽게 교체할 수 있다.
모델/RAG가 없어도 예측/리포트 화면을 미리 만들 수 있다.
```

mock data는 버리는 가짜가 아니라, 이후 FastAPI 응답 계약의 초안이다.

## 14. Mock JSON 후보

Phase 3에서 둘 mock 파일:

```text
mock/assets.json
mock/market_summary.json
mock/price_series.json
mock/events.json
mock/predictions.json
mock/airflow_runs.json
mock/reports.json
mock/settings.json
```

예시: Airflow run

```json
{
  "dag_id": "daily_kr_market_data_etl",
  "status": "success",
  "last_run_at": "2026-08-04T16:10:00+09:00",
  "duration_seconds": 42,
  "collected_assets": 12,
  "written_rows": 120,
  "retry_count": 0
}
```

예시: Event

```json
{
  "event_id": "evt-aapl-2026-07-31-drop",
  "symbol": "AAPL",
  "event_date": "2026-07-31",
  "event_type": "sharp_drop",
  "daily_return": -0.058,
  "volume_change": 2.4,
  "severity": "high",
  "cause_summary": "Mock explanation for a large move.",
  "cause_candidates": ["earnings_related", "macro_related"],
  "confidence": "low"
}
```

## 15. Phase 3 산출물

Phase 3가 끝났을 때 있어야 하는 것:

```text
Electron 프로젝트 기본 구조
dark/neon dashboard theme
sidebar navigation
Dashboard 화면
Assets 화면
Asset Detail 화면
Events 화면
Airflow / Pipelines 화면
Predictions / Reports / Settings placeholder
mock JSON 파일들
나중에 FastAPI로 교체 가능한 data access 구조
```

## 16. 다음 Phase와 연결

Phase 4에서는 Electron mock data를 FastAPI contract로 바꾼다.

```text
Phase 3
Electron UI -> mock JSON

Phase 4
Electron UI -> FastAPI mock provider

이후
Electron UI -> FastAPI live provider -> 서버2 PostgreSQL / 파일 저장소
```

즉 Phase 3에서 정한 mock data shape은 Phase 4의 API 응답 형태가 된다.

------------------------------

# ChartMaster 학습 로드맵

이 문서는 ChartMaster의 최신 Phase 계획을 정리한다.

프로젝트의 목적은 완성된 투자 서비스를 빠르게 만드는 것이 아니라, 데이터 엔지니어링과 인프라 엔지니어링 관점에서 시장 데이터 플랫폼을 직접 설계하고 운영해보는 것이다.

## 진행 원칙

- 이미 진행한 Phase 1~3의 흐름은 유지한다.
- 로컬 서버 환경에서 데이터 수집, 저장, 자동화, 검증 흐름을 먼저 충분히 익힌다.
- 서버2는 AWS S3/RDS로 넘어가기 전의 학습용 데이터 서버로 사용한다.
- 리눅스 사용자, 권한, 내부망, SSH 같은 서버 기초 구조는 별도 인프라 프로젝트에서 자세히 다룬다.
- 이 프로젝트에서는 그 서버 환경 위에서 데이터 플랫폼의 서비스 경계, 저장소 분리, 자동화, 백업/복구, 운영 관찰성을 어떻게 설계하는지에 집중한다.
- 데이터 분석과 모델링은 데이터가 충분히 쌓이고 품질을 확인한 뒤 본격화한다.
- 화면 구조와 API 계약은 한 번 정하면 크게 바뀌기 어렵기 때문에 Electron Dashboard와 FastAPI 계약을 먼저 설계한다.
- AWS는 로컬 구조가 안정된 뒤 S3, RDS, SageMaker, CloudWatch 순서로 확장한다.

## 현재 위치

```text
Phase 1: 완료
  과거 OHLCV 백필, 서버2 파일 저장소, PostgreSQL metadata, 기본 피처 생성

Phase 2: 운영 중
  Airflow 기반 한국장/미국장 일봉 자동 수집, catchup, overlap merge, dedup
  실패/retry 강제 테스트는 별도 운영 검증 단계로 남김

Phase 3: 다음 구현 단계
  로컬 PC에서 Electron Dashboard mock prototype 구현
```

## Phase 1: 로컬 시장 데이터 기준선과 서버2 저장 구조

목표:

- 초기 자산 목록의 과거 OHLCV 데이터를 수집한다.
- 서버2에 ChartMaster 전용 파일 저장소를 만든다.
- raw, processed, curated, models, reports, logs, backups 영역을 분리한다.
- 가격, 거래량, 거래대금, 변동성, 모멘텀 기반 기본 피처를 만든다.
- 서버2 PostgreSQL에 실행 이력과 데이터셋 메타데이터를 저장한다.

산출물:

- 서버2 파일 저장소 구조
- raw 시장 데이터 CSV
- processed feature CSV
- PostgreSQL `pipeline_runs`, `datasets` metadata
- 수동 실행 가능한 Python ETL

학습 포인트:

- `yfinance` 사용법
- OHLCV 데이터 구조
- raw 데이터와 processed 데이터 분리
- 파일 저장소와 DB 역할 분리
- metadata DB 설계
- 로컬 환경에서 S3/RDS 역할 이해

## Phase 2: Airflow 로컬 자동화

목표:

- `daily_kr_market_data_etl` DAG를 만든다.
- `daily_us_market_data_etl` DAG를 만든다.
- 한국장과 미국장 장마감 시간을 분리해서 스케줄링한다.
- 서버가 켜져 있으면 정해진 시간에 자동 수집한다.
- 서버가 꺼져 있던 동안 놓친 실행은 Airflow catchup으로 복구한다.
- 10일 overlap 수집과 날짜 기준 merge/dedup으로 누락과 데이터 정정을 흡수한다.

산출물:

- Airflow Docker Compose 실행 환경
- 한국장/미국장 분리 DAG
- Airflow Web UI
- 서버 재시작 후 자동 실행 구조
- 수집 성공/실패/실행 시간 확인 흐름

학습 포인트:

- Airflow DAG
- Task 의존성
- schedule interval
- catchup
- retry
- Docker Compose 운영
- Airflow metadata DB와 프로젝트 metadata DB의 차이

## Phase 3: Electron Dashboard UI 설계와 Mock Prototype

목표:

- 실제 모델, RAG, 리포트가 완성되기 전에 먼저 앱 화면 구조를 설계한다.
- 로컬 PC에서 Electron 데스크톱 앱을 개발한다.
- Dashboard, Assets, Asset Detail, Events, Airflow/Pipelines 화면을 우선 구현한다.
- Predictions, Reports, Settings 화면은 mock 또는 placeholder로 둔다.
- mock JSON을 이용해 화면 상태와 데이터 표시 방식을 검증한다.
- 나중에 FastAPI가 반환할 응답 형태를 mock data shape으로 먼저 고정한다.

산출물:

- Electron 프로젝트 기본 구조
- dark/neon 금융 대시보드 스타일
- mock data 파일
- 종목 목록 화면
- 종목 상세 차트 화면
- 급등/급락 이벤트 화면
- Airflow/Pipelines 상태 화면

학습 포인트:

- Electron 데스크톱 앱 구조
- 화면 정보 구조 설계
- mock data 기반 UI 개발
- 차트/테이블/상태 뷰 구성
- 운영 시스템 상태를 사용자 화면에 표현하는 방식
- 화면 요구사항에서 API 계약을 역설계하기

## Phase 4: FastAPI 데이터 제공 계층과 서비스 경계 설계

목표:

- Electron 앱이 직접 서버2 파일 저장소나 PostgreSQL에 접근하지 않도록 FastAPI 계층을 둔다.
- Phase 3의 mock JSON과 동일한 형태의 API response contract를 정의한다.
- mock provider와 live provider를 분리한다.
- 서버1 API 계층과 서버2 데이터 저장소의 연결 지점을 명확히 한다.
- 환경변수, 접속 정보, API URL, Airflow UI URL 같은 설정 값을 코드와 분리한다.

산출물:

- FastAPI 프로젝트 구조
- API response schema
- mock provider
- live provider로 교체 가능한 interface
- Electron과 API 연결 설정
- 서비스 경계 문서

학습 포인트:

- FastAPI
- API contract
- mock provider와 live provider 분리
- Electron과 backend 연결
- 클라이언트가 DB에 직접 붙지 않아야 하는 이유
- 서비스 경계와 설정 관리

## Phase 5: 데이터 품질, 백필, 재처리 전략

목표:

- 국내장과 미국장 종목 수를 늘린 결과를 검증한다.
- yfinance, pykrx, Stooq 등 데이터 소스별 커버리지와 한계를 비교한다.
- 누락 데이터, 중복 데이터, 날짜 범위, row count 차이를 점검한다.
- 백필을 다시 실행해야 하는 상황과 절차를 정리한다.
- 수집 실패나 데이터 정정이 발생했을 때 재처리하는 전략을 만든다.

산출물:

- 종목 유니버스 기준 문서
- 데이터 소스 coverage 비교표
- 데이터 품질 체크 스크립트
- 백필 재실행 runbook
- 재처리 기준 문서
- 신규 종목 추가 절차

학습 포인트:

- 자산 유니버스 설계
- 데이터 소스 검증
- coverage gap
- 백필 전략
- idempotent ETL
- 재처리와 중복 방지
- rate limit과 실패 처리

## Phase 6: 운영 안정성과 백업/복구 설계

목표:

- 서버2 raw/processed 데이터 백업 전략을 만든다.
- PostgreSQL metadata DB의 backup/restore 절차를 정리한다.
- Airflow DAG 실패, 재시도, 수동 재실행 절차를 문서화한다.
- 컨테이너 재시작, 서버 재부팅, 네트워크 일시 장애 상황에서 확인할 항목을 정리한다.
- 운영 로그와 상태 점검 체크리스트를 만든다.

산출물:

- 파일 저장소 백업 정책
- PostgreSQL backup/restore runbook
- Airflow 장애 대응 runbook
- 운영 점검 체크리스트
- 로그 확인 절차
- 복구 테스트 기록

학습 포인트:

- backup과 restore 차이
- metadata DB 백업
- object/file storage 백업
- 장애 대응 runbook
- 운영 로그 확인
- 재시작 후 자동 복구 검증
- 데이터 플랫폼 운영 안정성

## Phase 7: 머신러닝 모델 학습 파이프라인

목표:

- processed feature 데이터를 이용해 첫 baseline 모델을 학습한다.
- 다음 날 수익률, 5거래일 뒤 상승 여부, 변동성 확대 여부 등 문제 정의를 비교한다.
- naive baseline과 비교한다.
- 모델 artifact와 평가 metric을 서버2에 저장한다.
- PostgreSQL에는 모델 버전, metric, 산출물 위치를 기록한다.
- 이후 Airflow 기반 재학습으로 확장할 수 있게 구조를 잡는다.

산출물:

- baseline model training script
- train/validation/test split 기준
- model artifact 저장 구조
- model metadata table
- metric 기록
- 재학습 DAG 초안

학습 포인트:

- 기본 피처 엔지니어링
- time series split
- backtesting leakage 방지
- Accuracy, Precision, Recall, F1-score
- 회귀 metric과 분류 metric 차이
- 모델 artifact와 metadata 관리
- 모델 학습 파이프라인의 재현성

## Phase 8: RAG와 외부 요인 분석 계층

목표:

- 뉴스, 리포트, 매크로 이벤트 문서를 수집한다.
- 외부 문서는 시장 데이터와 별도로 raw 영역에 저장한다.
- 검색 연습을 위한 간단한 vector index를 만든다.
- RAG 기반 외부 요인 요약을 생성한다.
- 감성 점수와 이벤트 유형 피처를 만든다.
- 급등/급락 이벤트 화면과 리포트 생성 흐름에 연결한다.

산출물:

- 외부 문서 수집 구조
- document metadata
- chunking/embedding pipeline
- vector index
- 종목/날짜별 외부 요인 요약
- sentiment/event feature
- Electron Events/Reports 연결 구조

학습 포인트:

- RAG
- 문서 chunking
- embedding
- vector index
- sentiment feature
- 외부 요인과 가격 데이터 결합
- AI 분석 결과를 제품 화면에 연결하는 방식

## Phase 9: 로컬 운영 구조를 AWS로 이전

목표:

- 서버2 파일 저장소 구조를 S3 bucket 구조로 이전한다.
- 서버2 PostgreSQL 메타데이터 DB를 RDS PostgreSQL로 이전한다.
- provider, symbol, date/year 기준 파티션 구조를 유지한다.
- 기존 `ssh://` 또는 local path 기반 `storage_uri`를 `s3://` URI 구조로 바꾼다.
- 로컬과 AWS storage provider를 설정으로 전환할 수 있게 만든다.
- IAM, security group, 비용 관리 기준을 정리한다.

산출물:

- S3 bucket/prefix 설계
- RDS PostgreSQL schema
- IAM 권한 설계
- security group 설계
- storage provider 전환 코드
- migration runbook
- 비용 점검표

학습 포인트:

- S3 bucket
- object storage
- data lake
- RDS PostgreSQL
- IAM과 보안 그룹
- local path와 `s3://` URI 전환
- 로컬 서버 구조를 managed service로 옮기는 사고방식

## Phase 10: SageMaker와 운영 관찰성

목표:

- Airflow에서 SageMaker Training Job을 실행한다.
- S3의 processed feature 데이터를 읽어 학습한다.
- 모델 산출물과 평가 지표를 다시 S3/RDS에 기록한다.
- CloudWatch 로그, 실패 알림, 재시도 정책, 백업 정책을 확인한다.
- 로컬 Airflow 운영 경험과 AWS 관리형 서비스 운영 경험을 비교한다.

산출물:

- SageMaker training script
- Airflow SageMaker task
- S3 model artifact
- RDS model metadata
- CloudWatch log 확인 절차
- 운영 점검 체크리스트

학습 포인트:

- SageMaker Training Job
- managed training
- Airflow와 AWS 서비스 연동
- CloudWatch
- 운영 관찰성
- 백업과 장애 대응
- 비용과 운영 복잡도 비교

## Phase 글 기록 템플릿

- 날짜:
- 이번 Phase 목표:
- 이전 Phase까지의 상태:
- 설계 선택:
- 사용한 데이터 소스:
- 구현한 구조:
- 실행한 명령어:
- 검증 방법:
- 구현 결과:
- 실패한 점:
- 해결 방법:
- 남은 한계:
- 인프라 관점에서 배운 점:
- 포트폴리오에서 설명할 문장:

