---
title: "HTML에 대하여(2)"
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

## 각종 태그

### 제목 &lt;h<em>n</em>&gt;

<p>&lt;h<i>n</i>&gt;의 <em>n</em> 숫자가 커질 수록 크키가 작아진다.</p>

```html
<h1>레드향</h2>
<h2>레드향 샐러드 레시피</h2>
<h3>상품 구성</h3>
```
![image](/assets/images/thirdpost(1).jpg){: width="20%"", height="10%""}

### 텍스트 단락 &lt;p&gt;, 태그 줄을 바꿈 &lt;dr&gt;
```html
<p>카메라의 종류는 대표적으로 DSLR카메라와 필름카메라가 있다.<br>이 둘의 차이는 대표적으로 자동과 수동으로 구별된다.</p>
```

### 인용 &lt;blockquote&gt;
<p>다른 사람의 말이나 책의 내용을 인용할 때 큰따옴표를 이용해 표기한다. 하지만 웹 브라우저에서는 이렇게 표시한 인용문을 인식할 방법이 없다. 그때 이 태그를 사용한다. 그러면 웹 브라우저는 인용문으로 파악하고 다른 텍스트보다 약간 들여쓴다. 화면 낭독기에서도 다른 텍스트와 구별한다.</p>

```html
<p><blockquote>-알프레드 스티글리츠: 나는 구름을 통해 내 삶의 철학을 기록하고 싶었다. 사진 속에는 현실이 있고 이것은 때때로 진짜 현실보다 더욱 현실적인 불가사의한 힘을 지니고 있다.</blockquote></p>
```
![image](/assets/images/thirdpost(1).jpg)

### 텍스트 굵게 &lt;strong&gt;, &lt;b&gt;

<p>&lt;strong&gt;은 글자를 굵게 표시해주고 화면 낭독기에서 구별해서 읽어준다. &lt;b&gt;는 단순히 글자만 굵게 표시해준다.</p>

### 길울인 텍스트 &lt;em&gt;, &lt;i&gt;
<p>&lt;em&gt;은 강조를 뜻하는 emphasis의 줄인말이고 &lt;i&gt;는 이탤릭체 즉 italic의 줄인말이다. &lt;em&gt;은 흐름상 특정 부분을 강조할 때 사용하고 &lt;i&gt;는 마음속의 생각이나 용어 관용구 등에 사용한다.</p>

### 줄임말 표시 &lt;abbr&gt;
 ```html
 <abbr (title)="Internet of Things">IoT</abbr>
 ```
 title 속성과 같이 표기 가능

 ### 웹 문서나 포스트에서 참고 내용 표시 &lt;cite&gt;
 ```html
 <p> 검이불루 화이불치: 검소하되 누추하지 않고 화려하되 사치스럽지 않다. - <cite>백제 온조왕</cite></p>
 ```

 ### 인식을 위한 소스코드 &lt;code&gt;
 ```html
 <code>function savetheLocal( )</code>
 ```

### 부가정보 &lt;small&gt;
```html
<p>가격 : 13000₩<small>(부가세 별도)</small></p>
```

### 아래 첨자 표시 &lt;sub&gt;, 위 첨자 표시 &lt;sup&gt;
```html
<p>물의 화학식 H<sub>2</sub>O</p>
<p>2의 제곱 2<sup>2</sup></p>
```

### 취소선 &lt;s&gt;, 밑줄 &lt;u&gt;
```html
<s>취소선 내용</s>
<u>밑줄 내용</u>
```

### 공동문서에 새로운 내용을 삽입 &lt;ins&gt;, 제거 &lt;del&gt;
```html
<ins>삽입할 내용</ins>
<del>삭제할 내용</del>
```
