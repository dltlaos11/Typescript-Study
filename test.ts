type IsNever<T> = [T] extends [never] ? true : false;
// type IsNever<T> = {type: T} extends {type: never} ? true : false;
// type IsNever<T> = T extends never ? true : false;
type A1 = IsNever<never>;
type A2 = IsNever<boolean>;

interface VO {
  value: any;
}

const obj = { value: "hi", what: 123 };
const a: VO = obj;
// const a: VO ={value: 'hi', what: 123}; // 객체 리터럴(변수 초기화)을 바로 넣으면 잉여속성검사가 발생, 참조로 해결🌞

// const returnVO = <T extends VO>(): T => {
//     return {value: 'test'};
//     // '{ value: string; }'은(는) 'T' 형식의 제약 조건에 할당할 수 있지만, 'T'은(는) 'VO' 제약 조건의 다른 하위 형식으로 인스턴스화할 수 있습니다.
// }

const z: boolean = false;

// function onlyBoolean<T extends boolean>(arg: T=false): T{
//     return arg;
// }

type Union<T> = T extends { a: infer U; b: infer U } ? U : never;
type Result1 = Union<{ a: 1 | 2; b: 2 | 3 }>;
type Union3<T> = T extends { a: () => infer U; b: () => infer U } ? U : never;
type Result3 = Union3<{ a: () => 1 | 2; b: () => 2 | 3 }>;

type Intersection<T> = T extends {
  a: (pa: infer U) => void;
  b: (pb: infer U) => void;
}
  ? U
  : never;
type Result2 = Intersection<{ a(pa: 1 | 2): void; b(pb: 2 | 3): void }>;
// 교집합을 만드는 타입

function g(x: string): number {
  return +g;
}
type H = (x: string) => number | string;
let z1: H = g;
// 반공변

function double<T extends string | number>(
  x: T
): T extends string ? string : number {
  // T는 string 혹은 number 혹은 never여도 된다.
  // T extends string ? string : number, `conditional type`
  // T는 함수 디자인 시점에 결정되지 않기 떄문에 conditional type을 써도 그 T를 결정 할 수 없다.
  // TS 컴파일러 또는 트랜스파일러가 타입을 결정할 때 conditional type을 못함. 그래서 가장 마지막에 평가한다.
  // 매개변수에 string을 넣으면 리턴타입도 동일할 것이라 생각하지만 TS컴파일러의 타입은 `T extends string ? string : number`임.
  // conditional type으로 인한 지연평가, `conditional type`을 보면 그대로 놔둬야 함.
  // 해결: 오버로딩, return에 as any처럼 `type assertion`하기

  return x as any;
  // return x;
}

function double2<T extends [T] extends [string] ? string : number>(
  x: T
): [T] extends [string] ? string : number {
  // const a: T extends string ? string : number = x;
  // 배열로 감싸면 Ts의 기본적인 동작들이 몇 개 다르게 수행되는 것들이 있음
  // 컨디셔널 타입으로 인한 지연평가가 `[T] extends [string] ? string : number`을하면 다른 방식으로 바뀜
  // `[T] extends [string]? string : number`도 참고로 같이 바꿔줌.

  return x;
}

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig) {
  // ...
}
const obj2 = { color: "red", width: 100, height: 12 };

let mySquare = createSquare(obj2);
