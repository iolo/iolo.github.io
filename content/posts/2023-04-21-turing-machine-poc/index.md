---
title: 튜링 머신 에뮬레이터 with chatGPT
layout: post
date: 2023-04-21
---

[chatGPT](https://chat.openai.com/)와 컴퓨터의 탄생에 대해서 수다를 떨다가 [튜링 머신](https://en.wikipedia.org/wiki/Turing_machine) 얘기가 나오길래...

좀 더 구체적인으로 설명해달라고 했더니:

> 튜링 머신은 다음과 같은 튜플로 정의될 수 있습니다:
> 
> M = (Q, Σ, Γ, δ, q0, B, F)
> 
> 1. Q: 유한한 상태 집합입니다. 상태는 튜링 머신의 작동을 결정하는데 사용되며, 계산 과정 동안 튜링 머신은 여러 상태를 가질 수 있습니다.
> 2. Σ: 유한한 입력 알파벳입니다. 테이프에 기록되는 기호 중 입력으로 사용되는 것들의 집합입니다. 이 집합에는 특별한 공백 기호인 B가 포함되지 않습니다.
> 3. Γ: 유한한 테이프 알파벳입니다. 테이프에 기록될 수 있는 모든 기호의 집합입니다. 이 집합은 Σ와 공백 기호 B를 포함하고 있어야 합니다. (Σ ⊆ Γ, B ∈ Γ)
> 4. δ: 전이 함수입니다. 현재 상태와 테이프 헤드가 가리키는 기호에 따라 새로운 상태, 쓸 기호, 테이프 헤드의 이동 방향을 결정하는 함수입니다. δ: Q × Γ → Q × Γ × {L, R}로 정의됩니다.
> 5. q0: 초기 상태입니다. 계산이 시작되는 시점에 튜링 머신이 가지고 있는 상태입니다. (q0 ∈ Q)
> 6. B: 공백 기호입니다. 테이프의 빈 셀에 사용되는 기호로, 테이프 알파벳 Γ의 일부입니다.
> 7. F: 종료 상태 집합입니다. 계산이 완료되었을 때 튜링 머신이 도달하는 상태들의 집합입니다. (F ⊆ Q)
> 
> 전이 함수 δ는 튜링 머신의 작동 규칙을 결정합니다. 함수의 정의에 따라, 튜링 머신은 현재 상태와 테이프 헤드가 가리키는 기호를 바탕으로 다음 상태로 이동하고, 셀에 새로운 기호를 쓴 다음 테이프 헤드를 왼쪽이나 오른쪽으로 이동합니다. 이 과정을 계산이 완료될 때까지, 즉 튜링 머신이 종료 상태 집합 F에 있는 상태에 도달할 때까지 반복합니다.
> 
> 문제를 풀기 위한 튜링 머신은 다음과 같은 단계를 거쳐 작동합니다.
> 
> 1. 초기 설정: 테이프에 입력 데이터를 기록하고, 튜링 머신의 상태를 초기 상태 q0으로 설정합니다. 테이프 헤드는 입력 데이터의 시작 부분에 위치시킵니다.
> 2. 계산 수행: 튜링 머신은 전이 함수 δ에 따라 계산을 수행합니다. 현재 상태와 테이프 헤드가 가리키는 기호에 따라 새로운 상태로 이동하고, 셀에 새로운 기호를 쓴 다음 테이프 헤드를 왼쪽이나 오른쪽으로 이동합니다. 이 과정을 계산이 완료될 때까지 반복합니다.
> 3. 계산 완료: 튜링 머신이 종료 상태 집합 F 중 하나의 상태에 도달하면 계산이 완료된 것으로 간주합니다. 이때 테이프에 기록된 내용이 계산 결과가 됩니다.

자바스크립트로 간단히 만들어 달라고 했더니...
클래스까지 동원해서 그럴싸한 코드를 뱉어낸다!
(자바스크립트의 특성 때문에 발생하는 사소한 버그들이 있지만 넘어가자)

<figure>
  <video src="/files/ghostintheshell-robot-typing.mp4" autoplay loop muted/>
</figure>

```js
export class TuringMachine {
  constructor(tape = ['B'], state = 'q0', head = 0, transitionFunction = {}, finalStates = []) {
    this.tape = tape;
    this.state = state;
    this.head = head;
    this.transitionFunction = transitionFunction;
    this.finalStates = finalStates;
  }

  step() {
    const currentSymbol = this.tape[this.head] || 'B';
    const transition = this.transitionFunction[this.state]?.[currentSymbol];

    if (!transition) {
      return false; // transition not found, halt the machine
    }

    const [newState, newSymbol, direction] = transition;
    this.state = newState;
    this.tape[this.head] = newSymbol;
    this.head += direction === 'R' ? 1 : -1;

    return !this.finalStates.includes(this.state);
  }

  run() {
    while (this.step()) {}
    return this.tape;
  }
}

// Example usage:
const transitionFunction = {
  q0: {
    '0': ['q0', '1', 'R'],
    '1': ['q1', '1', 'R'],
    'B': ['q1', '1', 'R']
  },
  q1: {
    '0': ['q1', '0', 'R'],
    '1': ['q0', '0', 'L'],
    'B': ['q2', 'B', 'L']
  }
};

const finalStates = ['q2'];

const tm = new TuringMachine(['0', '0', '1'], 'q0', 0, transitionFunction, finalStates);
const output = tm.run(); // The final tape after the Turing machine halts
console.log(output);
```

예제를 위한 예제를 덧붙여 놨길래, 동작 원리를 이해하는 데 도움이 되는 간단한 예제를 만들어 달라고 했더니 **2진수 +1**하는 예제를 뱉어낸다
(이론적인 튜링 머신과 달리 자바스크립트의 배열은 양끝이 열린 테이프가 아니기 때문에 미묘한 버그가 있지만 넘어가자):

```js
const transitionFunction = {
  q0: {
    0: ['q0', '0', 'R'],
    1: ['q0', '1', 'R'],
    B: ['q1', 'END', 'L'],
  },
  q1: {
    0: ['q2', '1', 'R'],
    1: ['q1', '0', 'L'],
  },
};

const finalStates = ['q2'];
const input = ['1', '0', '1']; // 이진수 101

const tm = new TuringMachine(input, 'q0', 0, transitionFunction, finalStates);
const output = tm.run();
console.log(output); // 출력: [ '1', '1', '0' ] (이진수 110)
```

10진수에 익숙한 내 머리로는 **2진수 +1**하는 코드가 한 눈에 이해가 안되서
**10진수 +1**하는 (튜링머신) 코드를 만들어 달라고 했더니,
자바스크립트 코드로 튜링머신 코드를 생성하는 뻘짓도하고 쉽게 알아채기 힘든 미묘한 버그도 함께 뱉어낸다:

```js
const transitionFunction = {
  q0: {
    ...Array.from({ length: 9 }, (_, i) => [i, ['q0', i + 1, 'R']]).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
    '9': ['q0', '0', 'R'],
    'B': ['q1', 'B', 'L']
  },
  q1: {
    ...Array.from({ length: 9 }, (_, i) => [i, ['q2', i + 1, 'R']]).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
    '9': ['q1', '0', 'L']
  }
};

const finalStates = ['q2'];
const input = ['9', '9', '9']; // 10진수 999

const tm = new TuringMachine(input, 'q0', 0, transitionFunction, finalStates);
const output = tm.run();
console.log(output); // 출력: [ '1', '0', '0', '0' ] (10진수 1000)
```

여기서 버그를 잡겠다고 계속 갈구면 삐딱선을 탄다는 것을 경험으로 알고 있기에,
대충 직접 고쳐본다(휴먼의 힘을 보여줘!):

```js
const transitionFunction = {
  q0: {
    ...Array.from({ length: 10 }, (_, i) => [String(i), ['q0', String(i), 'R']]).reduce(
      (obj, [k, v]) => ({ ...obj, [k]: v }),
      {}
    ),
    // 휴먼 코멘트: 위의 줄은 아래와 같은 튜링머신 코드를 생성
    // '0': ['q0', '0', 'R'],
    // '1': ['q0', '1', 'R'],
    // ...
    // '9': ['q0', '9', 'R'],
    'B': ['q1', 'B', 'L'],
  },
  q1: {
    ...Array.from({ length: 9 }, (_, i) => [String(i), ['q2', String(i + 1), 'R']]).reduce(
      (obj, [k, v]) => ({ ...obj, [k]: v }),
      {}
    ),
    // 휴먼 코멘트: 위의 줄은 아래와 같은 튜링머신 코드를 생성
    // '0': ['q2', '1', 'R'],
    // '1': ['q2', '2', 'R'],
    // ...
    // '8': ['q2', '9', 'R'],
    '9': ['q1', '0', 'L'],
  },
};

const finalStates = ['q2'];
const input = ['9', '0', '9']; // 10진수 909

const tm = new TuringMachine(input, 'q0', 0, transitionFunction, finalStates);
const output = tm.run();
console.log(output); // 출력: [ '9', '1', '0' ] (10진수 910)
```

아... 이제 뭔소린지 알겠네.

내친 김에, 튜링머신의 동작원리를 이해하기에 좋을 것 같아서
[카이사르 암호](https://en.wikipedia.org/wiki/Caesar_cipher) 코드를 만들어달라고 했더니...
살짝 삐닥선을 타길래 더 갈구지 않고 직접 몇군데를 직접 수정했다:

```js
const transitionFunction = {
  q0: {
    ...Array.from({ length: 26 }, (_, i) => [
      String.fromCharCode(65 + i),
      ['q0', String.fromCharCode(65 + ((i + 3) % 26)), 'R'],
    ]).reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
    // 휴먼 코멘트: 위의 줄은 아래와 같은 튜링머신 코드를 생성
    //'A': ['q0', 'D', 'R']
    //'B': ['q0', 'E', 'R']
    //'B': ['q0', 'F', 'R']
    //...
    //'X': ['q0', 'A', 'R']
    //'Y': ['q0', 'B', 'R']
    //'Z': ['q0', 'C', 'R']
  },
};

const finalStates = ['q1'];
const input = ['A', 'B', 'Y', 'Z']; // 암호화할 문자열

const tm = new TuringMachine(input, 'q0', 0, transitionFunction, finalStates);
const output = tm.run();
console.log(output); // 출력: [ 'D', 'E', 'B', 'C' ] (암호화된 문자열)
```

아니나 다를까, 이어진 질문에서 완전 삐딱선을 타서, 오늘의 수다는 여기서 종료.

지금까지 작업한 소스는 [gist](https://gist.github.com/iolo/b5c3fcdf286b5ded38911b855463006d)에 올려두었다.

