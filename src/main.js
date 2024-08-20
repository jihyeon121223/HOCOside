// const MyConst: string = '<div class="my-class">Hello, Haco!</div>'; //TypeScript
const MyConst = '<div class="my-class">Hello, World!</div>'; //JavaScript

function addElementToBody() {
    const body = document.querySelector('body');
    if (body) {
        body.innerHTML += MyConst;
        }
}

window.onload = addElementToBody;