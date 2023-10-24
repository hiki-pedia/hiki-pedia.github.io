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

### 오디오와 비디오 파일 삽입 &lt;audio&gt;, &ltvideo&gt;

<p>HTML5 이전 HTML4까지는 별도의 플러그인 프로그램이 필요했지만 이제는 웹 브라우저 안에서 멀티미디어 파일을 삽입하고 바로 재생할 수 있다. 따라서 같은 웹 브라우저라 하더라도 버전에 따라 지원 상황이 달라질 수 있다. 이때 <b>controls</b>는 클라이언트가 음악을 재생하거나 멈출 수 있도록 컨트롤 바를 나타내는 속성이다. 재생버튼을 눌러야만 재생한다.</p>

```html
<audio src="오디오 파일 경로" controls></audio>
<video src="비디오 파일 경로" controls></video>
```
#### audio와 video의 속성 종류
<p>
  <blockquote>
    <dl>
      <dt>controls</dt>
      <dd>플레이어 화면에 컨트롤 바를 표시한다.</dd>
      <dt>autoplay</dt>
      <dd>오디오나 비디오를 자동으로 실행</dd>
      <dt>loop</dt>
      <dd>오디오나 비디오를 반복 재생</dd>
      <dt>muted</dt>
      <dd>오디오나 비디오의 소리를 제거</dd>
      <dt>preload</dt>
      <dd>페이지를 불러올 때 파일을 어떻게 로딩할 것인지 결정. 사용할 수 있는 값은 auto, metadata, none이다. 기본값은 preload="auto"이다.</dd>
      <dt>width, height</dt>
      <dd>너비와 높이를 결정. 하나만 지정할 경우 나머지는 자동 결정</dd>
      <dt>poster="파일 이름"</dt>
      <dd>&lt;video&gt;태그에서 사용하는 속성으로 비디오가 재생되기 전까지 화면에 표시될 포스터 이미지를 지정한다.</dd>
    </dl>
  </blockquote>
</p>

<p>플레이어 표시 없이 배경 음악 넣기는 autoplay 속성과 loop 속성을 지정하고 컨트롤바를 표시하는 속성인 controls속성을 빼면 된다. 대부분의 웹 브라우저에서는 오디오나 소리가 있는 비디오의 자동 재생을 금지하고 있긴하다. 크롬 브라우저에서 자동 재생되지 않는 경우 video태그 안에 muted 속성을 추가하면 자동 재생이 된다. 하지만 스마트폰이나 태블릿의 웹브라우저에서는 자동재생이 불가하다.</p>

```html
<audio src="파일 경로" autoplay loop></audio>
<video src="파일 경로" autoplay loop></video>
```

## 하이퍼링크 삽입하기

### 링크를 삽입하는 &lt;a&gt;, &lt;href&gt;

<p>웹 사이트에서 링크의 기능은 정말 많이 사용된다. 이때 텍스트를 사용하면 텍스트 링크가 되고 이미지를 사용하면 이미지 링크가 된다. 텍스트 링크는 기본적으로 파란색 글씨에 밑줄이 그어지고 css에서 추가적인 설정 및 변경이 가능한다.</p>

```html
<a href="링크할 주소">텍스트</a>     // 텍스트 링크
<a href="링크할 주소"><img src="이미지파일 경로" alt="대체용 텍스트"></a>     // 이미지 링크
```

<p>링크를 새 탭에서 열어주려면 target 속성에 _blank를 지정하면 된다.</p>

```html
<a href="링크할 주소" target="_blank"></a>
```

## 폼 삽입하기

### 폼을 만드는 &lt;form&gt;

<p>&lt;form&gt;태그에서는 몇 가지 속성을 사용해서 입력받은 자료를 어떤 방식으로 서버로 넘길 것인지 서버에서 어떤 프로그램을 사용하여 처리할 것인지를 저정한다.</p>

```html
<form [속성="속성값"]>여러 폼 요소</form>
```
<p>
  <blockquote>
    <dl>
      <dt>method</dt>
      <dd>사용자가 입력한 내용을 서버 쪽 프로그램으로 어떻게 넘겨줄 것인가를 지정. method에서 사용할 수 있는 속성 값은 get과 post다.<br>
        <ul>
          <li>get: 데이터를 256~4096byte까지만 서버로 넘길 수 있다. 주소 표시줄에 사용자가 입력한 내용이 그대로 드러난다는 단점이 있다</li>
          <li>post: 입력한 내용의 길이에 제한받지 않고 입력한 내용도 드러나지 않는다.</li>
        </ul></dd>
      <dt>name</dt>
      <dd>자바스크립트로 폼을 제어할 때 사용할 폼의 이름 지정</dd>
      <dt>aciton</dt>
      <dd>&lt;form&gt;태그 안의 내용을 처리해 줄 서버 프로그램을 지정</dd>
      <dt>target</dt>
      <dd>action속성에서 지정한 스크립트 파일을 현재 창이 아닌 다른 위치에서 열도록 한다.</dd>
    </dl>
  </blockquote>
</p>

