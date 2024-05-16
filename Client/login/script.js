const email = "esta@gmail.com";
const password = "gi@2024";

var varEmail, varPassword;
document.querySelector("#email").addEventListener("change", function () {
    varEmail = this.value;
});
document.querySelector("#password").addEventListener("change", function () {
    varPassword = this.value;
});

document.querySelector("#login").addEventListener("click", function () {
    if (varEmail && varPassword) {
        if (varEmail == email && varPassword == password) {
            console.log(varEmail, varPassword);

            document
                .getElementById("login-form")
                .setAttribute("action", "../home/home.html");
        } else {
            alert("L'un des deux champs est inccorect ,\nRessayer !");
        }
    } else {
        alert("S'il te plait , Entrer vous donnees!");
    }
});
