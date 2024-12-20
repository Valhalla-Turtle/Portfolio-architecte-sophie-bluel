let gallery = document.querySelector(".gallery")

let modal_warpper_gallery = document.getElementById("modal-wrapper-gallery")

let modal_warpper = document.getElementById("modal-wrapper")

let modal1 = document.getElementById("modal1")

let modal_warpper_page1 = document.querySelector(".modal-wrapper-page1")

let modal_warpper_page2 = document.querySelector(".modal-wrapper-page2")


//création du nav et ajout d'une classe "filtre"
let nav_filtre = document.createElement("nav")
nav_filtre.classList.add("filtre")
document.getElementById("portfolio")
portfolio.insertBefore(nav_filtre, gallery)

function filterWorks(event) {
    let figures = document.querySelectorAll(".gallery figure")
    console.log(figures)
    let dataCategory = event.currentTarget.getAttribute("data-category")
    console.log(dataCategory)
    let all_button = document.querySelectorAll(".button_filter")
    let activefilter =event.target
    console.log(activefilter)
    console.log(all_button)
    all_button.forEach(button =>{
    button.classList.remove("button_active","button_inactive")
    button.classList.add("button_inactive")
    })
    activefilter.classList.add("button_active")

    figures.forEach(figure => {
        figure.classList.add("invisible")
        if (dataCategory === figure.getAttribute("dataCategory")) {
            figure.classList.remove("invisible")
        }
        if (dataCategory === "0") {
            figure.classList.remove("invisible")
        }
        else {
            console.log("se passe rien")
        }
    })
}
//recup les button dynamiquement 

// Effectuer la requête vers l'API
async function GetApiInfo() {

    gallery.innerHTML = ""//on vide l'html pour ne pas avoir de probleme de stack
    const response = await fetch("http://localhost:5678/api/works")

    const data = await response.json(); // Extraction des données JSON
    console.log(data);// Verificaiton des data

    // Créer et insérer les éléments `figure` basés sur les données de l'API
    data.forEach(item => {
        let figure = document.createElement("figure");

        // Ajoute l'image
        let img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.title;
        figure.appendChild(img);

        // Ajoute le titre
        let fig_title = document.createElement("fig_title");
        fig_title.textContent = item.title;
        figure.appendChild(fig_title);

        // Ajout de la catégorie via l'ID present dans l'API
        let Fig_categorie = item.category.id;
        figure.setAttribute("dataCategory", Fig_categorie)

        // Ajout de l'ID unique au work
        let FigureID = item.id;
        figure.setAttribute("dataID", FigureID)

        // Ajoute la figure au conteneur `gallery`
        gallery.appendChild(figure);
    });

//CREATION DES BTN FILTRES
    if (document.getElementById("bouton_tous")) { console.log("ne rien faire") }
    else {
        let button_tous = document.createElement("button")
        button_tous.textContent = "Tous"
        nav_filtre.appendChild(button_tous)
        button_tous.classList.add("button_active", "button_filter")
        button_tous.setAttribute("data-category", 0)
        button_tous.id = "bouton_tous"
    }
    data.forEach(item => {
        //verifier si le bouton existe deja
        let nom_btn = item.category.name
        let boutons = nav_filtre.querySelectorAll("button")
        let boutonExistant = Array.from(boutons).some(button => button.textContent === nom_btn);
        if (boutonExistant) { console.log("ne rien faire") }
        else {
            console.log("creation bouton filtre")
            //si il existe pas le créé
            let button = document.createElement("button")
            button.textContent = nom_btn
            nav_filtre.appendChild(button)
            button.classList.add("button_inactive", "button_filter")
            button.setAttribute("data-category", item.category.id)
        }
    })

    let all_button = document.querySelectorAll(".button_filter")
    all_button.forEach(button => button.addEventListener("click", function (event) { filterWorks(event) }))

    console.log("Mise en place des figures dans le HTML");
}
GetApiInfo()

//etape 3 OC

if (localStorage.getItem("localtoken") !== null) {
    console.log(`La clé localtoken existe dans le localStorage.`);
    const admin_object = document.querySelectorAll('#admin');

    // Parcourir chaque élément et retirer la style "invisible"
    admin_object.forEach(admin_object => {
        admin_object.style.display = null;
    });
    let loginBTN = document.getElementById("login");
    loginBTN.style.display= "none";
} else {
    console.log(`La clé localtoken n'existe pas dans le localStorage.`);
}


async function deletewokrs(IDWORK) {

    const reponsebrut = await fetch(`http://localhost:5678/api/works/${IDWORK}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("localtoken")}`
        }
    })
    console.log(reponsebrut.status)
    if (reponsebrut.status === 204) {
        console.log('acces auto')
        let WorkDelete = document.querySelectorAll(`[dataID="${IDWORK}"]`)
        WorkDelete.forEach(Work => {
            Work.remove()
        });
    } else {
        // Vide le contenu de la div
        errorMsgDiv.innerHTML = "";
        // Ajoute le message d'erreur
        errorMsgDiv.textContent = "Mot de passe/Login incorrecte";
    }
}


async function GetApiInfoModal() {

    const response = await fetch("http://localhost:5678/api/works")

    const data = await response.json(); // Extraction des données JSON
    console.log(data);// Verificaiton des data
    modal_warpper_gallery.innerHTML = ""
    // Créer et insérer les éléments `figure` basés sur les données de l'API
    data.forEach(item => {
        let figure = document.createElement("figure");
        let idWork = item.id;

        // Ajoute l'image
        let img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.title;
        figure.setAttribute("dataid", idWork);
        figure.appendChild(img);


        // Ajout du bouton poubelle sur la figure
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("dataid", idWork);
        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        trashIcon.style.color = "#ffffff";
        deleteButton.appendChild(trashIcon);
        figure.appendChild(deleteButton);
        //lance la requete api delete avec l'id du works en variables
        //si l'api nous dis que le travail est bien suprr on le suprr l'affichage
        // fetch = curl voir cours OP
        deleteButton.addEventListener("click", () => { deletewokrs(idWork), console.log('lacement du delete') })

        // Ajoute la figure au conteneur `modal-warpper`
        modal_warpper_gallery.appendChild(figure);
    });
}

//affichage et fermeture des modales 

const openModal1 = function (e) {
    e.preventDefault();
    modal1.style.display = null;
    modal_warpper_page1.style.display = null;
    modal_warpper_page2.style.display = "none";
}

let OpenModal1Button = document.querySelector(".adminModal1Open")
OpenModal1Button.addEventListener("click", openModal1)

const closeModal1 = function (e) {
    e.preventDefault()
    modal1.style.display = "none"
    AddWorkFilePlaceHolder.style.display = null
    AddWorkFileButton.style.display = null
    AddWorkSpec.style.display = null
    PreviewWork.src = ""
    AddWorkFile.value = ""
    console.log("fermeture modal")
}

let CloseModal1Button = document.querySelector(".adminModal1Close")
CloseModal1Button.addEventListener("click", closeModal1)

// empecher que le clique dans la modal ferme cette derniere 

const stopPropagation = function (e) {
    if (e.target.classList.contains("adminModal1Close")) {
    }
    else {
        e.stopPropagation()
    }
}
modal_warpper.addEventListener("click", stopPropagation)

// recuperation du bouton "ajouter" pour passer de la page 1 a 2 dans la modal
let AddButton = document.getElementById("AddButton")
AddButton.addEventListener("click", () => {
    modal_warpper_page1.style.display = "none"
    modal_warpper_page2.style.display = null
})

// recuperation et gestion du bonton"<=" pour passer de la page 2 a 1 dans la modal
let BackToModal1 = document.getElementById("BackToModal1")
BackToModal1.addEventListener("click", () => {
    modal_warpper_page1.style.display = null
    modal_warpper_page2.style.display = "none"
    AddWorkFilePlaceHolder.style.display = null
    AddWorkFileButton.style.display = null
    AddWorkSpec.style.display = null
    PreviewWork.src = ""
    AddWorkFile.value = ""
})


async function GetCategory() {
    let allcategorybrut = await fetch("http://localhost:5678/api/categories")
    let allcategory = await allcategorybrut.json()
    const DocCategory = document.getElementById("AddWorkCategory"); //recuperation du parent HTLM
    allcategory.forEach(item => {
        //creation de l'option dans le form
        let option = document.createElement("option");
        option.innerText = (item.name);
        option.setAttribute("categoryID", (item.id))
        DocCategory.appendChild(option);
    }
    )
}
//gestion du bouton d'ajout de work ci dessous
let AddWorkButton = document.getElementById("AddWorkButton")
const errorMsgDiv = document.getElementById("error_msg")
async function AddWork() {
    // recupération du contenue du formulaire
    let AddWorkFile = document.getElementById("AddWorkFile");
    AddWorkFile = AddWorkFile.files[0]
    let AddWorkTitle = document.getElementById("AddWorkTitle").value;
    // recuperation de la category
    let AddWorkCategory = document.getElementById("AddWorkCategory");
    let IdAddWorkCategory = AddWorkCategory.options[AddWorkCategory.selectedIndex]
    IdAddWorkCategory = IdAddWorkCategory.getAttribute("categoryID");
    console.log("category du work", IdAddWorkCategory);
    console.log("titre du work", AddWorkTitle)
    console.log("file du work", AddWorkFile)

    // Construction de l'objet FormData
    const formData = new FormData();
    formData.append('image', AddWorkFile); // Ajoute le fichier
    formData.append('title', AddWorkTitle); // Ajoute le titre
    formData.append('category', IdAddWorkCategory); // Ajoute la catégorie
    console.log(formData)
    const reponsebrut = await fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("localtoken")}`
        },
        body: formData
    })
    
    if (reponsebrut.status === 201) {
        console.log('acces auto')

        // on recharge les info de l'api pour faire apparaitre le nouveau work et filtre si besoin
        GetApiInfo()
        GetApiInfoModal()
        // on retourne a la page 1 de la modal
        modal_warpper_page1.style.display = null
        modal_warpper_page2.style.display = "none"
    } else {
        // Vide le contenu de la div
        errorMsgDiv.innerHTML = "";
        // Ajoute le message d'erreur
        errorMsgDiv.textContent = "Vous n'avez pas les autorisations pour faire cela";
    }
}
AddWorkButton.addEventListener("click", AddWork)

//gestion de l'appercu du work lors de l'utilisation du form
let AddWorkFile = document.getElementById("AddWorkFile");
let AddWorkFilePlaceHolder = document.getElementById("AddWorkFilePlaceHolder");
let PreviewWork = document.getElementById("PreviewWork");
let AddWorkSpec = document.getElementById("AddWorkSpec")

function readUrl(input) {
    var reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload = (e) => {
        PreviewWork.src = e.target.result;
        console.log
        AddWorkFilePlaceHolder.style.display = "none"
        AddWorkFileButton.style.display = "none"
        AddWorkSpec.style.display ="none"
    }
}
let AddWorkFileButton = document.getElementById("AddWorkFileButton")
AddWorkFileButton.addEventListener("click",function(e){
    e.preventDefault()
    AddWorkFile.click()
})

let LogoutBtn = document.querySelector(".logout")
LogoutBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});


GetCategory()
GetApiInfoModal()


//FILTRE LOGIN au niveau du CSS
//redirection dinamique  