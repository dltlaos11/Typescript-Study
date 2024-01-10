// function add(a, b) {
//     return a + b;
// }

// add(10, null);
// ----------------------------------------------------------------

// const x: number = null
// ----------------------------------------------------------------


const el = document.getElementById('status')
// el.textContent = 'Ready'; Object is possibly 'null'

if (el) {
    el.textContent = 'Ready' // OK, null has been excluded, const el: HTMLElement
}
el!.textContent = 'Ready' // OK, we've asserted that el is non-null, 
// const el: HTMLElement | null, null이 아니라 단언했으니 htmlEle
// !. 강제 형변환