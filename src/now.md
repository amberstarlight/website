---
layout: now.njk
title: Now
tags: rootLink
---

{% set page = collections.now | reverse | first %}

<b>Last Updated:</b> {% niceDate page.date %}

{{ page.templateContent | safe }}

<h2>hello</h2>
