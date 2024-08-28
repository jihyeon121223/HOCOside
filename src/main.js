function extractWords() {

    // 인풋값
    const textInput = document.getElementById('textInput').value;

    // 전처리
    const words = textInput.toLowerCase().split(/\s+/).filter(word => word.trim() !== '');
    console.log(words);

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

function compareTexts() {
    // 두 텍스트 칸에서 값을 가져옴
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    // 결과를 출력할 div를 가져옴
    const result1 = document.getElementById('result1');
    const result2 = document.getElementById('result2');

    // 텍스트를 단어로 분할
    const words1 = text1.split(' ');
    const words2 = text2.split(' ');

    // 길이가 더 긴 배열을 기준으로 반복
    const maxLength = Math.max(words1.length, words2.length);

    let highlightedText1 = '';
    let highlightedText2 = '';

    for (let i = 0; i < maxLength; i++) {
        if (words1[i] !== words2[i]) {
            // 틀린 부분에 하이라이트 추가
            highlightedText1 += `<span class="highlight">${words1[i] || ''}</span> `;
            highlightedText2 += `<span class="highlight">${words2[i] || ''}</span> `;
        } else {
            // 동일한 부분은 그대로 추가
            highlightedText1 += `${words1[i] || ''} `;
            highlightedText2 += `${words2[i] || ''} `;
        }
    }

    // 결과 div에 HTML로 설정
    result1.innerHTML = highlightedText1.trim();
    result2.innerHTML = highlightedText2.trim();
}


    //린캠퍼스 수정 + 디자인 추가

