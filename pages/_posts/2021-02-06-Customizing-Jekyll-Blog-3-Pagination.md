---
category: Jekyll
tags: ['Pagination']
title: Jekyll 블로그 커스터마이징 (3) Pagination in Category
---

블로그에 포스팅 하는 경우 카테고리를 지정하기는 하지만 모든 페이지가 하나로 묶여있다.

그래서 Jekyll이 제공하는 `page.next` 또는 `page.previous`를 사용하는 경우 카테고리와 무관하게 다음 날짜와 이전 날짜의 페이지를 가져오게 된다.
처음에는 그 변수를 사용했는데, 아무래도 포스팅을 카테고리 별로 나눠서 올릴 리가 없으니 불편할 것 같았다.
그래서 페이지 이동을 같은 카테고리 안에 있는 페이지로만 이동하도록 수정했다.

> 더 좋은 방법이 있을 수도 있지만, 우선 나는 이렇게 해결했다.

<br>

## 1) 다음 페이지와 이전 페이지의 인덱스 구하기

liquid에는 for문의 현재 index를 구할 수 있는 `forloop` 오브젝트의 `index`와 `index0` 속성이 있었다.

차이는 `index`는 `1`부터 시작하고 `index0`는 `0`부터 시작한다는 점이었다.

이를 이용하면 현재 index(이건 0부터 시작)를 기준으로 다음 페이지의 인덱스는 `forloop.index0 - 1`, 이전 페이지의 인덱스는 `forloop.index` 이므로 각각 `nextIdx`와 `prevIdx` 변수에 할당했다.

```liquid
{%- raw -%}
{%- assign group = site.categories[page.category] -%}
{%- for article in group -%}
  {%- if article.title == page.title -%}
    {%- assign nextIdx = forloop.index0 | minus:1 -%}
    {%- assign prevIdx = forloop.index -%}
    {%- break -%}
  {%- endif -%}
{%- endfor -%}
{% endraw %}
```

> 참고: [(Shopify) Liquid - forloop](https://shopify.dev/docs/themes/liquid/reference/objects/for-loops)

<br>


## 2) 인덱스를 이용해 해당 페이지 가져오기

`site.categories.CATEGORY`는 특정 카테고리에 속하는 페이지들의 집합인데 인덱스를 사용해서 접근할 수 있는데, 인덱스가 루프 구조인 듯 하다. 그래서 음수의 인덱스를 주는 경우 반대 방향에서 페이지를 가져오고 사이즈를 초과하는 인덱스를 주는 경우에는 다시 처음으로 돌아가서 페이지를 반환했다.

나는 pagination을 루프 구조로 만들 생각이 없었으므로, 각각 `prevIdx < group.size`, `nextIdx >= 0` 조건을 주어서 시작 페이지와 마지막 페이지에서 끝내도록 만들었다.

```liquid
{%- raw -%}
<nav class="pagination">
  <div class="pagination__previous">
    {%- if prevIdx < group.size -%}
      <span>Previous</span>
      <a href="{{ group[prevIdx].url }}" class="pagination__page">{{ group[prevIdx].title }}</a>
    {% endif %}
  </div>
  <div class="pagination__next">
    {%- if nextIdx >= 0 -%}
      <span>Next</span>
      <a href="{{ group[nextIdx].url }}" class="pagination__page">{{ group[nextIdx].title }}</a>
    {% endif %}
  </div>
</nav>
{% endraw %}
```

<br>

생각보다 쉽게 해결 가능했다.
