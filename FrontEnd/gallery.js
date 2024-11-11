let gallery = document.querySelector(".gallery")

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
    figures.forEach(figure => {
        figure.classList.add("invisible")
        if (dataCategory === figure.getAttribute("data-id")) {
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
        figure.setAttribute("data-id", Fig_categorie)
        
        // Ajoute la figure au conteneur `gallery`
        gallery.appendChild(figure);
    });
    
    let button_tous = document.createElement("button")
    button_tous.textContent = "Tous"
    nav_filtre.appendChild(button_tous)
    button_tous.classList.add("button_active", "button_filter")
    button_tous.setAttribute("data-category", 0)
    data.forEach(item => {
        //verifier si le bouton existe deja
        let nom_btn = item.category.name
        let boutons = nav_filtre.querySelectorAll("button")
        let boutonExistant = Array.from(boutons).some(button => button.textContent === nom_btn);
        if (boutonExistant) { console.log("ne rien faire")}
        else { console.log("creation")
            //si il existe pas le créé
            let button = document.createElement("button")
            button.textContent = nom_btn
            nav_filtre.appendChild(button)
            button.classList.add("button_inactive", "button_filter")
            button.setAttribute("data-category", item.id)
        }
    })
    
    let all_button = document.querySelectorAll(".button_filter")
    all_button.forEach(button => button.addEventListener("click", function (event) { filterWorks(event) }))
    
    console.log("Mise en place des figures dans le HTML");
}
GetApiInfo()