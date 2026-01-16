const input = document.querySelector("input");
const addBtn = document.getElementById("add-btn");
const tasksContainer = document.querySelector(".tasks");
const countValue = document.getElementById("count-value");
const errorMsg = document.querySelector(".error");

// init the counter
let counting = 0

// make a function for adding taskes
function addTasks() {
   const taskText = input.value.trim();
       //  Empty input check
    if (taskText === "") {
        errorMsg.textContent = "Input cannot be empty!";
        errorMsg.style.display = "block";
        return;
    }

    //  Must contain at least one alphabet character
    const hasLetter = /[a-zA-Z]/.test(taskText);
    if (!hasLetter) {
        errorMsg.textContent = "Todo must contain at least one letter!";
        errorMsg.style.display = "block";
        return;
    }

    // ✅ Valid input
    errorMsg.style.display = "none";

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
        <input type="checkbox" class="task-check">
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    tasksContainer.appendChild(taskDiv);
    input.value = "";

    // update counter
    counting++;
    countValue.innerText = counting;

    saveTasksToLocalStorage();
}

// main task add button 
addBtn.addEventListener("click", (addTasks));
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTasks();
  }
});



// delete button
tasksContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove()
        counting--
        countValue.innerText = counting;
        saveTasksToLocalStorage()

    }
    // this one is only for storing the data of checked tasks in our list
    if (e.target.classList.contains("task-check")) {
        saveTasksToLocalStorage()
    }

})


// storing our data in localstorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.querySelector(".task-check").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// loading our data from local storage 
function loadTasksFromLocalStorage() {

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasksContainer.innerHTML = ""
    counting = 0

    savedTasks.forEach(task => {
        let taskDiv = document.createElement("div")
        taskDiv.classList.add("task")

        taskDiv.innerHTML = `
        <input type="checkbox" class="task-check" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>`;

        tasksContainer.appendChild(taskDiv)
        counting++
    })

    countValue.innerText = counting
}

window.addEventListener("load", loadTasksFromLocalStorage);

