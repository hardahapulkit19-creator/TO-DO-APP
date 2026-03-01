let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Enter a task");
        return;
    }

    createTaskElement(taskText, false);
    saveTask(taskText, false);

    taskInput.value = "";
}

function createTaskElement(text, completed) {

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = text;

    if (completed) {
        span.classList.add("completed");
    }

    span.addEventListener("click", function () {
        span.classList.toggle("completed");
        updateLocalStorage();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(text, completed) {
    let tasks = getTasks();
    tasks.push({ text: text, completed: completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").innerText;
        let completed = li.querySelector("span").classList.contains("completed");
        tasks.push({ text: text, completed: completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}