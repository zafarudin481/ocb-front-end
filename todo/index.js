// declare global variable for JWT
let todoJWT
let todoUser

// 1) checked for JWT token from session and local storage, if both unavailable, proceed to sign-in page
switch (true) {
    case (sessionStorage.getItem('TODO-JWT') != null):
        todoJWT = sessionStorage.getItem('TODO-JWT');
        todoUser = sessionStorage.getItem('TODO-USERNAME');
        break;
    case (localStorage.getItem('TODO-JWT') != null):
        todoJWT = localStorage.getItem('TODO-JWT');
        todoUser = localStorage.getItem('TODO-USERNAME');
        break;
    default:
        window.location.href = "sign-in.html";
        break;
}

fetchListTodos()


// 2) fetch all todos from API index and display in the container
function fetchListTodos() {
    fetch('https://api.kelasprogramming.com/todo', {
        headers: {
            "Authorization": `Bearer ${todoJWT}`,
            "Content-type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((body) => {
            const todoList = body.entry.map((todo) => (
                `<div class="row border-below m-3 pt-0 pb-3 px-0 gy-3">
                <div class="col-12 col-md-7 px-0 mt-0">
                    ${todo.details}
                </div>
                <div id="${todo.id}" class="col-12 col-md-5 d-flex justify-content-center justify-content-md-end align-items-center">
                    <button class="btn btn-${todo.completed == 1 ? 'success' : 'warning'} me-1" onclick="taskStatus(this,${todo.completed})">${todo.completed == 1 ? '<i class="bi bi-check"></i>' : '<i class="bi bi-x"></i>'}</button>
                    <button class='btn btn-primary me-1' data-bs-toggle="modal" data-bs-target="#editTodo" onclick='selectTodo(${JSON.stringify(todo)})' ><i class="bi bi-pencil"></i></button>
                    <button class='btn btn-danger' onclick="deleteTask(this)"><i class="bi bi-trash"></i></button>
                </div>
            </div>`
            ))
            document.getElementById('todoList').innerHTML = todoList.join('')
            document.getElementById('user-name').innerHTML = todoUser
        })
        .catch((err) => {
            alert('Your last session has expired, please re-login')
            window.location.href = "sign-in.html"
        })
}

// 3) logout action
function logOut() {
    localStorage.removeItem('TODO-JWT')
    localStorage.removeItem('TODO-REFRESH')
    localStorage.removeItem('TODO-USERNAME')
    sessionStorage.removeItem('TODO-JWT')
    sessionStorage.removeItem('TODO-REFRESH')
    sessionStorage.removeItem('TODO-USERNAME')
    window.location.href = "sign-in.html"
}

// 4) create new todo item
function createTask() {
    // get and check the todo input given by user
    const newTodo = document.getElementById('todo-input').value
    if (newTodo == null || newTodo == "") {
        alert("Please insert the new todo item");
        return;
    }

    // using API POST, to create new todo item 
    fetch('https://api.kelasprogramming.com/todo', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${todoJWT}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'details': newTodo
        })
    })
        .then((response) => response.json())
        .then((body) => {
            document.getElementById('todo-input').value = ''
            fetchListTodos()
            body.success == true ? alert('New item successfully created') : alert('New item failed to be created, please try again');
        })
        .catch((err) => { debugger })
}

// 5.1) function to mark task as completed or incomplete
function taskStatus(element, originalStatus) {
    // get the id of the task need to be mark completed
    const taskID = element.parentNode.id
    const taskNewStatus = originalStatus == 0 ? '1' : '0';

    // update the status using fetch function
    fetch(`https://api.kelasprogramming.com/todo/${taskID}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${todoJWT}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "completed": taskNewStatus

        })
    })
        .then((response) => response.json())
        .then((body) => {

            fetchListTodos()

            if (body.success == true) {
                taskNewStatus == 1 ? alert('Task marked completed') : alert('Task succesfully marked as incomplete');
            } else {
                alert('Task failed to be updated, please try again');
            }
        })
        .catch((err) => { debugger })
}

// 5.2) delete task function
function deleteTask(element) {
    // get the id of the task need to be mark completed
    const taskID = element.parentNode.id

    // update the status using fetch function
    fetch(`https://api.kelasprogramming.com/todo/${taskID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${todoJWT}`,
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((body) => {
            fetchListTodos()
            body.success == true ? alert('Task succesfully deleted') : alert('Task failed to be deleted, please try again');
        })
        .catch((err) => { debugger })
}





// let selectedTodo = ''
// function selectTodo(todo) {
//     console.log(todo)
//     selectedTodo = todo
// }

// function onSaveChanges() {
//     const inputValue = document.getElementById('todoUpdate').value
//     fetch(`https://api.kelasprogramming.com/todo/${selectedTodo.id}`, {
//         method: 'PUT',
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${JWTtoken}`
//         },
//         body: JSON.stringify({
//             "details": inputValue,
//             "completed": 1
//         })
//     })
//         .then((response) => response.json())
//         .then(body => {
//             fetchAllTodos()
//             document.getElementById('todoUpdate').value = ''
//             document.getElementById('closeModal').click()
//         })
//         .catch(err => { debugger })
// }