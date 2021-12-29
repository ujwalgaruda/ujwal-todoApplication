let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addBtnEl = document.getElementById("addButton");
let saveBtnEl = document.getElementById("saveButton");

function getTodoListFromLocalStorage() {
    let stringifiedList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveBtnEl.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};






function onAddTodo() {
    let userInputEl = document.getElementById("userInput");
    let userInputVal = userInputEl.value;

    if (userInputVal === "") {
        alert("Please enter valid text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputVal,
        uniqueNo: todosCount,
        checkStatus: false
    }
    todoList.push(newTodo);
    createAndAppend(newTodo);
    userInputEl.value = "";
}


addBtnEl.onclick = function() {
    onAddTodo();
}


function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachVal) {
        let eachTodoId = "todo" + eachVal.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })
    let todoObject = todoList[todoObjectIndex];

    if (todoObject.checkStatus === true) {
        todoObject.checkStatus = false;
    } else {
        todoObject.checkStatus = true;
    }
}


function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachVal) {
        let eachTodoId = "todo" + eachVal.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}

function createAndAppend(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainerEl.appendChild(todoElement);

    let inputEl = document.createElement("input")
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.checkStatus;

    inputEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }

    inputEl.classList.add("checkbox-input");
    todoElement.appendChild(inputEl);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("check-box-label");
    labelElement.textContent = todo.text;
    if (todo.checkStatus === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon")

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }

    deleteIconContainer.appendChild(deleteIcon);

}


for (let todo of todoList) {
    createAndAppend(todo);
}