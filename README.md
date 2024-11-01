# HOCOside
Pick a word with a high frequency

=========240828 피드백
-카톡txt분석기
많이 사용한 단어를 분석하기
db연결시 사용자별 많이 사용하는 단어 랭킹

=========241009 피드백
로컬스토리지저장 빈값 에러
깃허브링크 추가
리드미 수정
https://github.com/classbinu/markcraft-v2

두번째는 깃허브 업데이트

=========241017 피드백
1. Font 구글폰트를 다운받아서 쓰기
2. 파비콘 이란? 책깔피상단 아이콘그림. 기본인데 없어서 404 떴음
3. addEventListener NULL에러. js는 코드에서 상위에 위치 필수. 랜더링 순서에 따라 html보다 js가 먼저 읽히는데 불러와진게 없어서 null에러 발생. 랜더링하는방식과 js동작방식을 알기.
해결책은 js를 맨밑에 내리던가(js는 화면에 랜더링하는 것에 속하는게 아니라 헤더로 넣어야 함.), defer(한꺼번에 다운로드 하는데 순서가 있음), defer를 선호
<!-- <script async src="./src/main.js"></script> -->
<!-- <script defer src="./src/main.js"></script> -->
또는 mjs 라는 모듈화 버전으로 import 형식으로 사용할 수 있음
4. callback 함수 = TDD
JS는 실행이 아니라 동작을 정의하는것. 
// // callback function -> function used
// function add(a, b, userFunc) {
// 	const result = serverCall(a,b) // network - late
// 	console.log(result)

// 	// end
// 	if (userfunc) {
// 		userFunc(result)
// 	}
// }
기존 함수를 정의 후 사용자 커스텀 함수를 정의하러 와서 callback이라고 일컫는다.

=========241024 피드백
1. doctype html 은 버전표시용으로 넣었다가 정규화되어 간단히 표시
2. mvc(model, view, ?), mvvl? 형식
3. html구조코드, css랜더링코드, js기능코드 를 착실히 나누기. html에 css랜더링요소를 그냥 추가할거면 하지마라.
4. css가 없어도 좋은 구조여야 함.
5. region 쓰면 구역 접었다 펼 수 있음. 주석 조차 가능. 단순 임시방편. 근데 이렇게 묶일 정도면 분류별 함수로 따로 빼야함.
6. Todo 쓰면 나중에 뭘 하라는 등의 기록을 남길 수 있음.
7. js는 mdn사이트를 참고해라.
8. 숙제: js의 dataset을 이용한 연동방법 이용해보기. 기록해준 step 따라서 변화보기.
9. 다음시간: event.currenttarget.pageId
0. 2009-2011 LG, 클래지콰이, Sunwas - [] 에 대해 시간날때 얘기해달라