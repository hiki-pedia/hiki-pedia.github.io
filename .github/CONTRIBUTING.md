# 작업 안내

이 저장소는 개인 기술 블로그입니다. 기준 브랜치는 `master`입니다.

## 작업 시작

```bash
git switch master
git pull --ff-only
git switch -c docs/project-post
```

글은 `docs/`, 화면 기능은 `feat/`, 오류 수정은 `fix/`, 빌드 설정은 `ci/` 브랜치에서 작업합니다.
한 브랜치에서는 한 가지 목적의 변경을 다룹니다.

## 커밋

무엇을 바꿨는지 제목만으로 알 수 있게 적습니다.

```text
글: ChartMaster 데이터 수집 구조와 재처리 과정 정리
화면: 프로젝트 목록을 개인·학교 작업으로 구분
수정: 모바일 화면에서 사이드바가 본문을 가리는 문제 해결
```

글 추가와 공통 레이아웃 수정은 커밋을 나눕니다.
공통 레이아웃을 바꿨다면 영향을 받는 기존 글도 확인합니다.
PR에는 변경 이유, 확인한 페이지, 실행한 빌드 명령과 결과를 남깁니다.

## 병합 전 확인

```bash
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter
bundle exec jekyll serve
```

- 새 글의 제목, 카테고리, 날짜가 의도한 값인지 확인합니다.
- 이미지 경로와 상대 링크가 실제 페이지에서 열리는지 확인합니다.
- 레이아웃이나 스타일을 바꿨다면 데스크톱과 모바일 너비에서 확인합니다.
- GitHub Actions의 빌드 결과를 확인합니다. 빌드 통과만으로 화면 확인을 대신하지 않습니다.

`Gemfile.lock`은 함께 관리합니다. 의존성을 올리는 변경은 글 수정과 분리합니다.
JavaScript를 바꾸면 `npm ci && npm run build:js`로 번들을 만들고 `main.min.js`를 함께 커밋합니다.

## 되돌리기

병합된 변경에 문제가 생기면 해당 커밋을 `git revert <커밋>`으로 되돌리고 원인을 남깁니다.
이미 공유된 이력은 강제 푸시로 바꾸지 않습니다.
