// function to run sign-in process
function logIn() {
    const username = document.getElementById('username-input').value
    const password = document.getElementById('password-input').value

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
            // first, save the JWT into session storage
            sessionStorage.setItem('TODO-JWT', body.token)
            sessionStorage.setItem('TODO-REFRESH', body.refresh_token)
            sessionStorage.setItem('TODO-USERNAME', username)

            // second, check whether user want to stay login,
            const isRememberMe = document.getElementById('remember-me').checked
            if (isRememberMe == true) {
                // if true, set the JWT into local storage
                localStorage.setItem('TODO-JWT', body.token)
                localStorage.setItem('TODO-REFRESH', body.refresh_token)
                localStorage.setItem('TODO-USERNAME', username)

                let expiryTime = new Date().getTime() + body.expires_in * 1000;
                localStorage.setItem('TODO-EXPIRY-TIME', expiryTime);
            }  // if false, just proceed to next instruction

            // third, proceed to index.html
            window.location.href = "index.html"
        })
        .catch((err) => { debugger })
}