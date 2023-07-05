---
layout: page.njk
title: Articles
tags: rootLink
---

{%- from "components/postInfo/macro.njk" import postInfo -%} {% for post in
collections.post | reverse %} {{ postInfo(post) }} {% endfor %}
