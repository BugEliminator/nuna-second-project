// 유저가 값을 입력한다
// 추가버튼을 누르면 할일이 추가된다
// 삭제버튼을 누르면 할일이 삭제된다
// 체크 버튼을 누르면 할일이 끝나서 글 중간에 밑줄이 생긴다
// 진행중, 끝남 탭을 누르면 언더바 이동함
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시ㅣ 전체아이템으로 돌아온다

let inputField = document.querySelector("#inputField")
let addBtn = document.querySelector("#addBtn")
let taskList = []

addBtn.addEventListener("click", addTask)

function addTask() {
  let taskValue = inputField.value
  taskList.push(taskValue)
  render()
}

function render() {
  let resultHTML = ''
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
      <div>${taskList[i]}</div>
      <div>
        <button>체크</button>
        <button>삭제</button>
      </div>
    </div>`
  }

  document.querySelector("#taskBoard").innerHTML = resultHTML
}


