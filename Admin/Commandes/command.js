let section = document.getElementsByTagName("section")[0];

let Commandes = [];

if (localStorage.getItem("commandes"))
    Commandes = JSON.parse(localStorage.getItem("commandes"));

AjouterCommandes()
function AjouterCommandes() {
    for (let commande of Commandes) {
        let carte = document.createElement("div");
        let total = 0 ;
        carte.innerHTML = `
            <div class="carte">
                    <div class="title">
                        <h3>Aux Delice</h3>
                    </div>
                    <div class="date">
                        ${`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
                    </div>
                    <div class="repas">
                        ${commande.commande.map((item) => {
                            total+= Number.parseInt(item.price);
                            return `<span>${item.title} <strong>${item.price}DH</strong></span>`;
                        }).join("")}
                    </div>
                    <div class="total">
                        <span>Total <strong>${total}DH</strong></span>
                    </div>
                </div>
            `;
        // console.log(carte);
        section.append(carte);
    }
}
