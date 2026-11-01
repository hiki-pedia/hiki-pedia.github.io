---
title: "HTML에 대하여(2)"
categories:
  - frontend
tags:
  - html
---
웹 문서에 다양한 내용 입력하기

## 텍스트 입렵하기

### 제목 &lt;h<em>n</em>&gt;

제목은 &lt;h1&gt;부터 &lt;h6&gt;까지 구분한다.

```html
<h1>레드향</h2>
<h2>레드향 샐러드 레시피</h2>
<h3>상품 구성</h3>
```

### 단락 &lt;p&gt;, 줄바꿈 &lt;br&gt;
```html
카메라의 종류는 대표적으로 DSLR카메라와 필름카메라가 있다.<br>이 둘의 차이는 대표적으로 자동과 수동으로 구별된다.
```

### 인용 &lt;blockquote&gt;
&lt;blockquote&gt;는 긴 인용문을 표시한다.

```html
<p><blockquote>-알프레드 스티글리츠: 나는 구름을 통해 내 삶의 철학을 기록하고 싶었다. 사진 속에는 현실이 있고 이것은 때때로 진짜 현실보다 더욱 현실적인 불가사의한 힘을 지니고 있다.</blockquote></p>
```
### 텍스트 굵게 &lt;strong&gt;, &lt;b&gt;

&lt;strong&gt;은 중요성을 나타내고, &lt;b&gt;는 주의를 끌 텍스트에 사용한다.

### 기울인 텍스트 &lt;em&gt;, &lt;i&gt;
&lt;em&gt;은 강조, &lt;i&gt;는 용어·생각처럼 다른 성격의 텍스트를 나타낸다.

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

### 텍스트 여러 개 삽입하기
&lt;div id="container"&gt;와 &lt;/div&gt;사이에 코드를 작성한다.
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

## 목록 만들기

### 순서 있는 목록 &lt;ol&gt;, &lt;li&gt;(자동으로 번호 부여)
&lt;ol&gt; 안에 항목별 &lt;li&gt;를 넣는다.
```html
<ol>
  <li>항목1</li>
  <li>항목2</li>
</ol>
```

#### &lt;ol&gt;의 type, start 속성
`type`으로 번호 형식을 지정한다. 값은 `1`, `a`, `A`, `i`, `I`다.
`start`로 시작 번호를 바꾼다. `type="a" start="3"`은 c부터 시작한다.

### 순서 없는 목록 &lt;ul&gt;, &lt;li&gt;
&lt;ul&gt; 안에 항목별 &lt;li&gt;를 넣는다.
항목 앞의 원·사각형 표시를 불릿(bullet)이라 한다.

### 설명 목록 &lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt;
&lt;dl&gt;은 이름과 설명을 묶는 목록이다.
&lt;dt&gt;에 이름, &lt;dd&gt;에 설명을 넣는다.
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

## 표 만들기

### 표 구성요소
<p>세로 줄이 <b>열</b>, 가로 줄이 <b>행</b></p>

![image](/assets/images/thirdpost(6).jpg){: width="40%"}

### 표 &lt;table&gt;, 제목 &lt;caption&gt;, 행 &lt;tr&gt;, 셀 &lt;td&gt;·&lt;th&gt;

&lt;caption&gt;은 표 제목, &lt;tr&gt;은 행, &lt;td&gt;는 셀, &lt;th&gt;는 헤더 셀이다.

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

### 표의 구조를 구성하는 &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;

&lt;thead&gt;는 헤더, &lt;tbody&gt;는 본문, &lt;tfoot&gt;는 요약 영역을 묶는다. 영역별 스타일과 표 구조를 지정할 수 있다.

### 행·열 병합: rowspan·colspan

`rowspan`은 행, `colspan`은 열을 합친다.

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

### 열을 묶어 주는 &lt;col&gt;, &lt;colgroup&gt;

&lt;col&gt;은 열, &lt;colgroup&gt;은 열 그룹을 지정한다. 배경색·너비 등을 적용할 때 사용한다.

```html
<colgroup>
  <col>
</colgroup>
```
&lt;colgroup&gt;은 &lt;caption&gt; 다음, 행 내용 앞에 둔다. 아래 예제는 첫 열의 배경색과 세 번째·네 번째 열의 너비를 지정한다.

```html
<table>
  <caption>선물용과 가정용 상품 구성</caption>
  <colgroup>
    <col style="blackground-color:#eee;">     // 첫번째 열의 배경색 저정
    <col>                                     // 스타일이 없어도 &lt;col&gt;를 명시
    <col style="width:150px;">                // 세번째 열의 스타일 지정
    <col style="width:150px;">                // 네번째 열의 스타일 지정
  </colgroup>
</table>
```

같은 스타일을 여러 열에 적용할 때는 `span`으로 묶는다.

```html
<table>
  <caption>선물용과 가정용 상품 구성</caption>
  <colgroup>
    <col style="blackground-color:#eee;">     
    <col>                                    
    <col span="2" style="width:150px;">     // 스타일 속성이 같은 세번째 네번째 열을 묶어서 너비 지정    
  </colgroup>
</table>
```
