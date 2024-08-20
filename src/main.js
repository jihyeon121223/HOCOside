// const MyConst: string = '<div class="my-class">Hello, Haco!</div>'; //TypeScript
// const MyConst = '<div class="my-class">Hello, Haco!</div>'; //JavaScript

function extractWords() {

    // 인풋값
    const textInput = document.getElementById('textInput').value;

    // 전처리
    // const words = textInput.toLowerCase().match(/\b\w+\b/g);
    const words = textInput.split(/\s+/);

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

    // (비누님 도움받음..)
    function addElementToBody() {
        // 함수를 추가하여 페이지 로드 시 extractWords()를 호출할 수 있게 합니다.
        const button = document.createElement('button');
        button.textContent = '단어 추출';
        button.onclick = extractWords; // 버튼 클릭 시 extractWords 함수 호출
        document.body.appendChild(button);

        const input = document.createElement('input');
        input.id = 'textInput';
        input.type = 'text';
        input.placeholder = '여기에 텍스트 입력';
        document.body.appendChild(input);

        const list = document.createElement('ul');
        list.id = 'wordsList';
        document.body.appendChild(list);
    }

    //이제 문제는 대소문자를 구분해버린다는거 + 엔터도 문자로 친다는거 
    //린캠퍼스 수정 + 디자인 추가 

window.onload = addElementToBody;