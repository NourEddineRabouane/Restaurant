// JavaScript
let titre = document.querySelector(".inputs input[type='text']");
let prix = document.querySelector(".inputs input[type='number']");
let categorie = document.querySelector(".inputs select");

let repasListe = [];

window.addEventListener("load", () => {
    // let idf;
    if (localStorage.getItem("repas")) {
        repasListe = JSON.parse(localStorage.getItem("repas"));
        afficherRepas();
    }
    if (!localStorage.idf) localStorage.setItem("idf", 1);
});

// Tableau pour stocker les repas
function ajouterRepas(title, price, categoriee, date) {
    let idf = localStorage.getItem("idf");
    repasListe.push({ id: idf, title, price, categoriee, date });
    localStorage.setItem("repas", JSON.stringify(repasListe));
    localStorage.setItem("idf", ++idf);
}

//
function supprimerRepas(target) {
    let lineId = target.parentElement.parentElement.id;
    repasListe = repasListe.filter((item) => item.id != lineId);
    localStorage.setItem("repas", JSON.stringify(repasListe));
    afficherRepas();
}
//
function editRepas(target) {
    let tr = target.parentElement.parentElement;
    let lineId = tr.id;

    // selectioner l'object dont id est celui volu
    let item = repasListe.filter((item) => item.id == lineId)[0];

    let scorllYlenght = window.scrollY;

    titre.value = item.title;
    prix.value = item.price;
    categorie.value = item.categoriee;

    window.scrollBy(0, -scorllYlenght);

    let editButton = document.querySelector(".Edit");

    // Supprimez tous les écouteurs d'événements précédents
    let newButton = editButton.cloneNode(true);
    editButton.parentNode.replaceChild(newButton, editButton);

    // Ajoutez le nouvel écouteur d'événements
    newButton.addEventListener("click", function () {
        item.title = titre.value;
        item.price = prix.value;
        item.categoriee = categorie.value;
        item.date = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;

        repasListe = repasListe.filter((e) => e.id != lineId);
        repasListe.push(item);

        localStorage.setItem("repas", JSON.stringify(repasListe));
        afficherRepas();
    });
}

//afficher le repas dans le tableau convenable
function afficherRepas() {
    // suprimmer tous les elements du tbody pour ajouter a nouveau les elements apres la modification
    let tablesbody = document.querySelectorAll(".menurepas table tbody");
    tablesbody.forEach((item) => (item.innerHTML = ""));

    // pour chaque repas
    repasListe.forEach((repas) => {
        const table = document.getElementById(repas.categoriee);
        tbody = table.querySelector("tbody");

        const newRow = document.createElement("tr");
        newRow.setAttribute("id", `${repas.id}`);
        newRow.innerHTML = `
        <td>${repas.title}</td>
        <td>${repas.price}</td>
        <td>${rewriteCategorie(repas.categoriee)}</td>
        <td>${repas.date}</td>
        <td>
        <button class="remove" onclick="supprimerRepas(this)"><span class="material-symbols-outlined"> delete </span></button>
        <button class="edit"   onclick="editRepas(this)"> <span class="material-symbols-outlined"> edit </span></button>
        </td>
        `;

        tbody.appendChild(newRow);
    });
}

//ajouter une ligne contenat le repas ajouter
document.querySelector(".add").addEventListener("click", function () {
    if (titre.value && prix.value && categorie.value) {
        let dated = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
        ajouterRepas(titre.value, prix.value, categorie.value, dated);
        afficherRepas();
    }
    titre.value = "";
    prix.value = "";
    categorie.value = "";
});

function rewriteCategorie(categorie) {
    switch (categorie) {
        case "pd":
            return "Petit déjeuner";
        case "de":
            return "Déjeuner";
        case "di":
            return "Dîner";
        case "sn":
            return "Snack";
        case "bo":
            return "Boissons";
    }
}
