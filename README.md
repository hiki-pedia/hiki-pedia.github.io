# DNHS Engineering Blog

Jekyll과 Minimal Mistakes 테마를 기반으로 만든 개인 기술 블로그입니다.

사이트: [hiki-pedia.github.io](https://hiki-pedia.github.io)

글, 프로젝트 설명, 메뉴와 화면 수정 내역을 이 저장소에서 관리합니다.
테마 원본은 [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)이며,
원본 저작권과 라이선스는 [LICENSE](LICENSE)에 남겨두었습니다.

## 로컬 실행

Ruby 3.3을 사용합니다. 의존성은 커밋된 `Gemfile.lock` 기준으로 설치합니다.

```bash
gem install bundler -v 2.5.23
bundle _2.5.23_ install
```

사이트를 빌드합니다.

```bash
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter
```

로컬 서버를 실행합니다.

```bash
bundle exec jekyll serve
```

JavaScript 번들이 필요할 때는 Node 의존성을 설치한 뒤 실행합니다.

```bash
npm ci
npm run build:js
```

## 주요 구조

- `_posts/`: 블로그 글
- `_pages/`: 프로젝트 목록, 소개, 검색 등 고정 페이지
- `_data/navigation.yml`: 상단 메뉴와 사이드바 메뉴
- `_config.yml`: 사이트 설정과 Jekyll 기본값
- `assets/images/`: 글과 사이트에서 사용하는 이미지
- `assets/js/`: 메뉴·검색·목차 스크립트와 이미지 확대 기능
- `scripts/`: 빌드 결과의 내부 자산 경로 검사

## 글 작성 규칙

포스트는 `_posts/YYYY-MM-DD-title.md` 형식으로 추가합니다.

```yaml
---
title: "글 제목"
categories:
  - frontend
tags:
  - html
---
```

포스트 공통 설정인 `layout`, `toc`, `sidebar`, `author_profile`은 `_config.yml`의 `defaults`에서 관리합니다.

각 프로젝트 아래의 글을 `project_group: development`(개발) 또는 `project_group: operations`(운영)으로 구분합니다.
상단 Projects 메뉴의 전체 보기는 `/projects/`에 모든 프로젝트를 모아 표시하고, 주제별 메뉴는 같은 페이지의 해당 영역으로 이동합니다. 주제는 `_data/project_topics.yml`과 `project_topic`으로 연결하고, 글은 `project_order` 오름차순으로 표시합니다.
계획 중인 글은 `project_status: 계획`을 추가합니다. 새 프로젝트는 `_data/project_topics.yml`과 왼쪽 목차에 추가합니다.
취업 기록은 `categories: [career-log]`로 작성하면 Career Log에 모입니다.
카드에 쓰는 설명과 기술 목록은 `_data/project_cards.yml`에서 글의 파일명 슬러그를 기준으로 관리합니다.

포폴 제출 중에는 `_config.yml`의 `show_learning_posts: false`로 학습 메뉴와 검색·관련 글 노출을 숨깁니다.
학습글 원문과 기존 주소는 유지됩니다. 다시 표시하려면 값을 `true`로 바꾸고 로컬 서버를 다시 시작합니다.

## 변경 관리

`master`를 기준으로 작업 브랜치를 만들고, 글 추가와 화면 수정은 목적별로 커밋을 나눕니다.
PR에는 수정 이유와 확인한 화면을 남깁니다. 자세한 기준은 [작업 안내](.github/CONTRIBUTING.md)에 있습니다.

PR과 `master` 변경 시 GitHub Actions에서 Jekyll 빌드를 실행합니다.
이 검사는 빌드 오류, 이미지·스크립트·스타일 경로, JavaScript 번들 갱신 여부를 확인합니다.
이미지 확대, 검색, 모바일 메뉴는 브라우저에서 별도로 확인합니다.

빌드 결과인 `_site/`와 로컬 의존성은 커밋하지 않습니다.
의존성 버전을 바꿀 때는 `Gemfile`과 `Gemfile.lock`, `package.json`과 `package-lock.json`을 각각 함께 확인합니다.
사용하지 않는 댓글·분석 서비스와 추가 스킨은 포함하지 않습니다. 검색은 Lunr, 스타일은 기본 스킨을 사용합니다.
