---
title: "전체 프로젝트"
layout: archive
permalink: /projects/
classes:
  - projects-page
sidebar:
  nav: "docs"
---

{% assign all_projects = site.categories.projects | where_exp: "post", "post.hidden != true" %}
<p class="projects-intro">프로젝트별 구현 내용과 사용 기술, 검증 결과를 모았습니다.</p>
<nav class="project-sections" aria-label="프로젝트 바로가기">
{% for topic in site.data.project_topics %}
<a href="#{{ topic.id }}">{{ topic.menu_title }}</a>
{% endfor %}
</nav>
{% for topic in site.data.project_topics %}
{% assign topic_posts = all_projects | where: "project_topic", topic.id | sort: "project_order" %}
{% assign development_posts = topic_posts | where: "project_group", "development" %}
{% assign operations_posts = topic_posts | where: "project_group", "operations" %}
{% if topic_posts.size > 0 %}
<section id="{{ topic.id }}" class="project-section" aria-labelledby="{{ topic.id }}-title">
<header class="project-section__header">
<h2 id="{{ topic.id }}-title">{{ topic.title }}</h2>
<p>{{ topic.description }}</p>
</header>
{% if development_posts.size > 0 %}
<h3 id="{{ topic.id }}-development" class="project-section__type">개발 <span>{{ development_posts.size }}</span></h3>
<div class="project-grid">
{% for project_post in development_posts %}
{% include project-card.html project=project_post %}
{% endfor %}
</div>
{% endif %}
{% if operations_posts.size > 0 %}
<h3 id="{{ topic.id }}-operations" class="project-section__type">운영 <span>{{ operations_posts.size }}</span></h3>
<div class="project-grid">
{% for project_post in operations_posts %}
{% include project-card.html project=project_post %}
{% endfor %}
</div>
{% endif %}
</section>
{% endif %}
{% endfor %}
