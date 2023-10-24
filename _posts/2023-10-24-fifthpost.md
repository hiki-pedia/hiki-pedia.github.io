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
