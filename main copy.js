window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form"); // Получаем элемент, чтобы повесить на него событие c addEventListener etc
  const input = document.querySelector("#new-task-input");
  //!const inputBtn = document.getElementById("new-task-submit");
  const listEl = document.querySelector("#tasks");
  //!
  inputBtn.addEventListener("submit", () => {
    let localItems = JSON.parse(localStorage.getItem("localitem"));
    let taskList = [];
    if (localItems === null) {
      taskList = [];
    } else {
      taskList = localItems;
    }
    taskList.push(input.value);
    localStorage.setItem("localitem", JSON.stringify(taskList));
  });
  //! addEventListener добавить на добавление в массив тасков

  // document.querySelector("#new-task-form").addEventListener("submit", (e) => {
  // Когда произойдет событие "submit", то будет передано управление функции
  // form.removeEventListener("submit", (e) => {
  // e.preventDefault();
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const taskContentEl = document.createElement("div");
    taskContentEl.classList.add("content");

    taskEl.appendChild(taskContentEl);

    const taskInputEl = document.createElement("input");
    taskInputEl.classList.add("text");
    taskInputEl.type = "text";
    taskInputEl.value = task;
    taskInputEl.setAttribute("readonly", "readonly");

    taskContentEl.appendChild(taskInputEl);

    const taskActionsEl = document.createElement("div");
    taskActionsEl.classList.add("actions");

    const taskEditEl = document.createElement("button");
    taskEditEl.classList.add("edit");
    taskEditEl.innerText = "Edit";

    const taskDeleteEl = document.createElement("button");
    taskDeleteEl.classList.add("delete");
    taskDeleteEl.innerText = "Delete";

    taskActionsEl.appendChild(taskEditEl);
    taskActionsEl.appendChild(taskDeleteEl);

    taskEl.appendChild(taskActionsEl);
    listEl.appendChild(taskEl);

    input.value = "";

    taskEditEl.addEventListener("click", (e) => {
      if (taskEditEl.innerText.toLowerCase() == "edit") {
        taskEditEl.innerText = "Save";
        taskInputEl.removeAttribute("readonly");
        taskInputEl.focus();
      } else {
        taskEditEl.innerText = "Edit";
        taskInputEl.setAttribute("readonly", "readonly");
      }
    });

    taskDeleteEl.addEventListener("click", (e) => {
      listEl.removeChild(taskEl);
    });
  });
});
