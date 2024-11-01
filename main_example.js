// const rstBtn = {
// 	eventHandler: {
// 		'click': []
// 	},
// 	addEventListener: (event, userFunction) => {
// 		// regist event
// 		// logic

// 		this.eventHandler[event].push(userFunction)
// 	}
// }

// function execueteEvent(event, node) {
// 	for (let i = 0; i < node.eventHandler[event].length; i++) {
// 		node.eventHandler[event][i]()
// 	}
// }
// execueteEvent('click', rstBtn)

console.log('call main_study.js')

const rstBtn = document.getElementById('resetButton')
rstBtn.addEventListener('click', e => {})

console.log('Loaded', rstBtn)

// // callback function -> function used
// function add(a, b, userFunc) {
// 	const result = serverCall(a,b) // network - late
// 	console.log(result)

// 	// end
// 	if (userfunc) {
// 		userFunc(result)
// 	}
// }

// const result = add(1, 2, (result) => {
// 	console.log('end', result)
// }) // 3

// console.log(result)

addEventListener('click', e => {

})

// next step: function, arrow function (람다)
// next step: addEventListener, event, target, currentTarget