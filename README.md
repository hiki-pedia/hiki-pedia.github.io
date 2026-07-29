# DNHS Engineering Blog

Jekyll과 Minimal Mistakes 테마를 기반으로 만든 개인 기술 블로그입니다.

## 로컬 실행

Ruby 의존성을 설치합니다.

```bash
bundle install
```

사이트를 빌드합니다.

```bash
bundle exec jekyll build
```

로컬 서버를 실행합니다.

```bash
bundle exec jekyll serve
```

JavaScript 번들이 필요할 때는 Node 의존성을 설치한 뒤 실행합니다.

```bash
npm install
npm run build:js
```

## 주요 구조

- `_posts/`: 블로그 글
- `_pages/`: 카테고리, 검색, 약관 같은 고정 페이지
- `_data/navigation.yml`: 상단 메뉴와 사이드바 메뉴
- `_config.yml`: 사이트 설정과 Jekyll 기본값
- `assets/images/`: 글과 사이트에서 사용하는 이미지
- `assets/js/`: 테마 JavaScript 원본과 번들

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
