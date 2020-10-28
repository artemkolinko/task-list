// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// DOM load event
document.addEventListener("DOMContentLoaded", getTasks);
// Add task event
form.addEventListener("submit", addTask);
// Remove tast event
taskList.addEventListener("click", removeTask);
// Clear tasks event
clearBtn.addEventListener("click", clearTasks);
// Filter tasks event
filter.addEventListener("keyup", filterTasks);

// Get Tasks from Local Storage function
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in Local storage
    StoreTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";

    e.preventDefault();
  }
}

// Store task in local storage function
function StoreTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from LS function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks function
function clearTasks() {
  if (confirm("Are you sure?")) {
    // taskList.innerHTML = '';
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStoraga();
  }
}

// Clear tasks from LS
function clearTasksFromLocalStoraga() {
  localStorage.clear();
}

// Filter Tasks function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
