// 파일 업로드 및 텍스트 처리
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('textInput').value = e.target.result;
        };
        reader.onerror = function() {
            alert('파일을 읽는 중 오류가 발생했습니다. 다시 시도해 주세요.');
        };
        reader.readAsText(file);
    }
});

// 단어 빈도 분석 함수
function extractWords() {
    // 인풋값
    const textInput = document.getElementById('textInput').value;

    // 전처리
    const words = textInput.toLowerCase().split(/\s+/).filter(word => word.trim() !== '');
    console.log(words);

    // 반복문
    const frequency = {};
    if (words.length > 0) {
        // 카운트
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        // 분류
        const sortedWords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

        // 나열
        const wordsList = document.getElementById('wordsList');
        wordsList.innerHTML = '';  // 리스트 초기화

        sortedWords.forEach(([word, count]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${word}: (${count})`;

            // 빈도에 따라 클래스 추가
            if (count > 5) {
                listItem.setAttribute('data-count', 'high');
            } else if (count > 2) {
                listItem.setAttribute('data-count', 'medium');
            } else {
                listItem.setAttribute('data-count', 'low');
            }

            wordsList.appendChild(listItem);
        });

        // 프로그레스 바 숨기기 (완료 시)
        hideProgressBar();

    } else {
        const wordsList = document.getElementById('wordsList');
        wordsList.innerHTML = '<li>반복 단어가 없습니다.</li>';
    }
}

// 텍스트 비교 함수
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

// JS: 프로그레스 바 제어
function showProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    progressBar.style.display = 'block';
    progress.style.width = '0';

    // 예시로 3초 동안 프로그레스가 진행되도록 설정
    setTimeout(() => {
        progress.style.width = '100%';
        hideProgressBar(); // 프로그레스 바 숨기기
    }, 3000);
}

function hideProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.display = 'none';  // 완료 후 숨기기
}

// JS: 플로팅 액션 버튼 동작
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('textInput').value = '';
    document.getElementById('results').innerHTML = ''; // 결과도 초기화
    document.getElementById('wordCount').textContent = '0 단어'; // 단어 수 초기화
});

// JS: 단어 수 실시간 카운트
document.getElementById('textInput').addEventListener('input', function() {
    const text = this.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    document.getElementById('wordCount').textContent = `${wordCount} 단어`;
});

// 최대 문자 수 제한 (500자)
document.getElementById('textInput').maxLength = 500;

// 특수 문자 제거
const cleanedText = textInput.replace(/[^\w\s]/g, ''); // 단어와 공백만 허용

function showLoadingAnimation() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
}

function hideLoadingAnimation() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';
}

function downloadResults() {
    const results = document.getElementById('wordsList').innerText;
    const blob = new Blob([results], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'word_frequency.txt';
    link.click();
}

