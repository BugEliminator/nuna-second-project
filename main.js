// 유저가 값을 입력한다
// 추가버튼을 누르면 할일이 추가된다
// 삭제버튼을 누르면 할일이 삭제된다
// 체크 버튼을 누르면 할일이 끝나서 글 중간에 밑줄이 생긴다
  // 체크 버튼을 누르면 true or false
// 진행중, 끝남 탭을 누르면 언더바 이동함
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시ㅣ 전체아이템으로 돌아온다

let inputField = document.querySelector("#inputField");
let addBtn = document.querySelector("#addBtn");
let taskBoard = document.querySelector("#taskBoard");
let taskList = [];

addBtn.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: inputField.value,
    isComplete: false
  };
  taskList.push(task);
  console.log(taskList);
  inputField.value = ''; // 입력 필드를 비웁니다.
  render();
}

function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete) {
      resultHTML += `
      <div class="task bgChange" id="task-${taskList[i].id}">
        <div class="taskBack" style="text-decoration: line-through;">${taskList[i].taskContent}</div>
        <div class="btnBox">
          <button class="rotateBox" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right rotateBtn"></i></button>
          <button class="trashBox" onclick="toggleDelete('${taskList[i].id}')"><i class="fa-solid fa-trash-can trashBtn"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `
      <div class="task" id="task-${taskList[i].id}">
        <div class="taskBack">${taskList[i].taskContent}</div>
        <div class="btnBox">
          <button class="checkBox" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check checkBtn"></i></button>
          <button class="trashBox" onclick="toggleDelete('${taskList[i].id}')"><i class="fa-solid fa-trash-can trashBtn"></i></button>
        </div>
      </div>`;
    }
  }
  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function toggleDelete(id) {
  taskList = taskList.filter(task => task.id !== id);
  render();
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}



// toggleDelete함수에다가 해당 id를 찾게해서 id를 찾으면 그 taskList는 삭제한다라고 하면 될듯함