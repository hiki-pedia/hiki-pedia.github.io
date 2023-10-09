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
<meta name="keywords" content="html의 구조">        웹 문서의 키워드
<meta name="description" content="html의 구조를 알아봅시다.">        웹 문서의 설명
<meta name="author" content="woo heeseok">        웹 문서의 소유자나 제작자
```

## HTML파일 만들기

<p>html에선 자동완성 기능이 제공한다.</p>

## 라이브 서버 설치하고 바로 결과 확인하기

<p>비주얼 스튜디어 코드의 왼쪽 사이드 바에서 확장 아이콘을 클릭해 'Live Server'라고 검색하고 설치한다.(맥의 경우 cmd+K cmd+O를 차례대로 입력하면 즉시 실행된다.)</p>

## 시멘틱 태그

# 헤더 영역을 나타내는 태그
<p>&lt;header&gt;태그는 말 그대로 헤더 영역을 의미한다. 이는 사이트 전체의 헤더가 될 수도 있고 특정 영역의 헤더가 될 수도 있다.</p>

# 내비게이션 영역을 나타내는 태그
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
```




