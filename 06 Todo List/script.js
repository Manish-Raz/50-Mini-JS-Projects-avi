const input = document.querySelector("input");
const addBtn = document.getElementById("add-btn");
const tasksContainer = document.querySelector(".tasks");
const countValue = document.getElementById("count-value");
const errorMsg = document.querySelector(".error");

// init the counter
let counting = 0

// make a function for adding taskes
function addTasks() {
    // show error if there is no input.value
    if (input.value.trim() === "") {
        errorMsg.style.display = "block";
    } else {
        // else create a task and add it inside the tasks div
        errorMsg.style.display = "none";
        let taskDiv = document.createElement("div")
        taskDiv.classList.add("task")

        taskDiv.innerHTML = `
        <input type="checkbox" class="task-check">
        <span>${input.value}</span>
        <button class="delete-btn">Delete</button>`;

        tasksContainer.appendChild(taskDiv)
        input.value = ""

        // update the counter
        counting++;
        countValue.innerText = counting;

        // to store our data
        saveTasksToLocalStorage()


    }
}

// main task add button 
addBtn.addEventListener("click", (addTasks))
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
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

