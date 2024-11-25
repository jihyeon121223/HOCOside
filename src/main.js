const SATAE = {
	READY: 1,
	ANALYZING: 2,
	RESULT: 3
}

const mainNode = document.querySelector('main')
const menuNodes = document.querySelectorAll('a.menu-item')
const contact = document.querySelector('a[href="#contact"]')
const github = document.querySelector('a[href="#github"]')

const form = document.querySelector('#extract form')
const textArea = form.querySelector('#textInput')
const reset = form.querySelector('#reset')

const saveRanking = document.querySelector('#saveRanking')
const wordCount = document.querySelector('#wordcount')
const wordList = document.querySelector('#wordlist')

const rankingList = document.querySelector('#rankingList')
const btnMenu = document.querySelector('button.menu-icon')

const menuModal = document.querySelector('dialog.menu')
const btnClose = menuModal.querySelector('button.close')

const prevPageButton = document.querySelector('#prevPage');
const nextPageButton = document.querySelector('#nextPage');

const analysisResults = {
	wordCount: 0,
	hashTable: {}
}

let rankingData = []
let state = SATAE.READY

const changeView = pageId => {
	mainNode.dataset.visiblePage = pageId
}
const onReady = params => {
	const { pageId } = params

	analysisResults.wordCount = 0
	analysisResults.hashTable = {}

	changeView(pageId)
	renderAnalysisResults()
}
const onAnalyzing = params => {
	const textInput = textArea.value.trim()
	const words = textInput.split(/\s+/).filter(word => word.length > 0)

	analysisResults.hashTable = {}

	// #region 단어 수 카운트
	// const wordCount = words.reduce((acc, word) => {
	// 	acc[word] = acc[word] ? acc[word] + 1 : 1
	// 	return acc
	// }, {})

	// console.log(wordCount)
	//#endregion
	//#region hashTable 방식
	const MAX_WORD_LENGTH = 100

	words.forEach(word => {
		if (!word) return

		const key = word.length > MAX_WORD_LENGTH ?
			word.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0).toString() :
			word

		const count = (analysisResults.hashTable[key]?.count || 0) + 1
		let priority = null

		if (count > 5) priority = 'high'
		else if (count > 2) priority = 'medium'
		else priority = 'low'

		if (!priority) {
			throw new Error('Priority is required')
		}

		analysisResults.hashTable[key] = { word, priority, count }
	})
	//#endregion

	analysisResults.wordCount = words.length

	state = SATAE.RESULT
	render()
}
const renderAnalysisResults = params => {
	wordCount.innerHTML = analysisResults.wordCount

	const sortedWords = Object.values(analysisResults.hashTable)
		.sort((a, b) => b.count - a.count)

	wordList.innerHTML = sortedWords.length ?
		sortedWords.map(({ word, count, priority }) =>
			`<li data-count="${priority}">${word}: (${count})</li>`
		).join('') :
		'<li>반복 단어가 없습니다.</li>'
}
//#endregion STATE Handler

const handleFileDrop = e => {
	e.preventDefault()
	e.stopPropagation()

	const file = e.dataTransfer?.files[0]
	if (!file) return

	const reader = new FileReader() ///*TODO: move global scope */
	reader.onload = e => textArea.value = e.target.result
	reader.readAsText(file)
}
const bindEvents = () => {
	menuNodes.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault()

			menuModal.close()

			changeView(e.target.dataset.pageId)
		})
	})

	contact.addEventListener('click', e => {
		e.preventDefault()

		window.location.href = 'mailto:yjh121223@gmail.com';
		// navigator.clipboard.writeText('yjh121223@gmail.com')
		// alert('이메일 주소가 복사되었습니다!')
	})

	github.addEventListener('click', e => {
		e.preventDefault()
		window.open('https://github.com/jihyeon121223/HOCOside', '_blank');
	})

	textArea.addEventListener('dragover', e => {
		e.preventDefault()
		e.stopPropagation()
	})

	textArea.addEventListener('drop', handleFileDrop)

	form.addEventListener('submit', e => {
		e.preventDefault()

		state = SATAE.ANALYZING
		render()
	})

	reset.addEventListener('click', e => {
		state = SATAE.READY
		render({ pageId: 'extract' })
	})

	saveRanking.addEventListener('click', e => {
		const _data = Object.values(analysisResults.hashTable)
			.map(({ word, count }) => ({ word, count }))

		const rankingMap = new Map(rankingData.map(item => [item.word, item]))

		_data.forEach(({ word, count }) => {
			if (rankingMap.has(word)) {
				rankingMap.get(word).count += count
			} else {
				rankingMap.set(word, { word, count })
			}
		})

		rankingData = Array.from(rankingMap.values())
			.sort((a, b) => b.count - a.count)

		rankingList.innerHTML = rankingData.reduce((acc, { word, count }, idx) => {
			return acc + `<li>[${idx + 1}] ${word}: (${count})</li>`
		}, '')

		changeView('ranking')
	})

	btnMenu.addEventListener('click', e => {
		menuModal.showModal()
	})
	btnClose.addEventListener('click', e => {
		menuModal.close()
	})

	menuModal.addEventListener('close', e => {
		console.log('close modal')
	})

	prevPageButton.addEventListener('click', (e) => {
		prevPage();
	});
	
	nextPageButton.addEventListener('click', (e) => {
		nextPage();
	});

}

const render = params => {
	const StateHandler = {
		[SATAE.READY]: [onReady],
		[SATAE.ANALYZING]: [onAnalyzing],
		[SATAE.RESULT]: [renderAnalysisResults]
	}

	StateHandler[state].forEach(handler => handler(params))
}


let currentPage = 1;
const wordsPerPage = 30;

const displayRanking = (data) => {
    rankingList.innerHTML = '';

    const startIndex = (currentPage - 1) * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    pageData.forEach(({ word, count }, idx) => {
        const listItem = document.createElement('li');
        listItem.textContent = `[${startIndex + idx + 1}] ${word}: (${count})`;
        rankingList.appendChild(listItem);
    });
};
const prevPage = () => {
    if (currentPage > 1) {
        currentPage--;
        displayRanking(rankingData);
    }
};
const nextPage = () => {
    const totalPages = Math.ceil(rankingData.length / wordsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayRanking(rankingData);
    }
};
///* TODO: 이전이나 다음을 누르기 전까지 원 상태 리스트 그대로 있음 */



bindEvents()
render({ pageId: 'extract' })