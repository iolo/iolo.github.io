---
title: "Spring Boot + Thymeleaf + HTMX"
layout: post
date: 2024-12-30
tags: [htmx,spring]
---

지난 [2024 제주 웹 컨퍼런스](https://jejuweb.kr/) 발표 당일,
근처의 스타벅스에서 발표 자료를 마무리하다가
너무 허접 T.T 간단한 데모라도 넣어야겠다 싶어서
제일 만만한 [Spring Initializr](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.4.1&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=demo&name=demo&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.demo&dependencies=htmx)를 열었는데...

어라랏! 방금 just now! HTMX 지원이 추가된거다!!

<figure>
<img src="/files/htmx-spring-boot.png">
</figure>

핵심은 [htmx-spring-boot](https://github.com/wimdeblauwe/htmx-spring-boot/) 모듈이다.

- 스프링 웹 컨트롤러에 쓸 수 있는 애너테이션들과 뷰 클래스들,
- 스프링 시큐리티에 쓸 수 있는 인증 클래스(AuthenticationEntrypoint),
- [Thymeleaf](https://www.thymeleaf.org/)에 쓸 수 있는 커스템 속성들(Dialect)

후다닥 화면 녹화 영상을 만들었다:

<figure>
<iframe width="560" height="315" src="https://www.youtube.com/embed/RxkdfzCWyYI?si=SGJV1KMQ00jBxrGI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</figure>

백엔드는 JSON 응답만 내뱉는 존재로 전락한지 오래고...
스프링 부트는 처음부터 JSP 없는 톰캣을 내장했고,
[Velocity](https://velocity.apache.org/)는 오래전에 스프링 지원 목록에서 빠졌고,
서버 사이드 템플릿(Thymeleaf, Jinja2, Mustache, ...)을 쓴다고 하면 구닥다리 레거시 고인물 취급받는 시대에...
하이퍼텍스트고 나발이고 다 부질없는 소리겠지만...

봄날은 생각보다 오래 가더라... 