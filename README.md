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
function z(): void {
  // undefined는 void에 대입가능하다
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

## 타입 좁히기(타입 가드)

```javascript
// 타입가드, 타입 좁히기라는 기법🔵
function numOrStr(a: number | string) {
   // a.toFixed(1); ❌ Ts는 모든 가능성을 고려하므로 str일 가능성 떄문에 Err
   (a as number).toFixed(1); // 이렇게도 가능하지만 위험한 코드, 인적 오류 발생 가능
   // unknown일 떄와 남이 만든 타입이 틀렸을떄 말고는 as를 사용하지 말자🔵
   // 타입가드 기법🟠🟠
   if (typeof a === 'number'){
      a.toFixed(1);
   } else{// TS는 else문도 파악가능 위가 num이면 아래는 당연히 string일 것
      a.charAt(3);
   }
   if (typeof a === 'string'){ // number, string말고 다른 타입은 당연히 안됨
      a.charAt(3);
   }
}

numOrStr('123');
numOrStr(1);
// 원시값: typeof, 배열일 떄는 Array.isArray
function numOrNumArray(a: number | number[]){
   if(Array.isArray(a)){ // 매개변수가 array일 경우
      a.concat(4);
   } else { // number
      a.toFixed(3);
   }
}
numOrNumArray(123);
numOrNumArray([1,2,3]);

class A {
   aaa() {}
}
class B {
   bbb() {}
}
function aOrb(param: A | B){
   // 클래스는 그 자체로 type이 될 수 있다.
   // 클래스 이름이 type자리에 올 수 있다. 대신 클래스 자체를 의미하는게 아니라
   // new A()를 의미, 인스턴스를 의미, 인스턴스의 타입정의는 클래스 이름으로
   // 클래스 자체의 타입은 typeof 클래스(typeof A)

   // param.aaa(); ❌
   if (param instanceof A){
      param.aaa(); //🟠, 유효한 js코드
   }
}
// aOrb(A); ❌ 바로 A를 넣어버리면 Error난다.
aOrb(new B()); // 🟠, 인스턴스를 넣어주어여 Error가 안난다.

type B1 = { type: 'b', bbb:string};
type C1 = { type: 'c', ccc:string};
type D1 = { type: 'd', ddd:string};

function typeCheck(q: B | C | D){ // 객체 안에 속성만으로도 type 구별 가능
   // 값이 다른 경우
   if (q.type === 'b'){
      q.bbb;
   } else if(q.type === 'c'){
      q.ccc;
   } else {
      q.ddd;
   }
   // 객체의 어느 타입에두 속하지 않으면 never 타입
   // 객체에는 값이 다른 경우랑, 속성 이름 자체가 다른 경우로 객체를 구분가능
   // 속성 이름 자체가 다른경우
   if ('bbb' in q) {
      q.bbb;
   } else if ( 'ccc' in q){
      q.ccc;
   } else {
      q.ddd;
   }
}
const human = {type:'human'};
const dog = {type:'dog'};
const cat = {type:'cat'};
// 앞으로 객체를 만들 떄는 type이라는 속성을 함꼐 만들어주는게 좋다.
// 만약 안된다면 객체간 차이점을 만들어내야 한다.
const human = { talk()};
const dog = {bow()};
const cat = {meow()};
if('talk' in w) {
   // w가 human인 것을 찾아낼 수 있다.
}
```

## 커스텀 타입 가드(is, 형식 조건자)

```javascript
interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}
// custom 타입가드(return값에 is가 들어가 있는 것들)
// if문 안에 사용해서 TS한테 정확한 타입이 뭔지 알려줌
// is가 아니면 타입추론이 안되는 경우가 존재
function catOrDog(a: Cat | Dog): a is Dog {
  // return값에 is붙일 수 있음
  // 타입 판별을 직접 만들어야 함, Dog임을 찾아냄을 직접 만들어야
  if ((a as Cat).meow) {
    return false;
  }
  return true;
}
function pets(a1: Cat | Dog) {
  if (catOrDog(a1)) {
    // custom한 타입가드로 표현한 다소 어려운 방법
    console.log(a1.bow);
  }
  if ("meow" in a1) {
    // Cat, Dog 구분할 떄 이렇게 해도 되긴함, 쉬운 방법
    console.log(a1.meow);
  }
}

// 컴파일러 설정에 따라 Error가 달라진다. 설정 수정하면 최신 js사용 가능
// "target": "es2016", // "lib": [], "module": "commonjs"에서 아래로 변경
// "target": "es2017", "lib": ["es2020"], "module": "ES2022"
// 타입가드(is 존재)
const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => {
  return input.status === "rejected";
};
const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => {
  return input.status === "fulfilled";
};

const promises = await Promise.allSettled([
  Promise.resolve("a"),
  Promise.resolve("b"),
]);
// 이런 타입가드를 만들지 않으면 Error인지 성공인지 구별 잘안됨😅
// const errors = promises.filter(isRejected); // Error 난 것만 구별하고 싶을떄 🟠
// const errors = promises.filter(isFulfilled); // 성공한 것만 구별하고 싶을떄
const errors = promises.filter((a) => true); // const errors: PromiseSettledResult<string>[], PromiseSettledResult🟠

/*타입가드의 실전적인 예제
 Promise -> Pending -> Settled(Resolved, Rejected)
 Promise를 실행하고 나면 Pendfing상태에서 Settled가 되는데 Setteld에는 Resolved, Rejected가 있다.
 Promise실핼하면 비동기, 비동기로 실행하는 도중에는 Pending상태이다가 완료되면 Setteld상태로 변함,
 근데 Setteld상태는 완료지 성공, 실패가 아니다🟠 성공했으면 Resolved고 실패했으면 Rejected 이것이 Promise
 성공이든 실패든 Settled는 맏다
 promise.then().catch() // then().catch() 둘다 Settled이다.🟠🟠🔵 그 중에서 then()을 Resolved, catch()를 Rejected라고 함.
 그래서 PromiseSettledResult안에는 PromiseRejectedResult(실패)와 PromiseFulfilledResult(성공)가 있다.
 const errors = promises.filter((a) => true); // const errors: PromiseSettledResult<string>[], PromiseSettledResult🟠
 위에 errors에서 PromiseRejectedResult가 되어야 하는데 타입 추론이 PromiseSettledResult🟠인 상태 why??🤔
 const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]); 만보면 성공인지 실패인지 모른다.
 모든 가능성을 고려해서 완료상태인 PromiseSettledResult로 추론을 해버림, 실패한 것만 모아놓고 싶다면
 const erros = promises.filter((promise) => promise.status === "rejected"); // 실제로 js에서 promise 실패한 것만 모아놓는 코드이다.🟠
 근데 위처럼해도 PromiseSettledResult이다. 그럴 떄 어떻게 하냐면
 custom 타입가드 함수를 만들고(isRejected) : input is PromiseRejectedResult가 추가되어 있는🟠🟠*/
const erros1 = promises.filter(isRejected); //PromiseRejectedResult
// Ts가 뭔가 타입추론을 잘못할 떄  custom하게 타입가드를 만들어서 정확한 타입을 추론할 수 있게끔 만드는게 ""custom 타입가드""🔵
export {};
// 타입을 구분해주는 커스텀 함수를 직접 만들 수 있음.
// typeof, insataceof, in, Array.isArray 복잡해지면 이런 문법으로 타입추론이 안됨
// 지금까지 js문법으로 타입을 구분했다면 함수로 구분 가능🟠
```

## {}와 Object

```javascript
const x: {} = "hello";
const y: Object = "hi"; // {}, Object 모든 타입 가능 그러나 null, undefined 제외🟠
const xx: object = "hi"; // 소문자 object❌
const yy: object = { hello: "world" }; // 객체 사용시 object 지양, interface, type, class위주로 사용해야
const z: unknown = "hi";

// unknown: 모든 타입 받을 수 있다. any보다는 낫다 any는 타입추론을 포기, unknowwn은 나중에 타입 정해주어야
// unknown = {} | undefined | null
// 4.8 버전 이전에는 아래 코드에서 unknown인 변수를 if문 안에 넣으면 그대로 unknown
// 4.8에서 부터는 unknown인 변수를 if문 안에 넣으면 type이 {}로 나온다.
// {}이 객체라는 뜻이 아니라 모든 타입을 가리킨다. 숫자, 문자, bool, 객체도 가능
if (z) {
  // 4.8 이후부터는 {}
  z;
} else {
  // null
  z;
}
```

## readonly, 인덱스드 시그니처, 맵드 타입스

```javascript
interface A {
  readonly a: string;
  b: string;
}
const aaa: A = { a: "heelo", b: "world" };
aaa.a = "123"; // TS에서는 readonly 사용 시 속성 실수로 바꾸는 것을 막아주므로 Err

// 인덱스드 시그니처
type B = { a1: string; b2: string; c3: string; d4: string }; // 속성이 많은데 값을 문자열로 구성하는 법
type C = { [key: string]: string }; // 어떤 key든 간에 전부 문자열이고 값도 문자열로 구성🟠
const aaz: C = { a1: "hello", b2: "world" };
// 맵드 시그니처(key를 줄일 수 있음)
type Q = "Human" | "Mammal" | "Animal"; // interface는 |, & 사용이 안됨, type만 가능
type C1 = { [key in Q]: number }; // key가 Q중 1개
type C2 = { [key in Q]: Q }; // key가 Q중 1개
const zzz: C1 = { Human: 123, Mammal: 2, Animal: 5 };
const zzz1: C2 = { Human: "Animal", Mammal: "Human", Animal: "Mammal" };
```

## 클래스의 새로운 기능들

```javascript
// class원본
class A {
   a: string;
   b: string;
   constructor(a: string, b: number = 123) { // 기본값 없는 경우 "b?: number"
      this.a = '123';
      this.b = '123';
   }
   // a1: string ='123'; // 이렇게 constructor 생략하고 선언가능
   // b1: number = 123;

   // private, 클래스 내부에서만 사용 가능
   private a3: string = '123'; // TS에서 제공하는 private
   #b3: number = 123; // js에서 제공하는 private
   // 둘이 다르다. ts에서 private 사용이 낫다, 다만 js로 변환시 public으로 바뀐다.

   method() {

   }
}
const a = new A('123');
// 생성자에 매개변수를 받는경우 constructor 필요, 매개변수 b의경우 기본값이 있다.
// 기본값이 있는 경우 b?: number 이렇게 명시 안해줘도 된다. 단, 기본값 없는경우 ?붙여주어야 한다✅

type AA = A; // class의 이름은 그 자체로 type이 될 수 있다.
// 단, A는 new A()를 가리킨다.
const a1 : A = new A('123');
const b1: typeof A = A;
// class 자체의 타입은 "typeof A" class 이름은 인스턴스(new A('123'))를 가리킨다.✅

interface A1 {
   readonly a: string;
   b: string;
}
// implements(구현하다), private, protecred: ts에만 있는 키워드
// js 변환시, private, protected 모두 사라짐, 걱정할 수 있지만 ts에서 먼저 에러나기에 걱정❌
class B1 implements A1 { // class의 모양을 interface로 통제 가능✅
   readonly a: string = "123";
   b: string = 'world';
   private c: string = '123'; // class내부에서만 사용가능
   protected d: string = '123'; // 상속받았을떄 쓸수 있는지 없는지, 상속받은 부모의 protected는 사용가능✅
   e: string = 'wow'; // public
   method() {
      console.log(this.c);
      console.log(this.d);
      console.log(this.e);

   }
}
/* js로 변환시 interface는 사라지며, implements도 사라짐
class B1 {
   constructor(){
      this.a: = "123";
      this.b: = 'world';
   }
}*/

class C extends B1 {
   method() {
      console.log(this.c); // ❌ private은 상속받은 클래스에서 사용 불가, protected 가능⭕
      console.log(this.d);
      console.log(this.e);
   }
}
new C().a;
new C().b;
new C().c; // ❌, protected, private은 인스턴스에서 사용 불가✅

// class 내부에서 readonly, pricate 모두 붙일 수 있기에 class에서 interface를 implemnts잘 안쓴다고 한다
// 객체지향원칙 중에서 "추상에 의존하고 구현에 의존하지 말라"라는 조항이 있다. interface는 추상, class는 구현
// 그래서 객체지향원칙을 중시한다면 interface를 만들어서 class에 implements하긴 한다.근데 OOP 중시 안하면 interface 사용안해도돔✅
// class는 그 자체로 type이고 다른 곳에서도 사용가능하고 js 변환해도 남아있다.✅ interfcae는 사라짐❌
// interface와 class 중 무엇을 쓸지 고민이 된다면, 실제 js에서도 남아있어야 한다면 class, 추상에 더 의존하는 코드를 작성한다면 interface
// 추상 클래스✅, 클래스에 추상성을 부여, 클래스를 미리 모양만 만들어 둔 것, 실제 구현은 class D에서 ✅
// 추상 클래스가 있기에 interface를 굳이 잘 안쓴다고 한다
abstract class B3 {
   private readonly a: string = '123';
   b: string = 'world';

   abstract method(): void; // 추상 method
   method2() {
      return '3';
   }
}
/* js로 변환시
class B3 {
   constructor(){
      this.a: = "123";
      this.b: = 'world';
   }
   method2() {
      return '3';
   }
}*/
class D extends B3 {
   method() { // abstrcat로 되어있는 것은 반드시 상속 받았을 때 구현해주어야 함.
      console.log('hi');
   }
}

// 클래스 사용할 떄 implements, abstract class, abstract method, private, protected, public 가 있어서
// OOP 사용 가능
```

## 옵셔널, 제네릭 기본

```javascript
function abc(a: number, b?: number, c?: number) {
  // 옵셔널, 속성명 뒤에 ?붙이기
}
abc(1, 2);
// 갯수 상관없이 매개변수를 받고 싶다면
function abc1(...args: number[]) {
  //🟢
}
// interface, type alias에서도 사용 가능
let obj: { a: string; b?: string } = { a: "hello" };
obj = { a: "hello" };

// 재네릭
function add(x: string | number, y: string | number): string | number {
  return x + y;
}
// 원하는 선언
add(1, 2); // 3
add("1", "2"); // '12'

// BUt 아래의 경우르 배제하지 못해서 add() 선언은 틀림.
add(1, "2"); // '12'
add("1", 2); // '12'
// 그러면 안되는 경우를 제외하는 함수타입선언은 어떻게 해야할까🤔
function add1(x: string, y: string): string;
function add1(x: number, y: number): number;
function add1(x: string | number, y: string | number) {
  return x + y;
}
// 함수를 2개의 선언으로 나누고 구현부를 작성하여도 구현부에서 처음과 같은 타입 문제가 발생🤔
// 그럴때 제네릭 사용🟢
// 타입을 변수처럼 사용하는 것, 타입은 선언할 때 말고 사용할떄 정의된다.🟢
function add2<T>(x: T, y: T): T {
  // 굳이 T가 아니여도 됨
  return x + y;
}
add2(1, 2);
add2("1", "2");
// T에서 모든 타입이 가능해지므로 제한을 둘 수 있다.
function add3<T extends number | string>(x: T, y: T): T {
  return x + y;
}
add3(1, 2);
add3("1", "2");
// 이런 방식도 가능, 제네릭으로 매개변수 타입지정
function add4<T extends number, K extends string>(x: T, y: K): T {
  return x + y;
}
add4(1, "2");

// extends로 타입 제한하는 법🟢
function add5<T extends { a: string }>(x: T): T {
  return x;
} // 이런꼴의 T만 넣을수있다.
add5({ a: "hello" }); // 타입을 넣을 수 있음.
// <T extends {...}>
function add6<T extends string[]>(x: T): T {
  return x;
}
add6(["1", "2", "3"]); // 배열만
// <T extends any[]>
function add7<T extends (a: string) => number>(x: T): T {
  return x;
}
add7((a) => +a); // callback함수의 형태를 제안
function add77<T extends (...args: any) => any>(x: T): T {
  return x;
} // 제한이 없는 모든 함수가능
// <T extends (...args: any) => any> callback 함수
function add8<T extends abstract new (...args: any) => any>(x: T): T {
  return x;
}
class A {}
add8(A); // class 자체를 넣고 싶다면 이렇게
// constructor 타입정의는 "abstract new (...args: any) => any"🟢
// add8(new A()); // ❌
// <T extends abstract new (...args: any) => any> 생성자만 제한하고 싶을떄🟢
type ConstructorParameter<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
// abstract new (...args: any) => any 생성자
```

## 기본값 타이핑

```javascript
// js ES2015, 기본값 연산자
const a = (b = 3, c = 5) => {
   return '3';
}
// ts
const a1 = (b:number = 3, c:number=4) => {
   return '3';
}
// 매개변수 객체가 기본값인 경우🟢
const a2 = (b:{children: string} = {children: 'juyoungjun'}) => {
}
// 재네릭 in React
// trconfig에서 JSX를 React로 해주면(지금은 None) 재네릭이 <div>같은 태그와 유사하여 에러가 난다.
const add = <T>(x:T, y:T) => ({x,y});
const add1 = <T = unknown>(x:T, y:T) => ({x,y}); // React, 재네릭에 기본값 설정1️⃣
const add2 = <T extends unknown>(x:T, y:T) => ({x,y}); // 2️⃣
const add3 = <T,>(x:T, y:T) => ({x,y}); // 3️⃣
const result = add3(1,2); // 매개변수 number로 알아서 추론
```

# lib.es5.d.ts 분석

## forEach, map 제네릭 분석

```javascript
interface Array<T> { // Array<T>에서 T와 value의 T가 같으므로 아래 forEach문에서 타입추론이 가능한 것이다.🟢
   forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void; // forEach
   map<U>(callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any): U[]; // map
}
type A<T> = "";
class A1<T> {}; // interface, type, class 모두 재네릭 사용가능, 이름뒤에 붙임. js 변환시 모두 사라짐.
['1',2,false].forEach((value) => {console.log(value);}); // (parameter) value: string | number | boolean, 재네릭 덕분에 추론이 된다.
// 위 forEach 문에서 안에 콜백함수는 lib.es5.d.ts에서 forEach문의
// callbackfn: (value: T, index: number, array: T[]) => void === (value) => {console.log(value);} 같은 callback함수🟢
const a: Array<number> = [1, 2, 3]; // T = number
a.forEach((value) => {console.log(value);}); // type = number

function add<T>(x: T, y: T): T{ return x};
add<number>(1,2); // 재네릭 타입 파라미터🟢
<number>add(1,2); // <number>가 앞으로 가면 'as'로 바꾸는 강제 type 변환

// lib.es5.d.ts
every<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): this is readonly S[];
// <S extends T>: S는 T라는 타입에 부분집합
// value is S: custom 타입 가드(is), this is readonly S[]

// map
const strings = [1,2,3].map((value) => value.toString()); // ['1', '2', '3'] string[]
// map<U>(callbackfn: (value: T, index: number, array: readonly T[]) => U(callback함수의 리턴값의 type🟢), thisArg?: any): U[]; // map
// T = [1,2,3]: number, U: return값으로 string
```

## filter 제네릭 분석

```javascript
interface Array<T> { // Array<T>에서 T와 value의 T가 같으므로 아래 forEach문에서 타입추론이 가능한 것이다.🟢
   forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void; // forEach
   map<U>(callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any): U[]; // map
   filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): S[]; // filter 2가지로 선언되어 있다.
   filter(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): T[]; // filter
}

const filtered = [1,2,3,4,5].filter((value) => value % 2);
// filter<S extends "number">(predicate: (value: "number", index: number, array: readonly "number"[]) => value is S, thisArg?: any): S[];
// value % 2 가 number이므로 S또한 number
// filter<"number" extends "number">(predicate: (value: "number", index: number, array: readonly "number"[]) => value is "number", thisArg?: any): "number"[];

const filtered1 = ['1', 2, '3', 4, '5'].filter((value) => typeof value === 'string'); // const filtered1: (string | number)[]으로 추론됨, 잘못된 추론 ❌
// filter(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): T[]; // 2번쨰 filter로 추론하면 안됨
// filter(predicate: (value: (string | number), index: number, array: readonly string | number[]) => unknown, thisArg?: any): string | number[]; // filter
// string | number[]; 로 이미 타입을 정해버림
// filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): S[]; // 1번째 filter는 가능
// filter<S extends string | number>(predicate: (value: (string | number), index: number, array: readonly string | number[]) => value is S, thisArg?: any): S[];
// S는 string | number의 부분집합으로 추론 가능🟢
// 제네릭, custom 타입가드 활용🟠
// predicate를 뺴서 1번쨰 filter함수와 똑같이 만들어줌, S가 string이 되도록 return
const predicate = (value: string | number): value is string => typeof value === 'string'; // value is String으로 S제네릭을 조작
// <S extends T>에서 string extends string | number가 가능하기에, S가 string이라고 알려준 것이다.
const filtered2 = ['1', 2, '3', 4, '5'].filter(predicate);
// 이건 안될까?🤔
const result = ['1', 2].filter<string extends string | number>((value) => typeof value === 'string');// ❌
// '(value: string | number, index: number, array: (string | number)[]) => value is any' 형식의 매개변수에 할당 ❌, 형식 조건자여야 됨, 형식 조건자가 타입가드가 아님
// custom 타입가드 predicate로 형식 조건자가 되어야 하는데, (value) => typeof value === 'string'는 ❌
const result1 = ['1', 2].filter<string>(predicate); // 이건 된다. predicate가 형식 조건자
```

## forEach 타입 직접 만들기

```javascript
interface Arr<T> {
  // Array가 아니라 Arr, Array는 Ts가 정해놓은 타입
  // interface Arr {❌

  // 처음에 제네릭 위치를 어디를 잡을 지 헷갈리 수 있는데 여러군데 넣어보기, 가까운 곳부터(가장 왼쪽에서) 넣어보기🟠
  // forEach<T>(callback: (item: T) => void): void // 이렇게 바꾸면 Err, 제네릭이 제대로 추론하지 못함
  // a.forEach<number> 하면 추론은 되지만 부자연스럽다. 그렇다면 forEach<T>이게 아니라 interface Arr<T>임을 알 수 있다.

  // forEach(callback: (item: string | number) => void): void; // | 또는 관계로 표현 안될 떄는 제네릭 사용🟠
  forEach(callback: (item: T, index: number) => void): void;
  // lib.es5.d.ts, 실제 forEach
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
}

const a: Arr<number> = [1, 2, 3]; // Arr => Arr<number>
a.forEach((item, index) => {
  console.log(item, index);
  item.toFixed(1); // item: string | number일 떄 ❌
});
a.forEach((item) => {
  console.log(item);
  return "3";
});
const b: Arr<string> = ["1", "2", "3"]; // Arr => Arr<string>
b.forEach((item) => {
  console.log(item);
  item.charAt(3); // item: string | number일 떄 ❌
});
b.forEach((item) => {
  console.log(item);
  return "3";
});
```

## map 타입 직접 만들기

- `+` 사용법, 문자열을 숫자로 변환🟠🟠

```javascript
["1"].map((e) => +e); // [1]
```

```javascript
interface Arr<T> {
  forEach(callback: (item: T, index: number) => void): void;

  // map(callback: (v:T) => T): T[];
  map<S>(callback: (v: T, idx: number) => S): S[]; // Arr<T, S>도 가능하나, map을 사용하는 순간 넣어주어야 함, 어떤것을 넣을지 모르므로
  // lib.es5.d.ts
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
  map<U>(callbackfn: (value: T) => U): U[]; // 위에서 직접 만든 타입과 유사🥕
}

const a: Arr<number> = [1, 2, 3];

const b = a.map((v, idx) => v + 1); // v===number
const c = a.map((v, idx) => v.toString()); // const c: number[] ❌ map(callback: (v:T) => T): T[]; => map<S>(callback: (v:T) => S): S[];🟠
const d = a.map((v, idx) => v % 2 === 0); // [false, true, false], const d: boolean[]🥕

const e: Arr<string> = ["1", "2", "3"];
const f = e.map((v) => +v); // 문자열의 배열을 숫자로 변환
```

## filter 타입 직접 만들기

```javascript
interface Arr<T> {
  // filter(callback: (v: T) => boolean): T[]; // 간단한 filter 타입 정의
  filter<S extends T>(callback: (v: T) => v is S): S[]; // custom 타입가드🟠
  // v is S에서 Error가 났었는데, 처음에는 callback: (v: T | S)가 되지 않을 까했는데 d가 unknown이 나옴 ❌
  // filter(S extends T)로 S가 T의 부분집합임을 정의해야 한다.
  // (v: T) => v is S, T가 S로 좁혀질 수 있다🟠

  // lib.es5.d.ts
  // filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];

  // 타입을 직접 만드는 것은 되게 어려운일
  // 1️⃣ 간단하게 만들어보기
  filter(): void;
  // 2️⃣ 콜백함수 필요하니까
  filter(callback: () => void): void;
  // 3️⃣ 콜백함수의 매개변수
  filter(callback: (v: T) => void): T[];
  // 4️⃣ 새로운 타입의 필요성
  filter<S>(callback: (v: T) => v is S): S[];
  // 5️⃣ S와 T의 관련성이 없어서, T의 부분집합으로 S존재
  filter<S extends T>(callback: (v: T) => v is S): S[];
}
// 형식 조건자 === custom 타입가드
const a: Arr<number> = [1, 2, 3];
const b = a.filter((v): v is number => v % 2 === 0); // number[]

const c: Arr<number | string> = [1, "2", 3, "4", 5];
const d = c.filter((v): v is string => typeof v === "string"); // string[]
const e = c.filter((v): v is number => typeof v === "number"); // 형식 조건자여야 한다, custom 타입가드🟠🟠
const predicate = (v: number | string): v is number => typeof v === "number";
const f = c.filter(predicate); // 이런식으로 표현 가능
```

## 공변성, 반공변성

```javascript
// 공변성, 반공변성: 함수간에 서로 대입이 가능한지 불가능한지

// 리턴값의 크기에 따라서, 넓은 타입으로 대입 가능
function a(x: string): number {
   return +x;
}
a('1'); // 1

type B =(x: string) => number | string; // 더 넓은 타입
const B = a; // 🤔 더 넓은 타입에 대입 가능

function c(x:string): string | number { // (x: string)=> string 또는 (x: string) => number
   return +x;
}
type D = (x: string) => number;
let b: D = c; // 리턴값의 경우 반대로 좁은 타입에 넓은 타입을 넣는 것은 불가능❌

// 매개변수가 다른 경우🟠🟠 매개변수의 타입이 더 작은 것에 큰 타입이 대입가능, 좁은 타입으로 대입 가능
function e(x: string | number): number { // (x: string) => number 또는 (x:number) => number ❌
   // 'string | number'를 하나의 type으로 보고 매개변수는 좁은 타입에 넓은 타입 대입가능🟠
   return +x;
}
type F = (x:string) => number; // (x:number) => number가 (x:string) => number에 대입이 가능
let d: F = e;

// 리턴값이 넓은 타입으로, 다른 경우 매개변수가 좁은 타입으로 대입 가능🟢
function g(x: string | number): number{
   return +g;
}
type H = (x: string) => number | string;
let z: H = g;

// 타입 넓히기, ts가 모든 상황을 고려해서 type을 넓혀줌
let r = 5; // let r: number
// 타입 좁히기, 타입 가드..
let q: string | number = 5;
if (typeof q === 'number'){
   q.
}
```

## 오버로딩

```javascript
// 타입 오버로딩, 같은 타입 여러번 선언
// declare 함수(타입) 정의만하고 구현부는 다른곳에 있다고 ts 속이기 가능
declare function add(x: number, y: number): number
declare function add(x: number, y: number, z: number): number
// declare function add(x: number, y: number, z?: number): number 옵셔널

add(1,2);
add(2,3,4);

// interface, class에서도 오버로딩 가능
interface Add {
   (x:number, y:number): number;
   (x:string, y:string): string;
}
const add1: Add = (x:any, y:any) => x+y;
// 오버로딩 설정시, 실제 구현부에서 any타입 사용해도 무관
const q= add1(1,2);

class A{
   add(x:number, y:number): number;// 오버로딩
   add(x:string, y:string): string;// 오버로딩
   add(x:any, y:any) {// 구현부
      return x+y;
   }
}

const c = new A().add(1,2);
```

## TS의 건망증(+에러 해결법)

```javascript
interface Axios {
   get(): void;
}
type A =''; // interface, 타입에일리어스 js 변환시 사라짐

// Error 타입을 만들어서 Error 해결
// interface
interface CustomError1 extends Error {
   // js의 Error 속성은 name, message, stack밖에 없음
   // axios lib 사용시, response 속성을 추가
   response?: { // 오버로딩 사용시에는 구현부에서 any 사용가능
      data: any;
   }
}

// class
class CustomError extends Error {
   response?: {
      data: any;
   }
}

interface CustomError_Dont_know_extends{
   name: string;
   message: string;
   stack?: string;
   response?: { // extends 안할경우 가져와도 상관없음.
      data: any;
   }
}

declare const axios: Axios;

// catch문에서도 as보다는 타입가드를 사용하자🟢
// interface 자체를 타입가드에서 사용불가
(async () => {
   try {
      await axios.get();
   } catch (err: unknown) { // unknown 타입 지정해줘야
      console.log((err as CustomError1).response?.data); // 1회성
      // CustomError에 response 속성 존재, 참고로 옵셔널 속성까지 동일해야 한다🟢
      // console.log(err.response?.data); ❌ (err as CustomError).response?.data🟠
      const customError = err as CustomError1; // 변수 지정해서 as생략 가능🟠
      console.log(customError.response?.data);

      // as사용하는 경우, type이 unknown인 경우, as는 인적오류 발생 가능성이 높다
      // 타입가드를 사용하면 as로 unknown 타입명시 불필요🟢

      // 실제 위처럼 코드짜면 js에서 에러❌❌, CustomError가 아니라 다른 Error일 경우 떄문
      if (err instanceof CustomError){ // 타입가드로 타입 좁혀짐🟠🟠
         // customError가 interface면 js에서 사라진다, instanceof 사용❌
         // interface와 비슷하면서 js에 남아있는 역할 -> class
         console.log(err.response?.data);
      }
   }
})

// 대부분 lib에서 앞에 types 붙이면 type들 확인 가능, 가끔 안되어있는 애들은
// 직접 d.ts파일 만들어서 타입을 정해줘야하는데 그 때 제네릭을 사용해야 함.
// any는 타입 검사포기, unknown은 타입 캐스팅하든 타입가드 붙이든 안전하게 사용해라
// 그래서 any보다는 unknown을 더많이 사용해야
const a = <T = unknown>(v:T): T => {return v};
const c = a(3);
```

# Utility Types

## Partial, Pick, Omit, Exclude, Extract 타입 분석

- 타입에서 제네릭 간에 extends를 하면 삼항연산자 사용가능

```javascript
interface Profile {
  name: string;
  age: number;
  married: boolean;
}

const zerocho: Profile = {
  name: "zerocho",
  age: 29,
  married: false,
}; // 🟠

// const newZeroCho: Profile = {
//    name: 'newZeroCho',
//    age: 29,
// } // ❌

const newZeroCho1: Partial<Profile> = {
  // Partial 타입: 객체 안 속성에 옵셔널 적용🟠🟠
  name: "newZeroCho",
  age: 29,
}; // 🟠

// Utility Types
// Partial 타입 만들어보기,
type P<T> = {
  [Key in keyof T]?: T[Key];
  // 인덱스드 시그니처
  // type C = { [key: string]: string };
  // 맵드 시그니처
  // type Q = "Human" | "Mammal" | "Animal";
  // type C1 = { [key in Q]: number }; // key가 Q중 1개
};

const newZeroCho2: P<Profile> = {
  name: "newZeroCho",
  age: 29,
}; // 🟠

// Pick 타입 만들어보기🟢
// 제네릭 사용시 관계를 파악하고 제한조건을 먼저 적어주어야한다🟠
// 'name' | 'age'는 Profile의 key이므로 S extends keyof T
type K<T, S extends keyof T> = {
  [Key in S]: T[Key];
};
const newZeroCho5: K<Profile, "name" | "age"> = {
  name: "newZeroCho",
  age: 29,
};

// Partial보다는 Pick, Omit🟠🟠 Partial보다 타입이 정확
// Pick은 Profile에서 'name'과 'age'만 가져온다는 의미
const newZeroCho3: Pick<Profile, "name" | "age"> = {
  name: "newZeroCho",
  age: 29,
};

// Omit 타입: 빼고싶은 속성이 한개인 경우 유용
const newZeroCho4: Omit<Profile, "married"> = {
  name: "newZeroCho",
  age: 29,
};

// Omit 타입 만들어보기🟢
// Omit: Pick과 Exclude(Utility Types)를 조합하여 사용.
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// Exclude🟢
// type Exclude<T, U> = T extends U ? never : T; T에서 U타입을 뺴는 것
// 타입에서 제네릭 간에 extends를 하면 삼항연산자 사용가능🟠🟠
// T가 U의 부분집합이면 never 아니면 T🟠
type A = Exclude<keyof Profile, "married">; //type A = "name" | "age"🟠
type Animal = "Cat" | "Dog" | "Human";
type Mammal = Exclude<Animal, "Human">; // type Mammal = "Cat" | "Dog"
// Extract🟢 T에서 U 추출
// type Extract<T, U> = T extends U ? T : never;
// T가 U의 부분집합이면 T 아니면 never🟠
type Human = Extract<Animal, "Human">; // type Human = "Human"

const newZeroCho6: Pick<Profile, "name" | "age"> = {
  //type A = "name" | "age"이므로 Exclude<keyof Profile, 'married'> 대체가능🟠
  name: "newZeroCho",
  age: 29,
};
// S extends keyof any: S는 어떤 것의 Key값,
// S extends keyof any -> string | number | symbol이  되길 원하도록
type O<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;
const newZeroCho7: O<Profile, "married"> = {
  name: "newZeroCho",
  age: 29,
};
```

## Required, Record, NonNullable 타입 분석

- Key에 적용되는 타입들이 있고 인터페이스,객체에 적용되는 타입들이 있으므로 구별 해야 한다.
- Partial, Pick, Required, Readonly : 인터페이스에 적용되는 타입
- Exclude, Extract, NonNullable : Key에 적용되는 타입

```javascript
interface Profile {
  name?: string;
  age?: number;
  married?: boolean;
}

// Required: 옵셔널들을 필수로 만들고 싶을 떄🟢
const zerocho: Required<Profile> = {
  name: "zerocho",
  age: 29, // 하나라도 없을시, 에러
  married: false,
};

// Required 타입 만들어보기🟢
type R<T> = {
  [Key in keyof T]-?: T[Key];
  // -? : 옵셔널 제거🟠
  // -: modifier
};
const zerocho1: R<Profile> = {
  name: "zerocho",
  age: 29, // 하나라도 없을시, 에러
  married: false,
};

// Readonly 타입 만들기🟢
type O<T> = {
  readonly [Key in keyof T]: T[Key];
  // -readonly [Key in keyof T]-?: T[Key]; readonly&옵셔널 제거해서 가져오기 가능🟠
};
const zerocho2: O<Profile> = {
  name: "zerocho",
  age: 29,
  married: false,
};
//  zerocho2.name = 'nero' ❌ 수정불가

// Record: 객체를 표현하는 방법🟢
// 아무 객체나 표현할 떄
interface Obj {
  [key: string]: number;
}
const a: Obj = { a: 3, b: 5, c: 7 };
const b: Record<string, number> = { a: 3, b: 5, c: 7 };

// Record 타입 만들어보기🟢
type C<T extends keyof any, S> = {
  // 객체의 Key는 string, number, symbol만 가능한 제한조건🟠
  [Key in T]: S;
};
const q: C<string, number> = { a: 3, b: 5, c: 7 };

// NonNullable: null | undefined 제외하고 타입 가져올 떄 🟢
type P = string | null | undefined | number | boolean;
type K = NonNullable<P>; // type K = string | number | boolean

// NonNullable 만들어보기🟢
type N<T> = T extends null | undefined ? never : T; // string | number | boolean
type I = N<P>;
```
