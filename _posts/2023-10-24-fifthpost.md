---
title: "HTML에 대하여(4)"
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
입력 양식 작성하기

## 폼 삽입하기

### 폼을 만드는 &lt;form&gt;

&lt;form&gt;태그에서는 몇 가지 속성을 사용해서 입력받은 자료를 어떤 방식으로 서버로 넘길 것인지 서버에서 어떤 프로그램을 사용하여 처리할 것인지를 저정한다.

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

폼에 내용을 입력하고 서버로 전송했을 때 서버에 있는 register.php를 실행한다면

```html
<form action="register.php">
  /* 여러가지 폼 요소 */
</form>
```

자동완성 기능은 예전에 입력했던 내용을 자동으로 표시해주는 것이고 autocomplete속성이다. 기본적으로 on상태이고 off하고 싶으면 따로 지정해 주어야한다.

```html
<form aciton="" autocomplete="off">
  /* 여러 폼 요소 */
</form>
```

### 폼 요소를 그룹으로 묶는 &lt;fieldset&gt; &lt;legend&gt;

하나의 폼 안에서 여러 구역을 나누어 표시할 때 &lt;fieldset&gt; 태그를 사용한다. 예를들어 쇼핑물 사이트에서 주문서를 작성할 때 개인정보와 배송정보를 나누어 표시하면 사용자가 입력하기도 편하고 화면도 깔끔하게 정리할 수 있다.

```html
<fieldset [속성="속성값"]></fieldset>
```

&lt;legend&gt;태그는 다음과 같이 fieldset에 묶은 그룹에 제목을 붙일 수 있다.

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

<p>&lt;input&gt;태그와 같은 폼 요소에 레이블을 붙일 때 사용한다. <b>레이블</b>이란 입력란 가까이에 아이디나 비밀번호처럼 붙여놓은 텍스트를 말한다.</p>

```html
<label>레이블명<input type="text"></label>     // &lt;label&gt;, 안에 &lt;input&gt; 넣기
<label>아이디(6자이상)<input type="text"></label>

<label for="id명">레이블명<input id="id명"></label>     //&lt;label&gt;태그와 폼 요소를 따로 쓰고 연결하기
<label for="user-id">아이디(6자이상)</label>
<input type="text" id="user-id">
<!-- 이 방법은 앞선 방법보다 복잡해 보이지만 레이블과 사용자 정보를 입력받는 <input>태그가 떨어져 있더라도 둘 사이를 쉽게 연결할 수 있다. -->
```

![image](/assets/images/fifthpost(1).jpg)

## 사용자 입력을 위한 input태그

### &lt;input&gt;

다양한 폼에서 사용자가 입력한 정도를 받을 때 사용.

### &lt;input&gt; type 속성 한눈에 살펴보기

![image](/assets/images/fifthpost(2).jpg)

### 텍스트와 비밀번호를 나타내는 type="text"와 type="password"

텍스트 필드는 폼에서 가장 많이 사용하는 요소. 주로 아이디나 이름, 주소 등 한 줄짜리 일반 텍스트를 입력할 때 사용. 비밀번호 필드는 입력하는 내용을 보여주지 않아야 하므로 * 등으로 표시 된다.

```html
<input type="text">
<input type="password">
```
텍스트 필드와 비밀번호 필드에서 사용하는 속성


<blockquote>
  <dl>
    <dt>size</dt>
     <dd>텍스트와 비밀번호 필드의 길이를 지정한다. 화면에 몇 글자가 보이도록 할 것인지를 지정한다. <br>예를 들어 최대로 입력할 수 있는 글자 수가 10개인 size속성 값을 5로 지정하면 필드크기는 5개 크기로 맞추고 나머지 5개 글자는 화면에 보이지 않는다.</dd>
    <dt>value</dt>
    <dd>텍스트 필드 요소가 화면에 표시될 때 텍스트 필드 부번에 보여 주는 내용. 이 속성을 사용하지 않으면 빈 텍스트 필드가 표시된다. 비밀번호 필드에서 사용하지 않는 속성.</dd>
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

텍스트 필드는 한 줄짜리 일반 텍스트를 입력할 수 있다. 폼을 만들다 보면 필드를 더 세분해야 할 때가 생긴다. 용도에 맞는 다양한 텍스트 필드를 사용할 수 있다.<br><b>type="search"</b>를 사용하면 웹 브라우저 화면으로 볼 때는 텍스트 필드와 같지만 브라우저에서는 검색을 위한 필드로 인식한다. 모바일 기기의 웹 브라우저에서는 오른쪽에 x가 표시되어 입력한 검색어를 손쉽게 지울 수 있다.<br><b>type="url"</b>은 주소를 입력하는 필드이고 <b>type="email"</b>은 이메일 주소를 입력하는 필드이다. 만일 입력값이 지정한 형식에 맞지 않는다면 웹 브라우저에서 오류 메시지를 보여준다.<br><b>type="tel"</b>은 전화번호를 나타내는 필드이다. 전화번호는 지역마다 형식이 달라 입력한 값이 전화번호인지 아닌지 체크가 불가하다. 하지만 모바엘 페이지에서 이 값을 이용하여 바로 전화를 걸 수 있다.<br>텍스트 필드에서 세분화된 필드는 pc용 웹 브라우저에서는 큰 변화가 없는 거처럼 보인다. 하지만 모바일 기기의 웹 브라우저에서는 각 텍스 필드에 입력할 때 가상 키보드 배열이 바뀐다.

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

![image](/assets/images/fifthpost(3).jpg)

### 체크박스와 라디오 버튼을 나타내는 type="checkbox", type="radio"

체크박스와 라디오 버튼은 여러개의 항목에서 선택할 때 사용한다. 이때 <b>checkbox는 중복 선택 가능</b>이고 <b>radio는 1개만 선택</b>이다.

  * value: 선택한 체크박스나 라디오 버튼을 서버에게 알려줄 때 넘겨줄 값을 지정한다. 이 값은 영문이거나 숫자이며 필수 속성
  * checked: 체크박스나 라디오 버튼의 항목은 처음에 아무것도 선택되지 않은 상태로 화면에 표시되는데, 여러 항목 중에서 기본으로 선택해 놓고 싶은 항목에 사용한다. 속성값은 따로 없다.

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

텍스트 필드에서 사용자가 숫자를 직접 입력할 수도 있지만 type="number"을 사용하면 스핀박스가 나타나면서 숫자을 선택할 수 있다. type="range"는 슬라이드 막대를 움직여 숫자를 입력할 수 있다.

```html
<input type="number">
<input type="range">
```

사용할 수 있는 속성은
  * min: 필드에 입력할 수 있는 최솟값을 지정한다. 기본 최솟값은 0이다. 
  * max: 필드에 입력할 수 있는 최댓값을 지정한다. 기본 최댓값은 100이다.
  * step: 숫자 간격을 지정할 수 있다. 기본값은 1이다.
  * value: 필드에 표시할 초깃값이다.

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

