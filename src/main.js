// const MyConst: string = '<div class="my-class">Hello, Haco!</div>'; //TypeScript
// const MyConst = '<div class="my-class">Hello, Haco!</div>'; //JavaScript

function extractWords() {

    // 인풋값
    const textInput = document.getElementById('textInput').value;

    // 전처리
    const words = textInput.toLowerCase().match(/\b\w+\b/g);

    // 반복문 (도움받음..)
    const frequency= {};
    
    if(words){
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        // 빈도수
        const sortedWords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1]);

        // 결과값 
        const wordsList = document.getElementById('wordsList');
        wordsList.innerHTML = '';

        sortedWords.forEach(([word, count]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${word}: (${count})`;
            wordsList.appendChild(listItem);
        });

    }else{
        const wordsList = document.getElementById('wordsList');
        wordsList.innerHTML = '<li>반복 단어가 없습니다.</li>';
    }
}


window.onload = addElementToBody;