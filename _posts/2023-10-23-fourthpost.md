---
title: "HTML에 대하여(3)"
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
<p>웹 문서에 다양한 내용 입력하기</p>

## 이미지 삽입하기

### 이미지 삽입하는 &lt;img&gt;태그

```html
<img src="이미지 파일 경로", alt="대체용 텍스트">
```
<p>&lt;img&gt;에서 알아야 할 속성은 src와 alt이다. src 속성은 이미지 파일의 경로를 지정하여 웹 브라우저에 알려주는 역할을 하며 반드시 있어야한다. alt 속성은 화면 낭독기 등에서 이미지를 대신하여 읽어 줄 텍스트를 입력한다.</p>

```html
<img src="assets/images/unsplash-gallery-image-2-th.jpg" alt="어둑한 계단" >
```

<p>이미지의 크기를 조정하는 width와 height는 두개의 속성을 모두 사용할 수 있고 하나의 속성만 사용할 수도 있다. 하나의 속성만 사용할 때는 나머지 속성은 비율을 자동으로 조정해 나타낸다. 이미지를 표현하는 단위의 종류 &#34;%&#34;와 &#34;px&#34;가 있다. &#34;%&#34;는 현재 웹 브라우저 창의 너비와 높이를 기준으로 이미지 크기를 결정한다. 원래 이미지의 크기에서 조정되는 것이 아닌 웹 브라우저의 크기 기준의 비율이라는 것을 기억하자. &#34;px&#34;는 이미지의 너비나 높이를 해당 픽셀 크기만큼 표시한다.</p>

```html
<img src ="" alt="" width="" height="">
```

## 오디오와 비디오 삽입하기

### 다양한 멀티미디어 삽입 &lt;object&gt;, &lt;embed&gt;

<p>&lt;object&gt;태그는 오디오 파일뿐만 아니라 비디오, 자바 애플릿, pdf등 다양한 멀티미디어 파일을 삽입할 때 사용한다. 웹 문서 안에 다른 문서를 삽입할 때도 사용한다.</p>

```html
<object width="너비" height="높이" data="파일"></object>
<object width="너비" height="높이" data="파일명.pdf"></object>     //pdf삽입
```
<p>&lt;embed&gt;태그는 HTML초기 버전부터 사용해서 대부분의 브라우저에서 사용할 수 있다. 따라서 HTML의 &lt;audio&gt;, &lt;video&gt;, &lt;object&gt; 태그를 지원하지 않는 브라우저를 고려하여 이 태그를 사용한다. 이 태그에는 닫는 태그가 없다.</p>

```html
<embed src="경로" width="너비" height="높이">
```

