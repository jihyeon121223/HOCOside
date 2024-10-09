const nodeResetBtn = document.getElementById('resetButton')

// 1.
// 파일 업로드 및 텍스트 처리
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = function(e) {
        document.getElementById('textInput').value = e.target.result
    }
    reader.onerror = function() {
        alert('파일을 읽는 중 오류가 발생했습니다. 다시 시도해 주세요.')
    }

    reader.readAsText(file)
})

// 중복 제출 방지
let isProcessing = false; 
// 단어 추출 함수
function extractWords() {
    // 현재 처리 중이면 중복 실행 방지 // early return pattern
    if (isProcessing) {
        return;
    } 
    // 처리 중 상태로 설정
    isProcessing = true;
    // 프로그레스 바 보여주기
    showProgressBar();

    // 인풋값 가져오기
    const textInput = document.getElementById('textInput').value;
    // 전처리: 단어 나누고 빈 단어 제외
    const words = textInput.toLowerCase().split(/\s+/).filter(word => word.trim() !== '');
    console.log(words);

    // 단어 빈도 계산
    const frequency = {};
    if (words.length > 0) {
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });

        // 빈도 순으로 정렬
        const sortedWords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
        // 결과 표시
        const wordsList = document.getElementById('wordsList');
        // 기존 리스트 초기화
        wordsList.innerHTML = '';  

        sortedWords.forEach(([word, count]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${word}: (${count})`;

            // 빈도에 따라 클래스 추가 (스타일 적용 용도)
            if (count > 5) {
                listItem.setAttribute('data-count', 'high');
            } else if (count > 2) {
                listItem.setAttribute('data-count', 'medium');
            } else {
                listItem.setAttribute('data-count', 'low');
            }

            wordsList.appendChild(listItem);
        });

        // 단어 빈도 섹션과 저장 버튼을 보이도록 설정
        document.getElementById("rankingSection").style.display = "block";
        document.getElementById("saveRankingButton").style.display = "block";

    } else {
        // 단어가 없을 때
        const wordsList = document.getElementById('wordsList');
        wordsList.innerHTML = '<li>반복 단어가 없습니다.</li>';
    }

    // 처리 완료 후 프로그레스 바 숨기기
    setTimeout(() => {
        hideProgressBar();
        isProcessing = false;
    }, 3000);

    // 처리 완료 후 다시 제출 가능 상태로 변경
    // isProcessing = false; 
}

// 단어 빈도가 도출되었을 때 호출하는 함수
function onWordFrequencyCalculated() {
    // 빈도값이 계산된 후 버튼 보이기
    showSaveButton(); 
}
// 버튼을 보여주는 함수
function showSaveButton() {
    document.getElementById('saveRankingButton').style.display = 'block';
}

// 랭킹 저장 함수
function saveRanking() {
    const frequencyResults = document.querySelectorAll('#wordFrequencyResults li'); // li로 변경
    const rankings = [];

    frequencyResults.forEach(result => {
        const text = result.innerText;
        const [word, count] = text.split(': ').map(item => item.trim());
        rankings.push({ word, count: parseInt(count, 10) });
    });

    // 내림차순으로 정렬
    rankings.sort((a, b) => b.count - a.count);

    // 상위 30개 랭킹 저장
    const topRankings = rankings.slice(0, 30);
    localStorage.setItem('rankings', JSON.stringify(topRankings));

    alert('랭킹이 성공적으로 저장되었습니다.');
    displayRankings(); // 랭킹 표시
}

// 랭킹 리스트를 표시하는 함수
function displayRankings() {
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = ''; // 기존 랭킹 초기화
    
    const rankings = JSON.parse(localStorage.getItem('rankings')) || [];
    console.log(rankings); // 데이터 확인

    if (rankings.length === 0) {
        rankingList.innerHTML = '<li class="py-4 text-gray-700">저장된 랭킹이 없습니다.</li>';
        return;
    }

    // 랭킹 리스트 표시
    rankings.forEach((ranking, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'py-4 flex justify-between';
        listItem.innerHTML = `
            <span class="text-lg text-gray-700">${index + 1}. ${ranking.word}</span>
            <span class="text-lg text-gray-700">${ranking.count}회</span>
        `;
        rankingList.appendChild(listItem);
    });
}

// 페이지 로드 시 랭킹 표시
window.onload = displayRankings;

// // 실제 데이터가 도출된 후에 호출
// onWordFrequencyCalculated();

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
nodeResetBtn.addEventListener('click', function() {
    location.href = '/index.html'

    // document.getElementById('textInput').value = '';
    // document.getElementById('results').innerHTML = ''; // 결과도 초기화
    // document.getElementById('wordCount').textContent = '0 단어'; // 단어 수 초기화
});

// JS: 단어 수 실시간 카운트
document.getElementById('textInput').addEventListener('input', function() {
    const text = this.value.trim();
    const cleanedText = text.replace(/[^\w\s]/g, ''); // 단어와 공백만 허용
    const wordCount = cleanedText ? cleanedText.split(/\s+/).length : 0;
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

// JS: 메뉴 버튼 제어
function showSection(sectionId) {
    // 섹션 숨기기
    document.getElementById('extract').style.display = 'none';
    document.getElementById('ranking').style.display = 'none';

    // 선택된 섹션 보이기
    document.getElementById(sectionId).style.display = 'block';

    // 리셋 버튼이 분석기 섹션에서만 보이도록 설정
    if (sectionId === 'extract') {
        nodeResetBtn.style.display = 'block';
        // location.href = '/index.html'
    } else {
        nodeResetBtn.style.display = 'none';
    }
}

// 리셋 함수
// function resetForm() {
//     // 입력 필드와 파일 필드 초기화
//     document.getElementById('textInput').value = '';
//     document.getElementById('fileInput').value = '';

//     // 단어 리스트만 초기화 (단어 빈도 영역은 숨기지 않음)
//     const wordsList = document.getElementById('wordsList');
//     wordsList.innerHTML = '';  // 기존 리스트 초기화

//     // 프로그레스 바 숨기기
//     hideProgressBar();

//     // 결과 저장 버튼 숨기기
//     document.getElementById('saveRankingButton').style.display = 'none';
// }
function resetExtractSection() {
    document.getElementById('textInput').value = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('wordsList').innerHTML = '';
    document.getElementById('saveRankingButton').style.display = 'none';
    document.getElementById("rankingSection").style.display = "none";
}

// 리셋 버튼 클릭 이벤트 리스너 수정
nodeResetBtn.addEventListener('click', resetExtractSection);


// 2. 
// JS: 랭킹 페이지네이션
let currentPage = 1;
const wordsPerPage = 10; // 한 페이지에 표시할 단어 수

function displayRanking(rankingData) {
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = ''; // 기존 리스트를 초기화

    // 현재 페이지에 맞는 단어 데이터 추출
    const start = (currentPage - 1) * wordsPerPage;
    const end = start + wordsPerPage;
    const currentRanking = rankingData.slice(start, end);

    // 단어 리스트 추가
    currentRanking.forEach((item, index) => {
        const listItem = `
            <li class="py-4 flex justify-between">
                <span class="text-lg text-gray-700">${start + index + 1}. ${item.word}</span>
                <span class="text-lg text-gray-700">${item.count}회</span>
            </li>
        `;
        rankingList.innerHTML += listItem;
    });
}

// 페이지네이션: 이전 페이지로 이동
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayRanking(rankingData); // 기존 랭킹 데이터에서 다시 표시
    }
}

// 페이지네이션: 다음 페이지로 이동
function nextPage() {
    const totalPages = Math.ceil(rankingData.length / wordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayRanking(rankingData);
    }
}

// 예시 랭킹 데이터
const rankingData = [
    { word: '단어1', count: 50 },
    { word: '단어2', count: 45 },
    { word: '단어3', count: 40 },
    { word: '단어4', count: 35 },
    { word: '단어5', count: 30 },
    { word: '단어6', count: 25 },
    { word: '단어7', count: 20 },
    { word: '단어8', count: 15 },
    { word: '단어9', count: 10 },
    { word: '단어10', count: 5 },
    // ... 추가 단어 데이터
];
// 초기 랭킹 표시
displayRanking(rankingData);

