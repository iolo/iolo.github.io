---
title: AI와 함께 춤을 - 태양계편
layout: post
date: 2024-10-20
tags: [ai,javascript]
---
웹 서핑을 하다가... 문득... AI로 그림책 같은걸 만들어보면 좋겠다는 생각이 들었다.

[Claude.ai](https://claude.ai)로 태양계 그림책을 만들기 시작했다. 명왕성을 뺏길래... 불쌍하니 넣어달라고 했다. 마지막 페이지에서 태양계 전체를 조망하는 그림이 있으면 좋겠다고 했더니... 어랏! 이 녀석이 뜬금없이 svg 코드를 뱉어내는거다.

Claude 3.5 Sonnet이 그린 태양계 그림:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <!-- 태양 -->
  <circle cx="50" cy="200" r="40" fill="yellow"/>
  
  <!-- 행성 궤도 -->
  <circle cx="50" cy="200" r="60" fill="none" stroke="#ddd" stroke-width="1"/>
  <circle cx="50" cy="200" r="90" fill="none" stroke="#ddd" stroke-width="1"/>
  <circle cx="50" cy="200" r="120" fill="none" stroke="#ddd" stroke-width="1"/>
  <circle cx="50" cy="200" r="160" fill="none" stroke="#ddd" stroke-width="1"/>
  <circle cx="50" cy="200" r="220" fill="none" stroke="#ddd" stroke-width="1"/>
  <circle cx="50" cy="200" r="300" fill="none" stroke="#ddd" stroke-width="1"/>
  <circle cx="50" cy="200" r="380" fill="none" stroke="#ddd" stroke-width="1"/>
  <circle cx="50" cy="200" r="450" fill="none" stroke="#ddd" stroke-width="1"/>
  
  <!-- 행성들 -->
  <circle cx="110" cy="200" r="5" fill="brown"/> <!-- 수성 -->
  <circle cx="140" cy="200" r="8" fill="orange"/> <!-- 금성 -->
  <circle cx="170" cy="200" r="9" fill="blue"/> <!-- 지구 -->
  <circle cx="210" cy="200" r="7" fill="red"/> <!-- 화성 -->
  <circle cx="270" cy="200" r="20" fill="sandybrown"/> <!-- 목성 -->
  <circle cx="350" cy="200" r="17" fill="goldenrod"/> <!-- 토성 -->
  <circle cx="430" cy="200" r="12" fill="lightblue"/> <!-- 천왕성 -->
  <circle cx="500" cy="200" r="11" fill="blue"/> <!-- 해왕성 -->
  
  <!-- 명왕성 (작은 점으로 표시) -->
  <circle cx="550" cy="200" r="3" fill="gray"/>
  
  <!-- 레이블 -->
  <text x="50" y="260" text-anchor="middle" font-size="12">태양</text>
  <text x="500" y="260" text-anchor="middle" font-size="12">해왕성</text>
  <text x="550" y="260" text-anchor="middle" font-size="12">명왕성</text>
</svg>

내 의도에는 벗어난거지만, 시작한 김에 자바스크립트로 공전시켜달라고 했니니, 꽤 그럴듯하게 만들어 준다. 공전주기 짧은 혜성 하나 넣어달라고 했더니 군말없이 해주네! 몇가지 세부 조정을 하고 보니, 명왕성이 멀뚱한 느낌... 애초에 스케일에 안맞는 녀석을 넣어달라고 한 내 잘못이니... 명왕성은 다시 빼달라고 했다.

실행 결과:
https://claude.site/artifacts/09210cb7-392b-4f6f-8c87-e075dafeae6d

이러고 놀면 시간가는 줄 모르게 재미있다. 그 옛날 8비트 애플2 갖고 놀던 때 같다. 그때는 베이지색 케이스 안에서 무슨 일이 일어나지 몰랐고, 지금은 웹 브라우저 너머에서 무슨 일이 일어나는지 모른다. 그런데... 그림책은??

그리고 삶은 계속 된다.

Claude 3.5 Sonnet이 생성한 코드:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>8개 행성으로 구성된 움직이는 태양계</title>
    <style>
        body { margin: 0; overflow: hidden; }
        #solar-system { width: 100vw; height: 100vh; background-color: #000; }
    </style>
</head>
<body>
    <svg id="solar-system" viewBox="0 0 1000 1000">
        <defs>
            <pattern id="sun-pattern" patternUnits="userSpaceOnUse" width="80" height="80">
                <image href="/api/placeholder/80/80" width="80" height="80" />
            </pattern>
            <pattern id="mercury-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <image href="/api/placeholder/10/10" width="10" height="10" />
            </pattern>
            <pattern id="venus-pattern" patternUnits="userSpaceOnUse" width="16" height="16">
                <image href="/api/placeholder/16/16" width="16" height="16" />
            </pattern>
            <pattern id="earth-pattern" patternUnits="userSpaceOnUse" width="18" height="18">
                <image href="/api/placeholder/18/18" width="18" height="18" />
            </pattern>
            <pattern id="mars-pattern" patternUnits="userSpaceOnUse" width="14" height="14">
                <image href="/api/placeholder/14/14" width="14" height="14" />
            </pattern>
            <pattern id="jupiter-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
                <image href="/api/placeholder/40/40" width="40" height="40" />
            </pattern>
            <pattern id="saturn-pattern" patternUnits="userSpaceOnUse" width="34" height="34">
                <image href="/api/placeholder/34/34" width="34" height="34" />
            </pattern>
            <pattern id="uranus-pattern" patternUnits="userSpaceOnUse" width="24" height="24">
                <image href="/api/placeholder/24/24" width="24" height="24" />
            </pattern>
            <pattern id="neptune-pattern" patternUnits="userSpaceOnUse" width="22" height="22">
                <image href="/api/placeholder/22/22" width="22" height="22" />
            </pattern>
        </defs>
        
        <!-- 궤도 -->
        <circle cx="500" cy="500" r="60" fill="none" stroke="#333" stroke-width="1"/>
        <circle cx="500" cy="500" r="90" fill="none" stroke="#333" stroke-width="1"/>
        <circle cx="500" cy="500" r="120" fill="none" stroke="#333" stroke-width="1"/>
        <circle cx="500" cy="500" r="160" fill="none" stroke="#333" stroke-width="1"/>
        <circle cx="500" cy="500" r="220" fill="none" stroke="#333" stroke-width="1"/>
        <circle cx="500" cy="500" r="300" fill="none" stroke="#333" stroke-width="1"/>
        <circle cx="500" cy="500" r="380" fill="none" stroke="#333" stroke-width="1"/>
        <circle cx="500" cy="500" r="450" fill="none" stroke="#333" stroke-width="1"/>
        
        <!-- 태양과 행성들 -->
        <circle cx="500" cy="500" r="40" fill="url(#sun-pattern)"/>
        <circle id="mercury" r="5" fill="url(#mercury-pattern)"/>
        <circle id="venus" r="8" fill="url(#venus-pattern)"/>
        <circle id="earth" r="9" fill="url(#earth-pattern)"/>
        <circle id="mars" r="7" fill="url(#mars-pattern)"/>
        <circle id="jupiter" r="20" fill="url(#jupiter-pattern)"/>
        <circle id="saturn" r="17" fill="url(#saturn-pattern)"/>
        <circle id="uranus" r="12" fill="url(#uranus-pattern)"/>
        <circle id="neptune" r="11" fill="url(#neptune-pattern)"/>
        
        <!-- 혜성 -->
        <g id="comet">
            <path id="comet-tail" fill="cyan" opacity="0.7" />
            <circle r="2" fill="white" />
        </g>
    </svg>

    <script>
        const planets = [
            { id: 'mercury', orbit: 60, period: 0.24, size: 5 },
            { id: 'venus', orbit: 90, period: 0.62, size: 8 },
            { id: 'earth', orbit: 120, period: 1, size: 9 },
            { id: 'mars', orbit: 160, period: 1.88, size: 7 },
            { id: 'jupiter', orbit: 220, period: 11.86, size: 20 },
            { id: 'saturn', orbit: 300, period: 29.46, size: 17 },
            { id: 'uranus', orbit: 380, period: 84.01, size: 12 },
            { id: 'neptune', orbit: 450, period: 164.79, size: 11 }
        ];

        const comet = { 
            id: 'comet', 
            orbit: 350, 
            period: 3.3, 
            eccentricity: 0.5 
        };

        function updatePlanetPositions(time) {
            planets.forEach(planet => {
                const angle = (time / planet.period) * Math.PI * 2;
                const x = 500 + Math.cos(angle) * planet.orbit;
                const y = 500 + Math.sin(angle) * planet.orbit;
                const element = document.getElementById(planet.id);
                element.setAttribute('cx', x);
                element.setAttribute('cy', y);
            });
        }

        function updateCometPosition(time) {
            const angle = (time / comet.period) * Math.PI * 2;
            const r = comet.orbit * (1 - comet.eccentricity * Math.cos(angle));
            const x = 500 + r * Math.cos(angle);
            const y = 500 + r * Math.sin(angle);
            const element = document.getElementById(comet.id);
            
            const distanceToSun = Math.sqrt((x - 500)**2 + (y - 500)**2);
            const maxDistance = comet.orbit * (1 + comet.eccentricity);
            
            const tailLength = 50 * (1 - distanceToSun / maxDistance) + 10;
            
            const tailPath = `M0,0 L-${tailLength},0 L-${tailLength*0.8},${tailLength*0.1} L-${tailLength*0.8},-${tailLength*0.1} Z`;
            document.getElementById('comet-tail').setAttribute('d', tailPath);
            
            element.setAttribute('transform', `translate(${x}, ${y}) rotate(${angle * 180 / Math.PI + 90})`);
        }

        let time = 0;
        function animate() {
            time += 0.005;
            updatePlanetPositions(time);
            updateCometPosition(time);
            requestAnimationFrame(animate);
        }

        animate();
    </script>
</body>
</html>
```