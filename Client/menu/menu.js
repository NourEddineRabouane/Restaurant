var sections = document.querySelectorAll("section");
var maCommand = document.getElementsByClassName("Command")[0];
var commandList = new Array();
var repasList = new Array();

if (localStorage.getItem("repas"))
    repasList = JSON.parse(localStorage.getItem("repas"));

// ajouter les repas a leurs sections en se basant sur la categoriee
sections.forEach((item) => {
    for (i = 0; i < repasList.length; i++) {
        repasList[i] = { ...repasList[i], estCommander: false };
        if (item.id == repasList[i].categoriee) {
            addTosection(item, repasList[i]);
        }
    }
});

function Select(btn) {
    let div = btn.parentElement.parentElement;
    let sectionID = div.parentElement.id;
    if (btn.innerHTML == "+") {
        btn.innerHTML = "-";
        btn.style = "background-color : tomato;";
        div.style = "background-color : #76abae;";
        // ajouter l'element a la commande
        CommnaderRepas(sectionID, div.id);
        ajouterElemCommand();
    } else {
        btn.innerHTML = "+";
        btn.style = "background-color : #76abae;";
        div.style = "background-color :transparent;";
        // supprimer le repas de la commande
        deCommanderRepas(sectionID, div.id);
        ajouterElemCommand();
    }
}

// remplir les element dans la section
function addTosection(section, repas) {
    let div = document.createElement("div");
    div.setAttribute("id", repas.id);
    div.innerHTML = `
            <span>${repas.title} <strong>${repas.price}DH</strong></span>
            <span class="tools">
                <button onclick="Select(this)" >+</button>
            </span>
    `;
    section.append(div);
}

//commander un repas
function CommnaderRepas(categorie, id) {
    repasList.forEach((item) => {
        if (item.categoriee == categorie && item.id == id) {
            item.estCommander = true;
            commandList.push(item);
        }
    });
}

//decommander un repas
function deCommanderRepas(categorie, id) {
    commandList.forEach((item) => {
        if (item.categoriee == categorie && item.id == id)
            commandList = commandList.filter((e) => e != item);
    });
}

//ajouter un repas a la commande
function ajouterElemCommand() {
    maCommand.innerHTML = "";
    commandList.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `<span>${item.title} <strong>${item.price}DH</strong></span>`;
        maCommand.appendChild(div);
    });
}

// toutes les commandes effectuees
var Commandes = [],
    identifiant;
if (!localStorage.identifiantCommande)
    localStorage.setItem("identifiantCommande", 1);

if (localStorage.getItem("commandes"))
    Commandes = JSON.parse(localStorage.commandes);

//
document.getElementById("commander").onclick = () => {
    identifiant = localStorage.getItem("identifiantCommande");

    Commandes.push({
        id: identifiant,
        date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
        commande: commandList,
    });
    localStorage.setItem("commandes", JSON.stringify(Commandes));
    localStorage.setItem("identifiantCommande", ++identifiant);

    commandList.splice(0, commandList.length);
    location.reload(); /*reload current page*/
};
