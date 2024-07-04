// 유저가 값을 입력한다
// 추가버튼을 누르면 할일이 추가된다
// 삭제버튼을 누르면 할일이 삭제된다
// 체크 버튼을 누르면 할일이 끝나서 글 중간에 밑줄이 생긴다
  // 체크 버튼을 누르면 true or false
// 진행중, 끝남 탭을 누르면 언더바 이동함
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시ㅣ 전체아이템으로 돌아온다

// 입력 필드와 버튼, 작업 보드, 탭을 선택합니다.
let inputField = document.querySelector("#inputField");
let addBtn = document.querySelector("#addBtn");
let taskBoard = document.querySelector("#taskBoard");
let tabs = document.querySelectorAll(".taskTab div");
let underLine = document.querySelector("#underLine");

// 작업 리스트와 필터링된 작업 리스트, 현재 모드를 정의합니다.
let taskList = [];
let mode = 'all';
let filterList = [];

// 각 탭에 클릭 이벤트 리스너를 추가합니다.
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event) {
    filter(event);
  });
}

console.log(tabs);

// 추가 버튼에 클릭 이벤트 리스너를 추가합니다.
addBtn.addEventListener("click", function(event) {
  event.preventDefault();
  addTask();
});

// 입력 필드에 엔터 키 이벤트 리스너를 추가합니다.
inputField.addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // 기본 동작(폼 제출)을 막는다.
      addTask();
  }
});

// 작업을 추가하는 함수입니다.
function addTask() {
  if (inputField.checkValidity()) { // 입력 필드의 유효성을 체크합니다.
      let taskContent = inputField.value.trim(); // 앞뒤 공백을 제거한 입력 값
      let task = {
          id: randomIDGenerate(), // 랜덤 ID 생성
          taskContent: taskContent, // 입력 필드의 값
          isComplete: false // 작업 초기 상태는 미완료
      };
      taskList.push(task); // 작업 리스트에 추가
      console.log(taskList);
      inputField.value = ''; // 입력 필드를 비웁니다.
      render(); // 화면을 갱신합니다.
  } else {
      inputField.reportValidity(); // 유효성 검사 실패 시 사용자에게 메시지를 보여줍니다.
  }
}

// 화면에 작업을 렌더링하는 함수입니다.
function render() {
  let list = [];
  // 선택된 탭에 따라 다른 리스트를 보여줍니다.
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ing") {
    list = filterList;
  } else if (mode === "done") {
    list = filterList;
  }

  let resultHTML = '';
  // 리스트를 순회하며 HTML을 생성합니다.
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      // 완료된 작업
      resultHTML += `
      <div class="task bgChange" id="task-${list[i].id}">
        <div class="taskBack" style="text-decoration: line-through;">${list[i].taskContent}</div>
        <div class="btnBox">
          <button class="rotateBox" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right rotateBtn"></i></button>
          <button class="trashBox" onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can trashBtn"></i></button>
        </div>
      </div>`;
    } else {
      // 미완료된 작업
      resultHTML += `
      <div class="task" id="task-${list[i].id}">
        <div class="taskBack">${list[i].taskContent}</div>
        <div class="btnBox">
          <button class="checkBox" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check checkBtn"></i></button>
          <button class="trashBox" onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can trashBtn"></i></button>
        </div>
      </div>`;
    }
  }
  taskBoard.innerHTML = resultHTML; // 작업 보드에 결과 HTML을 삽입합니다.
}

function updateFilterList() {
  filterList = [];
  if (mode === "ing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
}

// 작업의 완료 상태를 토글하는 함수입니다.
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; // 완료 상태를 반전시킵니다.
      break;
    }
  }
  updateFilterList();
  render(); // 화면을 갱신합니다.
  console.log(taskList); 
}

// 작업을 삭제하는 함수입니다.
function toggleDelete(id) {
  taskList = taskList.filter(task => task.id !== id); // 해당 작업을 필터링하여 삭제합니다.
  updateFilterList();
  render(); // 화면을 갱신합니다.
}

// 탭에 따른 필터링 함수입니다.
function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  mode = event.target.id; // 클릭한 탭의 id를 모드로 설정합니다.
  updateFilterList();
  render();

  filterList = [];
  mode = event.target.id; // 클릭한 탭의 id를 모드로 설정합니다.
  if (mode === "all") {
    // 전체 리스트를 보여줍니다.
    render();
  } else if (mode === "ing") {
    // 진행 중인 작업을 필터링하여 리스트를 만듭니다.
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행", filterList);
  } else if (mode === "done") {
    // 완료된 작업을 필터링하여 리스트를 만듭니다.
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("완료", filterList);
  }
}



// 랜덤 ID를 생성하는 함수입니다.
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
