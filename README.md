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

## 타입스크립트는 변수, 매개변수, 리턴값에 타입 붙인다.

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
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 }; // 변수에 타입 붙임

// 배열
const arr: string[] = ["123", "457"];
const arr2: number[] = [123, 456];
const arr3: Array<number> = [123, 456]; // <>: "재네릭"이라함

// 튜플, 길이가 고정된 배열
const arr4: [number, number, string] = [123, 456, "hello", "wow"]; //❌Error 'wow'지워야
```

## 타입 추론을 적극 활용하자

```javascript
const a: string = "5";
const a = "5";
//위 2개는 타입이 다른 것이다. 아래는 "5"인 것이구 위에것은 더 넓은 string이 type인 것

function add(x: number, y: number) {
  return x + y;
}
const result = add(1, 2);
// 매개변수는 type을 명시해야 한다, return 값에는 type을 생략해도 알아서 추론을 잘 해준다.
```

- 추론이 잘되면 추론에 맡기자
- type은 간결하게 적자

## js 변환 시 사라지는 부분을 파악하자

- 콜론(:)
- 타입
- 인터페이스
- 제네릭
- as
- enum, declare 등도 사라진다고 한다.
- body없는 function

```javascript
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

## never 타입과 느낌표❗(non-null assertion)

- 빈 배열은 never 타입
- Element라는 type이 존재
- `|` "또는" 의미

```javascript
try {
  const array = []; // noImplicitAny가 false일 때
  array[0];
} catch(error) {
  error;
}
❗ 🤔
! 는 웬만하면 안쓰는 것이 좋다
const head = document.querySelector('#head'); // const head: Element | null
const head = document.querySelector('#head')!; // null이나 undefined가 아님을 보증하는 방식, head 존재 한다는 의미 -> const head: Element null이 사라짐.

const head = document.querySelector('#head'); // 느낌표 없이 아래처럼 코드 작성해야😙
if (head) { // head가 있다면
  console.log(head);
}
```

## 원시 래퍼 타입, 템플릿 리터럴 타입, rest, 튜플

```javascript
const a: string = 'hello';
const b: String = 'hell'; // 대문자 쓰지 말기 "string"과 "String"은 다르다
// 대문자 String을 원시 래퍼 타입이라 함🔵
function c(a1:string, b2:string) {}
c(a,b);

type World = "world" | "hell";
const a: World = 'world';

const b = `hello ${a}`;

// type Greeting = "hello world";
type Greeting = `hello ${World}`; // 템플릿 리터럴 타입🔵
const c: Greeting = 'hello hell' | 'hello world' // 정교한 타입 추천 가능

let arr: string[] = [];
let arr2: Array<string> = [];
function rest(a, ...args: string[]) {
   console.log(a, args); // 1, [2,3]
}

rest(1, '1','2','3'); // rest 파라미터🔵

const tuple: [string, number] = ['1', 1]; // 고정된 배열 튜플
tuple[2] = 'hello'; // ❌
tuple.push('hello'); // 🟠 🤔
```

## enum, keyof, typeof

```javascript
const enum EDirection {
  Up, // 0
  Down, // 1
  Left,
  Right,
}
// enum은 보통 여러개의 변수들을 하나로 묶고 싶을 떄 사용🔵
// 웬많하면 js로 코드 변환시 코드 남겨지는 코드가 좋다.
const enum PDirection { // enum에 문자열 혹은 숫잦 지정가능
  Up = "123",
  Down = "456",
  Left = "789",
  Right = "1234",
}

const ODirection = { // readonly 읽기전용, js변환 시 사라짐
  // enum 대신 객체로 많이 쓴다🔵 enum은 js로 변환시 사라지지만 객체는 as뒤에만 사라지고 남아있다.
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

const a = EDirection.Up; // const a = 0

const ODirection1: { Up: 0; Down: 1; Left: 2; Right: 3 } = {
  // enum 대신 객체로 많이 쓴다🔵 enum은 js로 변환시 사라지지만 객체는 as뒤에만 사라지고 남아있다.
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
};// as const가 없으면 이렇게 표현도 가능

function walk(dir: EDirection) {} // dir은 enum 중 한개여야한다는 의미🔵
walk(EDirection.Left)

const obj = {a: '123', b:'hello', c:'world'};
type Key1 = keyof obj; // 원형은 이건데 obj는 js값이기 떄문에 type으로 쓸수 ❌
type Key = keyof typeof obj; // 값을 type으로 쓰고싶을 떄 typeof 사용🔵
// keyof하면 a, b, c를 뽑아내서 Key라는 타입으로 custom하게 만든 것
// 객체의 key를 뽑아내서 Key라는 type으로 custom하게 만든것🔵

// 원래 enum 대신 아래처럼 쓰임
// It requires an extra line to pull out the keys
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

const obj1 = {a: '123', b:'hello', c:'world'} as const; // as const는 정교한 type 지정🔵
type Key2 = typeof obj1[keyof typeof obj1]; // 객체 value들의 type을 가져옴🔵
```

## union(|)과 intersection(&)

```javascript
type A = { a: string }; // 타입 에일리어스, 타입정의🔵
const a: A = { a: "hello" };
const a: { a: string } = { a: "hello" }; // 이렇게 해도 무방

interface B {
  a: string;
} // OOP(객체 지향 프로그래밍)를 하고 싶다면 사용
const b: B = { a: "hello" };

// Union
function add(x: string | number, y: string | number): string | number {
  return x + y;
}
// union, type은 처음부터 잘 정해야함, 안그러면 계속 꼬인다. 위 add는 type을 잘못 정한 예
const result: string | number = add(1, 2); // number인데 string으로 착각할 수도

// Intersection 객체에서! 타입은 말이안댐
type C = { hello: "world" } & { zero: "cho" };
const a1: C = { hello: "world", zero: "cho" };
// 모든 속성이 다 있어야 한다.
type C2 = { hello: "world" } | { zero: "cho" };
const a12: C2 = { hello: "world" };
// union은 여러개중에 한개만 있어도 된다.
```

## 타입 애일리어스와 인터페이스의 상속(extends)

```javascript
// type alias
type Animal = { breath: true };
type Poyouryu = Animal & { breed: true };
type Human = Poyouryu & { think: true };

const zerocho: Human = { breath: true, breed: true, think: true };
// type은 type자리에 우겨넣을 수 있는데 interface는 안됨
// interface
interface A {
  breath: true;
}
interface B extends A {
  breed: true;
}
const b: B = { breath: true, breed: true };

interface C extends Human {
   breed: true;
 }
const c:C = {breath: true, breed: true, think: true }; // type과 interface간 이동이 가능🔵
// interface는 type alias와 달리 여러번 선언가능하고, 다 합쳐진다.🔵 다른 라이브러리에 확장성
interface D {
   talk: () => void;
}
interface D {
   eat: () => void;
}interface D {
   shit: () => void;
}
const a1: D = {talk() {}, eat() {},shit() {}}
// 요즘에는 이런식으로 이름 짓지는 않는다고 함
interface IProps {}
type TAlias = string | number;
enum EHello {
   Left,
   Right
}
```

## 타입을 집합으로 생각하자(좁은 타입과 넓은 타입)

```javascript
type A = string | number; // 넓은 타입, 넓은타입-> 좁은타입❌
type B = string; // 좁은 타입, 좁은타입-> 넓은타입🟠

type C = string & number; // ❌
// 비슷한 원리로 any는 전체집합, never는 공집합으로 볼 수 있다.

type A1 = { name: string }; // 넒은 타입
type B1 = { age: number };
type AB = A1 | B1; // 가장 넓은 타입
type C1 = { name: string, age: number }; // 객체는 설명이 상세한 객체가 좁은 타입
type C2 = A1 & B1; // 이렇게 표현도 가능

const ab: AB = { name: "zerocho" };
const c: C1 = ab; // 넓은 타입을 좁은타입에 대입할 수는 ❌
const c1: C2 = { name: "zerocho", age: 29, married: false }; // 🤔🤔🤔
// 위에는 좁은타입을 넓은타입에 넣는 것인데 왜 에러가 날까?🟠
// "잉여속성검사"라는 것이 등장해서, 좁은타입 넓은타입 서로간에 대입가능한지 비교할 떄
// 개체리터럴을 바로 집어넣으면 잉여타입검사가 등장하기떄문에 에러남
const obj = { name: "zerocho", age: 29, married: false };
const c2: C2 = obj; //🟠
// 함수간에도 대입이 있음.
```
## void의 두 가지 사용법
```javascript
interface A { a: string}
// const obj1: A = {a: 'hello', b:'world'} ❌
const obj = {a: 'hello', b: 'world'}
const obj1: A = obj;
// 잉여 속성 검사
// 타입붙여주는 변수에 직접 개체 리터럴을 넣으면 에러 표시가 뜨는데 중간에 다른 변수를 하나 껴서 넣으면 에러가 안뜸
// ts에서는 개체 리터럴을 바로 대입할 때는 잉여속성검사라는 추가기능이 들어감.

// void
// 리턴값이 있으면 에러, 단 undefined만 가능⭕
// function에서는 void를 3가지로 기억하기 
function a(): void {
   return undefined;
} // 1️⃣리턴값이 void인 function
const b =a();

interface Human {
   talk: () => void;
}// 2️⃣메서드로 void함수가 들어감

function a1(callback: () => void): void{
   // return '3';❌ 함수에 직접적인 리턴값이 void인 경우에만 리턴값 없음, 매개변수와 메서드는 상관없다.(리턴값이 존재해도)
}// 3️⃣매개변수로 void함수가 들어간
a1(() => {
   return '3';
});

const human: Human = {
   talk() {return 'abc';} //🤔 interface Human에서 return값을 사용하지 않겠다는 의미, 직접전인 return값 ❌
   // () => void 리턴값이 뭐든 간에 사용하지 않겠다(없다)
}

function forEach(arr: number[], callback: (el: number) => undefined): void; // 함수 body없어도 선언 가능 아래 구현부가 있다면⭕
function forEach() {

}// 구현부, but 구현부 선언하기 싫으면 선언부에 declare를 붙여주면 된다. 단, js변환할 떄 같이 사라진다⭕
declare function forEach3(arr: number[], callback: (el: number) => void): void; 
declare let c: number;
// decalre
c=3;
forEach3([1,2,3], el => {target.push(el)}); 
// 외부에서 만들어진 함수같은 것들을 타입선언하는 방법

let target: number[] = [];
forEach([1,2,3], el => {target.push(el)}); // push는 return 값이 number이므로 매개변수가 undefined인 callback함수 떄문에 err가 남.
// ❗ 근데 callback: (el: number) => void면 err가 안남. why?🤔 매개변수에서 쓰이는 void는 실제 return값이 void여도 상관없다.⭕
// el => {target.push(el)}은 retunr값이 void다
// void형식은 undefined에 대입할 수 없다, 반대로 undefined는 void에 대입가능
// void는 undefined와 다르다⭕
img(src: "타입간 대입 가능 표.png")

interface A {
   talk: () => void;
}
const a3: A = {
   talk() {return 3;}
}
const b = a.talk() as unknown as number; //원래는 retunr값이 void지만 강제로 형변환하는 방법
// as unknown as⭕
const b1: number = a3.talk(); // void' 형식은 'number' 형식에 할당할 수 없다
const b3 = <number><unknown>a3.talk(); // <number><unknown>⭕
// 근데 as unknown as 방식이 더 선호됨, 나중에 react에서 jsx방식에서 tag가 많이 사용되는데
// ts가 <unknown>을 tag랑 헷갈려함
const b4 = a3.talk() as unknown;
```
![타입간 대입 가능 표](./%ED%83%80%EC%9E%85%EA%B0%84%20%EB%8C%80%EC%9E%85%20%EA%B0%80%EB%8A%A5%20%ED%91%9C.png)
- any와 unknown은 모두 대입은 되지만 unknown은 직접 타입정의해주어야 하고 any는 ts를 쓰기 포기한 것
- 빈 배열에서 본 never는 모든 타입에 넣을 수 없다. never, any 모두 안 생기게 ❌, 빈 배열일 떄 타입정의 잘해주어야 함
- 중간에 초록색 ✔ 표시가 있는데 ❌라고 생각하기, ts config에서 strict true라고 되어 있기 때문
- any는 void에 대입 가능하다, undefined는 void에 대입가능하다, 근데 null은 void에 대입 안된다❌
```javascript
function z(): void { // undefined는 void에 대입가능하다
   return undefined; //⭕
   // return null; ❌
}
```
## unknown과 any(그리고 타입 대입가능표)

```javascript
// any는 ts가 타입선언을 포기해버리는 것
// unknown은 타입을 정확하게 알지 못할 떄 쓰는 것 나중에 자신이 직접 타입 정의해주어야 한다.
interface A {
   talk: () => void;
}
const a: A = {
   talk() {return 3;}
}
const b: any =a.talk();
b.method(); // any: 존재하지 않는 메서드 막 사용해도 타입 검사를 포기
const c: unknown = a.talk();
// c.talk(); ❌
(c as A).talk(); // unknown: 직접 c의 타입을 정의해주어야 한다.

// unknown이 나오는 가장 흔한 에러⭕
try{

} catch (error) { // var error: unknown, error가 unknown으로 표시되어 있음
   // error.message ❌
   (error as Error).message // error의 타입을 Error로 표기해주어야 함. 
   // Error는 ts가 제공하는 기본 에러 타입, AxiosError도 존재⭕
}

const b1 = a.talk(); // 타입을 잘못만든 경우, const b1: void
// b1.toString();  3.toString(); 에러❌, 그렇다면 강제로 바꿔주는 수밖에 없음
const b2 = a.talk() as unknown as number;
b2.toString(); // ⭕, 타입은 처음부터 잘만들어야 한다는 것❗

// 근데 const b1 = a.talk(); 하고 b1.toString()한다고 안 돌아가는 것은 아니다.❗❗
// ts 컴파일러는 "타입 검사"랑 "코드 변환"이 서로 별개의 기능이다. 그리고 실제로 js로는 유효한 코드❗
// npx tsc(js파일로 만들어내면)하면 타입검사에서 에러는 나지만 코드 상(js)에서는 잘 돌아간다.
```