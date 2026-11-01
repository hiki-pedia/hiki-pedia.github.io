---
title: "HTML에 대하여(1)"
categories:
  - frontend
tags:
  - html
---
HTML 기본 문서 만들기

## HTML이란?

HTML(HyperText Markup Language)은 웹 문서의 구조를 표현하는 마크업 언어다.

## HTML 구조 파악하기

현재 문서가 HTML5 언어로 작성한 문서라는 뜻.
```html
<!DOCTYPE html>
```

웹 문서의 시작과 끝을 나타내는 태그.
```html
<html lang="ko"> ... </html>
```

웹 브라우저가 웹 문서를 해석하는 데 필요한 정보를 입력하는 부분.
```html
<head> ... </head>
```

화면에 나타내는 내용. 대부분의 태그를 포함함.
```html
<body> ... </body>
```

&lt;meta&gt;는 문서 메타데이터를 지정한다. `charset="UTF-8"`로 문자 인코딩을 설정한다.
```html
<meta charset="UTF-8">
```
&lt;meta&gt;태그 다양하게 사용하기
```html
<meta name="keywords" content="html의 구조">     //웹 문서의 키워드
<meta name="description" content="html의 구조를 알아봅시다.">     //웹 문서의 설명
<meta name="author" content="woo heeseok">     //웹 문서의 소유자나 제작자
```

## HTML파일 만들기

편집기의 자동완성으로 HTML 기본 구조를 만들 수 있다.

## 라이브 서버 설치하고 바로 결과 확인하기

VS Code 확장에서 Live Server를 설치하면 수정 결과를 브라우저에서 확인할 수 있다.

## 시맨틱 태그

### 헤더 영역 &lt;header&gt;
&lt;header&gt;는 사이트나 개별 영역의 머리말이다.

### 내비게이션 영역 &lt;nav&gt;
&lt;nav&gt;는 주요 탐색 링크를 묶는다.
헤더·푸터·사이드바 안이나 독립된 영역에 배치할 수 있다.
```html
(...생략...)
<header>
  <div id="logo">
    <a href='#'><h1>Dream jeju</h1></a>     // 로고 영역
  </div>
  <nav>
    <ul id="topMenu">
      <li><a href="#">     //내비게이션 영역
(...생략...)
```

### 핵심 콘텐츠 &lt;main&gt;
&lt;main&gt;은 문서의 핵심 콘텐츠다. 반복되는 메뉴·로고 등은 제외한다.

### 독립적인 콘텐츠 &lt;article&gt;
&lt;article&gt;은 포스트·기사처럼 독립된 콘텐츠다. 내부에 &lt;section&gt;을 둘 수 있다.

### 콘텐츠 영역 &lt;section&gt;
&lt;section&gt;은 관련 콘텐츠를 주제별로 묶는다.

```html
(...생략...)
<main class="contents">
  <section id="healing">
    <h2>몸과 마음이 치유되는 섬</h2>
    .....
  </section>
  <section id="activity">
    <h2>다양한 액티비티가 있는 섬</h2>
    .....
  </section>
</main>
(...생략...)
```

### 보조 콘텐츠 &lt;aside&gt;
&lt;aside&gt;는 본문과 간접적으로 관련된 보조 콘텐츠다. 사이드바 등에 사용한다.

### 푸터 영역 &lt;footer&gt;
&lt;footer&gt;는 제작 정보·저작권·연락처 등을 담는 꼬리말이다.

```html
(...생략...)
<footer>
  <div id="bottomMenu">
    <ul>
      <li><a href="#">회사 소개</a></li>
      <li><a href="#">개인정보처리방침</a></li>
      <li><a href="#">여행약관</a></li>
    </ul>
  </div>
</footer>
(...생략...)
```

### 여러 소스를 묶는 &lt;div&gt;
&lt;div&gt;는 의미를 정하지 않고 영역을 묶는다. `id`·`class`로 구분하고 스타일을 적용한다.
```html
(...생략...)
<header>
  <div id="logo">
    <a href="#">Dream Jeju</a>
  </div>
(...생략...)
```
