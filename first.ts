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

/*
에디터가 자동으로 타입검사를 해준다. ctrl+`: 터미널 열기
tsc --noEmit하면 처음에는 터미널이 알아듣지 못한다. 이떄 node를 사용🟢 tsc컴파일러를 설치해야 된다.
1. npm init -y : package.json이 생김, Typescript-Study폴더가 node 프로젝트가 됨
node 프로젝트의 설정을 모아둔 곳이 package.json, 이제 npm 명령어들을 프로젝트에서 사용가능🟢

2. npm i typescript : typescrpt 설치, npm은 node의 프로그램들 정확히 말하면 node의 package라고 부르는데,
node의 프로그램들을 모아두는 저장소를 npm이라는 node package mananger가 있다.
그러면 현재 npm안에 저장되어 있는 typescrpt를 설치한 것이다.

이제 tsc를 쳐보면 안된다.(?) 앞에 npx를 붙여야 한다. 그러면 사용할 수 있는 명령어들이 나온다.

3. npx tsc --init : tsconfig.json이라는 파일이 생긴다.

📗tsconfig.json📗
🟢Typescript 프로젝트 시작할때 package.json, tsconfig.json 이 두 파일을 만들고 시작해야 하고, tsconfig.json 읽을 줄도 알아야 한다.
😨아직 ts가 서툴다면 tsconfig.json에서 "allowJs": true 옵션을 주석해제 하자, js와 ts 동시사용 가능, 그 상태에서 js-> ts 전환
 "target": "es2016" -> tsc가 나의 코드를 es2016으로 바꿔줌.
 "module": "commonjs" -> js에서 module system은 흔하다, import, export || require, module exports
 "module": "ES2015"나 "ES2022"는 같다, 최신 모듈 시스템 쓰고 싶으면 "ES2015"✅, node 모듈 시스템 쓰고 싶으면 "commonJs"✅
🟢strict: true 고정 ! 나중에 필요할 떄 tsconfig.json 수정할 수도 !
🟢"forceConsistentCasingInFileNames": true => ts에서는 모듈 시스템이 있어서 다른 파일을 import 가능, 윈도우는 대소문자 구분 크게 신경❌
   but mac이나 리눅스는 대소문자를 구분하기에 대소문자로 에러가 날 수 있음, 대소문자 지켜서 import하도록하는 옵션
🟢"skipLibCheck": true -> 라이브러리 check를 건너띄운다, 다른 package들을 다운받아서 사용할 떄 그 package들에 전부 .d.ts라는 파일이 있다.
   .d.ts 는 그 package에 type을 정리해둔 파일, 실제 사용하는 타입만 검사하도록, 안쓰는 타입 검사❌

4. npx tsc --noEmit : 타입 검사한 내역이 터미널에 뜬다.
5. npx tsc : ts파일을 -> js파일로 변환하여 생성
🟢 타입 검사 기능과 코드 변환 기능은 별개로 돌아간다.
 */
