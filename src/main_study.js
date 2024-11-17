const SATAE = {
	READY: 1,
	ANALYZING: 2,
	RESULT: 3
}

const mainNode = document.querySelector('main')
const menuNodes = document.querySelectorAll('a.menu-item')
const contact = document.querySelector('a[href="#contact"]')

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

const analysisResults = {
	wordCount: 0,
	hashTable: {}
}

// rankingData = [{ word: string, count: number }]
let rankingData = []
let state = SATAE.READY

//#region STATE Handler
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

		// console.log(word.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0).toString())

		const key = word.length > MAX_WORD_LENGTH ?
			word.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0).toString() :
			word

		const count = (analysisResults.hashTable[key]?.count || 0) + 1
		let priority = null //* sentinel value

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

	const reader = new FileReader() //TODO: move global scope
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

		navigator.clipboard.writeText('yoo.hwanyong@gmail.com')
		alert('이메일 주소가 복사되었습니다!')
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
}

const render = params => {
	const StateHandler = {
		[SATAE.READY]: [onReady], // [onReady, onReady_ranking]
		[SATAE.ANALYZING]: [onAnalyzing],
		[SATAE.RESULT]: [renderAnalysisResults]
	}

	StateHandler[state].forEach(handler => handler(params))
}

// initializtion / constructor in class
bindEvents()
render({ pageId: 'extract' })