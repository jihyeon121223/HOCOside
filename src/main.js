function extractWords() {

    // 인풋값
    const textInput = document.getElementById('textInput').value;

    // 전처리
    const words = textInput.toLowerCase().split(/\s+/);

    // 반복문
    const frequency= {};
    if(words){
        //카운트
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        // 분류
        const sortedWords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1]);

        // 나열
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

    //린캠퍼스 수정 + 디자인 추가

