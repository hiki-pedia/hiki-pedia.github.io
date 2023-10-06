---
title: "HTML에 대하여(1)"
categories:
  - frontend
tags:
  - html
toc : true
author_profile : false
sidebar:
  nav: "docs"
---

## HTML이란?

<p> 다양한 인터넷 정보를 웹 브라우저에 보여줄 때 사용하는 언어. <br> <b>H</b>yper <b>T</b>ext <b>M</b>arkup <b>L</b>anguage </p>

## HTML 구조 파악하기

현재 문서가 HTML5 언어로 작성한 문서라는 뜻.
```html
<!DOCTYPE html>
```

# 웹 문서의 시작과 끝을 나타내는 태그.
```html
<html lan="ko"> ... </html>
```

# 웹 브라우저가 웹 문서를 해석하는 데 필요한 정보를 입력하는 부분.
```html
<head> ... </head>
```

# 화면에 나타내는 내용. 대부분의 태그를 포함함.
```html
<body> ... </body>
```
<meta>태그는 웹 브라우저에는 보이지 않지만 웹 문서와 관련된 정보를 지정할 때 사용한다. 화면에 글자를 표시할 때 어떤 인코딩을 사용할지 지정하는 것. 웹 서버는 영어가 기본이므로 한글로 된 내용을 표시 할 때는 <b>UTF-8</b>라는 문자 세트를 사용한다.
```html
<meta charset="UTF-8">
```
<meta>태그 다양하게 사용하기
```html
<meta name="keywords" content="html의 구조">        웹 문서의 키워드
<meta name="description" content="html의 구조를 알아봅시다.">        웹 문서의 설명
<meta name="author" content="woo heeseok">        웹 문서의 소유자나 제작자
```


