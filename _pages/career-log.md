---
title: "Career Log"
layout: archive
permalink: /career-log/
sidebar:
  nav: "docs"
---

<p class="projects-intro">취업 준비 과정과 지원·면접 경험을 기록합니다.</p>
{% assign career_posts = site.categories["career-log"] | where_exp: "post", "post.hidden != true" %}
{% if career_posts.size > 0 %}
{% for post in career_posts %}
{% include archive-single.html %}
{% endfor %}
{% else %}
<p class="project-empty">아직 작성한 글이 없습니다.</p>
{% endif %}
