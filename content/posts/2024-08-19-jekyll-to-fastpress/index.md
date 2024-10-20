---
title: Jekyll에서 Fastpress로 마이그레이션하기
layout: post
date: 2024-08-19
---

오랜만에 글을 하나 쓸까 싶어서 터미널을 열었는데,
그 동안 컴터와 OS가 바뀌어서 [Jekyll]이 설치되어 있지 않았다.

습관처럼 rbenv, ruby-build로 시작해서 bundler, jekyll, github-pages...을 설치하려고 했으나...
역시나 ruby는 한 번에 되는 법이 없다.

이래저래 삽질하다가 잘 안되서,
[요즘은 어떤 정적 사이트 생성기가 대세인가](https://jamstack.org/generators/) 살펴보려다
맨 위에 있는 [Next.js](https://nextjs.org/)를 보고 흠칫! 놀라서 후다닥! 탭을 닫았다.

새로 만들까 잠시 고민했지만,
예전에 만들다만 [Fastpress]를 가져다가 [Jekyll] 마이그레이션만 할 수 있도록 대충 뜯어고쳤다.

* 사이트 소스 준비
  - content: 변환될 파일들(.md, .scss 등)
  - layout: 레이아웃 파일들([ejs](https://ejs.co/))
  - static: 그냥 복사될 정적 파일들(css, js, img 등)
  - config.js: 설정 파일

* 정적 사이트 생성하기
```console
$ npx fastpress build
```

* 로컬에서 미리보기
```console
$ npx serve out
```

* [GitHub Pages] 배포하기
```console
$ npx gh-pages -d out
```

안녕 [Jekyll]... 그동안 고마웠어... 다신 만나지 말자.

.

.

.

그런데... 무슨 글을 쓰려고 했더라???

---
[Jekyll]: https://jekyllrb.com/
[Fastpress]: https://github.com/iolo/fastpress/
[GitHub Pages]: https://pages.github.com/

