---
title: 구형 인텔 맥 + 엔비디아 + eGPU 삽질기
layout: post
date: 2023-05-01
---

이 삽질을 왜 시작하게 됐는지는 이제 중요하지 않다! 시작했으니 끝을 봐야지! 그러니까 삽질이지!

<figure>
  <img src="/files/sapzil-gogh.jpg">
  <figcaption>고흐(1889). 삽질하는 두 남자</figcaption>
</figure>

1. [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit)가 필요하다. 특히 [CUDA](https://en.wikipedia.org/wiki/CUDA)를 지원하는 [엔비디아 GPU](https://developer.nvidia.com/cuda-gpus)가 필요하다.
2. 당근에서 적당한 중고 [4090](https://www.nvidia.com/ko-kr/geforce/graphics-cards/40-series/rtx-4090/)을 찾아서 뒤적거리다가 상대적으로 저렴한(?) [MSI RTX 3090](https://www.msi.com/Graphics-Card/GeForce-RTX-3090-GAMING-X-TRIO-24G)을 업어왔다.
3. 그런데 이걸 어디에 꽂지? 난 PCIe 슬롯이 있는 데스크탑이 없는데?
4. 내가 쓸 수 있는 장비는 [2020 M1 MacBook Air](https://support.apple.com/kb/SP825)와 [2018 인텔 맥미니](https://support.apple.com/kb/SP782), [2013 연탄 맥프로](https://support.apple.com/kb/sp697)와 [2018 씽크패드 X1 카본 6세대](https://en.wikipedia.org/wiki/ThinkPad_X1_series#X1_Carbon_(6th_Gen)) 밖에 없다. 많지만, 쓸만한 건 하나도 없다. Orz
5. 뜻이 있는 곳에 길이 있다고, [eGPU](https://egpu.io/)라는 게 있더라.
6. 그러나 [최신 macOS는 NVIDIA eGPU를 지원하지 않는다](https://support.apple.com/HT208544)!
7. 다행히 [리눅스는 NVIDIA eGPU를 지원한다](https://developer.nvidia.com/blog/accelerating-machine-learning-on-a-linux-laptop-with-an-external-gpu/)! 리눅스 좋지! eGPU로 가자!
8. 당근에서 맥과 궁합이 좋다는 [Razor Core X](https://www.razer.com/kr-kr/gaming-egpus/razer-core-x) eGPU 인클로저를 업어오려고 했으나, 판매자의 변심으로 빡치고... 알리에서 [TH3P4G2](https://egpu.io/exp-gdc-th3p4g2-thunderbolt-gpu-dock-review/)를 사고, 당근에서 SFX 800W 파워를 업어오고, ... 저렴한 듯 저렴하지 않은 eGPU 인클로저를 만들었다.
9. 맥북은 M1이라 안되고, 2018 맥미니는 현역이라 안되고, 놀고 있던 2013 맥프로에 [우분투 22.04](https://releases.ubuntu.com/jammy/)를 설치했는데...
10. 그러나 2013 맥프로는 썬더볼트3가 아니라 썬더볼트2다. TH3P4G2 eGPU 인클로저는 썬더볼트3/4용이다. [애플의 양방향 썬더볼트 어댑터](https://support.apple.com/HT207266)가 있지만 비싸다. Orz
11. 다행히 나에겐 2018 맥미니가 있지! 어랏! 그 새 우분투 새 버전이 나왔네?! 예쁘다! 냉큼 [우분투 2023.04](https://releases.ubuntu.com/lunar/)를 설치 시작!
12. [2023.04에 추가된 새로운 인스톨러](https://ubuntu.com/blog/how-we-designed-the-new-ubuntu-desktop-installer)의 [버그](https://github.com/canonical/ubuntu-desktop-installer/issues/1772)를 밟고 헤매다, [리거시 데스크탑 인스톨러(iso)](https://cdimage.ubuntu.com/releases/lunar/release/ubuntu-23.04-desktop-legacy-amd64.iso)로 겨우 설치 성공! (했다고 착각)
13. 뭔가 설치할 때부터 불안불안하더니... eGPU는 고사하고 썬더볼트도 안잡히네?! [dmesg](https://tldp.org/LDP/LG/issue59/nazario.html)를 보니 에러가 가득. 삽질에 삽질을 거듭했으나... Orz
14. 아쉽지만 최신 버전은 포기하고 우분투 2022.04 다시 설치! ... 하면 될 줄 알았는데... 뒤져보니... 2018 맥미니에 처음이자 마지막으로 사용된 T2 칩이 문제. 오죽하면 [T2칩을 장착한 애플 장비를 위한 리눅스](https://t2linux.org/)같은 사이트가 있을까...
15. 다시 2013 맥프로! 왠만하면 피하고 싶었던 애플의 양방향 썬더볼트 어댑터를 사서 연결...하면 될 줄 알았지? 나의 야매 [TH3P4G2 eGPU 인클로저는 애플의 썬더볼트 어댑터를 지원하지 않는다](https://www.reddit.com/r/eGPU/comments/x8oecp/comment/injv2k4/)! Orz
16. 아... 여긴 어디? 난 누규?
17. 허탈한 마음으로 2013 맥미니에 윈도10 설치. 윈도11을 설치할까 1ms 고민했으나, 부트캠프에 "윈도10"이라고 버전까지 명시된 걸 보면 이유가 있겠지...
18. 엔비디아 드라이버 설치하고, 애플 소프트웨어 업데이트 다 하고, 윈도 업데이트 다 하고,... 짜잔! 잘되네! Orz
19. 혹시나 하는 마음으로 씽크패드에 엔비디아 드라이버 설치하고 eGPU를 연결해봤는데...
20. (나는 맨틀 아래까지 삽질을 했으나, 공간이 부족하여 적지 않는다)

TL;DR

- 맥OS는 공식적으로 인텔맥 + 특정 eGPU + 특정 인클로저만 지원. 최신 맥OS는 공식적으로 최신 NVIDIA 드라이버를 지원 안함. 몇가지 꼼수가 있으나 복불복. 무한 삽질 상시 대기 중.
- 2013 맥프로 + 리눅스: 소소한 삽질이 필요하지만 큰 문제는 없음. NVIDIA eGPU를 지원하지만, TH3P4G2 eGPU 인클로저는 썬더볼트 어댑터를 지원안함.
- 2018 맥미니 + 리눅스: T2 칩을 *제대로* 지원하지 않음. 무한 삽질 상시 대기 중.
- 2018 맥미니 + 윈도10: 잘 됨.
- 2018 씽크패드 + 윈도10: 그냥 잘 됨. 아주 잘 됨.
