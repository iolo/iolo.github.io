---
title: Make HyperText Great Again! - HX
layout: post
date: 2024-12-28
tags: [htmx,hx]
icon: /files/hx-spiderman.png
---

[HTMX](https://htmx.org/) 라이브러리 자체는 전혀 새로울게 없었지만,
몇가지 추가적인 속성(`hx-get`, `hx-target`, `hx-select`, ...)을 통해
HyperText 시맨틱을 유지하면서 **페이지 부분 갱신** 지원한다는 아이디어는 솔깃했다.

간단한 예를 보면:
```html
<a href="/get" hx-get="/get" hx-target="#result" hx-select="#result">Get!</a>
<div id="result"></div>
```

자바스크립트를 쓸 수 있는 브라우저에서는
   1. `hx-get` 속성의 이름과 값에 따라, `GET /get` AJAX 요청을 보내고
   2. `hx-select` 속성에 따라, AJAX 응답(HTML)에서 `#result` 요소를 선택해서
   3. `hx-target` 속성에 따라, 현재 페이지의 `#result` 요소를 교체한다.

자바스크립트를 쓸 수 없는 브라우저에서는
`hx-*` 속성들을 무시되고, 일반적인 `<a>` 태그처럼 `GET /get`(`href` 속성)의 응답으로 전체 페이지가 교체된다.

폼 POST의 예를 보면:

```html
<form method="post" action="/post"
      hx-post="/post" hx-target="#result" hx-select="#result">
  <button type="submit">Post!</button>
</form>
<div id="result"></div>
```

`hx-post` 속성의 이름과 값에 따라, `POST /post` AJAX 요청을 보낸다는 것만 빼면 위와 같다.

HTMX에 추가된 여러가지 편리하지만 구질구질한 문법 설탕들을 제거하고,
핵심적인 아이디어만 직접 구현해보았다.
보다시피 전체 소스가 1.5K도 안된다:

```js
(function (w, d) {
  const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const DEF_TRIGGER_BY_TAG = {
    FORM: 'submit',
    INPUT: 'change',
    TEXTAREA: 'change',
  };
  const DEF_TRIGGER = 'click';
  const root = d.body;
  function getHxRequestAttrs(el) {
    const attrs = {
      trigger: el.getAttribute('hx-trigger') || DEF_TRIGGER_BY_TAG[el.tagName] || DEF_TRIGGER,
      method: 'GET',
      url: w.location.href,
      target: d.querySelector(el.getAttribute('hx-target')) || el,
      select: el.getAttribute('hx-select'),
      swap: el.getAttribute('hx-swap') || 'innerHTML',
    };
    for (const method of METHODS) {
      const url = el.getAttribute('hx-' + method);
      if (url) {
        attrs.method = method;
        attrs.url = url;
      }
    }
    return attrs;
  }
  const els = root.querySelectorAll('[hx-trigger],[hx-get],[hx-post],[hx-put],[hx-delete],[hx-patch]');
  for (const el of els) {
    const { trigger, method, url, target, select, swap } = getHxRequestAttrs(el);
    el.addEventListener(trigger, function (ev) {
      ev.preventDefault();
      fetch(url, { method, headers: { 'hx-request': true } })
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          target[swap] = doc.querySelector(select || 'body').innerHTML;
        });
    });
  }
})(window, document);
```

이름 짓기도 귀찮아서 [hx](https://github.com/iolo/hx/) - HTMX의 커스텀 속성 접두어다.
사용법은... README.md에도 써놓았고, 간단한 예제까지 만들어 두었다.

사소하지만 바꾸고 싶은 것들이 몇가지 있는데...
- `hx-get/post/...` 속성은 `hx-method="get" hx-href="..."` 처럼 두 개의 속성으로 분리
- `hx-swap` 속성은 `hx-replace`
- HTML 속성 접두어는 `hx`인데, DOM 이벤트와 CSS 접두어는 `htmx`? `hx`든 `htmx`든 하나만!

시각효과, 지연, 쓰로틀링 같은 문법 사탕들을 제거하고,
핵심적인 속성만 HTML 표준에 추가된다면 쓸모가 많을 듯.

<figure>
  <img src="/files/hx-spiderman.png">
  <figcaption>Make HyperText Great Again! - HX</figcaption>
</figure>

May the **HyperText** be with you...
