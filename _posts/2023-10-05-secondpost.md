---
title: "HTML에 대하여(1)"
header:
  overlay_image: "/assets/images/header.jpg"
categories:
  - frontend
tags:
  - html
toc : true
author_profile : false
sidebar:
  nav: "docs"
---
HTML 기본 문서 만들기

## HTML이란?

<p> 다양한 인터넷 정보를 웹 브라우저에 보여줄 때 사용하는 언어. <br> <b>H</b>yper <b>T</b>ext <b>M</b>arkup <b>L</b>anguage </p>

## HTML 구조 파악하기

<p>현재 문서가 HTML5 언어로 작성한 문서라는 뜻.</p>
```html
<!DOCTYPE html>
```

<p>웹 문서의 시작과 끝을 나타내는 태그.</p>
```html
<html lang="ko"> ... </html>
```

<p>웹 브라우저가 웹 문서를 해석하는 데 필요한 정보를 입력하는 부분.</p>
```html
<head> ... </head>
```

<p>화면에 나타내는 내용. 대부분의 태그를 포함함.</p>
```html
<body> ... </body>
```

<p>&lt;meta&gt;태그는 웹 브라우저에는 보이지 않지만 웹 문서와 관련된 정보를 지정할 때 사용한다.</p> <p>화면에 글자를 표시할 때 어떤 인코딩을 사용할지 지정하는 것. 웹 서버는 영어가 기본이므로 한글로 된 내용을 표시 할 때는 <b>UTF-8</b>라는 문자 세트를 사용한다.</p>
```html
<meta charset="UTF-8">
```
<p>&lt;meta&gt;태그 다양하게 사용하기</p>
```html
<meta name="keywords" content="html의 구조">     //웹 문서의 키워드
<meta name="description" content="html의 구조를 알아봅시다.">     //웹 문서의 설명
<meta name="author" content="woo heeseok">     //웹 문서의 소유자나 제작자
```

## HTML파일 만들기

<p>html에선 자동완성 기능이 제공한다.</p>

![image]({{ site.url }}{{ site.baseurl }}/assets/images/secondpost(1).jpg)

## 라이브 서버 설치하고 바로 결과 확인하기

<p>비주얼 스튜디어 코드의 왼쪽 사이드 바에서 확장 아이콘을 클릭해 'Live Server'라고 검색하고 설치한다.(맥의 경우 cmd+K cmd+O를 차례대로 입력하면 즉시 실행된다.)</p>

## 시멘틱 태그

### 헤더 영역 &lt;header&gt;
<p>&lt;header&gt;태그는 말 그대로 헤더 영역을 의미한다. 이는 사이트 전체의 헤더가 될 수도 있고 특정 영역의 헤더가 될 수도 있다.</p>

### 내비게이션 영역 &lt;nav&gt;
<p>&lt;nav&gt;태그는 웹 문서 안에서 다른 위치로 연결하거나 다른 웹 문서로 연결하는 링크를 만든다. 웹 문서 위치에 영향을 받지 않으므로 헤더나 푸터, 사이드 바 안에 포함시킬 수 있고 독립해서 사용할 수도 있다.</p>
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
<p>&lt;main&gt;태그는 웹 문서에 핵심이 되는 내용을 담는다. 메뉴, 사이드 바, 로고처럼 페이지마다 같은 내용을 보여주는 정보는 넣을 수 없고, 웹 문서마다 다르게 보여주는 내용으로 구성한다. 웹 문서에서 한 번만 사용할 수 있다.</p>

### 독립적인 콘텐츠 &lt;article&gt;
<p>&lt;article&gt;태그는 실제로 보여주고 싶은 내용을 넣는다. 블로그의 포스트나 뉴스 사이트의 기사처럼 독립된 웹 콘텐츠 항목을 말함. 여러개 사용할 수 있고 이 안에 &lt;section&gt;태그를 넣을 수도 있다.</p>

### 콘텐츠 영역 &lt;section&gt;
<p>&lt;section&gt;태그는 &lt;article&gt;텍그와 비슷해 보일 수 있다. 하지만 &lt;section&gt;태그는 몇 개의 콘텐츠를 묶는 용도로 사용하고 &lt;article&gt;태그는 블로그의 포스트처럼 독립된 콘텐츠로 쓴다.</p>

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

### 사이드 바 영역 &lt;sidebar&gt;
<p>&lt;sidebar&gt;태그는 내용 외에 왼쪽이나 오른쪽, 혹은 아래에 사이드 바를 만든다. 보통 웹 사이트에서 사이바는 필수 요소가 아니다.</p>

### 푸터 영역 &lt;footer&gt;
<p>&lt;footer&gt;태그는 맨 아래쪽에 위치해 있다.사이트 제작 정보나, 저작권 정보, 연락처 등을 넣는다. 푸터에는 &lt;header&gt;, &lt;section&gt;, &lt;article&gt;을 비롯한 시맨틱 태그를 사용할 수 있다.</p>

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
<p>HTML의 &lt;header&gt;, &lt;section&gt;같은 시맨틱 태그가 나오기 전까지는 헤더나 내비게이션, 푸터등을 구별할 때 &lt;div&gt;태그를 사용했다. &lt;div&gt;는 &lt;div id="header"&gt;나 &lt;div class="detail&gt;처럼 id나 class 속성을 사용해서 문서 구조를 만들거나 스타일을 적용할 때 사용한다. 즉 영역을 구별하거나 스타일로 문서를 꾸미는 것.</p>
```html
(...생략...)
<header>
  <div id="logo">
    <a href="#">Dream Jeju</a>
  </div>
(...생략...)
```






