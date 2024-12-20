
async function login() {
    let mail = document.getElementById("user")
    mail = mail.value
    let password = document.getElementById("password")
    password = password.value
    const errorMsgDiv = document.getElementById("error_msg");

    const reponsebrut = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: mail,
            password: password
        })
    })
    console.log(reponsebrut.status)
    // console.log((await reponsebrut.json()).token) le token 
    if (reponsebrut.status === 200){ console.log('acces auto')
        // recuperation du TOKEN
        let token = (await reponsebrut.json()).token
        // console.log(token);(pour verification token si besoin)
        //stocker le token en local
        window.localStorage.setItem("localtoken",token)
        window.location.replace("index.html");
    } else {
        // Vide le contenu de la div
        errorMsgDiv.innerHTML = "";
        // Ajoute le message d'erreur
        errorMsgDiv.textContent = "Mot de passe/Login incorrecte";
    }


}
let button = document.getElementById("BTN_login")
button.addEventListener("click",()=>{ login()})