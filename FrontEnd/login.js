
async function login() {
    let mail = document.getElementById("user")
    mail = mail.value
    let password = document.getElementById("password")
    password = password.value
    fetch('http://localhost:5678/api/users/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: mail,
            password: password
        })
    })
    .then(response => console.log(response.status))
    .then(response => response.json())
    .then(data => console.log('Réponse du serveur:', data))
    .catch(error => console.error('Erreur:', error));
}
let button = document.getElementById("BTN_login")
button.addEventListener("click",function() {login()})