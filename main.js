//유저가 값을 입력한다.
// + 버튼을 클릭하면 할일이 추가된다.
//delete 버튼을 누르면 할일이 삭제된다.
//check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝난 탭은, 끝난 아이템만, 진행중 텝은 진행중 아이템만
//전체ㅐ텝을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let taskList = [];
let filterList = [];
let underLine = document.getElementById("under-line");

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});

addButton.addEventListener("click", addTask);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
    underlineIndicator(event);
  });
}

function underlineIndicator(event) {
  underLine.style.left = event.currentTarget.offsetLeft + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
  underLine.style.top =
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight;
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
                      <span class="task-done">
                        ${list[i].taskContent}
                      </span>
                      <div class="button-box">
                        <button class="check-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-arrow-rotate-right"></i></button>
                        <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                      </div>
                    </div>`;
    } else {
      resultHTML += `<div class="task">
                      <span>
                        ${list[i].taskContent}
                      </span>
                      <div class="button-box">
                        <button class="check-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                      </div>
                    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id == id) {
      filterList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;

  filterList = [];
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return ("000000000" + Math.random().toString(36).substr(2, 9)).slice(-9);
}
