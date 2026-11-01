---
title: "HTML에 대하여(4)"
categories:
  - frontend
tags:
  - html
---
입력 양식 작성하기

## 폼 삽입하기

### 폼을 만드는 &lt;form&gt;

&lt;form&gt;은 입력값의 전송 방식과 처리 주소를 지정한다.

```html
<form [속성="속성값"]>여러 폼 요소</form>
```
<p>
  <blockquote>
    <dl>
      <dt>method</dt>
      <dd>서버로 보내는 방식을 지정한다. 주로 GET·POST를 사용한다.<br>
        <ul>
          <li>GET: 입력값을 URL 쿼리에 담는다.</li>
          <li>POST: 입력값을 요청 본문에 담는다.</li>
        </ul></dd>
      <dt>name</dt>
      <dd>자바스크립트로 폼을 제어할 때 사용할 폼의 이름 지정</dd>
      <dt>action</dt>
      <dd>&lt;form&gt;태그 안의 내용을 처리해 줄 서버 프로그램을 지정</dd>
      <dt>target</dt>
      <dd>action속성에서 지정한 스크립트 파일을 현재 창이 아닌 다른 위치에서 열도록 한다.</dd>
    </dl>
  </blockquote>
</p>

`action`에 처리 주소를 지정한다.

```html
<form action="register.php">
  /* 여러가지 폼 요소 */
</form>
```

`autocomplete`로 자동완성을 설정한다. 끄려면 `off`를 지정한다.

```html
<form aciton="" autocomplete="off">
  /* 여러 폼 요소 */
</form>
```

### 폼 요소를 그룹으로 묶는 &lt;fieldset&gt; &lt;legend&gt;

&lt;fieldset&gt;으로 관련 입력 항목을 묶는다.

```html
<fieldset [속성="속성값"]></fieldset>
```

&lt;legend&gt;로 그룹 제목을 붙인다.

```html
<fieldset>
  <legend>그룹이름</legend>
</fieldset>
```

```html
<h1>자동차 구매하기</h1>
<form action="">
  <fieldset>
    <legend>상품입력</legend>

  </fieldset>
  <fieldset>
    <legend>배송지입력</legend>
  </fieldset>
</form>
```

### 폼 요소에 레이블을 붙이는 &lt;label&gt;

&lt;label&gt;로 입력란의 이름을 연결한다.

```html
<label>레이블명<input type="text"></label>     // &lt;label&gt;, 안에 &lt;input&gt; 넣기
<label>아이디(6자이상)<input type="text"></label>

<label for="id명">레이블명<input id="id명"></label>     //&lt;label&gt;태그와 폼 요소를 따로 쓰고 연결하기
<label for="user-id">아이디(6자이상)</label>
<input type="text" id="user-id">
<!-- 이 방법은 앞선 방법보다 복잡해 보이지만 레이블과 사용자 정보를 입력받는 <input>태그가 떨어져 있더라도 둘 사이를 쉽게 연결할 수 있다. -->
```

## 사용자 입력을 위한 input태그

### &lt;input&gt;

사용자 입력을 받는 요소다.

### &lt;input&gt; type 속성 한눈에 살펴보기

### 텍스트와 비밀번호를 나타내는 type="text"와 type="password"

`text`는 한 줄 텍스트, `password`는 내용을 가린 입력란이다.

```html
<input type="text">
<input type="password">
```
텍스트 필드와 비밀번호 필드에서 사용하는 속성

<blockquote>
  <dl>
    <dt>size</dt>
     <dd>화면에 보이는 입력란 크기를 지정한다. 최대 입력 길이와는 별개다.</dd>
    <dt>value</dt>
     <dd>입력란의 초깃값을 지정한다.</dd>
    <dt>maxlength</dt>
    <dd>텍스트 필드와 비밀번호 필드에 입력할 수 있는 최대 문자 수 지정.</dd>
  </dl>
</blockquote>

```html
<form>
  <fieldset>
    <label>아이디:<input type="text" id="user-id" size="10"></label>
    <label>비빌번호:<input type="password" id="user-wd" size="10"></label>
    <input type="sumit" value="로그인">
  </fieldset>
</form>
```

### 다양한 용도에 맞게 입력하는 type="search", type="url", type="email", type="tel"

* `search`: 검색어.
* `url`: URL 형식 검사.
* `email`: 이메일 형식 검사.
* `tel`: 전화번호 입력.

입력 유형에 따라 모바일 키보드 배열이 달라질 수 있다.

```html
<ul>
  <li>
    <label for="urer-name">이름</label>
    <input type="text" id="user-name">
  </li>
  <li>
    <label for="addr">배송 주소</label>
    <input type="text" id="addr">
  </li>
  <li>
    <label for="email">이메일</label>
    <input type="email" id="email">
  </li>
  <li>
    <label for="phone">전화번호</label>
    <input type="tel" id="phone">
  </li>
</ul>
```

### 체크박스와 라디오 버튼을 나타내는 type="checkbox", type="radio"

체크박스는 복수 선택, 같은 이름의 라디오 버튼은 하나만 선택한다.

  * value: 선택 시 서버에 보낼 값.
  * checked: 초기 선택 상태.

```html
<fieldset>
  <legend>상품 선택</legend>
  <p><b>주문할 상품을 선택해 주세요.</b></p>
  <label><input type="checkbox" value="s_3">소니 A7M4</label>
  <label><input type="checkbox" value="s_5">소니 A7C2</label>
  <label><input type="checkbox" value="f_5">소니 A9C3</label>
  <p><b>추가선택</b></p>
  <label><input type="radio" name="gift" value="yes">24~79mm렌즈 선택 함</label>
  <label><input type="radio" name="gift" value="no">24~79mm렌즈 선택 안함</label>
</fieldset>
<!-- 위의 radio 버튼에서 name 속성은 php와 같은 웹 프로그래밍에서 폼 요소를 제어할 때 자주 사용. 라디오 버튼에서 하나의 버튼만 선택할 수 있게 하려면 모든 라디오 버튼의 name값을 똑같이 지정해야함. -->
<!-- 즉 radio 뒤에 붇는 name 속성이 같은 버튼 중에 하나만 선택할 수 있는 것. -->
```

### 숫자 입력 필드를 나타내는 type="number", type="range"

`number`는 숫자 입력란, `range`는 범위 슬라이더다.

```html
<input type="number">
<input type="range">
```

범위 속성은 다음과 같다.
  * min: 최솟값.
  * max: 최댓값.
  * step: 값의 간격.
  * value: 초깃값.

```html
<ul>
  <li>
    <label><input type="checkbox" value="s_3">소니 A7M4</label>
    <input type="number" min="0" max="5">개 (쵀대 5개)<!-- 최소 0개에서 최대 5개로 지정해줌 -->
  </li>
  <li>
    <label><input type="checkbox" value="s_5">소니 A7C2</label>
    <input type="number" min="0" max="3">개 (쵀대 3개)<!-- 최소 0개에서 최대 3개로 지정해줌 -->
  </li>
<ul><!-- 같은 방법으로 "checkbox"위치에 "range"로 바꾸머면 슬라이드 막대가 나오게 된다. -->
```
