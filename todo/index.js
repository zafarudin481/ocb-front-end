// 1) check whether user is already have token before entering dashboard
if (localStorage.getItem('TODO-JWT') == null) {
    // if token is null, redirect to sign-in page
    window.location.href = "sign-in.html"
} else {
    // if there is token, reassign the available token from local storage into config.js
    config.TODO_JWT = localStorage.getItem('TODO-JWT')
    config.TODO_REFRESH = localStorage.getItem('TODO-REFRESH')
    config.TODO_USERNAME = localStorage.getItem('TODO-USERNAME')
}

const todoJWT = config.TODO_JWT
const todoUser = config.TODO_USERNAME

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
                <div class="col-12 col-md-7 px-0">
                    ${todo.details}
                </div>
                <div class="col-12 col-md-5 d-flex justify-content-center justify-content-md-end align-items-center">
                    <button class="btn btn-${todo.completed == 1 ? 'success' : 'warning'} me-1">${todo.completed == 1 ? '<i class="bi bi-check"></i>' : '<i class="bi bi-x"></i>'}</button>
                    <button class='btn btn-primary me-1' data-bs-toggle="modal" data-bs-target="#editTodo" onclick='selectTodo(${JSON.stringify(todo)})' ><i class="bi bi-pencil"></i></button>
                    <button class='btn btn-danger'><i class="bi bi-trash"></i></button>
                </div>
            </div>`
            ))
            document.getElementById('todoList').innerHTML = todoList.join('')
            document.getElementById('user-name').innerHTML = todoUser
        })
        .catch((err) => {
            alert('You are not login, please login first')
            window.location.href = "sign-in.html"
        })

}

// 3) create new todo item
function createTodo() {
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





// const JWTtoken = localStorage.getItem('todoJWTtoken')

// function fetchAllTodos() {
//     fetch("https://api.kelasprogramming.com/todo", {
//         headers: {
//             "Authorization": `Bearer ${JWTtoken}`
//         }
//     })
//         .then((response) => response.json())
//         .then((body) => {
//             // kita akan convert list kepada list of html elements
//             const todoList = body.entry.map((todo) => (
//                 `<div class="pt-1 d-flex justify-content-between">
//                 ${todo.details}
//                 <div class="d-flex" >
//                   <button class="btn btn-${todo.completed == 1 ? 'success' : 'warning'} me-1">${todo.completed == 1 ? '<i class="bi bi-check"></i>' : '<i class="bi bi-x"></i>'}</button>
//                   <button class='btn btn-primary me-1' data-bs-toggle="modal" data-bs-target="#editTodo" onclick='selectTodo(${JSON.stringify(todo)})' ><i class="bi bi-pencil"></i></button>
//                   <button class='btn btn-danger'><i class="bi bi-trash"></i></button>
//                 </div>
//               </div>`
//             ))
//             // render list of html elements kepada innerHTML dekat dalam #todoList
//             document.getElementById('todoList').innerHTML = todoList.join('')
//         })
//         .catch((err) => { debugger })
// }

// // onclick button,
// // 1) kita dapatkan value dari input
// // 2) kita akan buat post request utk create
// // 3) onsuccess,
// // 3.1) refetch all todo items
// // 3.2) clearkan input field
// // 4) on fail, kita alertkan
// function onSubmit() {
//     const inputValue = document.getElementById('todoInput').value
//     fetch('https://api.kelasprogramming.com/todo', {
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${JWTtoken}`
//         },
//         body: JSON.stringify({
//             "details": inputValue
//         })
//     })
//         .then((response) => response.json())
//         .then(body => {
//             fetchAllTodos()
//             document.getElementById('todoInput').value = ''
//         })
//         .catch(err => { debugger })
// }
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

// fetchAllTodos()