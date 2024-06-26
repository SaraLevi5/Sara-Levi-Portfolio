import Task from "./classes/Task.js";
import TaskManager from "./classes/TaskManager.js";

const manager = new TaskManager();

function showTaskInList() {
  const active = document.getElementById("active");
  const completed = document.getElementById("completed");

  active.innerHTML = "";
  completed.innerHTML = "";

  localStorage.setItem("tasks", JSON.stringify(manager.tasks));

  for (let task of manager.tasks) {
    if (task.status == false) {
      active.innerHTML += `
            <li class="list-group-item d-flex justify-content-between">
              ${task.description}
              <div class="icons">
                <i
                  class="fa-solid fa-square-check fa-2xl"
                  style="color: #16c573; cursor: pointer"
                  onclick="changeStatusToTrue(${task.id})"
                ></i>
                <i
                  class="fa-solid fa-square-pen fa-2xl"
                  style="color: #2250a0; cursor: pointer"
                  onclick="changeDescription(${task.id})"
                ></i>
                <i
                  class="fa-solid fa-square-minus fa-2xl"
                  style="color: #c43b3b; cursor: pointer"
                  onclick="deleteTaskFromLi(${task.id})"
                ></i>
              </div>
            </li>
            `;
    } else {
      completed.innerHTML += `
          <li class="list-group-item d-flex justify-content-between       text-decoration-line-through"> ${task.description}</li>
    `;
    }
  }
}

window.addTaskToList = () => {
  const newTask = document.getElementById("newTask").value;
  const task = new Task(newTask);
  manager.addTask(task);

  showTaskInList();
  document.getElementById("newTask").value = "";
};
window.addEventListener("keyup", (e) => {
  e.key == "Enter" && window.addTaskToList();
});

window.changeStatusToTrue = function (taskId) {
  manager.completeTask(taskId);
  showTaskInList();
};

window.changeDescription = function (taskId) {
  const newDescription = prompt("Please enter the updated task description ");
  manager.editDescription(taskId, newDescription);
  showTaskInList();
};

window.deleteTaskFromLi = function (taskId) {
  manager.deleteTask(taskId);
  showTaskInList();
};

showTaskInList();
