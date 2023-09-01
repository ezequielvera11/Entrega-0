document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
    // Se agrega un condicional, en caso de que el usuario no esté logeado, se redirecciona al interfaz del login

    if (!localStorage.getItem("estaLogeado")){
        window.location.href="login.html"
    };

    //En caso de que haya un correo ingresado, se cambia el texto de "Iniciar Sesion" a el valor del correo.
    const mostrarLogin = document.getElementById('login');
    if(localStorage.getItem('correo')){
        mostrarLogin.innerText = localStorage.getItem('correo');
    }
});