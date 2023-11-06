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
<p>입력 양식 작성하기</p>

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

<p>폼에 내용을 입력하고 서버로 전송했을 때 서버에 있는 register.php를 실행한다면</p>

```html
<form action="register.php">
  /* 여러가지 폼 요소 */
</form>
```

<p>자동완성 기능은 예전에 입력했던 내용을 자동으로 표시해주는 것이고 autocomplete속성이다. 기본적으로 on상태이고 off하고 싶으면 따로 지정해 주어야한다.</p>

```html
<form aciton="" autocomplete="off">
  /* 여러 폼 요소 */
</form>
```

### 폼 요소를 그룹으로 묶는 &lt;fieldset&gt; &lt;legend&gt;

<p>하나의 폼 안에서 여러 구역을 나누어 표시할 때 &lt;fieldset&gt; 태그를 사용한다. 예를들어 쇼핑물 사이트에서 주문서를 작성할 때 개인정보와 배송정보를 나누어 표시하면 사용자가 입력하기도 편하고 화면도 깔끔하게 정리할 수 있다.</p>

```html
<fieldset [속성="속성값"]></fieldset>
```

<p>&lt;legend&gt;태그는 다음과 같이 fieldset에 묶은 그룹에 제목을 붙일 수 있다.</p>

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
// 이 방법은 앞선 방법보다 복잡해 보이지만 레이블과 사용자 정보를 입력받는 <input>태그가 떨어져 있더라도 둘 사이를 쉽게 연결할 수 있다.
```

![image](/assets/images/fifthpost(1).jpg)

## 사용자 입력을 위한 input태그

### &lt;input&gt;

<p>다양한 폼에서 사용자가 입력한 정도를 받을 때 사용.</p>

### &lt;input&gt; type 속성 한눈에 살펴보기

![image](/assets/images/fifthpost(2).jpg)

### 텍스트와 비밀번호를 나타내는 type="text"와 type="password"

<p>텍스트 필드는 폼에서 가장 많이 사용하는 요소. 주로 아이디나 이름, 주소 등 한 줄짜리 일반 텍스트를 입력할 때 사용. 비밀번호 필드는 입력하는 내용을 보여주지 않아야 하므로 * 등으로 표시 된다.</p>

```html
<input type="text">
<input type="password">
```
<p>텍스트 필드와 비밀번호 필드에서 사용하는 속성</p>

<p>
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
</p>


```html
<form>
  <fieldset>
    <label>아이디:<input type="text" id="user-id" size="10"></label>
    <label>비빌번호:<input type="password" id="user-wd" size="10"></label>
    <input type="sumit" value="로그인">
  </fieldset>
</form>
```

