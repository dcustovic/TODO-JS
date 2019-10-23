
const storageKey = "Storage";

const convertStringToObject = (str) => JSON.parse(str) || [];

const convertObjectToString = (obj) => JSON.stringify(obj) || "";

const getTodos = () => convertStringToObject(localStorage.getItem(storageKey));

const addTodo = (todo) => localStorage.setItem(storageKey, convertObjectToString([...getTodos(), todo]));

const deleteTodo = (todo) => localStorage.setItem(storageKey, convertObjectToString(getTodos().filter(_todo => _todo !== todo)));

const buildTodoEl = (todo) => {
    const el = document.createElement("li");
    el.classList.add("list-group-item");
    el.innerText = todo;
    return el;
}

const appendLiToDom = (el) => document.getElementById("todo-list-container").appendChild(el);

const clearDisplay = () => document.getElementById("todo-list-container").innerHTML = "";

const clearInput = () => document.getElementById("todo-input").value = "";

const displayTodos = () => {

    clearInput();
    clearDisplay();
    getTodos().forEach(_todo => appendLiToDom(buildTodoEl(_todo)));
    initClickListeners();
}

// delete jedan po jedan (izbacit ce pop-up za delete)
const initClickListeners = () => {
    Array.from(document.getElementsByClassName("list-group-item")).forEach(_item => {
        _item.addEventListener("click", ($event) => {
            const todo = $event.target.innerText;
            if(window.confirm("Jeste li završili s ovim zadatkom: " + todo + "?")) {
                deleteTodo(todo);
                displayTodos();
          }
        });
    });
}

// svaki put kada refreshamo page, ostat ce todo lista sa svim taskovima
document.addEventListener("DOMContentLoaded", () => displayTodos());


document.getElementById("submit-button").addEventListener("click", ($event) => {
    const newTodoInput = document.getElementById("todo-input");
    if(newTodoInput.value) {
        addTodo(newTodoInput.value.trim());
        displayTodos();
    }
});

document.getElementById("reset-button").addEventListener("click", ($event) => {
    localStorage.removeItem(storageKey);
    displayTodos();
});
