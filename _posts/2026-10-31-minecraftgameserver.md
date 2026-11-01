---
title: "Minecraft 서버 인프라 구축·운영: Docker, Nginx, Prometheus·Grafana"
date: 2026-10-30 00:00:00 +0900
excerpt: "Linux·Docker 환경에서 TCP 프록시, 자원 제한, 모니터링, 자동 백업을 구성한 기록"
categories:
  - projects
tags:
  - personal-project
  - infrastructure
  - linux
  - docker
  - minecraft
  - performance
  - backup
  - prometheus
  - grafana
toc: true
author_profile: false
sidebar:
  nav: "docs"
project_group: personal
project_order: 3
project_list_title: "Minecraft 서버 인프라 구축·운영"
published: true
---

> 2026-10-30 수정. 실행 결과와 화면 확인 범위는 10월 26일까지다.

Docker Compose 기반 Minecraft 서버에 Prometheus·Grafana 모니터링과 백업 자동화를 구축하고, Kubernetes 기반 운영으로 확장을 추진하는 인프라 프로젝트

## 탐험 서버 구축

Linux·Docker·JVM·네트워크를 학습하며 Minecraft 홈서버를 만들었다. Vanilla+ 탐험 서바이벌을 목표로 건축물·던전·보상을 배치하고 Tectonic·Dungeons and Taverns를 적용했다.

직접 만든 플러그인으로 발견 기록·개인 보상·던전을 추가했다. 콘텐츠와 상태 관리에 시간이 늘어나던 중 지형 로딩 문제가 발생했다.

## 지형 표시 지연

크리에이티브 이동 중 지형 표시가 늦었다. 별도의 동기 청크 강제 생성 시험에서는 최대 약 31초의 틱 지연을 측정했다. 일반 플레이와 조건이 달라 평소 이동 지연으로 해석하지 않았다.

설정 변경 전 자원 사용과 실제 플레이 상태를 측정했다.

## 기존 서버 측정

유휴·미생성 지형 요청·실제 1인 이동을 나눠 측정했다.

<table>
  <thead>
    <tr><th scope="col">관측 대상</th><th scope="col">확인 목적</th></tr>
  </thead>
  <tbody>
    <tr><td>호스트·컨테이너 CPU</td><td>사용량과 CPU 시간 제한</td></tr>
    <tr><td>JVM·컨테이너 메모리</td><td>heap·GC·메모리 한도</td></tr>
    <tr><td>TPS·MSPT</td><td>게임 틱 지연</td></tr>
    <tr><td>디스크·swap</td><td>저장장치 대기와 메모리 압박</td></tr>
    <tr><td>JFR·플레이 피드백</td><td>실행 경로와 체감 문제 대조</td></tr>
  </tbody>
</table>

동기 생성 시험에서 청크 계산·메인 스레드 대기·CPU throttling을 확인했다. 실제 이동에서는 계측성 GC를 제외한 TPS 표본 22개가 모두 20이었지만 지형 표시 지연이 남았다.

TPS만으로 지형 표시 상태를 설명하지 못했다. 전송·네트워크·클라이언트 중 원인은 특정하지 못했다. JFR heap inspection GC의 지연 영향이 있어 후속 시험은 자원·JVM counter·spark 표본으로 바꿨다.

## 운영 범위 조정

운영 학습에 집중하도록 콘텐츠 범위를 줄였다. 일반 서바이벌로 전환하고 Calmland로 이름을 정했다.

<table>
  <thead>
    <tr><th scope="col">항목</th><th scope="col">기존 탐험 서버</th><th scope="col">전환한 Calmland</th></tr>
  </thead>
  <tbody>
    <tr><td>게임 중심</td><td>건축물·던전·보상 진행</td><td>자연 지형에서 자유롭게 생활</td></tr>
    <tr><td>지형</td><td>지형·구조물 생성 팩</td><td>기본 자연 지형</td></tr>
    <tr><td>직접 개발한 기능</td><td>탐험·던전·보상 중심</td><td>지도·접속·생활 보조 중심</td></tr>
    <tr><td>월드 운영</td><td>미생성 지역까지 탐험</td><td>제한한 범위를 사전 생성</td></tr>
    <tr><td>개발 목표</td><td>콘텐츠 확장</td><td>관측·복구·장애 대응</td></tr>
  </tbody>
</table>

기존 소스·측정 자료·월드를 보존했다. 후보 시드를 비교해 월드를 고르고 오버월드 범위를 4,000×4,000블록으로 정했다.

## 청크 사전 생성

보더와 시야 여유 구간을 사전 생성해 저장했다. 플레이 중에는 저장된 청크를 읽도록 했다.

```text
준비 단계: 청크 생성 → 디스크에 저장
플레이 단계: 사용자 이동 → 저장한 청크 로딩 → 전송 → 화면 표시
```

<table>
  <thead>
    <tr><th scope="col">준비·검증 항목</th><th scope="col">결과</th></tr>
  </thead>
  <tbody>
    <tr><td>보더 내부 청크</td><td>62,500개</td></tr>
    <tr><td>각 방향 6청크 여유를 포함한 범위</td><td>68,644개</td></tr>
    <tr><td>생성 시간</td><td>약 24분 9초</td></tr>
    <tr><td>저장 파일에서 FULL 상태 확인</td><td>68,644개</td></tr>
    <tr><td>누락·파싱·좌표 오류</td><td>0</td></tr>
  </tbody>
</table>

정상 종료 후 저장 파일의 좌표·상태를 검사했다. 오버월드에만 적용했고 네더·엔드는 제외했다. 준비 시간·디스크 사용이 늘며 읽기·전송 비용은 남는다.

## 전환 후 비교

새 구성에서 1인 이동을 기록했다. 크리에이티브 확인 이후 4분 49초를 기존 시험과 비교했다.

<table>
  <thead>
    <tr><th scope="col">관측 항목</th><th scope="col">기존 서버 1인 이동</th><th scope="col">전환 후 1인 이동</th></tr>
  </thead>
  <tbody>
    <tr><td>분석 구간</td><td>6분 42초</td><td>4분 49초</td></tr>
    <tr><td>CPU 평균</td><td>139.99%</td><td>56.58%</td></tr>
    <tr><td>컨테이너 working set 최대</td><td>약 1,771MiB</td><td>약 1,219MiB</td></tr>
    <tr><td>최근 10초 TPS 표본</td><td>계측성 GC 제외 22개 모두 20</td><td>19개 모두 20</td></tr>
    <tr><td>플레이 피드백</td><td>지형이 늦게 나타남</td><td>이전보다 개선, 같은 현상 미보고</td></tr>
  </tbody>
</table>

전환 후 평균 CPU·메모리 사용량이 줄고 플레이 피드백이 개선됐다. 표의 CPU는 논리 CPU 하나를 100%로 계산했다.

시드·Paper·콘텐츠·자원 한도·계측 조건을 함께 바꿔 사전 생성만의 효과로 볼 수는 없다. 순간 틱 지연도 남았다. 이번 1인 플레이에서만 확인했고 다중 접속·장기 안정성은 미검증이다.

## 서버 구성

서버1은 접속을 받고 서버2는 게임을 실행한다.

```text
Minecraft 클라이언트
    → 공유기 TCP25565
    → 서버1 Nginx TCP 프록시
    → 서버2 TCP25569: Docker → Paper / Java
         ├─ SSD: 월드·플레이어·플러그인
         └─ HDD: 콜드 백업 → 서버1 사본
```

게임 컨테이너는 CPU quota 3, 메모리 3GiB, JVM 최대 heap 2GiB로 제한했다. 게임 공개 포트와 관리용 WireGuard·SSH를 구분했다. 외부 회선에서 온라인 계정 인증·월드 입장을 확인했다.

접속 오류는 DNS·TCP 시간 초과·계정 세션으로 나눠 확인했다. Nginx·Paper 로그를 대조해 프록시 도달과 게임 입장을 구분했다.

## 백업

매일 05:00 KST에 정상 종료 후 콜드 백업한다.

```text
중복 실행 잠금 → 정상 종료 → 데이터·Compose 백업
    → 압축·원본 대조·체크섬 검증 → 백업 확정
    → 기동·healthy 확인 → 성공한 자동 백업 최근 5개 유지
```

월드·플레이어·플러그인·CoreProtect DB를 같은 시점으로 보존한다. 서버1은 매시간 완료 백업을 가져와 검증한다. 실패하면 기존 정상 사본을 유지한다.

백업 생성·검증·호스트 간 복제를 구성했다. 두 서버가 같은 집에 있어 외부 장소 백업은 없다. 독립 환경 복원과 복구 시간·데이터 시점 검증은 남아 있다.

## 지속 모니터링 시작

문제 발생 시점을 확인하도록 평상시 지표 수집을 시작했다.

두 호스트의 메모리·디스크·컨테이너·포트를 점검했다. 서버1은 RAM 약 7.7GiB 중 4.9GiB가 가용했다. 서버2는 루트·데이터 파일시스템을 따로 관측하기로 했다.

여분·가용 메모리와 swap 사용량·입출력을 구분했다. 일회성 점검값보다 시간에 따른 변화를 기록하기로 했다.

## Prometheus 수집 연결

서버2에 Node Exporter, 서버1에 Prometheus·Grafana를 배치했다.

```text
서버2 Node Exporter ← 서버1 Prometheus가 주기적으로 수집
                              ↑
                      Grafana에서 조회
```

서버2 내부에서는 메트릭이 조회됐지만 서버1에서는 시간 초과가 났다. 포트·UFW를 확인하고 서버1의 수집 요청을 허용해 해결했다.

Compose의 volumes 형식·서비스 들여쓰기를 수정했다. 설정 검사·기동 후 Prometheus API와 Grafana에서 아래 쿼리를 확인했다.

```promql
up{job="server2-node"}
```

지난 1시간 구간에서 값이 1이었다. 수집 경로가 연결됐다는 뜻이며 게임 로그인 성공 여부는 별도다.

## Grafana 연결·지표 해석

Grafana는 서버1 루프백에 바인딩하고 WireGuard·SSH 터널로 접속했다. `empty url` 오류는 주소가 설정된 `prometheus-1` 데이터 소스를 선택해 해결했다.

첫 패널은 서버2 호스트 CPU 사용률이다.

```promql
100 * (
  1 - avg by (instance) (
    rate(node_cpu_seconds_total{job="server2-node",mode="idle"}[5m])
  )
)
```

사용률은 약 2.1~2.4%였다. Percent (0-100), 세로축 0~100으로 설정했다. 모든 코어의 평균이므로 앞선 컨테이너 CPU 수치와 직접 비교하지 않았다.

다른 조회 구간에서는 약 90까지 올랐다. 원인은 특정하지 못했다. 같은 시간대의 컨테이너 지표·로그를 추가 수집할 계획이다.

## 모니터링 확인 범위

2026-10-26까지 기본 수집과 첫 CPU 패널을 확인했다.

<table>
  <thead>
    <tr><th scope="col">항목</th><th scope="col">내가 확인한 상태</th></tr>
  </thead>
  <tbody>
    <tr><td>Node Exporter·Prometheus</td><td>서버2 메트릭 제공과 수집 성공, up=1</td></tr>
    <tr><td>Grafana·원격 관리</td><td>Prometheus 조회와 VPN·SSH 터널 접속 성공</td></tr>
    <tr><td>CPU 패널</td><td>시간축 조회, 퍼센트 단위·0~100 축 설정</td></tr>
    <tr><td>대시보드</td><td>저장 창까지 진행, 최종 저장·재열기 확인은 남음</td></tr>
    <tr><td>메모리·디스크</td><td>원시 지표 확인, 패널 추가는 남음</td></tr>
    <tr><td>컨테이너·TPS/MSPT</td><td>상시 수집과 대시보드 구성 예정</td></tr>
  </tbody>
</table>

대시보드 저장을 재확인하고 메모리·디스크·컨테이너·게임 지표를 추가할 계획이다. 수집 주기·보존 기간도 기록할 예정이다.

## 남은 작업

다음 순서로 검증할 계획이다.

<table>
  <thead>
    <tr><th scope="col">단계</th><th scope="col">내가 진행할 작업</th><th scope="col">남길 근거</th></tr>
  </thead>
  <tbody>
    <tr><td>모니터링 확장</td><td>메모리·디스크·컨테이너·TPS/MSPT 추가</td><td>평상시 기준선과 부하 변화</td></tr>
    <tr><td>중앙 로그</td><td>Loki·Alloy로 프록시·게임·Docker 로그 통합</td><td>같은 시간대의 계층별 기록</td></tr>
    <tr><td>장애 알림</td><td>게임 응답·디스크·틱 지연·백업 실패 감지</td><td>감지와 복구 알림</td></tr>
    <tr><td>복원 검증</td><td>독립 환경에서 백업 복원·기동</td><td>복구 시간과 데이터 손실 범위</td></tr>
    <tr><td>장애 훈련</td><td>격리 환경에서 중단·자원 제한 재현</td><td>감지·분석·조치 타임라인</td></tr>
    <tr><td>성과 정리</td><td>가용률·장애·복구 시간과 성능 결과 정리</td><td>측정 기간과 조건을 명시한 보고</td></tr>
  </tbody>
</table>

다음 검증 대상은 지표·로그 연계와 독립 환경 복원이다.
