// import $ from 'jquery';
// export { }
// 위처럼 import 문, export문의 유무에 따라서 이 파일이 어떻게 인식되는지가 달라진다.
// 있다면 module 시스템으로 인식하고 없다면 전역 스크립트로 인식한다.
// 전역 스크립트로 인식되는 경우 이 파일에서 작성한 타입들이 다른 파일에 있을 것이라고 생각하고
// 에러가 안뜨게 된다. 그래서 괜히 모듈 시스템으로 만들어서 타입이 꼬이는 경우가 있다.

$("p").removeClass("myClass noClass").addClass("yourClass");
const $p = $("p");
$p.removeClass("myClass noClass").addClass("yourClass");
// jquery에서, $ -> 변수(혹은 _)
$(["p", "t"]).text("hello");

const tag = $("ul li")
  .addClass("hello")
  .addClass(function (index) {
    return "item-" + index;
  });
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
