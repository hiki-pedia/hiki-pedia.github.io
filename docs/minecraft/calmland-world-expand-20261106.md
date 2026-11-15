---
title: "Minecraft 월드 확장·보존 검증"
layout: single
breadcrumbs: false
permalink: /docs/minecraft/world-expansion/
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: docs
search: false
related: false
share: false
read_time: false
---

[← Minecraft 프로젝트로 돌아가기]({{ '/projects/minecraftgameserver/' | relative_url }})

> 세부 검사 JSON과 실행 스크립트 중 함께 첨부되지 않은 자료는 링크 대신 파일명으로 표시했다.

## 목적과 범위

적은 접속 인원으로도 탐험할 지역을 넓히기 위해 오버월드를 확장했다. 월드 중심과 기존 지형·건축물·플레이어 데이터는 유지하고 바깥 청크를 추가한다. 접속 정원은 10명으로 유지한다.

| 항목 | 기존 | 적용 결과 |
|---|---|---|
| 보더 한 변 | 4,000블록 | 6,000블록 |
| 면적 | 1,600만 블록² | 3,600만 블록², 2.25배 |
| 중심 X·Z | `(0,-640)` | 동일 |
| 플레이 범위 | X `-2000,2000)`, Z `[-2640,1360)` | X `[-3000,3000)`, Z `[-3640,2360)` |
| 시야 여유분 포함 생성 범위 | 청크 X `-131..130`, Z `-171..90` | 청크 X `-194..193`, Z `-234..153` |
| 검증 대상 FULL 청크 | 68,644개 | 150,544개 |
| 지도 | 4,000블록 PNG | 6,000블록 PNG, 지도 ID0 유지 |

## 적용 방법

1. 운영 서버를 정상 종료해 백업을 검증하고 별도 복제본을 만든다.
2. 두 서버에서 북쪽·남쪽을 나눠 사전 생성한다. 준비 컨테이너는 게임 포트를 공개하지 않으며 CPU·메모리 사용을 제한한다.
3. 정상 종료 후 저장된 청크의 좌표·NBT·FULL 상태를 검사한다.
4. 적용 시점의 운영 월드와 비교해 없는 청크만 추가한다. 기존 FULL 청크의 지형·엔티티·POI 기록은 바이트 단위로 보존한다. 사용된 미완성 청크는 덮어쓰지 않는다.
5. 전체 범위를 다시 검사한 뒤 보더·지도 PNG·좌표 투영 설정을 함께 적용한다.

사전 생성은 디스크에 청크를 저장하는 작업이다. 전체 월드를 상시 메모리에 올리거나 강제 로딩하지 않는다. 새 지도는 실제 지형의 8블록 간격 표본 562,500개로 만들며 개인 리스폰 지점 1·2를 그대로 표시한다.

## 검증 근거

| 검사 | 근거 |
|---|---|
| 기존 게임 기능 13개 | [별도 Paper·더미 클라이언트 회귀 검사 (`game-regression.json`) |
| 기존 청크 보존·미완성 청크 처리 | 병합 검사 (`merge-tests.json`) |
| 생성 중 운영 서버 상태 | 주기별 관측 요약 (`generation-monitoring.json`) |

운영 적용 결과: **healthy**, CalmlandMap **1.16.0**, 보더 **6,000**, 지도 ID **0**. 사전 생성 범위 **150,544개**, 실제 보더에 걸치는 **141,376개** 모두 FULL이다. 기존 FULL 청크 **68,700개**와 엔티티·POI 기록은 바이트 단위로 보존했다.

- 실제 적용·보존 검사 (`deployment.json`), 운영 상태 확인 (`post-deployment.json`)
- 남쪽 검사 (`south-audit.json`), 북쪽 검사 (`north-audit.json`), 최종 지도·좌표 검사 (`map-tests.json`)
- [확장 지도 PNG]({{ '/assets/images/minpost(5).png' | relative_url }}), 표본·범위·이미지 해시 (`manifest.json`)

적용 직전 콜드 백업: `/data/nostos/backups/manual-expand6000-deploy-20261106-142158`. gzip 무결성·원본 대조·SHA-256 검사를 통과했으며, 적용한 파일 목록은 위 배포 JSON에 남겼다. 실패 시 적용 전 파일로 되돌리는 경로도 배포 스크립트에 포함했다. 이번 정상 적용에서 실제 롤백을 실행한 것은 아니다.

첫 적용 시도에서는 보존 검사에 걸려 운영 파일 변경 없이 중단하고 기존 서버를 재가동했다. 실제 Paper 26.3 JAR의 `ChunkStatus.TERRAIN`을 확인한 뒤, 생성 단계 허용 목록에 `minecraft:terrain`을 추가했다. 사용 이력이 있는 미완성 청크 거부 조건은 유지했다. 확인 근거 (`terrain-status-verification.json`).

두 번째 시도는 전체 저장·보존 검사를 통과했지만, SSD 원본을 HDD 복구 디렉터리에 하드링크하려다 중단됐다. 운영 파일 변경 전에 서버를 복구했고, 복구용 원본 보관을 `copy2`로 수정해 다시 적용했다. 두 번째 시도 기록 (`deployment-second-attempt.json`).

## 해석의 한계

월드 확대는 탐험 범위와 저장 용량을 늘린다. 접속자가 없는 동안 CPU를 계속 최대치로 쓰게 만드는 설정은 아니다. 생성 작업 중 CPU 사용량과 실제 플레이 부하는 구분한다. 이번 작업으로 동시 접속 성능을 다시 검증한 것은 아니며 [기존 부하 시험]({{ '/docs/minecraft/capacity-test/' | relative_url }})의 10명 운영 기준을 유지한다.

소스: 생성 도구 (`SeedPrep.java`), 추가 청크 패키징 (`package-expansion.py`), 보존 병합 (`expansion_merge.py`), 백업·적용·복구 (`deploy-expansion.py`), 지도 렌더링 (`render-static-map.py`).
