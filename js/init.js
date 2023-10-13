const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//localStorage.setItem('carrito',JSON.stringify([]));
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
//Agrega el correo en el nav
function correoNav() {
  if (!localStorage.getItem("estaLogeado")) {
    window.location.href = "login.html";
  }

  // En caso de que haya un correo ingresado, se cambia el texto de "Iniciar Sesion" a el valor del correo.
  // (E4) Se agrega un menú desplegable.
  const mostrarLogin = document.getElementById("login");
  if (localStorage.getItem("correo")) {
    mostrarLogin.innerHTML = ` 
    <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${localStorage.getItem("correo")}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark bg-dark">
              <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
              <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
              <li><a class="dropdown-item" href="#" id ="cambiarModo">Cambiar modo</a></li>
              <li><a class="dropdown-item" id = 'logOut'>Cerrar sesión</a></li>
            </ul>
          </li>`;
  }

  //(E4) Se obtiene la etiqueta anchor del menú desplegable
  const cambiarModo = document.getElementById("cambiarModo");

  cambiarModo.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    //(E4) Se guarda el modo en localStorage.
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("dark-mode", "true");
    } else {
      localStorage.setItem("dark-mode", "false");
    }
  });

  //(E4) Se obtiene el modo actual y se añade o remueve la clase dark al body.
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

async function loadCart() {
  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  const carrito = localStorage.getItem("carrito");
  if (!carrito || JSON.parse(carrito).length == 0) {
    const promesa = await fetch(url);
    const datosCompra = await promesa.json();
    localStorage.setItem("carrito", JSON.stringify(datosCompra.articles));
  }
}

loadCart();

//(E4) Se llama por id al botón "cerrar sesion" del menú desplegable y al hacerle click se elminan
//del localStorage los datos del usuario anteriormente logeado, y lurgo redirige a la pantalla de login.

const logOut = document.getElementById("logOut");

logOut.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.removeItem("estaLogeado");
  localStorage.removeItem("correo");

  window.location.href = "login.html";
});
