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
