
    let inputValue = document.querySelector(".input-value");
    let sendButton = document.querySelector(".send-button");
    let todosUl = document.querySelector(".todos-list");
    let todoos = document.querySelectorAll(".todoos");
    let clearTodoBtn = document.querySelector(".clear-todos")
    todos = [];
    
    
    runEvents();
    function runEvents() {
        document.addEventListener("keyup", enterSystem);
        document.addEventListener("DOMContentLoaded", pageLoad);
        document.addEventListener("DOMContentLoaded", todoNumber);
        todosUl.addEventListener("click", removeTodo);
        clearTodoBtn.addEventListener("click", removeAllTodo)
    }

    function enterSystem(e) {
        if (e.keyCode == 13) {
            addTodo()
        }
    }

    function addTodo() {
        let todoValue = inputValue.value.trim();
        if (todoValue === "") {
            showAlert("#D4214E", "Please enter a valid value.")
        } else {
            addTodoUI(todoValue);
            addTodoStorage(todoValue);

            inputValue.value = "";
            inputValue.focus();
        }
    }

    function addTodoUI(todoValue) {
        let todoLi = document.createElement("li");
        todoLi.className = "todoos"
        todosUl.appendChild(todoLi);

        let todoDiv = document.createElement("div");
        todoDiv.className = "item";
        todoLi.appendChild(todoDiv)

        let todoSpan = document.createElement("span");
        todoSpan.className = "circle";
        todoDiv.appendChild(todoSpan)

        let todoP = document.createElement("p");
        todoP.textContent = todoValue;
        todoDiv.appendChild(todoP)


        let todoA = document.createElement("a");
        todoA.className = "remove-icon"
        todoA.innerText = "X"
        todoLi.appendChild(todoA);

    }

    function addTodoStorage(todoValue) {
        checkStorage();

        todos.push(todoValue);
        localStorage.setItem("todos", JSON.stringify(todos))
        showAlert("#178C54", "The task has been successfully added to the list.")
    }

    function checkStorage() {
        if (localStorage.getItem("todos") === null) {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem("todos"))
        }
    }

    function pageLoad() {
        inputValue.focus();
        checkStorage();
        todos.forEach(element => {
            addTodoUI(element)
        });
    }

    function removeTodo(e) {
        let removeItem = e.target;
        if (removeItem.className === "remove-icon") {
            removeItem.parentElement.remove()
            showAlert("#74BE8C", "The task has been successfully deleted from the list.")
        }
        removeTodoStorage(removeItem);
    }

    function removeTodoStorage(removeItem) {
        checkStorage();
        removeItemStorage = removeItem.parentElement.textContent.slice(0,-1)
        todos.forEach(function(todo, index) {
            if (removeItemStorage === todo) {
                todos.splice(index, 1)
            }
        });
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    function removeAllTodo() {
        checkStorage();
        showAlert("#74BE8C", "All missions have been deleted successfully.")
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));

        let removeAllItem = document.querySelectorAll(".todoos");
        removeAllItem.forEach(function(todo) {
            todo.remove();
        })
    }

    function todoNumber() {
        let todoNumberValue = document.querySelector(".task-number");
        todoNumberValue.innerText = todos.length;
    }

    function showAlert(type, message) {
        let alertMain = document.querySelector(".alert");
        let alertP = document.createElement("p");
        alertMain.appendChild(alertP)

        alertP.textContent = message;
        alertP.style.backgroundColor = type;

        setTimeout(() => {
            alertP.remove()
        }, 2500);
    }