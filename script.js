// Get references to the input field, button, and list elements
const newItemInput = document.getElementById("new-item-input");
const addItemBtn = document.getElementById("add-item-btn");
const todoList = document.getElementById("todo-list");
const itemCount = document.getElementById("item-count");

// Create an empty array to hold the todos
let todos = [];

// Function to render the todo list
function renderTodos() {
  // Clear the list element
  todoList.innerHTML = "";
  
  // Loop through each todo in the array and create a new list item for it
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" ${todo.completed ? "checked" : ""} data-index="${index}">
        ${todo.text}
      </label>
      <button type="button" data-index="${index}">Delete</button>
    `;
    
    // Add the "checked" class to the list item if the todo is completed
    if (todo.completed) {
      li.classList.add("checked");
    }
    
    // Add the new list item to the list element
    todoList.appendChild(li);
  });
  
  // Update the item count element
  itemCount.innerText = `${todos.length} item${todos.length === 1 ? "" : "s"} in the list`;
}

// Function to add a new todo to the array
function addTodo() {
  const text = newItemInput.value.trim();
  if (text !== "") {
    todos.push({ text: text, completed: false });
    newItemInput.value = "";
    renderTodos();
  }
}

// Function to remove a todo from the array
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Function to toggle the completed state of a todo
function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Set up an event listener for the "Add" button
addItemBtn.addEventListener("click", addTodo);

// Set up an event listener for the todo list itself, to handle checkbox and delete button clicks
todoList.addEventListener("click", (event) => {
  if (event.target.matches("input[type='checkbox']")) {
    const index = event.target.dataset.index;
    toggleCompleted(index);
  } else if (event.target.matches("button")) {
    const index = event.target.dataset.index;
    deleteTodo(index);
  }
});

// Render the initial list on page load
renderTodos();
