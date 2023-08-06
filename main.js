let input = document.querySelector(".inputText");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let delAll = document.querySelector(".delAll");

let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorge();

// Add Task
submit.onclick = () => {
  if (input.value != "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.className.includes("del")) {
    e.target.parentElement.remove();
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.className.includes("done")) {
    // Completed For The Task
    toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.classList.toggle("do");
  }
});

function addTaskToArray(taskText) {
  //Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of tasks
  arrayOfTasks.push(task);
  //   AddTasksToPage
  addElementToPageFrom(arrayOfTasks);
  //   add Tasks To LocalStorge
  addDataToLocalStorgeFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
  // Empty the Tasks Div
  tasksDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    let text = document.createTextNode(task.title);
    div.appendChild(text);
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    // Create Done Button
    let update = document.createElement("span");
    update.className = "done";
    update.appendChild(document.createTextNode("Done"));
    div.appendChild(update);

    // Add Task Div To Tasks Div
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorgeFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorge() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorgeFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorgeFrom(arrayOfTasks);
}
//  Delete ALL
delAll.onclick = () => {
  tasksDiv.innerHTML = "";
  localStorage.clear();
};

document.onkeyup = function (e) {
  if (e.key === "Enter") {
    if (input.value != "") {
      addTaskToArray(input.value);
      input.value = "";
    }
  }
};
