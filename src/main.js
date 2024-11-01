// 1. 상단 고정 메뉴
function showSection(sectionId) {
    // #region step 1
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
    // #endregion step 1

    // #region step 2
    // document.querySelectorAll('main').forEach(node => {
    //     if (node.id == sectionId) {
    //         node.classList.remove('hide')

    //         return
    //     }

    //     node.classList.add('hide')
    // })
    // #endregion step 2

    // #region step 3
    // const nodes = document.querySelectorAll('main')

    // nodes.querySelectorAll(`main:not([id="${sectionId}"])`).add('hide')
    // nodes.querySelector(`#${sectionId}`).remove('hide')
    // #endregion step 3

    // final
    const mainNode = document.querySelectorAll('main')
    mainNode.dataset.visiblePage = sectionId
}
// 2. 리셋 고정 버튼 >> addEventListener가 null이였
const nodeResetBtn = document.getElementById('resetButton')
nodeResetBtn.addEventListener('click', resetExtractSection);
function resetExtractSection() {
    location.href = '/'
}


// 3. 텍스트 비교
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
// 단어 수 실시간 카운트
document.getElementById('textInput').addEventListener('input', function() {
    const text = this.value.trim();
    const cleanedText = text.replace(/[^\w\s]/g, ''); // 단어와 공백만 허용
    const wordCount = cleanedText ? cleanedText.split(/\s+/).length : 0;
    document.getElementById('wordCount').textContent = `${wordCount} 단어`;
});
// 문자 수 제한
document.getElementById('textInput').maxLength = 500;


// 4. 파일 업로드 및 텍스트 처리
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


// 5. 제출
// 중복 제출 방지
let isProcessing = false; 
// 단어 추출 
function extractWords() {
    // 현재 처리 중이면 중복 실행 방지 
    if (isProcessing) {
        return;
    } // early return pattern
    // 처리 중 상태로 설정
    isProcessing = true;
    // 프로그레스 바 보여주기
    showProgressBar();

    // 인풋값 가져오기
    const textInput = document.getElementById('textInput').value;
    
    // 전처리: 단어 나누고 빈 단어 제외
    const words = textInput.toLowerCase().split(/\s+/).filter(word => word.trim() !== '');

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

        // 저장 버튼을 보이도록 설정
        document.getElementById("saveRankingButton").style.display = "block";

    } else {
        // 단어가 없을 때
        const wordsList = document.getElementById('wordsList');
        wordsList.innerHTML = '<li>반복 단어가 없습니다.</li>';
    }

    // 처리 완료 후 다시 제출 가능 상태로 변경
    isProcessing = false; 
}
// 프로그레스 바 제어
function showProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    progressBar.style.display = 'block';
    progress.style.width = '0';

    // 3초 프로그레스
    setTimeout(() => {
        progress.style.width = '100%';
        hideProgressBar(); // 프로그레스 바 숨기기
    }, 3000);
}
function hideProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.display = 'none';  // 완료 후 숨기기
}


// 6. 랭킹 저장 함수
function saveRanking() {
    const frequencyResults = document.querySelectorAll('#wordFrequencyResults li'); // li로 변경
    const rankings = [];

    frequencyResults.forEach(result => {
        const text = result.innerText;
        const [word, count] = text.split(': ').map(item => item.trim());
        rankings.push({ word, count: parseInt(count, 10) });
    });

    console.log('추출된 랭킹:', rankings);

    // 내림차순으로 정렬
    rankings.sort((a, b) => b.count - a.count);

    console.log('정렬된 랭킹:', rankings);

    // 상위 30개 랭킹 저장
    const topRankings = rankings.slice(0, 30);
    
    localStorage.setItem('rankings', JSON.stringify(topRankings));

    alert('랭킹이 성공적으로 저장되었습니다.');
    console.log('저장된 상위 30개 랭킹:', topRankings);

    displayRankings(); // 랭킹 표시
}
// 랭킹 리스트를 표시하는 함수
function displayRankings() {
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = ''; // 초기화
    
    const rankings = JSON.parse(localStorage.getItem('rankings')) || [];

    console.log('로컬 스토리지에서 불러온 랭킹:', rankings); // 로드된 랭킹 확인

    if (rankings.length === 0) {
        rankingList.innerHTML = '<li class="py-4 text-gray-700">저장된 기록이 없습니다.</li>';
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


// 7. 랭킹 페이지
let currentPage = 1;
const wordsPerPage = 10; // 한 페이지에 표시할 단어 수
function displayRanking(rankingData) {
    const rankingList = document.getElementById('rankingList');
    // 기존 리스트를 초기화
    rankingList.innerHTML = ''; 

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

// 8. 페이징
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayRanking(rankingData); // 기존 랭킹 데이터에서 다시 표시
    }
}
function nextPage() {
    const totalPages = Math.ceil(rankingData.length / wordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayRanking(rankingData);
    }
}


