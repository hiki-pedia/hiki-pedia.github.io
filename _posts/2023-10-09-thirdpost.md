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

## 텍스트 입렵하기

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
![image](/assets/images/thirdpost(2).jpg)

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

### 텍스트 여러게 삽입하기
<p> &lt;div id="container"&gt;와 &lt;/div&gt;사이에 코드를 작성한다.</p>
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>Canon AE-1</title>
    <link rel="stylesheet" href="css/poster.css">     // 교제에서 미리 준비한 css
  </head>
  <body>
    <div id="container">
    <h1>Canon AE-1</h1>
    <p>Canon AE-1은 필자가 처음 사용해본 필름 카메라로써 셔터우선 모드를 지원하는 최초의 A 시리즈 카메라, 렌즈의 조리개 값을 A에 두고 원하는 셔터 속도를 설정하면 조리개가 자동으로 조절되어 적정 노출을 얻을 수 있다.</p>
    <p>이 카메라는 1976년에 출시 되었으며 필자가 사용한 카메라는 필자의 조부때 구매하여 친부에게 물려받았다.</p>
    <h2>카메라 wishlist</h2>
    </div>
  </body>
```

![image](/assets/images/thirdpost(3).jpg)

## 목록 만들기

### 순서 있는 목록 &lt;ol&gt;, &lt;li&gt;(자동으로 번호 부여)
<p>목록을 표시할 내용 앞뒤에 각각 &lt;ol&gt;, &lt;/ol&gt; 태그를 두고 그 사이에 &lt;li&gt;, &lt;/li&gt;을 삽입한다.</p>
```html
<ol>
  <li>항목1</li>
  <li>항목2</li>
</ol>
```

![image](/assets/images/thirdpost(4).jpg)

#### &lt;ol&gt;의 type, start 속성
<p>순서 있는 목록은 기본적으로 숫자로 번호를 붙인다. 이때 type속성을 이용하면 영문자나 로마 숫자 등으로 나타낼 수 있다. type="1", type="a", type="A", type="i"&#40;로마 숫자 소문자&#41;, type="I"&#40;로마 숫자 대문자&#41;</p>
<p>순서 목록은 기본적으로 첫번째 숫자, 문자로 시작하지만 start속성을 사용하여 시작 번호를 바꿀 수 있다.<br>&lt;ol type="a" start="3"&gt;라면 type ="a"의 세번째 즉 "c"부터 목록이 시작된다.</p>

### 순서 없는 목록 &lt;ul&gt;, &lt;li&gt;
<p>목록을 표시할 내용 앞뒤에 각각 &lt;ul&gt;, &lt;/ul&gt; 태그를 두고 그 사이에 &lt;li&gt;, &lt;/li&gt;을 삽입한다.</p>
<p>항목 앞에 작은 원이나 사각형을 붙여서 구분하는데 이 것을 불릿<sup>bullet</sup>이라고 한다.</p>

### 설명 목록 &lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt;
<p>설명 목록이란 이름과 값 형태로 된 목록을 말한다. 사전에서 단어명과 설명이 있는 모습을 떠올리면 된다.</p>
<p>이름&#40;단어명&#41;부분을 지정하는 &lt;dt&gt;태그와 값&#40;설명&#41;부분을 지정하는 &lt;dd&gt;로 구성</p>
```html
<dl>
  <dt>이름</dt>
  <dd>값</dd>
</dl>
```
```html
<dl>
  <dt>DSLR</dt>
  <dd>Canon EOS R50</dd>
  <dd>Sony A7</dd>
  <dt>Film</dt>
  <dd>Contax T3</dd>
  <dd>Canon AE-1</dd>
</dl>
```

![image](/assets/images/thirdpost(5).jpg)

## 표 만들기

### 표 구성요소
<p>세로 줄이 <b>열</b>, 가로 줄이 <b>행</b></p>

![image](/assets/images/thirdpost(6).jpg){: width="40%""}


### 표 만들기 &lt;table&gt;, &lt;capton&gt; 태그<br> 셀을 만드는 &lt;tr&gt; &lt;td&gt;<br> 표의 제목 행에 셀을 만들때 &lt;th&gt;

<p>&lt;table&gt;안에 &lt;caption&gt;태그를 넣어서 표의 제목을 만든다.<br>&lt;tr&gt;은 행&#40;가로&#41; &lt;td&gt;는 열&#40;세로&#41;를 만든다. 이때 &lt;th&gt;태그는 진하게 표시되고 셀 중앙에 배열된다. 아래 코드로 만든 결과를 확인해 보자.</p>

```html
<table>
  <caption> 카메라구분과 대표 카메라 </caption>
  <tr>
    <th>구분</th>
    <th>브랜드</th>
    <th>이름</th>
    <th>가격</th>
  </tr>
  <tr>
    <td>미러리스</td>
    <td>캐논</td>
    <td>m50</td>
    <td>중고가 바디 50</td>
  </tr>
  <tr>
    <td>필름 카메라</td>
    <td>캐논</td>
    <td>ae-1</td>
    <td>중고가 바디 20</td>
  </tr>
</table>     // 이렇게 하면 표에 선이 나타나지 않는다 따로 css style설정을 해줘야한다.
             // 아래 그림은 따로 설정해준 것이다.
```

![image](/assets/images/thirdpost(7).jpg){: width="50%"", height="25%""}

### 표의 구조를 구성하는 &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;

<p>&lt;thead&gt;는 표의 제목을 뜻하고  &lt;tbody&gt;는 표의 본문, &lt;tfoot&gt;는 표의 요악을 뜻한다. 표의 구조를 지정하면 시작장애인도 화면낭독기를 통해 표를 쉽게 이해할 수 있다. css를 이용해 각각 다른 스타일을 지정할 수 있다. 표의 본문이 길어 한 화면을 넘어갈 경우, 자바스크립트를 통해 thead와 tfoot는 표의 위 아래에 고정하고 tbody만 스크롤하도록 만들 수 있다. 내용이 긴 표를 여러 장 인쇄할 때도 각 장마다 표의 제목과 요약부분이 자동 안쇄되므로 편리하다.</p>

### 행이나 열을 합치는 &lt;rowspan&gt;, &lt;colspan&gt;

<p><b>행</b>을 합치려면 <b>rowspan</b>속성을 이용하고 <b>열</b>을 합치려면 <b>colspan</b>을 이용하면 된다.</p>

```html
<td rowspan="합칠 셀의 개수">셀의 내용</td>
<td colspan="합칠 셀의 개수">셀의 내용</td>
```
```html
//rowspan속성 이용해서 셀 합치기
<tr>
  <td rowspan="2">선물용</td>
  <td>3kg</td>
  <td>11~16과</td>
  <td>35,000원</td>
</tr>
<tr>
  <td>5kg</td>
  <td>18~16과</td>
  <td>52,000원</td>
</tr>
```

![image](/assets/images/thirdpost(8).jpg){: width="50%""}
