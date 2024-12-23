// function to run sign-in process
function logIn() {
    const username = document.getElementById('username-input').value
    const password = document.getElementById('password-input').value
    let todoToken
    let todoRefresh

    fetch('https://api.kelasprogramming.com/consumer/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
        .then((response) => response.json())
        .then((body) => {
            const isRememberMe = document.getElementById('remember-me').checked
            // check whether user want to stay login,
            if (isRememberMe == true) {
                // if true, set the JWT into local storage
                localStorage.setItem('TODO-JWT', body.token)
                localStorage.setItem('TODO-REFRESH', body.refresh_token)
                localStorage.setItem('TODO-USERNAME', username)
                config.TODO_JWT = localStorage.getItem('TODO-JWT')
                config.TODO_REFRESH = localStorage.getItem('TODO-REFRESH')
                config.TODO_USERNAME = localStorage.getItem('TODO-USERNAME')
            } else {
                // if false, set the JWT into session storage
                sessionStorage.getItem('TODO-JWT', body.token)
                sessionStorage.getItem('TODO-USERNAME', username)
                config.TODO_JWT = sessionStorage.setItem('TODO-JWT')
                config.TODO_USERNAME = sessionStorage.setItem('TODO-USERNAME')
            }
            window.location.href = "index.html"
        })
        .catch((err) => { debugger })
}