//Enlazar el id de los botones con las funciones de transicion
document.getElementById("btn-register").addEventListener("click", register);
document.getElementById("btn-login").addEventListener("click", login);

window.addEventListener("resize", pageWidth)

//Declaración de variables
var containerLoginRegister = document.querySelector(".container-login-register");
var formLogin= document.querySelector(".form-login");
var formRegister = document.querySelector(".form-register");

var backBoxLogin= document.querySelector(".back-box-login");
var backBoxRegister= document.querySelector(".back-box-register");

function pageWidth() {
    if (window.innerWidth > 850){
        backBoxLogin.style.display = "block";
        backBoxRegister.style.display = "block";
    }else{
        backBoxRegister.style.display = "block";
        backBoxRegister.style.opacity = "1";
        backBoxLogin.style.display = "none";
        formLogin.style.display = "block";
        formRegister.style.display = "none";
        containerLoginRegister.style.left = "0px"
    }
}

pageWidth();

function register() {
    if(window.innerWidth > 850){
        formRegister.style.display = "block";
        containerLoginRegister.style.left = "410px";
        formLogin.style.display = "none";
        backBoxRegister.style.opacity = "0";
        backBoxLogin.style.opacity = "1"
    }else{
        formRegister.style.display = "block";
        containerLoginRegister.style.left = "0px";
        formLogin.style.display = "none";
        backBoxRegister.style.display = "none";
        backBoxLogin.style.display = "block";
        backBoxLogin.style.opacity = "1";
    }

}

function login() {
    if(window.innerWidth > 850){
        formRegister.style.display = "none";
        containerLoginRegister.style.left = "10px";
        formLogin.style.display = "block";
        backBoxRegister.style.opacity = "1";
        backBoxLogin.style.opacity = "0"
    }else{
        formRegister.style.display = "none";
        containerLoginRegister.style.left = "0px";
        formLogin.style.display = "block";
        backBoxRegister.style.display = "block";
        backBoxLogin.style.display = "none"
    }
    
}