---
title: 블로그 양털깍기에 대한 변명
---

백수가 된 기념으로 깃헙 페이지로 블로그 셋업하다가...
저번에도 이러다 말았던 이유가 생각났다.
다음엔 이러지 말자고 다짐하며, [의식의 흐름](https://ko.wikipedia.org/wiki/%EC%9D%98%EC%8B%9D%EC%9D%98_%ED%9D%90%EB%A6%84)을 기록해 본다:

1. [깃헙](https://github.com/)에 그냥 HTML을 올리고 [Pages 옵션](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)을 켠다. 잘 된다. 그런데 마크업 너무 귀찮.... [마크다운](https://daringfireball.net/projects/markdown/)이 필요하다! (삽질은 언제나 사소한 이유로 시작된다)
1. [깃헙페이지](https://pages.github.com/)가 기본으로 지원하는 [jekyll](https://jekyllrb.com/)을 셋업한다. [ruby](https://www.ruby-lang.org/)와 [gem](https://guides.rubygems.org/)과 [nokogiri](https://nokogiri.org/) 삽질은 언제쯤 없어질려나... 달라진 건 저번엔 [rubyenv](https://github.com/rbenv/rbenv)였는데, 이번엔 [chruby](https://github.com/postmodern/chruby)라는 정도?
1. 기본 테마 [minima](https://github.com/jekyll/minima)가 전혀 minimal하지 않아서 눈에 밟힌다. [jekyll 테마](https://jamstackthemes.dev/ssg/jekyll/) 찾아 삼만리...
1. 결국 minimal한 [커스텀 테마](https://jekyllrb.com/docs/themes/) 만들기 시작한다. 어색한 [liquid](https://shopify.github.io/liquid/) 문법 어쩔...
1. 다른 [정적 사이트 생성기](https://jamstack.org/generators/)를 찾아 해멘다. [hexo](https://hexo.io/), [hugo](https://gohugo.io/), [gatsby](https://www.gatsbyjs.com/)를 거쳐 [next.js](https://nextjs.org/)(저번에는 [vuepress](https://vuepress.vuejs.org/)였다)가 등장하면 아뿔사! 또 옆길로 샜네. Orz
1. 결국 DIY minimal한 정적 사이트 생성기 만들기 시작한다. 이름 하여 [fastpress](https://github.com/iolo/fastpress)(이 글을 쓰다가 뒤져 보니.. [저번에 만들다 만 것](https://github.com/iolo/sapsalgae)도 있네)
1. DIY 정적 사이트 생성기에 페이징과 태깅 기능을 추가하다가... 문득! 이럴거면 데이터베이스 쓰는게 더 편하지 않나?
1. 결국 DIY minimal한 CMS(이라고 쓰고 게시판이라고 읽는다) 만들기 시작한다. 시작은 가볍게 터미널에서 [Node.js](https://nodejs.org/)/[Express.js](https://expressjs.com)... 이 정도는 [alacritty](https://alacritty.org/)와 [tmux](https://github.com/tmux/tmux)와 [vim](https://www.vim.org/)이면 충분하지!
1. [Typescript](https://www.typescriptlang.org/)를 거쳐 [TypeORM](https://typeorm.io/)과 [Nestjs](https://nestjs.com/)가 등장하면.... 아.. [Webstorm](https://www.jetbrains.com/webstorm/) 띄워야겠다. 어 Jetbrains IDE들 업뎃안한지 오래됐네... 아뿔사! 또 옆길로 샜네. Orz
1. 이렇게까지 할거면 [Java](https://www.java.com/)/[Spring](https://spring.io/)으로 하지...  일단 [IntelliJ IDEA](https://www.jetbrains.com/idea/)를 띄우고, [Spring Boot](https://start.spring.io/) 프로젝트를 만들고... 흠... [Spring Data JDBC](https://spring.io/projects/spring-data-jdbc)면 충분할까? 역시 [JPA](https://spring.io/projects/spring-data-jpa)? minimal하게 [JdbcTemplate](https://spring.io/guides/gs/relational-data-access/) 쓰자!
1. 엇! [Kotlin](https://kotlinlang.org/) 플러그인이 업뎃됐네... 우어!! [Kotlin 버전이 언제 이렇게 올라갔지? 오! 엄청 좋아졌네! 역시 [코프링](https://kotlinlang.org/docs/jvm-get-started-spring-boot.html)이 좋겠지?
1. 흠... 코틀린은 [gradle](https://gradle.org/)이 편한데.. [maven](https://maven.apache.org/)을 gradle로 바꿔야지... 아뿔사! 또 옆길로 샜네. Orz
1. 흠... 조금만 손보면 범용 CMS 만들 수 있겠다. 일단 퍼시스턴스 계층을 추상화해서... 이렇게 저렇게... 조물락 조물락...
1. 흠... 파일이 많아졌네. 디렉토리를 정리해야겠다. 디렉토리를 어떻게 구성할까? 기능? 계층? 둘다? 뭘 상위 디렉토리로 하지? 역시 디렉토리 이름을 명시적으로 `port`, `adapter`로 하는 좋겠지? 중얼중얼.. 타닥타닥...
1. 흠... 역시 인터페이스와 구현체는 분리해야겠다. 인터페이스에 `I` 접두사를 붙일까 구현체에 `Impl` 접미사를 붙일까? 역시 바로 `implements`하지말고 `abstract`로 `Base` 구현체를 만들고 그걸 상속해서 `Default`구현체를 만들어야겠지? 중얼 중얼... 타닥타닥...
1. 여긴 어디? 난 누규?! 흠... 역시 그냥 서비스 써야겠다. 티스토리? 워드프레스? 미디엄? 브런치? 요즘도 [dev.to](https://dev.io/) 많이 쓰나? 어랏.. 여기 이미 [만들어 놓은 것](https://dev.to/iolo)도 있네.. Orz
1. 너무 멀리 가지마. 모든 걸 삼킬지 몰라...

[![신경망을 훈련시켰어요](/files/trained_a_neural_net.png)](https://xkcd.com/2173/)

