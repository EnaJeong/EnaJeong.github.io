---
category: Jekyll
title: Jekyll 블로그 커스터마이징 (1) Base
---

우선 무리없이 포스팅을 할 수 있을 정도의 커스터마이징을 마쳤다.

> 지금 만들어놓은 코드들이 괜찮은 코드들인지 사실 잘 모르겠지만 그래도 원하는 대로 구현은 되었다...

<br>

딱 원하는 테마를 찾는 게 힘들어서 그냥 테마 없이 시작해서 지킬 튜토리얼부터 차근차근 시작했다. 처음 하얀 화면에 글씨만 적혀있었을 때는 마냥 막막하기만 했는데, 이래저래 완성하고 나니 직접 만들길 잘한 것 같다. 일단 내가 짠 코드들이라서 유지보수도 쉽고 변화를 주고 싶을 때 쉽게 쉽게 바꿀 수 있다는 점이 제일 큰 장점인 것 같다.

하지만 프론트엔드 쪽은 너무 무지해서 고생을 많이 한 관계로 미래의 나를 위해 기록을 남겨놓기로 했다.

<br>

> **기본 참고 사이트**
>
> - [Jekyll](https://jekyllrb-ko.github.io/)
> - [Liquid](https://shopify.github.io/liquid/)
> - [w3schools](https://www.w3schools.com/) :star: :star: :star: :star: :star:
>
> 이외에도 구글링을 통해  보았던 많은 stackoverflow 질문과 답변들....

<br>


## 메인 테마

우선 기본적으로 어두운 테마로 만들고 싶었다.

배경색은 Atom의 One Dark에서 차용했고, 민트색을 테마 색으로 잡았다.

> 매우 곳곳에서 테마색을 사용하고 있다

<br>

### Favicon

처음 만들었을 때, 상단의 특징없는 지구본 아이콘을 보니 파비콘을 설정하고 싶어졌다.

> 이미지는 매우 고민했지만 결국 동백꽃으로 정했고, 무료 이미지를 조금 바꿔서 사용했으니 저작권 문제는 없다고 본다.
>
> ![favicon](/favicon.ico)

이미지를 정한 후에는 [RealFaviconGenerator](https://realfavicongenerator.net/) 라는 사이트를 이용해 매우 쉽게 파비콘을 적용할 수 있었다.

운영체제 별로 조정할 수도 있었고, html에 추가해야할 코드까지 만들어주기 때문에 그대로 가져다 사용하면 된다.

<br>

### Font

폰트는 [Google Font](https://fonts.google.com/)에서 제공하는 무료 폰트를 사용했다.

Google Font 역시 매우 친절해서, 원하는 폰트들을 선택하면 어떻게 html에 추가하고 CSS에서 사용하는지 모두 알려준다.

폰트는 가독성을 중점적으로 생각해서 골랐고, 처음에는 한 두 개만 추가할 생각이었는데... 결국 5종류의 폰트를 사용하게 되었다.

```scss
$font-family: (
  base: ('Roboto', 'Noto Sans KR', sans-serif),
  code: (Consolas, 'Nanum Gothic Coding', monospace),
  title: ('Roboto Slab', 'Nanum Myeongjo', serif),
);
```

<br>


## 기본 레이아웃

기본 레이아웃을 잡을 때, 웹에서만이 아니라 모바일이나 다른 환경도 고려해야 한다는 것을 알게되었다.
나는 어마어마한 걸 만들 계획은 없고 기본적인 것만 잘 보여지면 되기 때문에, 유연하게 조절해 주는 <u>Flexbox Layout</u>을 주로 사용했다.

> 알아서 정렬 맞춰주고, 화면 너비에 따라 조절해 주니 너무너무 편하게 구현 가능했다.
>
> 주로 라고 했지만, 거의 다라고 봐도 무방하다. 디자인적으로 다양한 배치가 필요하지 않는 경우 flexbox만으로 모든 구성이 가능했다.
> 지금 보니 아직까지는 float나 grid layout을 한 번도 사용하지 않았는데, 특별히 필요하지도 않았다...
>
> 이 부분에선 [w3schools - Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)의 도움을 매우 많이 받았다.

<br>

하지만 웹에서 맞추고 commit 했다가 모바일로 보니 생각과 다른 경우가 있었고, 결국 <u>Media Query</u> 사용이 필수라는 걸 느꼈다.

> 참고: [w3schools - Media Query](https://www.w3schools.com/css/css3_mediaqueries.asp)

<br>


## CSS 스타일

기본 틀을 잡고 header와 footer까지 만든 후, html 요소들의 기본 디자인을 시작했다.

정확하게는 시작하려고 했지만, 어디서부터 시작해야할까 하고 다른 테마들을 살펴보았다.

<br>

### 브라우저 기본 스타일 초기화

사이트들이 공통적으로 'reset.css'를 가지고 있다는 것을 발견했다.

> 이것도 모를 정도로 프론트엔드에 무지하다...

<br>

우선, 이러한 과정이 필요한 이유는 브라우저마다 가지고 있는 기본 스타일이 다르기 때문에 차이를 없애기 위해서라고 한다.

사람들이 많이 사용하는 (이미 누군가에 의해 구현되어 있는) 파일들이 있었다.

> [Eric Meyer's "Reset CSS" 2.0](http://meyerweb.com/eric/tools/css/reset/)
>
> [HTML5 Doctor CSS Reset](http://html5doctor.com/html-5-reset-stylesheet/)
>
> [Normalize.css 1.0](https://github.com/necolas/normalize.css)

나에게는 별반 차이가 없어서 "normalize.css" 써보기로 했다.

<br>

### 기본 스타일 커스터마이징

내가 이미 작성한 포스팅들은 모두 markdown을 이용했고, 앞으로도 그럴 예정이기 때문에 마크다운 문법에 있는 기본 항목들을 하나씩 넣어본 테스트 파일을 생성했다. 그 파일에 있는 요소들을 기반으로 기본 스타일을 잡아 주고, 고려하지 못한 요소들을 발견하면 추가하는 식으로 커스터마이징을 진행했다.

> [Test Page](/jekyll/2020/12/31/Theme-Test.html)
>
> 이제는 굳이 남겨놓을 이유가 없기는 하지만 기념 겸 작년 날짜로 지정해서 남겨두기로 했다.

<br>

### 파일 구성

`main.scss` 파일을 하나 생성하고 거기에 요소별로 쪼갠 파일들을 합쳐놓았다.

아직까지는 크게 4가지로 분류된다.

- `main theme`: 기본 색상 정의

- `base`: 공통 변수, 초기화, 기본 스타일

- `components`: 화면 구성 요소 스타일

- `layout`: 레이아웃 별 스타일

```scss
/* main theme*/
@import "theme/theme";
@import "theme/highlight";

/* base */
@import "base/variables";
@import "base/normalize";
@import "base/base";

/* components */
@import "base/content";
@import "base/header";
@import "base/footer";

/* layout */
@import "layout/404";
@import "layout/home";
@import "layout/post";
@import "layout/archive";
```


<br>

### 참고

- [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/): header navigation에 마우스를 가져다대면 밑줄이 나타나는 효과

<br>


## 블로그 아카이브

우선 포스팅을 할 때 페이지마다 최대 하나의 카테고리만 넣을 예정이고, 카테고리 별로 구분해서 볼 수 있기를 원했다.

기존에 사용하려고 찾아보았던 테마 중 [TeXt Theme](https://tianqi.name/jekyll-TeXt-theme/archive.html)의 아카이브 구성이 마음에 들었어서, 거기에서 모티브를 얻어 만들었다.

특정 이벤트가 발생했을 때 CSS 스타일을 변경하고 싶은 경우에, 스타일을 변경하고 싶은 요소의 `class` 속성을 바꾸고 CSS로 해당 속성값을 이용해 디자인을 바꿔주는 방식을 w3schools을 통해 알게되었고 이를 적용해 보기로 했다.

> 더 좋은 방법이 있을 수도 있지만, 우선 내가 아는 한에서 이렇게 만들어 보았다.

<br>

### Category와 Post 목록

`All` 버튼과 카테고리별 버튼을 생성하고 `data-category` 속성을 추가해 카테고리를 넣어주었다.

```html
{%- raw -%}
{% assign site_categories = site.posts | map: "category" | compact | uniq %}
<section class="archive__category">
  <ul class="categories">
    <li>
      <button type="button" class="category-button focused" onClick="Archive.changeState('all')" data-category="all">All</button>
    </li>
    {%- for site_category in site_categories -%}
    {%- assign _encoded = site_category | url_encode -%}
      <li>
        <button type="button" class="category-button" onClick="Archive.changeState('{{ _encoded }}')" data-category="{{ _encoded }}">
          {{ site_category }}
        </button>
      </li>
    {%- endfor -%}
  </ul>
</section>
{% endraw %}
```

포스트의 경우 연도별로 구분되게끔 만들었으며, 마찬가지로 `data-category` 속성을 추가해 카테고리를 넣어주었다.

```html
{%- raw -%}
<section class="archive__posts">
  {% assign post_years = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
  {% for year in post_years %}
    <div class="archive-group" data-group="{{ year.name }}">
      <h3 id="archive-{{ year.name }}" class="archive-group-name">{{ year.name }}</h3>
      <ul>
        {% for post in year.items %}
          <li class="archive-post" data-category="{{ post.category | url_encode }}">
            <span>{{ post.date | date: "%b %d" }}</span>
            <a href="{{ post.url }}">{{ post.title }}</a>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</section>
{% endraw %}
```

<br>

### Post의 Class를 바꿔주는 함수 추가

카테고리 버튼을 클릭하면 다음과 같은 함수가 실행되도록 연결해 주었다.

동작은 간단하다. 전달받은 인자가 `All`인 경우에는 `class`가 `not-included` 요소들에서 `not-included`를 없애고, 특정 카테고리인 경우에는 `data-category` 속성값이 해당 카테고리가 아닌 요소들과 포스트가 없는 연도의 `class`에 `not-included`를 추가해준다. 그리고 클릭했던 카테고리 버튼이 현재 선택된 카테고리라고 표시하기 위해 `class`에 `focused`를 추가하고, 이전에 선택했던 버튼의 `class`에서 `focused`를 제거해준다.

```javascript
const Archive = {
  lastFocusedBtn : document.querySelector(".category-button[data-category=all]"),

  changeState(category) {
    let btn = document.querySelector(`.category-button[data-category='${category}']`);

    if (Archive.lastFocusedBtn == btn){
      return;
    }

    Archive.lastFocusedBtn.className = "category-button";
    btn.className = "category-button focused";
    Archive.lastFocusedBtn = btn;

    switch (category) {
      case 'all': {
        Archive.viewAll();
        break;
      }
      default: {
        Archive.viewSome(category);
      }
    }
  },

  viewAll(){
    let doc = document;

    let posts = doc.querySelectorAll(".archive-post.not-included");
    for (let i=0, n=posts.length; i < n; i++){
      posts[i].className = "archive-post";
    }

    let groupNames = doc.querySelectorAll(".archive-group-name.not-included");
    for (let i=0, n=groupNames.length; i < n; i++){
      groupNames[i].className = "archive-group-name";
    }
  },

  viewSome(category){
    let doc = document;

    let posts = doc.querySelectorAll(".archive-post");
    for (let i=0, n=posts.length; i < n; i++){
      if (posts[i].getAttribute('data-category') != category){
        posts[i].className = "archive-post not-included";
      } else {
        posts[i].className = "archive-post";
      }
    }

    let groups = doc.querySelectorAll(".archive-group");
    for (let i=0, n=groups.length; i < n; i++){
      let groupId = "archive-" + groups[i].getAttribute('data-group');
      let groupName = doc.getElementById(groupId);

      let posts = groups[i].querySelectorAll(".archive-post:not(.not-included)");
      if (posts.length == 0) {
        groupName.className = "archive-group-name not-included";
      } else {
        groupName.className = "archive-group-name";
      }
    }
  }
};
```

<br>

### SCSS 파일에서 `not-included` 클래스인 요소들 안 보이게 설정

`_base.scss`파일에 다음과 같이 적용해 주었다.

```scss
.not-included {display: none;}
```

추가로 class가 `.focused`인 버튼이 클릭했을 때의 상태를 유지할 수 있도록 같은 스타일을 적용해 주었다.

```scss
button {
  &:focus, &.focused {
    color: $button-background-color;
    background-color: $theme-color;
    border-color: $theme-color;
  }
}
```

> `.not-included`의 경우 처음에는 archive에서만 적용되도록 만들었다가 공통으로 활용이 가능하므로 기본 속성으로 옮겼다.

<br>


### 페이지에서 해당 카테고리로 목록으로 이동

페이지 하단에 해당 포스트의 카테고리와 태그가 보여지게끔 구성했다.

이때 카테고리를 클릭하면 카테고리 목록을 보여주는 게 좋을 것 같아서 링크를 연결하기로 했다.

링크는 해시태그를 사용하기로 했고, 이에 따라 처음 아카이브 페이지에 접속할 때 해시태그를 처리해주어야 했다. 해시태그를 읽어서 해당 카테고리 버튼이 있다면, 위에서 만든 `Archive.changeState` 함수를 호출하게끔 추가해 주었다.

```javascript
(function(){
  let hash = window.location.hash.substr(1);
  if (hash != ""){
    let btn = document.querySelector(`.category-button[data-category='${hash}']`);
    if (btn) {
      Archive.changeState(hash);
    }
  }
})();
```

<br>


## 이슈사항

> 거의 stackoverflow의 도움으로 해결...

### Safari 이슈사항

Chrome에서 열심히 맞추고 아이폰에서 열어봤더니, 생각지 못한 버그들이 생기는 경우가 있었다.

아직까지는 크게 두 가지.

<br>

1) <u>Flexbox 레이아웃에서 flex-direction이 column일 때, flex-item들의 기본 flex-shrink 값이 1인 이슈</u>

이게 무슨 의미냐면, 크롬에서 순서대로 예쁘게 보여지던 페이지가 사파리에서는 아래로 스크롤이 확장되지 않고 화면 높이에 맞춰 flex-item들이 중첩되어 있는 것을 보게 될 것이란 의미이다. 자동으로 줄어들면 안되는 item이 줄어들어서 생기는 이슈였다.

이는 flex-item의 default flex-shrink 값이 1이기 때문에 발생하는 문제로, flex-shrink를 0으로 설정하니 해결됐다.

```
flex-shrink: 0;
```

<br>

2) <u>Border가 둥글 때, 'overflow: hidden'이 정상동작하지 않는 이슈</u>

이는 border가 둥근 경우에 border의 밖으로 나가는 자식 요소들이 가려져야 하는데, 그대로 노출되는 이슈이다.

다른 사람들 말에 의하면 오래된 known issue라고 한다. 왜 안 고치는 것일까.......

이 이슈는 'overflow: hidden'을 주고 싶은 요소에 다음과 같이 둥글게 마스크 씌워서 해결할 수 있었다.

```
-webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);
```

<br>


## 기본 블로그 완성 및 남은 할 일

여기까지 이렇게 해서 블로그의 기본 기능인 포스팅하고 카테고리 별로 포스트를 구분하는 기능까지 완성했다.

그리고 다음과 같은 일들이 추가로 남아있다.

- Collection 만들기 (내 블로그의 Notes)
- toc 추가
- 코드 highlighter 변경

<br>

이건 할지 안 할지 모르지만 일단 적어두는 추가하지 않은 기능

- *검색 가능...?*
- ~~*댓글 기능을 추가...?*~~
