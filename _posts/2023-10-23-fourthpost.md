---
title: "HTML에 대하여(3)"
categories:
  - frontend
tags:
  - html
---
웹 문서에 다양한 내용 입력하기

## 이미지 삽입하기

### 이미지 삽입하는 &lt;img&gt;태그

```html
<img src="이미지 파일 경로", alt="대체용 텍스트">
```
`src`는 이미지 경로, `alt`는 대체 텍스트다.

```html
<img src="assets/images/example.jpg" alt="이미지 설명">
```

`width`·`height`로 크기를 지정한다. 하나만 지정하면 나머지는 원본 비율에 맞춘다. `px`는 픽셀, `%`는 포함 요소를 기준으로 한 비율이다.

```html
<img src ="" alt="" width="" height="">
```

## 오디오와 비디오 삽입하기

### 다양한 멀티미디어 삽입 &lt;object&gt;, &lt;embed&gt;

&lt;object&gt;는 PDF 등 외부 리소스를 삽입한다.

```html
<object width="너비" height="높이" data="파일"></object>
<object width="너비" height="높이" data="파일명.pdf"></object>     //pdf삽입
```
&lt;embed&gt;는 외부 콘텐츠를 삽입하며 닫는 태그가 없다.

```html
<embed src="경로" width="너비" height="높이">
```

### 오디오·비디오: &lt;audio&gt;, &lt;video&gt;

&lt;audio&gt;·&lt;video&gt;로 미디어를 재생한다. `controls`를 지정하면 재생·정지 컨트롤이 표시된다.

```html
<audio src="오디오 파일 경로" controls></audio>
<video src="비디오 파일 경로" controls></video>
```
#### audio와 video의 속성 종류

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

`autoplay`·`loop`로 자동·반복 재생을 요청한다. 실제 자동 재생 여부는 음소거 상태와 브라우저 정책에 따라 달라진다.

```html
<audio src="파일 경로" autoplay loop></audio>
<video src="파일 경로" autoplay loop></video>
```

## 하이퍼링크 삽입하기

### 링크 &lt;a&gt;, 주소 속성 href

&lt;a&gt;에 `href`를 지정해 텍스트·이미지 링크를 만든다. 모양은 CSS로 바꿀 수 있다.

```html
<a href="링크할 주소">텍스트</a>     // 텍스트 링크
<a href="링크할 주소"><img src="이미지파일 경로" alt="대체용 텍스트"></a>     // 이미지 링크
```

`target="_blank"`로 새 탭에서 연다.

```html
<a href="링크할 주소" target="_blank"></a>
```
