document.addEventListener("DOMContentLoaded", function(){

/*Se extrae el formulario a una variable*/
const formulario = document.getElementById("login-form");
const mail = document.getElementById("correo");

/*Se crea un evento para el momento que se envía el formulario*/
formulario.addEventListener("submit", function(event){

/*Función que frena las acciones por defecto de un submit (recargar la página) */
    event.preventDefault();

/*Funcion que almacenacena la información de que el usuario está logeado al enviar el formulario*/
    localStorage.setItem("estaLogeado", true);
//Guardo el valor del mail en un item "correo"
    localStorage.setItem("correo",mail.value);
/*Redirección a la página de inicio luego del envío del formulario*/
    window.location.href="index.html"
});

});