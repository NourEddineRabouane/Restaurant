let nom = document.querySelector(".nom");
let numero = document.querySelector(".num");
let poste = document.querySelector(".poste");
let salaire = document.querySelector(".salaire");
let dateAdmission = document.querySelector(".admission-date input");

let employList = [];
let ID = 1;
//
if (localStorage.getItem("employees")) {
    employList = JSON.parse(localStorage.getItem("employees"));
    afficherEmployee();
} else localStorage.setItem("employees", JSON.stringify(employList));
// //
if (localStorage.getItem("ID")) 
    ID = Number(localStorage.getItem("ID"));
else 
    localStorage.setItem("ID", ID);

// il faut aficher la list chaque fois la page est reloader
function AjouterEmployee(name, num, post, salary, date) {
    let ID = localStorage.getItem("ID");
    employList.push({
        id: ID,
        nomComplet: name,
        numeroTel: num,
        post: post,
        salaire: salary,
        dateAdmi: date,
    });

    localStorage.setItem("employees", JSON.stringify(employList));
    localStorage.setItem("ID", ++ID);
}

//
function afficherEmployee() {
    // suprimmer tous les elements du tbody pour ajouter a nouveau les elements apres la modification
    let tablebody = document.querySelector("#employers tbody");
    tablebody.innerHTML = "";

    // pour chaque employee
    employList.forEach((item) => {
        const newRow = document.createElement("tr");
        newRow.setAttribute("id", `${item.id}`);
        newRow.innerHTML = `
        <td>${item.nomComplet}</td>
        <td>${item.numeroTel}</td>
        <td>${item.post}</td>
        <td>${item.salaire}</td>
        <td>${item.dateAdmi}</td>
        <td>
        <button class="remove" onclick="SupprimerEmployee(this)"><span class="material-symbols-outlined"> remove </span></button>
        <button class="edit"   onclick="ModifierEmplyee(this)"> <span class="material-symbols-outlined"> edit </span></button>
        </td>
        `;

        tablebody.appendChild(newRow);
    });
}

//
function SupprimerEmployee(target) {
    let lineId = target.parentElement.parentElement.id;
    employList = employList.filter((item) => item.id != lineId);
    localStorage.setItem("employees", JSON.stringify(employList));
    afficherEmployee();
}
//
function ModifierEmplyee(target) {
    let tr = target.parentElement.parentElement;
    let lineId = tr.id;
    let item;
    // selectioner l'object dont id est celui volu
    for (i = 0; i <= employList.length; i++)
        if (employList[i].id == lineId) {
            item = employList[i];
            break;
        }

    let scorllYlenght = window.scrollY;

    nom.value = item.nomComplet;
    numero.value = item.numeroTel;
    poste.value = item.post;
    dateAdmission.value = item.dateAdmi;
    salaire.value = item.salaire;

    window.scrollBy(0, -scorllYlenght);
    // lorsque on clique sur le bottun modifie , les information d'employee se modifie
    let editButton = document.querySelector(".Edit");

    // Supprimez tous les écouteurs d'événements précédents
    let newButton = editButton.cloneNode(true);
    editButton.parentNode.replaceChild(newButton, editButton);

    // Ajoutez le nouvel écouteur d'événements
    newButton.addEventListener("click", function () {
        item.nomComplet = nom.value;
        item.numeroTel = numero.value;
        item.post = poste.value;
        item.salaire = salaire.value;
        item.dateAdmi = dateAdmission.value;

        employList = employList.filter((e) => e.id != lineId);
        employList.push(item);

        localStorage.setItem("employees", JSON.stringify(employList));
        afficherEmployee();
    });
}

//
document.querySelector(".add").addEventListener("click", () => {
    if (
        nom.value &&
        numero.value &&
        poste.value &&
        salaire.value &&
        dateAdmission.value
    ) {
        AjouterEmployee(
            nom.value,
            numero.value,
            poste.value,
            salaire.value,
            dateAdmission.value
        );
        afficherEmployee();
        resetInputs();
    }
});

let resetInputs = () => {
    nom.value = "";
    numero.value = "";
    poste.value = "";
    salaire.value = "";
    dateAdmission.value = "";
};
