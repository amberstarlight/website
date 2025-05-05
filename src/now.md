---
layout: now.njk
title: Now
tags: rootLink
---

{% set page = collections.now | reverse | first %}
{{ page.templateContent | safe }}
