const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => {
  createTaskElement(task.text, task.dueDate, task.completed);
});

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  if (taskText === "") return;

  const task = {
    text: taskText,
    dueDate: dueDate,
    completed: false,
  };

  tasks.push(task);
  saveTasksToLocalStorage();

  createTaskElement(taskText, dueDate, false);
  taskInput.value = "";
  dueDateInput.value = "";
}

function createTaskElement(text, dueDate, completed) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" ${completed ? "checked" : ""}>
    <span class="task-text ${completed ? "completed" : ""}">${text}</span>
    <span class="due-date">${dueDate}</span>
    <button class="deleteButton">Delete</button>
  `;

  const checkbox = li.querySelector("input");
  const deleteButton = li.querySelector(".deleteButton");

  checkbox.addEventListener("change", toggleTaskCompletion);
  deleteButton.addEventListener("click", deleteTask);

  taskList.appendChild(li);
}

function toggleTaskCompletion(event) {
  const taskItem = event.target.closest("li");
  const taskText = taskItem.querySelector(".task-text");
  taskText.classList.toggle("completed");

  const index = Array.from(taskList.children).indexOf(taskItem);
  tasks[index].completed = !tasks[index].completed;
  saveTasksToLocalStorage();
}

function deleteTask(event) {
  const taskItem = event.target.closest("li");
  const index = Array.from(taskList.children).indexOf(taskItem);

  taskItem.remove();
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
}

function handleTaskClick(event) {
  if (event.target.matches("input[type='checkbox']")) {
    toggleTaskCompletion(event);
  }
}

// Initial loading of tasks
tasks.forEach((task) => {
  createTaskElement(task.text, task.dueDate, task.completed);
});
