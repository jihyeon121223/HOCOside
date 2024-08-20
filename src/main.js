// const MyConst: string = '<div class="my-class">Hello, Haco!</div>'; //TypeScript
const MyConst = '<div class="my-class">Hello, World!</div>'; //JavaScript

function extractWords() {

    // 인풋값
    const textInput = document.getElementById('textInput').value;

    // 전처리
    const words = textInput.match(/\b\w+\b/g);

    // 결과값
    const wordsList = document.getElementById('wordsList');
    wordsList.innerHTML = '';

    //반복문 
    const frequency= {};
    
    if(words){
        words.forEach((word) => {
            const wordElement = document.createElement('li');
            wordElement.textContent = word;
            wordsList.appendChild(wordElement);
            });
    }else{
        wordsList.innerHTML = '<li>반복 단어가 없습니다.</li>'
    }
}


window.onload = addElementToBody;