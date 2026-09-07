---
title: 정체성 위기 - 읽기 좋은 코드와 좋은 코드
layout: post
date: 2026-09-07
tags: [retro, apple2]
---

<figure>
  <img src="/files/identity-crisis.jpg">
  <figcaption>Happy Mac by Susan Kare</figcaption>
</figure>

애플2 디스코드 채널에서 누군가가 [애플소프트 베이직](https://en.wikipedia.org/wiki/Applesoft_BASIC) 코드를 공유했다.

애플소프트베이직으로 작성된 2라인 프로그램 [Identify Crisis](https://www.apple2programs.com/programs/2024/03/19/identity-crisis.html)
을 **읽기 좋게** 고쳤단다.

```
0 A$ = "2D40D030F0602@209010@0109010@0109010@010B0103020203010B0103020203010<010707010<010707010<0106170109010@010?01040305010<0105360109010@0109010@010602@2030F030F030F030F09011952030F030F030F030F01F40D040D040D01F"

10 P = 1
20 HGR2
30 HCOLOR = 6
40 HPLOT 0 , 0 : CALL -3082
50 FOR Y = 31 TO 62
60 C = 4
70 I = ASC(MID$(A$,P,1))-48
80 J = INT( I / 3 )
90 X = 114 + ( I - J * 3 ) * 2
100 FOR M = P TO P + J * 2
110 HCOLOR = C
120 C = 11 - C
130 S = 2 * (ASC(MID$(A$,M+1,1))-47)
140 HPLOT X , Y * 2 TO X+S-1 , Y * 2
150 HPLOT X , Y * 2 + 1 TO X+S-1 , Y * 2 + 1
160 X = X + S
170 P = P + 1
180 NEXT M
190 P = P + 1
200 NEXT Y
210 END
```

뭐가 읽기 좋아졌다는 거지?? 줄바꿈(코드 포매팅만)만 바꾼다고 읽기 좋은 코드가 되는 건 아니다.

이 코드의 핵심은 **첫번째 줄의 난해한 문자열**이다.

```
2D40D030F0602@209010@0109010@0109010@010B0103020203010B0103020203010<010707010<010707010<0106170109010@010?01040305010<0105360109010@0109010@010602@2030F030F030F030F09011952030F030F030F030F01F40D040D040D01F
```

[ChatGPT의 도움을 받아 분석](https://chatgpt.com/share/6a9e0fd0-6ec0-83e8-a4a3-7c551ad98602)했다.

TL;DR 베이직으로 구현한 RLE(run-length encoding)!

문자열(`A$`)의 의미는 다음과 같다:

```
A$ =
    32 scanlines of compressed Happy Mac bitmap

per scanline:
    header:
        start-X offset
        number of alternating runs

    runs:
        lengths of BLACK, WHITE, BLACK, WHITE, ...
```

난해한 문자열을 구조적인 데이터로 해체하면 읽기 좋은 **교육용 코드**가 나오겠지만,
그 코드는 좋은 코드일까?

이 프로그램은 애초에 읽기 좋으라고 만든 프로그램이 아니다.
이 프로그램의 의도는 *최소한의 코드*(512바이트 이내)로 Happy Mac을 그리는 것이다.
이 프로그램은 읽기 좋은 코드는 아니지만, 의도를 잘 드러내는 좋은 코드다.

[개발자의 원칙](http://product.kyobobook.co.kr/detail/S000214054310)에서 **읽기 좋은 코드가 좋은 코드**라고 썼는데... 혹시라도 개정판을 낼 기회가 있다면(없겠지만), 이렇게 고쳐야겠다:

> 읽기 좋은 코드가 좋은 코드다.
>
> 읽기 좋은 코드보다 더 좋은 코드는 "의도를 잘 드러내는 코드"다.

**뽀나스** 위의 코드에서 첫번째 줄을 이렇게 바꿔서 실행해보자.

```
0 A$="0O6E03033I046B02073D099;4900019:041226690729690?03<90901020266650:666906366A34:?32>=32>=31@<31@<6030=;30B;6020>;6020>;6020>;30B;6030=;31@<6140:<32>=32>=34:?366A0O"
```


