$("p").removeClass("myClass noClass").addClass("yourClass");
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
