# Typescript-Study

- ts를 써야하는 이유는 안정성이 늘어난다.안정성이 늘어나면 -> 에러가 줄어든다.

- js에 비해 자유도는 줄어든다.

- 공식문서 Handbook읽기, TS ver1.1부터 최신 버전까지 읽어보기

# 기본지식

- 메인 룰: <b>typescript는 최종적으로 javascript로 변환된다.</b> 순전한 typescript 코드를 돌릴 수 있는 것은 deno(node만든 사람이 만듦)이나 대중화 되지 않았음(node를 뛰어넘지 못했다). 실무에서는 typescript를 돌릴 수 있는 `runtime`은 존재하지 않는다. `runtime`은 브라우저랑 node.js를 합쳐서 일컷는말이다. 어쩔 수 없이 타입스크립트를 자바스크립트로 변환해야 한다. 브라우저, 노드는 모두 js파일을 실행한다.

- typescript는 언어이자 컴파일러(`tsc`)이다. 컴파일러는 ts코드를 js코드로 바꿔준다. (tsc: 코드 변환 역할)

- `tsc`는 `tsconfig.json`(`tsc --init` 시 생성)에 따라 ts 코드를 js(`tsc` 시 생성)로 바꿔준다. 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 `tsconfig.json` 설정을 반드시 거쳐야 한다.

- `tsc`는 코드 자체의 타입 검사하는 역할도 한다. `tsc --noEmit` 으로 실행 (tsc: 타입 검사 역할)

- tsconfig.json에서 `esModuleInterop:true`, `strict: true` 두 개만 주로 켜놓는다고 한다, `strict: true`가 핵심

- ts 파일을 실행하는 게 아니라 결과물인 js를 실행해야 한다. 타입 검사에 에러가 나도 js파일로 변환은 가능하다. 둘은(코드 변환 || 타입 검사) 별개이다. 실무에서는 타입에 에러가 나면 코드변환하면 ❌

- 에디터가 필수가 됨. VS Code나 웹스톰 반드시 필요. 에디터들이 컴파일러 역할을 해주는 것, 컴파일러의 역할이란 <mark>타입 검사(`tsc --noEmit`, 타입 검사 명령어 !)</mark>와 <mark>코드 변환</mark> 에디터가 `tsc --noEmit`을 항상 자동으로 해준다.
---
### 타입스크립트는 변수, 매개변수, 리턴값에 타입 붙인다.


- 기본적으로 변수, 속성, 매개변수, 리턴값에 타입이 붙었다고 생각하면 됨.

```typescript
const a: string = "5";
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = true; // ❌ ===javascript, typescript의 주목적은 any를 없애는 것
const g: true = true; // 고정된 원시값을 type으로 명시 가능🟢, const는 바뀔일 ❌

// 함수
// 11️⃣, type자리가 없어도 js코드여야 한다.🔘
function add(x: number, y: number): number {
  return x + y;
} // type을 쓰는 것을 타이핑한다 함
// 매개변수(뒤에 type명시), return값(앞에, 마지막 매개변수 뒤에 명시) 위치에 type명시❗

// 22️⃣
// 🟢(type alias)타입 애일리어스
const add: (x: number, y: number) => number = (x, y) => x + y; // ": (x: number, y: number) => number": type🟢
// type으로 타입을 선언하는 방식 => 타입 애일리어스(type alias)
type Add = (x: number, y: number) => number;
const add: Add = (x, y) => x + y; // 별칭을 뺄 수 있다.

// ❗일반 함수와 화살표 함수의 다른 리턴값 표현❗
// function add(x:number, y:number): number {return x+y} function(함수)에서는 :(콜론)다음에 리턴값이 나오고
// type Add = (x:number, y:number) => number; 화살표 함수에서는 리턴값이 화살표 뒤에 나옴.

// 33️⃣
// 🟢interface로 함수 정의
interface Add {
  (x: number, y: number): number;
}
const add: Add = (x, y) => x + y;

// 객체
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 }; // 변수에 타입 붙임

// 배열
const arr: string[] = ["123", "457"];
const arr2: number[] = [123, 456];
const arr3: Array<number> = [123, 456]; // <>: "재네릭"이라함

// 튜플, 길이가 고정된 배열
const arr4: [number, number, string] = [123, 456, "hello", "wow"]; //❌Error 'wow'지워야

```
### 타입 추론을 적극 활용하자
```javascript
const a:string = "5";
const a = "5";
//위 2개는 타입이 다른 것이다. 아래는 "5"인 것이구 위에것은 더 넓은 string이 type인 것

function add(x: number, y: number) {return x + y};
const result = add(1,2);
// 매개변수는 type을 명시해야 한다, return 값에는 type을 생략해도 알아서 추론을 잘 해준다.
```
- 추론이 잘되면 추론에 맡기자
- type은 간결하게 적자

### js 변환 시 사라지는 부분을 파악하자
- 콜론(:)
- 타입
- 인터페이스
- 제네릭
- as
- enum, declare 등도 사라진다고 한다.
- body없는 function
``` javascript
const f: true = true;
type Add = () => number; // 타입선언
interface Minus {}
Array<string> // 제네릭

let a =123;
a = 'hello' as unknown as number  ;
=> js 변환 시 모두 없어진다.

이렇게 같은 함수를 표현 가능
function add(x:number, y:number): number; // 타입만, nobody
function add(x, y) {
  return x+y;
}// 선언
```
### never 타입과 느낌표(non-null assertion)