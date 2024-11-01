const mainNode = document.querySelector('main')
const menuNodes = document.querySelectorAll('a.menu-item')

const bindEvents = () => {
	menuNodes.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault() //TODO: check href disable

			mainNode.dataset.visiblePage = e.currentTarget.dataset.pageId
		})
	})
}

bindEvents()