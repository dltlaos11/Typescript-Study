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
