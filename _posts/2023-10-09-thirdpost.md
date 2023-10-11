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

### 제목 &lt;h<i>n</i>&gt;

<p>&lt;h<i>n</i>&gt;의 <i>n</i> 숫자가 커질 수록 크키가 작아진다.</p>

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

