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

## infer 타입 분석

- 어떤 함수의 매개변수와 리턴값의 타입을 가져올 수 있다.
- `infer` 위치를 바꾸면서 매개변수, 리턴값 타입을 가져올 수 있도록

```javascript
function zip(x:number, y: string, z: boolean): {x: number, y: string, z: boolean} {
   return {x, y, z};
}

// Parameters✅
type Params = Parameters<typeof zip>; // type Params = [x: number, y: string, z: boolean]
type First = Params[0]; // First = number, type간에도 key값 꺼내오듯이 배열처럼 index로 접근 가능⭕

// Parameters 만들어보기✅
// 함수의 매개변수의 타입을 가져오려면 T가 함수여야 한다. 함수 제한조건 설정해야
// <T extends (...args: any) => any>⭕

// infer ✅인스턴스나 매개변수에 적용되며 타입 추론
// infer는 extends에서만 사용 가능 ⭕⭕ inference:추론
// TS가 (...args: any)매개변수 자리를 추론하는 것, 추론 조건 ? 추론  성공시의 값 : 추론 실패시의 값
// <typeof zip>에서 zip함수가 매개변수 (x:number, y: string, z: boolean)를 추론해서
// 결과값 : type Params1 = [x: number, y: string, z: boolean]⭕
type P<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
type Params1 = P<typeof zip>;

// ReturnType✅
type ret = ReturnType<typeof zip>; // type Ret = {x: number;y: string;z: boolean;}
// ReturnType 만들어보기✅
// return값의 타입을 가져옴

type R<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never;
type Ret = R<typeof zip>; // type Ret = {x: number;y: string;z: boolean;}

// ConstructorParameters, InstanceType ✅
type ConstructorParameters_<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
//  T extends abstract new (...args: infer P) => any ? P : never; 매개변수에서 infer문
type InstanceType_<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
// T extends abstract new (...args: any) => infer R ? R : any;인스턴스에서 infer문
// <T extends abstract new (...args: any) => any> 제네릭 함수에 대한 제한조건
// T extends abstract new (...args: any) => infer R ? R : any 뒤에 infer문에서도 제한조건
// T가 생성자임을 알려주는 abstract new 생성자 모양⭕⭕

class A {
   a: string;
   b: number;
   c: boolean;
   constructor(a: string, b: number, c: boolean) {
      this.a =a;
      this.b = b;
      this.c = c;
   }
}
const c = new A('123', 456, true);
type C = ConstructorParameters<typeof A> // typeof 클래스가 생성자
//[a: string, b: number, c: boolean] 생성자의 타입 가져오기
type I = InstanceType<typeof A> // type I = A, 클래스의 인스턴스 타입 가져오기⭕클래스 A 자체를 의미

const a: A = new A('123', 456, true); // 인스턴스(new 활용해서 실제 객체로 만들어낸 경우)⭕인스턴스

const z = 'Hello World';
let zb: Lowercase<typeof z>; // let zb: "hello world"
// lib.es5.d.ts
// intrinsic✅
// type Lowercase<S extends string> = intrinsic; intrinsic ts코드로 처리한게 아니라 따로 처리를 해둠
// 타입이 아닌 js코드로 구현되어있는 경우
```

## 완전 복잡한 타입 분석하기(Promise와 Awaited 편)

- `infer`는 어떻게 보면 추론해주는 것이기도 하지만, `새로운 타입 변수`를 만들어내는 것과 같다.

```javascript
// 프로미스는 Promise<결과값> 타입으로 표시🟢
const p1 = Promise.resolve(1)
  .then((a) => a + 1)
  .then((a) => a.toString());
//   resolve🟠
//   resolve<T>(value: T): Promise<Awaited<T>>; Promise<T>
// Promise<number>, Promise<number>,Promise<number>, Promise<string>((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null)에서 TResult1(toString())
const p2 = Promise.resolve(2); // Promise<number>
const p3 = new Promise((res, rej) => {
  // Promise<unknown>
  setTimeout(res, 1000);
});
// new🟠
// new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
// resolve: (value: T | PromiseLike<T>) => void, resolve할 떄 value를 안넣어줬으므로 unknown
const p4 = new Promise((res, rej) => {
  setTimeout(() => {
    res(); // value를 안넣고 resolve하는 것, (parameter) res: (value: unknown) => void
  }, 1000);
});

Promise.all([p1, p2, p3]).then((result) => {
  // Awaited<T[P]>🟢
  // Promise<string> -> Awaited<string> -> false -> string
  // Promise<number> -> Awaited<number> -> false -> number
  // { '0': string, '1': number, '2': unknown, length: 3 } TS에서 이 형식을 배열로 칭함🟢🟢
  console.log(result); // ['3', 2, undefined]🟢🟢
});

// lib.es2015.promise.d.ts🟢
// all🟠
// all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
// -readonly, 매개변수에 있던 readonly를 rsult에서 제거
// [P in keyof T] '0', '1', '2', length🟢
// T = [p1, p2, p3] {'0': p1, '1': p2, '2': p3, length: 3 }
// keyof T = '0' | '1' | '2' | 'length'

// { -readonly [P in keyof T]: Awaited<T[P]> } 배열이다, T가 배열이였기 떄문에
//  T를 [P in keyof T] 맵드 타입스로 만들어도 똑같이 배열이다.

// Awaited<T[P]>🟢
// .then((a) => a + 1).then((a) => a.toString()); then을 어떻게 처리해서 string으로 나타내었는지 확인해봐야🧐
// T[P], T:배열, P: 0,1,2 이므로 배열의 값들을 제네릭으로 전달함을 의미🟢

// Awaited🟢
// type Awaited<T> =
//     T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
//         T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
//             F extends ((value: infer V, ...args: infer _) => any) ? // if the argument to `then` is callable, extracts the first argument
//                 Awaited<V> : // recursively unwrap the value
//                 never : // the argument to `then` was not callable
//         T; // non-object or non-thenable
// 여기서 T는 p1, p2, p3같은 프로미스들

// T extends null | undefined ? T  // p1,p2,p3가 null | undefined면 그대로, 사실상 없애줘도 되므로 삭제
// T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ? 만족🟢
// extends가 있으므로 infer 추론 가능, T(프로미스이므로) 객체라면(object)🟢
// { then(onfulfilled: infer F, ...args: infer _): any }, then이라는 메서드가 있는 객체인가
// onfulfilled: infer F, F가 추론되는데 (a) => a + 1(then에 들어가는 타입) 의 타입을 추론
// then🟢
// then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
// F의 추론값은 (value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null 이 될것이다
// F extends ((value: infer V, ...args: infer _) => any), F는 함수꼴일테니 무조건 맞다🟢
// Awaited<V> 재귀🟢🟢
type Awaited1<T> = T extends object & {
  then(onfulfilled: infer F, ...args: infer _): any; // 새로운 타입 변수 infer F🔵
} //  T extends object & Promise<> 이렇게 안한이유🥱: Promise에도 then이 있고 {then(onfulfilled: infer F, ...args: infer _): any;} 이 객체에도 then이 있으면 서로 같은 것으로 취급, Duck Typing이라고 한다.🟢
  ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
    ? Awaited<V> // recursively unwrap the value
    : never // the argument to `then` was not callable
  : T; // non-object or non-thenable

const arr = [1, 2, 3] as const;
type Arr = keyof typeof arr;
const key: Arr = "length";

type Result = Awaited<Promise<Promise<Promise<number>>>>; // type Result = number
// 3프로미스 -> 2프로미스 -> 1프로미스의 value: number ...

// Duck Typing🟢, 프로미스(객체) 모양(then)이 똑같으면 같은 것으로 취급
type Result1 = Awaited<{ then(onfulfilled: (v: number) => number): any }>; // thenable, 프로미스가 아니라 then을 넣을 수 있는 thenable객체도 잘 추론해냄.
// { then(onfulfilled: infer F, ...args: infer _): any; } 프로미스의 모양이다, 프로미스가 then을 갖고 있으므로 프로미스의 모양이다🟢
// 프로미스가 아니더라도 그 일부분만 같더라도 같은 것으로 취급한다🟢🟢
```

## 완전 복잡한 타입 분석하기(bind 편)

```javascript
// bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
// bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
// bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
// bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
// bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
// bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R;

// 기본 bind🟢
function a(this: Window | typeof obj, param: string) {
  console.log(this.name);
}

const obj = { name: "zerocho" };
const b = a.bind(obj);
b("1"); // 'zerocho';

// ThisParameterType🟢, bind함수의 2번쨰 자리
type ThisParameterType1<T> = T extends (this: infer U, ...args: never) => any
  ? U
  : unknown;
// T는 함수, 함수 자리에서 this를 추론
type T = ThisParameterType<typeof a>; // type T = Window | { name: string; } this를 추론

// OmitThisParameter🟢
type OmitThisParameter1<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
// this가 없음.🟠 this를 없에는 함수
// ThisParameterType을 했을때 unknown이 나온다면(타입추론이 실패했을 떄 그 함수 타입 그대로) T
// unknown extends ThisParameterType<T>이게 아니라면 타입추론 성공했을 때 T extends (...args: infer A) => infer R ? (...args: A) => R : T;
// T extends (...args: infer A) => infer R, 매개변수와 return 값을 알아내서 그걸 매개변수와 return 값으로 하는 함수로 만들어라🟠
// 매개변수에서 this가 없는데 this를 제외한 나머지 매개변수를 가져오는 것이다,
// ThisParameterType에서 타입추론이 실패했을떄 this가 없기 때문에 unknwon이 되기 떄문, 가능했다면 U🟠
// OmitThisParameter1<T> = unknown extends ThisParameterType<T>? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;, this가 없는 상황이면 그대로 T 사용
// 타입추론이 성공했다 하더라도 this를 제외한 매개변수와 리턴값을 사용하는 함수를 다시 만들기🟠
type NoThis = OmitThisParameter<typeof a>; // type NoThis = (param: string) => void, this를 없앤 함수타입 추출

// bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
// bind를 쓰면 this가 없는 함수가 나올 것🟢

// bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
// bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
// bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
// bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
// bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R;
// 왜이렇게 많은 오버로딩이 있을까?🤔
// bind - this 사용하는 경우🔵
const zerocho = {
  name: "zerocho",
  sayHello(this: { name: string }) {
    // bind -> this 제거
    console.log(`hi ${this.name}`);
  },
};
const sayHello = zerocho.sayHello;
const sayHi = zerocho.sayHello.bind({ name: "nero" }); // bind, thisArg: { name: string; } ThisParametertype으로 뽑아냄🟠
sayHi();

// bind - this 사용하지 않는 경우❌ - 오버로딩 하는경우🟢
function add(a: number, b: number, c: number, d: number, e: number, f: number) {
  return a + b + c + d + e + f;
}
// 고차함수에서 커링하는 느낌
const add1 = add.bind(null); // this를 null로 bind, 결과는 같다 add가 this를 사용하지❌
add1(1, 2, 3, 4, 5, 6);
const add2 = add.bind(null, 1); // 인수의 개수를 늘리는 경우는 매개변수 자리에 미리 값을 채워넣는 경우
add2(2, 3, 4, 5, 6);
// bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
// this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0), 매개변수
// (...args: A) => R, 함수의 리턴값
// this: (this: T, arg0: A0, ...args: A) => R, this는 함수형태이고 ...args는 arg0(1 add2에서)제외한 나머지
// thisArg: T, add2에서는 null
// arg0: A0, add2에서는 1
// ...args의 타입으로 리턴값 타입 결정🟢
// 근데 ts가 매개변수 5개일 떄는 안만들어놨다.🤔
const add3 = add.bind(null, 1, 2);
add3(3, 4, 5, 6);
const add4 = add.bind(null, 1, 2, 3);
add4(4, 5, 6);
const add5 = add.bind(null, 1, 2, 3, 4); // const add5: (e: number, f: number) => number
add5(5, 6);
const add6 = add.bind(null, 1, 2, 3, 4, 5); // const add6: (...args: (1 | 2 | 3 | 4 | 5)[]) => number 🤔🤔
// add6(6); ❌'6' 형식의 인수는 '1 | 2 | 3 | 4 | 5' 형식의 매개 변수에 할당될 수 없습니다
add6(5); // const add6: (...args: (1 | 2 | 3 | 4 | 5)[]) => number, 매개변수가 5개 이상이면 그대로 다 넘겨버림🟢
```

## 완전 복잡한 타입 분석하기(flat 편)

```javascript
// bind가 언어적 한계 떄문에 매개변수의 갯수가 많아지면 하나의 함수를 만들어 사용
// flat도 이와 유사
const a = [1, 2, 3, [1, 2], [[1], [2]]].flat(); // [1,2,3,1,2,[1],[2]];
const a1 = [1, 2, 3, [1, 2], [[1], [2]]].flat(2); // [1,2,3,1,2,1,2]; 2차원 낮게 만들어라
const b = [1, 2, 3, [1, 2]].flat(); // [1,2,3,1,2];

// es2019, flat🟢
// flat<A, D extends number = 1>( 기본적으로 1차원 낮게 만든다.
//    this: A,
//    depth?: D 기본 depth는 1
// ): FlatArray<A, D>[]

// FlatArray🟢
// type FlatArray<Arr, Depth extends number> = {
//    "done": Arr,
//    "recur": Arr extends ReadonlyArray<infer InnerArr>
//        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
//        : Arr
// }[Depth extends -1 ? "done" : "recur"];

// [Depth extends -1 ? "done" : "recur"];
type A = {
  name: string;
  age: number;
};
type B = A["name"]; // type B = string
type B1 = A["1" extends number ? "age" : "name"]; // type B = string

// FlatArray 분석🟠
// type FlatArray<Arr, Depth extends number> = {
//    "done": Arr,
//    "recur": Arr extends ReadonlyArray<infer InnerArr>
//                         ReadonlyArray<T>에서 T는 배열 요소의 타입: number, number[],number[][] ...
// 요소의 타입을 추론해라,
//        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
// number, number[],number[][]... : 3차원 배열이 2차원배열로 변환
// Depth가 여기서 줄어듦
//        : Arr
// }[Depth extends -1 ? "done" : "recur"];
// Depth가 -1이면 done이면 flat적용이 완료된 상태, 그게 아니면 recur 재귀적으로 Depth 하나씩낮추는 것
// 그럼 어떻게 낮춰주는가?😨 Type에서는 빼기가 안됨 type C = 3 -1;❌
// Depth가 -1이 될 때까지 recur, 계속 FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>이 됨
// Depth가 1씩 빠짐 결국, Depth는 -1이 된다.

// 3차원 배열이 어떻게 1차원으로 추론이 됐는지 분석🟢
const a2 = [1, 2, 3, [1, 2], [[1], [2]]].flat(2); // const a2: number[]
// flat<A, D extends number = 1>(
//    this: A,
//    depth?: D 기본 depth는 1
// ): FlatArray<A, D>[]

// FlatArray<(number[] | number[][] | number[][][]), 2>[], depth가 2이므로 recur 돈 후 1로 변환
// FlatArray<(number | number[] | number[][]), 1>[], 배열의 자식들을 추론해서  한단계 낮아짐
// FlatArray<(number | number  | number[]), 0>[] "Arr extends ReadonlyArray<infer InnerArr> ? ~ : Arr(num)"  -> number
// FlatArray<(number | -1), 2>[]
// number[]
```

## ts 라이브러리 분석

- `package.json`의 `types` 속성(혹은 `typings`)에 적힌 파일이 메인 타이핑 파일임.
  - c.f.) `Axios` lib의 `index.d.ts`에 실제 구현은 없고 타입 정의만 있다. ts 사용자를 위해서
    - `declare`는 선언은 다른 파일에 되어 있고 `type`만 새로 선언한다는 의미
  - `main`은 가장 중요한 파일을 의미.
  - `module`은 ECMA 스크리브 모듈 ES2015 이상 모듈에서 가장 중요한 파일
  - `types`가 없는 lib는 타입이 없는 라이브러리
  - 깃헙에 있는 코드와 실제 설치를 했을 때 생기는 코드랑은 다르다.
    - c.f.) `redux repo`에서 `types:types/index.d.ts`라고 명시되어 있지만 `types`파일은 없다.
    - why?🤔
      - ts는 결국 js로 변환, 그래야 js를 노드나 브라우저에서 돌린다. 그래서 결국 lib를 설치했을 떄 최종적으로 나오는 것은 js파일이어야 한다.
      - 단, `index.d.ts`는 있다, type을 확인하기 위함
    - 그래서 최종적으로 ts파일들을 js파일로 바뀌면서 dts 파일을 하나 내보낸다.
    - `ts -> js + index.d.ts`
- `npmjs.com`에서 패키지를 검색했을 때 패키지 우측에 `TS`로 뜨면 `ts`지원 라이브러리이고, `DT`로 뜨면 `@types`를 설치해야 하며, 그것마저도 없으면 직접 타이핑해야 함
  - `DefinitelyTyped` -> `DT`, 오픈소스다.
  - react도 기본적으로 타입을 지원하지는 않음. -> `DT`
    - 사람들이 기여를 한 것이기 때문에, 실제 리액트의 타입과 다를 수 있다는 단점이 존재❌
- 첫 번째 줄부터 보기 보다는 마지막 줄 `exports default나 export` = 부분을 보고 거슬러 올라가는 게 좋음
- 제네릭이 제일 읽기 어려워서 제네릭 부분은 따로 필기하면서 보는게 좋음

## jQuery의 타이핑

```ts
$("p").removeClass("myClass noClass").addClass("yourClass");
$(["p", "t"]).text("hello");
const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
```

- jquery는 `DT`파일, `npm i -D @types/jquery`
  - 이런 `@types`들은 개발할 때만 필요, 결국엔 js파일로 변환돼서 배포. 보통 @types는 dev디펜더시로 설치
- 변수를 클릭하여 타입을 확인해도 되지만, 전체적인 타입의 흐름을 알고싶다면 npm사이트에서 `detailed`의 깃헙 사이트에서 `index.d.ts`참조
  - `// TypeScript Version: 2.7` 이상부터 해당 타입들 사용 가능하다는 의미를 내포
- `reference` 종류
  - `types`: npm 라이브러리
  - `path`: 현재 라이브러리 파일
  - `lib`: TS 기본 제공 라이브러리
  - `@types/sizzle`은 `@types/jquery` 설치 시 같이 설치되어 node_modules 안에 같이 들어이쎄 됨.
- 항상 `index`파일을 먼저 봐야한다. 어떤 것을 참고하고 있는지 확인해야 한다.
  - `export =jQuery;`에서 `jQuery`는 버전 아래에 참조하고 있는 파일 중에서 나온 것이다.
    - c.f.) https://github.com/DefinitelyTyped/DefinitelyTyped/blob/ef87ee53bc501c0f0e79797add156fd8fa904ede/types/jquery/index.d.ts

## commonjs 모듈 타이핑하는 방법과 esModuleInterop

- `Typescript(ES2015)`는 기본적으로 `import`, `export` 사용

  ```ts
  import $ from "juery";
  export default $;
  ```

- `node(commonJS)`에서는 `require`, `module.exports` 사용

  ```ts
  const $ = require("jquery");
  module.exports = $;
  ```

- 근데 값자기 아래와 같은 문법이 나옴.

  ```ts
  export = jQuery;
  ```

  - `TypeScript`에서 `CommonJS`를 표시하는 방법🔥
  - `jQuery`는 `CommonJS`형식으로 쓰여진 라이브러리이다.
  - 그래서 위 문(`Statements`)은 아래와 같이 표현이 가능하다.

  ```ts
  module.exports = jQuery;
  ```

   <details><summary>표현식과 문</summary>

  - 표현식(`Expressions`)은 값을 만들어내는 코드 조각으로, 어떤 형태의 계산이나 연산을 수행합니다. 표현식은 항상 어떤 값으로 평가됩니다.

  ```js
  2 + 3; // 숫자 덧셈 표현식, 결과는 5
  var x = 10; // 변수 할당 표현식, 결과는 10
  myFunction(); // 함수 호출 표현식, 결과는 함수의 반환 값
  ```

  - 문(`Statements`)은 프로그램에서 실행될 수 있는 독립적인 명령이며, 어떤 동작을 수행하도록 합니다. 자바스크립트에서 문은 보통 세미콜론(;)으로 끝나며, 여러 줄로 구성될 수 있습니다.

  ```js
  var a = 5; // 변수 선언 및 할당문
  if (a === 5) {
    console.log("a is 5"); // 조건문 (if 문)과 함수 호출문
  } else {
    console.log("a is not 5");
  }
  ```

  - 차이점
    - 표현식은 값을 반환하고, 문은 값을 반환하지 않습니다.
    - 표현식은 문의 하위 집합이며, 모든 표현식은 문이지만 모든 문이 표현식은 아닙니다.
    - 표현식은 항상 어떤 값으로 평가되지만 문은 일반적으로 어떤 동작을 실행하고 값을 반환하지 않습니다.
      c.f. )
      예를 들어, if 문은 표현식이 아닙니다. if 문은 어떤 조건에 따라 코드 블록을 실행하므로 값으로 평가되지 않습니다. 반면에, 삼항 연산자 (? :)를 사용하는 조건부 표현식은 값으로 평가됩니다.
    - 결론
    이 코드는 특정 컨텍스트에서 사용되는 모듈 시스템의 문법이기 때문에 표현식이 아니라 <mark>문</mark>으로 간주된다.
    </details>
  - 그러면 가져올 때는?
    ```ts
    const $ = require("jquery"); // 이런식으로 가져와야 하는데 아래와 같이 가져오게 된다.
    import $ = require("jquery"); // 이렇게 된다.
    ```
    - 그래서 `Ts`에서도 `require`를 쓰는 경우가 있다.
    - 다른 `Library`를 가져올 때는 `import $ from 'jquery';` 이런식으로 가져온다.
    - `Library`가 ES2015 모듈인지 `CommonJS`인지 어떤 모듈을 사용하고 있는지 구별이 어렵다.
  - 근데 뭔가 하나의 방법으로 가져오는 방법이 필요해 보인다🤔
    ```ts
    import * as $ from "jquery"; // 아래와 같다고 보면 된다.
    import $ = require("jquery");
    ```
    - `React`에서 `import`하는 예시를 확인해보자.
      ```ts
      import React from "react"; // 이렇게 작성하는 것은 원칙적으로 잘 못된 것이다. ❌
      import * as React from "react"; // 이렇게 작성해야 한다. ✅
      ```
    - `/app/node_modules/@types/react/index.d.ts`에서 확인해보면
    ```ts
    // eslint-disable-next-line @definitelytyped/export-just-namespace
    export = React;
    export as namespace React;
    ```
    이런 문을 확인해 볼 수 있다.
    위에서 언급했듯이,
    ```ts
    export = React; // 아래와 같다고 보면 된다.
    module.exports = React;
    ```
    그래서 `React`도 최신 문법(`ES2015.`)이 아니라 `CommonJS` 모듈 시스템인 것이다.
    - 엄밀히 말하면 `export as namespace React;`때문에 `UMD` 모듈 시스템이다.
      그러므로
      ```ts
      import React from "react"; // 이렇게 작성하는 것은 원칙적으로 잘 못된 것이다. ❌
      import * as React from "react"; // 이렇게 작성해야 한다. ✅
      import React = require("react"); // 위 코드와 동일하다.
      ```
      근데 `import React from "react";`이런식으로 사용이 가능했던 이유는 뭘까?
  - 여기서 `esModuleInterop`가 나온다. `tsconfig.json`의 옵션 중 하나인데

  ```ts
  "esModuleInterop": false // false라면
  import * as React from "react"; // 이런식으로 작성해야 한다.
  "esModuleInterop": true // true라면(기본값이 true🔥) '* as'를 붙여주기 좀 그래서, * as를 생략한 형태로 작성이 가능하다.
  import React from "react"; // '* as'이 생략된 형태
  ```

  - `esModuleInterop`이 `CommonJS`를 `ESmodule`처럼 인식될 수 있게 해주는 옵션이라고 보면 된다.

  - 만약에 `export default $;`이런 식으로 작성되있다면 최신 문법(`ESmodule`)이다.
  - `export = $;`라면 `CommonJS`라고 보면 된다.
    ```ts
    export default $; // ESmodule
    export = $; // CommonJS
    ```
    - 그래서
    ```ts
    "esModuleInterop": true // true라면 아래와 같이 작성이 가능하다.
    import $ from 'jquery';
    import $ from 'jquery';
    ```

### 네임스페이스(namespace)

```js
/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" /> 🔥
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
// const jQuery: JQueryStatic 🔥

declare const jQuery: JQueryStatic;
declare const $: JQueryStatic;
// misc.d.ts 기타
```

- jQuery, $ 둘다 `JQueryStatic`으로 되어 있다.
- declare는 실제 구현은 없이 타입만 선언해 놓은 것, 실제 구현은 다른 곳에 있다고 가정해놓고 사용
  - 이런 것을 `ambient 선언`이라 한다
- 이를 통해 아래와 같이 작성 가능

```js
$("p").removeClass("myClass noClass").addClass("yourClass");
jQuery("p").removeClass("myClass noClass").addClass("yourClass");
```

- declare로 선언된 $를 JQueryStatic.d.ts파일에서 찾아보면(`ambient`선언)

```js
    <TElement extends HTMLElement = HTMLElement>(
        html: JQuery.htmlString,
        ownerDocument_attributes?: Document | JQuery.PlainObject,
    ): JQuery<TElement>;
```

- `html: JQuery.htmlString,` 부분에서 `JQuery.`은 어디서 오는걸까

```js
declare namespace JQuery {
    type TypeOrArray<T> = T | T[];
    type Node = Element | Text | Comment | Document | DocumentFragment;

        /**
     * A string is designated htmlString in jQuery documentation when it is used to represent one or more DOM elements, typically to be created and inserted in the document. When passed as an argument of the jQuery() function, the string is identified as HTML if it starts with <tag ... >) and is parsed as such until the final > character. Prior to jQuery 1.9, a string was considered to be HTML if it contained <tag ... > anywhere within the string.
     */
    type htmlString = string;
    /**
     * A selector is used in jQuery to select DOM elements from a DOM document. That document is, in most cases, the DOM document present in all browsers, but can also be an XML document received via Ajax.
     */
    type Selector = string;
    ...
}
```

- 네임스페이스는 script src로 불러오는 라이브러리에서 주로 사용(전역)
- `htmlString`, `Selector`와 같이 명시되어 있는 타입들을 JQuery라는 이름으로 묶어줬다고 보면 된다.
- 왜 쓰는가?🤔

```js
declare const a: string;
declare const b: string;
declare const c: string;
declare const c: string; ❌

declare namespace jyj {
  const a: string;
  const b: string;
  const c: string;
}
jyj.a
```

- 다른 라이브러리에서 변수명이 겹친다면 충돌나므로, 커스텀이름으로 묶는 것
- `JQuery<TElement>;`
  - `interface JQuery<TElement = HTMLElement>`, html태그를 받는 제네릭
  - `namespace JQuery`
  - 2가지 타입이 존재, 뒤에 제네릭이 존재하는 첫 번째 타입이 맞음

```js
$("p").removeClass("myClass noClass").addClass("yourClass");
// 위 코드는 아래와 동일
const $p = $("p");
$p.removeClass("myClass noClass").addClass("yourClass");
```

- $p의 타입은 결국 타입을 타고타고 들어와서 JQuery<HTMLElement>라는 분석이 나옴.
  ```js
  const $p: JQuery<HTMLElement>
  ```

### 메서드와 this 타이핑

```ts
removeClass(
    className_function?:
        | JQuery.TypeOrArray<string> 🔥
        | ((this✅: TElement, index: number, className: string) => string),
): this;

 1️⃣ TS에서 첫 번째 매개변수가 this인 경우, 없다고 생각하면 된다. 실제 매개변수는 2개
$("p").removeClass((`this❌`index, className) => {
    return 'myClass';✅
}).addClass("yourClass");

📓lib.dom.d.ts에서 addEventListener를 확인해보면 this를 타이핑 해놓았음.
document.querySelector('h1')?.addEventListener('click', function() {
    console.log(this);
    this: HTMLHeadingElement🔥 -> 'h1'
  })
addEventListener<K extends keyof HTMLElementEventMap>
(type: K, listener: (this: HTMLHeadingElement🔥, ev: HTMLElementEventMap[K]) =>
any, options?: boolean | AddEventListenerOptions): void;

2️⃣
type TypeOrArray<T> = 🔥 T | T[]; 🔥
case1: $("p").removeClass("myClass noClass").addClass("yourClass");
case2: $("p").removeClass(["myClass", "noClass"]).addClass("yourClass");

3️⃣
removeClass -> addClass 메서드 체이닝, removeClass의 return값은 this

$p.removeClass:this -> $p가 되고 아래처럼 된다.
$p.addClass('yourClass');

addClass(
    className_function:
        | JQuery.TypeOrArray<string>
        | ((this: TElement, index: number, currentClassName: string) => string),
): this;

addClass또한 return값이 this🔥

const tag = $("ul li")
  .addClass("hello")
  .addClass(function (index🔥) {
    return "item-" + index;
  });

4️⃣
$(["p", "t"]).text("hello");
interface PlainObject<T = any> {
    [key: string]: T;
} 아무거나 가능

text(
    text_function:
        | string
        | number
        | boolean
        | ((this: TElement, index: number, text: string) => string | number | boolean),
): this;
$(["p", "t"]).text(()=> {
    console.log(this); // this: string[]
    return 'hello';
});
함수 안에 존재하는 함수의 this는 상위에 있는 것을 그대로 받아오기 때문에 화살표 함수로 만들어 주는 것이 좋다.

5️⃣
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});

const div = document.createElement('div');
div.innerHTML ='hello';
const div1 = document.createDocumentFragment();

$(tag).html(div); // const div: HTMLDivElement < Element
$(tag).html(div1); // const div1: DocumentFragment

declare namespace JQuery {
    type TypeOrArray<T> = T | T[];
    type Node = Element | Text | Comment | Document | DocumentFragment;
    Element는 태그, Document | DocumentFragment는 DOM
    ...
}
```

- TS에서 첫 번째 매개변수가 this인 경우, `없다고 생각하면 된다.`
  - 안에서 사용하고 있는 메서드에서 this에 대한 타이핑을 해놓았기 때문.
- return 타입이 this인 경우 `메서드 체이닝`이 가능
  - remove and addClass
- 함수 안에 존재하는 함수의 this는 상위에 있는 것을 그대로 받아오기 때문에 화살표 함수로 만들어 주는 것이 좋다.

### jQuery 타입 직접 만들어보기

```ts
interface baoQuery<T> {
  text(
    param?:
      | string
      | number
      | boolean
      | ((this: T, index: number) => string | number | boolean)
  ): this;
  html(param: string | Document | DocumentFragment): void;
}
// interface에서 this는 자기 자신을 가르키며, 첫 번쨰 param이 this인 경우 타이핑이 이미 존재

const $tag: baoQuery<HTMLElement> = $([
  "p",
  "t",
]) as unknown as baoQuery<HTMLElement>;

$tag.text("123");
$tag.text(123);
$tag.text(function (index) {
  console.log(this, index);
  return true;
});
$tag.text().html(document);

const tagType = $("ul li")
  .addClass("hello")
  .addClass(function (index) {
    return "item-" + index;
  });

$(tagType).html(document);
// tagType이 jQuery인데 다시 jQuery로 감싼경우
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}
// 유사배열, querySelectorAll같은것들
```

- 제네릭 자리 실제 타입으로 대체해보기🟠

### JQuery 타입 분석 마무리

JQuery.d.ts

```ts
html(
    htmlString_function:
        | JQuery.htmlString
        | JQuery.Node
        | ((this: TElement, index: number, oldhtml: JQuery.htmlString) => JQuery.htmlString | JQuery.Node),
): this;

$(tag).html(function(index) { // 함수 선언시, oldhtml과 같은 매개변수를 선택적으로 고를 수도
  return '<div>hello</div>'
});
function add(x:string, y?:string): string {return x+y};
add('1', '2'); // 함수 호출시 필요 없는 경우에 ?를 붙이거나 인수 맞춰야
```

- 인수는 생략❌, 매개변수가 생략 가능

```ts
/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
```

- reference로 다른 패키지 가져오거나 파일을 가져올 수 있다.
- 모듈 시스템의 차이

  ```js
  import $ from "jquery";
  export {};
  ```

  - 위처럼 import 문, export문의 유무에 따라서 이 파일이 어떻게 인식되는지가 달라진다.
  - 있다면 module 시스템으로 인식하고 없다면 전역 스크립트로 인식한다.
  - 전역 스크립트로 인식되는 경우 이 파일에서 작성한 타입들이 다른 파일에 있을 것이라고 생각하고
  - 에러가 안뜨게 된다. 그래서 괜히 모듈 시스템으로 만들어서 타입이 꼬이는 경우가 있다.

- 네임 스페이스
  - 네임스페이스는 script src로 불러오는 라이브러리에서 주로 사용(전역)
  - htmlString, Selector와 같이 명시되어 있는 타입들을 JQuery라는 이름으로 묶어줬다고 보면 된다.
  - 다른 라이브러리에서 변수명이 겹친다면 충돌나므로, 커스텀이름으로 묶는 것

---

## Axios 타입 분석

#### 처음 타입 분석을 할 떄 중요한점🔥

- index.d.ts 파일에서 아래에서 위로 흐름을 파악해야 한다.
- `export = ` 이 있다면 `CommonJS Module`이다. 아래와 같이 `import`해야 한다
  - `import axios = require('axios');`
  - 하지만 <mark>"esModuleInterop": true</mark> 설정을 한다면
    - `import * as axios from 'axios';`, <mark>\* as</mark> 제거 가능
    - `import axios from 'axios';`
    - 결국은 `ESModule`, `ES2015` 모듈이랑 똑같이 임포트할 수 있다.
- `export default axios`로 되어 있다면 아래와 같이 `import` 가능
  - `import axios from 'axios';`

#### Error

```ts
모듈 '"/Users/okpanda/git/Typescript-Study/axios"'에는 기본 내보내기가 없습니다.ts(1192)
// tsconfig.json에서 옵션 변경
"moduleResolution": "node", /* Specify how TypeScript looks up a file from a given module specifier. */
(node:4703) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
// package.json 추가
"type": "module",
```

- `tsconfig.json`에서 `"module": "ES2022" -> "module": "CommonJS"` 설정을 바꾸어주어더니 `package.json`에서 추가한 `"type": "module",`때문에 에러가 났다.

  - `Typescript는` 기본적으로 ES모듈을 지원하며, js의 모듈 시스템을 변경하는데(`ES` or `CommonJS`) 2가지 방법이 존재
    - `package.json`에서 `'types'필드`를 사용하여 바꿀 수 있음.
      - `"type": "module"`은 `ES 모듈 시스템`을 사용하고 있음을 나타내며, `"type": "commonjs"`는 `CommonJS 모듈 시스템`을 사용하고 있음을 나타냄
    - `tsconfig.json: "module"` 필드를 사용하여 `TypeScript` 컴파일러에게 `JavaScript` 파일을 어떤 모듈 형식으로 생성할지 지시할 수 있다.
      - `"module": "ES2022"`는 `ES 모듈 시스템`을 사용하여 `JavaScript` 파일을 생성하고, `"module": "CommonJS"`는 `CommonJS 모듈 시스템`을 사용하여 `JavaScript` 파일을 생성

- `"package.json"` 파일에서 `"type": "module"`을 추가하는 것은 해당 프로젝트가 `ES 모듈 시스템`을 사용한다는 것을 명시하는 것

  - 이것은 `Node.js`에서 기본적으로 `CommonJS` 모듈 시스템을 사용하는 것과는 다르다.

- `ES 모듈 시스템`은 `"import"` 및 `"export"` 구문을 사용하여 모듈을 가져오고 내보내는 데 사용된다. 반면에 `CommonJS` 모듈 시스템은 `"require"` 및 `"module.exports"`를 사용한다.

- 따라서 `"type": "module"`을 추가하면 해당 프로젝트의 `JavaScript` 파일은 `ES 모듈 시스템`의 규칙을 따르게 되며, `"import"` 구문을 사용하여 외부 패키지를 가져올 수 있다. 그래서 `"axios"`와 같은 패키지를 `"import"`를 사용하여 가져올 수 있게 된다.

- `"ReferenceError: exports is not defined in ES module scope"`와 같은 오류는 `CommonJS 모듈 시스템`을 사용할 때 발생하는 오류로, `"exports"`라는 변수가 ES 모듈 시스템에서는 정의되어 있지 않기 때문에 발생, `"type": "module"`을 추가하면 `Node.js`는 `ES 모듈 시스템`으로 인식하므로 `CommonJS` 관련 오류가 발생할 수 있다.

### 다양한 방식으로 사용 가능한 axios

- 브라우저(), node 양측에서 요청을 보낼 떄 사용 가능
  - 브라우저, node에서 `fetch`(저수준) 가능하다.
  - axios = fetch + <mark>부가기능</mark>
  - axios는 `XMLHttpRequest`기반, fetch기반이 아님
- `npm i axios`
  - `npm`사이트에서 <mark>ts</mark>가 있으면 별도의 <mark>@types/axios</mark>를 설치안해도 된다.

axios, index.d.ts

```ts
export interface AxiosStatic extends AxiosInstance {
  create(config?: CreateAxiosDefaults): AxiosInstance;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  Axios: typeof Axios;
  AxiosError: typeof AxiosError;
  HttpStatusCode: typeof HttpStatusCode;
  readonly VERSION: string;
  isCancel: typeof isCancel;
  all: typeof all;
  spread: typeof spread;
  isAxiosError: typeof isAxiosError;
  toFormData: typeof toFormData;
  formToJSON: typeof formToJSON;
  getAdapter: typeof getAdapter;
  CanceledError: typeof CanceledError;
  AxiosHeaders: typeof AxiosHeaders;
}
export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R>;
  <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;

  defaults: Omit<AxiosDefaults, "headers"> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  };
}

const a = () => {};
a.creatr = () => {};
a.isAxiosError = () => {};
a.z = "123";

a();
a.create();
a.isAxiosError();
a.z;
export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  ...
}
```

- 함수인 객체(`AxiosInstance`)를 상속받아서 또 다른 객체의 속성들을 넣어 주는것이 가능하다.
- `Axios`를 상속받는데 이번엔 class이다.
- 그래서 `axios`는 클래스(`Axios`)이면서 함수(`AxiosInstance`)이면서 객체(`AxiosStatic`)인것
- 실제로 아래와 같이 3가지 사용이 가능
  - `new axios();`
  - `axios();`
  - `axios.get();`
  - `axios.get;` `axios.delete;` 는 `class Axios`에 들어있다.

axios.ts

```ts
import axios from "./node_modules/axios/index";

(async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log(res);
  } catch (error) {}
})();
```

axios.js

```js
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
(async () => {
  try {
    const res = await axios_1.default.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(res);
  } catch (error) {}
})();

🟠response

 export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}
```

tsconfig.json

```ts
"module": "ES2022" -> "module": "CommonJS"
```

- js변환(`npx tsc`), `node axios.js`가 귀찮으면, `npm i -g ts-node`
  - `-g`옵션을 통해 `npx ts-node axios`가 아닌 `ts-node axios`가 가능
  - `npx는` `npm` 패키지를 실행하는 데 사용되는 도구
  - 일반적으로 npm 패키지를 전역으로 설치하지 않고 특정 프로젝트에서만 사용하려는 경우에 사용, npx를 사용하면 로컬 프로젝트에 설치된 패키지를 간단하게 실행할 수 있다.
  - `npx를` 사용하면 전역 설치된 패키지를 찾아 실행할 필요가 없으며, 로컬 프로젝트의 패키지를 사용할 때 편리, 만약 전역으로 ts-node를 설치했다면 npx를 사용하지 않고 ts-node axios.ts로 실행할 수 있다.
- `__importDefault`: CommonJS랑 ES2015Module 둘 다 지원하기 위한 트릭

### 제네릭을 활용한 Response 타이핑

```js
ts-node axios.ts
```

response

```json
{
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\n' +
    'suscipit recusandae consequuntur expedita et cum\n' +
    'reprehenderit molestiae ut ut quas totam\n' +
    'nostrum rerum est autem sunt rem eveniet architecto'
}
```

import axios from "axios";

```ts
(async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log(res.data);
    console.log(res.data.userId);
  } catch (error) {}
})();
```

- `res.data.userId`의 타입은 any, 타입을 명시해줘야.

`axios.get`의 타입을 확인해보면

```ts
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;

  export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}
```

- 제네릭의 첫 번째 인자인, T는 `any`인 상태
- `get`의 제네릭 매개변수 자리에 명시해주면 된다.

```ts
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
// type Post = {userId: number, id: number, title: string, body: string} // type alias
(async () => {
  try {
    const res = await axios.get<Post>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(res.data);
    console.log(res.data.userId);
    console.log(res.data.id);
    console.log(res.data.title);
    console.log(res.data.body);
  } catch (error) {}
})();

(method) Axios.get<Post, AxiosResponse<Post, any>, any>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<Post, any>>
// 현재 내 axios.get의 타입
```

- 이제 userId의 타입이 명확해졌다.
- interface로해도 되고 type alias로 해도 가능하다.
  - interface: 객체지향적
  - type alias: 간단하게
- `get`의 타입을 보면 `any`가 있는데, 없애주고 싶다면 직접 넣으면 된다.
  - `await axios.get<Post, AxiosResponse<Post>>`

`axios.post`의 타입을 확인해보자

```ts
(async () => {
  try {
    const res2 = await axios.post(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
  } catch (error) {}
})();
```

```ts
  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;

export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method | string;
  baseURL?: string;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
  params?: any;
  paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer;
  data?: D;
  ...
}
```

- `any`타입을 명확하게 하고자한다면,

```ts
interface Created {}
interface Data {
  title: string;
  body: string;
  userId: number;
}
const res2 = await axios.post<Created, AxiosResponse<Created>, Data>(
  "https://jsonplaceholder.typicode.com/posts/",
  {
    title: "foo",
    body: "bar",
    userId: 1,
  }
);
```

- `AxiosRequestConfig`, `fetch`에는 없는 다양한 속성들이 있기에 `axios`가 더 편한 것.
- `post` 메서드의 2번째 인자에는 data가 들어가는데 여기서는 any로 명시되어 있다.
- 사실 위에서 요청한 `post`에서는 `D`타입이 안쓰이고 있다.

```ts
const res3 = await axios({
  method: "post",
  url: "https://jsonplaceholder.typicode.com/posts/",
  data: {
    title: "foo",
    body: "bar",
    userId: 1,
  },
});
const res4 = await axios("https://jsonplaceholder.typicode.com/posts/", {
  method: "post",
  url: "https://jsonplaceholder.typicode.com/posts/",
  data: {
    title: "foo",
    body: "bar",
    userId: 1,
  },
});
```

위에서 `axios`는

```ts
export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R>; // 🟠 요 타입에 걸린다.
  <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>; // res4

  defaults: Omit<AxiosDefaults, "headers"> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  };
}
```

- `config: AxiosRequestConfig<D>`는 위에서 언급했으며 이상하게도 `D`는 안쓰인다(?)
  - `axios`가 그렇게 만들었다.
- `axios`에는 다양한 요청법이 존재, `AxiosRequestConfig`, `AxiosInstance` 등..

### AxiosError와 unknown error 대처법

axios index.d.ts

```ts
export class AxiosError<T = unknown, D = any> extends Error {
  constructor(
      message?: string,
      code?: string,
      config?: InternalAxiosRequestConfig<D>,
      request?: any,
      response?: AxiosResponse<T, D>
  );

  config?: InternalAxiosRequestConfig<D>;
  code?: string;
  request?: any;
  response?: AxiosResponse<T, D>; // 옵셔널체이닝🟠
  ...
}
```

```ts
(async () => {
  try {
    ...
  } catch (error) {
    1️⃣
    console.log((error as AxiosError).response?.data);
    error.response?.data; //error'은(는) 'unknown' 형식, ts는 건망증이 심하다.

    2️⃣
    const errResponse = (error as AxiosError).response;
    console.error(errResponse?.data);
    errResponse?.data; // const errResponse: AxiosResponse<unknown, any> | undefined

    3️⃣
    if (error instanceof AxiosError) {
      error.response; // (local var) error: AxiosError<any, any> 보장이 된다.
    }

    export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;

    if (axios.isAxiosError<{message: string}>(error)) {
      console.error(error.response?.data.message); // (property) message: string | undefined 🔥 바뀐 후
    }

    if (axios.isAxiosError(error)) {
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message
      ); // (property) message: string 🔥 바뀌기 전
      console.error(
        (error as AxiosError<{ message: string }>).response?.data.message
      ); // 🔥 error 부분에 as 명시해도 가능
    }
  }
})();

```

- 1️⃣ 변수로 에러를 지정하지 않은 경우, 다음 줄에서 ts가 인식을 못함
- 2️⃣ 변수로 에러 정의시, ts가 인식
- 2️⃣ 는 좋은 방법이 아니다. catch문에는 어떤 Errror가 올지 모른다.
- 3️⃣`커스텀 타입 가드`가 좋은 방법이다.
  - error의 타입이 보장된다.
  - `class AxiosError`처럼 `class`여야 타입가드가 가능
  - `isAxiosError`에서도 데이터 타입에 대한 제네릭을 제공한다(이전엔 안했었음)🔥
  - 위 코드에서 마지막이 바뀌기 전 코드다.
    - `as`를 안써주도록 하는 것이 좋다.
    - `{ message: string }`가 `response`에 전달되고 `data`까지 전달됨.

### Axios 타입 직접 만들기

```ts
interface Config<D = any> {
  method?: "post" | "get" | "put" | "delete" | "head" | "options";
  // method?: string; 타입은 좁히는 것이 좋다.
  url?: string;
  data?: D;
}

interface A {
  get: <T = any, R = AxiosResponse<T>>(url: string) => Promise<R>;
  // res.data가 T, 응답 자체는 AxiosResponse 이므로 AxiosResponse을 제네릭 변수로 저장한 Promise<R>이 return값
  // T=any, 코드에 제네릭을 안쓰고 싶을수도 있으니 T에도 any부여
  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data: D
  ) => Promise<R>;
  // await이 붙을 수 있다면, return 값은 Promise. Promise는 ts에서 기본적으로 제공을 해줌.

  /*
지금까지 axios타입분석에서 왜 data=any를 할당했는지에 대한 이유
post: <T, R = AxiosResponse<T>, D>(url: string, data: D) => Promise<R>;
Error: 필수 형식 매개 변수는 선택적 형식 매개 변수 다음에 올 수 없습니다.❌
R = AxiosResponse<T>: 선택적, D: 필수
a.post<Created, Data> -> AxiosResponse가 없어도 된다.
post: <T, R = AxiosResponse<T>, D=any> -> 기본타입 any로 필수를 선택으로 변경
*/
  (config: Config): void;
  (url: string, config: Config): void;
  isAxiosError: (error: unknown) => error is AxiosError;
  // 같은 변수명이면 오버로딩되기에 다른파일에 있는 타입이 영향을 미칠 수 있다. 🟠
  // export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
}
```

axios.index.d.ts에서

```ts
// export default axios;

axios("http://localhost:8080");
axios.get("http://localhost:8080");
const a = new axios.Axios({ url: "http://localhost:8080" }).defaults;
axios.defaults;
```

- 위에서 new를 호출해 인스턴스화해서 .defaults를 붙이거나, axios.defaults가 가능하게 하기 위해서는
- `export class Axios`와 `export interface AxiosStatic`를 분리하였기 떄문
- 연달아 상속하는 방식을 사용

```ts
export interface AxiosStatic extends AxiosInstance
export interface AxiosInstance extends Axios
```

## React 타입 분석

### UMD 모듈과 tsconfig.json jsx 설정하기

- `npm i @types/react -D` 타입이 없는 라이브러리 `DT`이므로 `@types/react`

`@types/react index.d.ts`

```ts
// eslint-disable-next-line @definitelytyped/export-just-namespace
export = React;
export as namespace React;
```

- `export =` or `export default`
  - `export =`
    - `CommonJS Module` 🟠
    - `import * as React from 'react';`이렇게 해도 되지만 -> `import React from 'react';` 보통 이런식으로 한다.
    ```ts
    import React from "react";
    import { useState, useCallback, useRef } from "react";
                            ⬇️
    import React, { useState, useCallback, useRef } from "react";
    ```
    - `"esModuleInterop": true`🔥🔥 덕분에 위 2가지 경우가 가능한 것
    - `React`는 `CommonJS Module`문법이라서 위 옵션을 켜줘야 한다.
    ```ts
    return (
      <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
          <input ref={inputEl} value={value} onChange={onChange} />
          <button>입력!</button>
        </form>
        <div>{result}</div>
      </>
    );
    ```
    - `Typescript`가 `jsx`부분을 인식하지 못함
      - `"jsx": "react"` 마찬가지로 `tsconfig.json`에서 설정
    - `import React = require('react');`이런 식으로 `import`해야 하는데 이런식의 `import`는 `react`에서 본적이 ❌
  - `export default`
    - `ES Module`
    - `import XXXX from '../../'`
- `export as namespace React;`까지 있으면 UMD모듈이라고 한다.

- `React`에서 컴포넌트는 함수, `(prop) => JSX`

  ```ts
  const WordRelay: FunctionComponent = () => {
    ...
  }
  ```

  - `FunctionComponent`의 타입을 보면

  ```ts
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactNode;
    /**/
  }
  ```

  - const WordRelay: FunctionComponent = `()` 부분이 `P`인 제네릭
  - `return` 부분이 `ReactNode`타입이며, `ReactElement`일 것이다.
    ```ts
    type ReactNode =
    | ReactElement 🟠
    | string
    | number
    | Iterable<ReactNode>
    | ReactPortal
    | boolean
    | null
    | undefined
    | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[
        keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES
    ];
    ```

  ```ts
  declare global {
    /**
     * @deprecated Use `React.JSX` instead of the global `JSX` namespace.
     */
    namespace JSX {
        interface IntrinsicElements {
      // HTML
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      abbr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      address: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      area: React.DetailedHTMLProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
      ...
      }
    }
  }
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string | undefined;
    action?:
        | string
        | undefined
        | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[
            keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS
        ];
    autoComplete?: string | undefined;
    encType?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    target?: string | undefined;
  }
  ```

  - `JSX`타입에서 여러가지 태그에 대한 타입들이 확인 가능.

  ```ts
  interface DOMAttributes<T> {
    children?: ReactNode | undefined;
    dangerouslySetInnerHTML?:
      | {
          // Should be InnerHTML['innerHTML'].
          // But unfortunately we're mixing renderer-specific type declarations.
          __html: string | TrustedHTML;
        }
      | undefined;

    // Clipboard Events
    onCopy?: ClipboardEventHandler<T> | undefined;
    onCopyCapture?: ClipboardEventHandler<T> | undefined;
    onCut?: ClipboardEventHandler<T> | undefined;
    onCutCapture?: ClipboardEventHandler<T> | undefined;
    onPaste?: ClipboardEventHandler<T> | undefined;
    onPasteCapture?: ClipboardEventHandler<T> | undefined;
    ...
  }
  ```

  - `DOM`에 관한 모든 것이 있기에 `html`처럼 코딩이 가능

### 함수 컴포넌트(FC vs VFC), Props 타이핑

```ts
const WordRelay = () => {
  ...
}
```

- `WordRelay`의 타입은 `React.JSX.Element`

```ts
declare global {
    /**
     * @deprecated Use `React.JSX` instead of the global `JSX` namespace.
     */
    namespace JSX {
        // We don't just alias React.ElementType because React.ElementType
        // historically does more than we need it to.
        // E.g. it also contains .propTypes and so TS also verifies the declared
        // props type does match the declared .propTypes.
        // But if libraries declared their .propTypes but not props type,
        // or they mismatch, you won't be able to use the class component
        // as a JSX.ElementType.
        // We could fix this everywhere but we're ultimately not interested in
        // .propTypes assignability so we might as well drop it entirely here to
        //  reduce the work of the type-checker.
        // TODO: Check impact of making React.ElementType<P = any> = React.JSXElementConstructor<P>
        type ElementType = string | React.JSXElementConstructor<any>;
        interface Element extends React.ReactElement<any, any> {} // 🔥
        ...
    }
}


import React, {
  useState,
  useCallback,
  useRef,
  FunctionComponent,
  ReactElement,
  FC,
} from "react";
// JSX.Element는 import할 필요 ❌
```

- `JSX.Element`는 `ReactElement`와 동일하다.
- `const WordRelay: FunctionComponent`에서

```ts
interface FunctionComponent<P = {}> {
  (props: P, context?: any): ReactNode;
  /**/
}
```

- `ReactNode`에 `ReactElement`가 포함되어 있다.

```ts
interface P {
  name: string;
  title: string;
}

1️⃣
const WordRelay: FunctionComponent<P> = (props) => {
// const WordRelay: FC<P> = (props) => {
  props.name or props.title 🔥
}
2️⃣
const WordRelay = (props: P):ReactElement | JSX.Element => {}
3️⃣
function WordRelay(props: P) {}
```

- `ReactElement`나 `JSX.Element` 둘 중 하나만 적어도 되며, 안적어도 된다. 알아서 추론하기 때문🤔
- `const WordRelay: FunctionComponent<P>`는 `React`가 만들어놓았기에 1️⃣을 나은 방법이라 생각.
- 요즘은 3️⃣도 종종

index.d.ts

```ts
// ver18
interface VoidFunctionComponent<P = {}> {
  (props: P, context?: any): ReactNode;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
interface FunctionComponent<P = {}> {
  (props: P, context?: any): ReactNode;
}

// ver17
interface VoidFunctionComponent<P = {}> {
  (props: PropsWithChildren, context?: any): ReactNode;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren, context?: any): ReactNode;
}
```

- 17버전에서는 `FunctionComponent`, `VoidFunctionComponent`에서 `props`의 타입이 `PropsWithChildren`였다.
- 18버전에서는 둘다 안해주었고 `VoidFunctionComponent`는 `deprecated`됨
- `PropsWithChildren`가 무슨 역할이였을까

```ts
interface P {
  name: string;
  title: string;
  children?: ReactNode | undefined; // =PropsWithChildren
}

const Parent = () => {
  return (
    <WordRelay name="name" title="title">
      <div></div> // 이 부분이 children🟠 그렇기에 타입이 ReactNode인 것
    </WordRelay>
  );
};
```

### useState, useEffect 타이핑

```ts
const [word, setWord] = useState<string>("bao");
const [word, setWord] = useState<"bao">("bao"); // 절대 변하지 않는다면 이렇게도 가능

function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
```

- `[S, Dispatch<SetStateAction<S>>]` 구조분해 `[word, setWord]`

```ts
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

Dispatch<SetStateAction<S>>
type Dispatch<SetStateAction<S>> = (value: S | ((prevState: S) => S)) => void; 🟠

setWord((prev) => {
            return prev + 2;
        });
// const setWord: (value: React.SetStateAction<string>) => void

// 동기처럼 만든다고 async await 붙이는 경우가 있음
useEffect(async() => {
await setWord((prev) => {
            return prev + 2;
        }); ❌❌❌❌❌
},[])
// await은 return 타입이 Promise인 것만 붙이기
```

- `setState`에서도 `value`나 `state` 또는 함수가 들어갈 수 있다.
- `await`은 `return 타입`이 `Promise`인 것만 붙이기 🔥
- `Promise`의 유무로 `await`을 붙인다.

- `initialState`에 함수도 가능, `(() => S)`, `lazy initialization`이라 한다. 🟠
  - `state`자리에 함수 가능
  - `useEffect`로 `state`를 관리해도 되지만, `usestate`로 함수의 `return`값을 할당해주면 성능적으로 이득을 볼 수 있음.
  - 복잡한 함수를 한 번만 호출을 하면서도 초기 값을 쓸 수 있게 하기 위함.

```ts
const [word1, setWord1] = useState(() => {
  return 복잡한 함수();
});
```

- `Ts`에서는 `useEffect` 안에 `()` 앞에 `async`를 붙이면 안되지만, `js`에서는 되긴 된다.

```ts
useEffect(async () => {
  await setWord((prev) => {
    return prev + 2;
  });
}, []);

function useEffect(effect: EffectCallback, deps?: DependencyList): void;
type EffectCallback = () => void | Destructor; // EffectCallback의 타입이 void🔥
async의 타입'() => Promise<void>'

type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never }; // Lifecycle cleanup
```

```ts
useEffect(() => {
  console.log("useEffect"); // 처음 호출

  return () => {
    console.log("Lifecycle cleanup"); // 끝날 떄 호출
  };
}, []);
```

- `Ts`에서는 `useEffect`의 타입이 고정되어 있기 떄문. `async`함수의 `return`은 무조건 `Promise<void>`지만, `useEffect`는 `void` 🟠🟠

```ts
useEffect(() => {
  const finc = async () => {
    await axios.post();
  };
  finc();
}, []);
```

- 이런식으로는 가능하다

### 브랜딩 기법

```ts
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };

declare const UNDEFINED_VOID_ONLY: unique symbol;
```

- `unique symbol`은 `Symbol()`을 타이핑하는 방법
- `npmjs.com`의 `@types/react`에서 [Details](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react.) 부분에 과거부터 현 버전까지의 `index.d.ts`가 존재
- 코드의 옆 부분에 `...`을 클릭해 `View git blame`키워드를 통해 `openSource` 기여한 이유에 대해서 나옴.
- `Destructor`에 관한 부분에서 `UNDEFINED_VOID_ONLY` 부분이 과거의 어떤 이유 떄문에 바뀌었는지 확인이 가능하다.
- `브랜딩 기법`에 관한 [얘기](https://github.com/DefinitelyTyped/DefinitelyTyped/commit/fd8868d42a5256356859bc2a72664736a00c0d62)가 나오는데

```ts
const usd = 10;
const eur = 10;
type Euro = number;

function euroToUsd(euro: Euro): number {
  return euro * 1.18;
}
console.log(`USD: ${euroToUsd(eur)}`);

euroToUsd(krw); // 모든 type의 money가 가능
```

- 인수에 숫자가 `euro`라는 타입 이외의 타입이 들어가는 것을 막지 못함
- `type Euro = number;`이기에 모든 숫자가 인자로 들어올 수 있다.

```ts
type Brand<K, T> = K & { __brand: T };

type EUR = Brand<number, "EUR">;
type USD = Brand<number, "USD">;
type KRW = Brand<number, "KRW">;

const usd = 10 as USD;
const eur = 10 as EUR;
const krw = 10 as KRW;

function euroToUsd(euro: EUR): number {
  return euro * 1.18;
}
console.log(`USD: ${euroToUsd(eur)}`);

euroToUsd(eur); // EUR 타입만 사용 가능🟠
```

- 그래서 `브랜딩 기법`을 사용하면실제로 존재하지 않는 가상의 속성을 만들어 낼 수 있다.
- `as`를 사용하는 것은 비추천되지만, 가상의 타입을 사용하기에 `as`를 사용(강제 타입 변환)
- 결국엔 `EUR`타입만 사용 가능, `number`라는 원시값을 사용하면서 객체처럼 표현하면서 새로운 타입을 만들어낼 수 있음
- 정말 말 그대로 원시값을 `브랜딩` 시키는 것이다. 🔥
- 남의 타입을 공부하는 것이 많이 도움된다.
