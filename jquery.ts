// import $ from 'jquery';
// export { }
// 위처럼 import 문, export문의 유무에 따라서 이 파일이 어떻게 인식되는지가 달라진다.
// 있다면 module 시스템으로 인식하고 없다면 전역 스크립트로 인식한다.
// 전역 스크립트로 인식되는 경우 이 파일에서 작성한 타입들이 다른 파일에 있을 것이라고 생각하고
// 에러가 안뜨게 된다. 그래서 괜히 모듈 시스템으로 만들어서 타입이 꼬이는 경우가 있다.

$("p").removeClass("myClass noClass").addClass("yourClass"); // 1️⃣
$("p").removeClass(["myClass", "noClass"]).addClass("yourClass"); // 2️⃣
$("p")
  .removeClass((index: number, className: string) => {
    return "myClass";
  })
  .addClass("yourClass"); // 3️⃣

/*
removeClass(
    className_function?:
        | JQuery.TypeOrArray<string> 🔥
        | ((this✅: TElement, index: number, className: string) => string),
): this;
TS에서 첫 번째 매개변수가 this인 경우, 없다고 생각하면 된다.
$("p").removeClass((index, className) => {
    return 'myClass';✅
}).addClass("yourClass");

type TypeOrArray<T> = 🔥 T | T[]; 🔥

$("p").removeClass("myClass noClass").addClass("yourClass");
$("p").removeClass(["myClass", "noClass"]).addClass("yourClass");
*/
const $p = $("p");
$p.removeClass("myClass noClass").addClass("yourClass");
document.querySelector("h1")?.addEventListener("click", function () {
  console.log(this); // this='h1'
});
/*
removeClass -> addClass 메서드 체이닝
removeClass의 return값은 this
$p.removeClass:this -> $p가 되고 아래처럼 된다.
$p.addClass('yourClass');
addClass(
    className_function:
        | JQuery.TypeOrArray<string>
        | ((this: TElement, index: number, currentClassName: string) => string),
): this; 
addClass또한 return값이 this🔥
*/
// jquery에서, $ -> 변수(혹은 _)
$(["p", "t"]).text("hello");

/* 
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
*/

const tag = $("ul li")
  .addClass("hello")
  .addClass(function (index) {
    return "item-" + index;
  });
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
/*
declare namespace JQuery {
    type TypeOrArray<T> = T | T[];
    type Node = Element | Text | Comment | Document | DocumentFragment;
    Element는 태그, Document | DocumentFragment는 DOM
    ...
}
*/
