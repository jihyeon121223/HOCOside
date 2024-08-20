// 쿼리셀렉터
const select = document.querySelector('select')
const button = document.querySelector('button')
const h1 = document.querySelector('h1')
const addBtn = document.querySelector('#add')
const removeBtn = document.querySelector('#remove')
const toggleBtn = document.querySelector('#toggle')
const myName = "JH"

// 임시보관
localStorage.setItem("myName",myName)
alert(myName)
// 영구보관
localStorage.getItem("myName")
// 삭제
localStorage.removeItem("myName")
// 전체삭제
localStorage.clear()


button.addEventListener('click', function(){
    console.log(select.value)
    let result = select.value; 
    let message = result == "foot" ? "축구를 선택했네요!" :"축구를 선택하지 않았네여";
    alert(message)
})

console.log(h1.classList)

addBtn.addEventListener('click', function(){
    h1.classList.add('text')
})
removeBtn.addEventListener('click',function(){
    h1.classList.remove('text')
})
toggleBtn.addEventListener('click',function(){
    h1.classList.toggle('text')
})