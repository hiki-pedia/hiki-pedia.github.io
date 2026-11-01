---
title: "프로젝트"
layout: archive
permalink: /projects/
classes:
  - projects-page
sidebar:
  nav: "docs"
---

{% assign all_projects = site.categories.projects | where_exp: "post", "post.hidden != true" %}
{% assign personal_projects = all_projects | where: "project_group", "personal" | sort: "project_order" | reverse %}
{% assign school_projects = all_projects | where: "project_group", "school" | sort: "project_order" | reverse %}

<p class="projects-intro">구현한 내용과 문제를 해결한 과정을 프로젝트별로 정리했습니다.</p>
<nav class="project-sections" aria-label="프로젝트 분류">
  <a href="#personal-projects">개인 프로젝트 <span>{{ personal_projects.size }}</span></a>
  <a href="#academic-projects">학업 프로젝트 <span>{{ school_projects.size }}</span></a>
</nav>

{% if personal_projects.size > 0 %}
  <section id="personal-projects" class="project-section" aria-labelledby="personal-projects-title">
    <header class="project-section__header">
      <h2 id="personal-projects-title">개인 프로젝트 <span>{{ personal_projects.size }}</span></h2>
      <p>직접 기획하고 구축한 프로젝트입니다.</p>
    </header>
    <div class="project-grid project-grid--personal">
      {% for project_post in personal_projects %}
        {% include project-card.html project=project_post %}
      {% endfor %}
    </div>
  </section>
{% endif %}

{% if school_projects.size > 0 %}
  <section id="academic-projects" class="project-section" aria-labelledby="academic-projects-title">
    <header class="project-section__header">
      <h2 id="academic-projects-title">학업 프로젝트 <span>{{ school_projects.size }}</span></h2>
      <p>수업과 캡스톤 과정에서 수행한 프로젝트입니다.</p>
    </header>
    <div class="project-grid">
      {% for project_post in school_projects %}
        {% include project-card.html project=project_post %}
      {% endfor %}
    </div>
  </section>
{% endif %}
