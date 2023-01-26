function zip(x:number, y: string, z: boolean): {x: number, y: string, z: boolean} {
   return {x, y, z};
}

// Parameters✅
type Params = Parameters<typeof zip>; // type Params = [x: number, y: string, z: boolean]
type First = Params[0]; // First = number, type간에도 key값 꺼내오듯이 배열처럼 index로 접근 가능⭕

// Parameters 만들어보기✅
// 함수의 매개변수의 타입을 가져오려면 T가 함수여야 한다. 함수 제한조건 설정해야
// <T extends (...args: any) => any>⭕
// infer는 extends에서만 사용 가능 ⭕⭕ inference:추론
type P<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
type Params1 = P<typeof zip>;
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
