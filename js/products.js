/*(E1)Se crea una constante con el link donde se va a realizar el fetch*/
const carCategoryUrl =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  localStorage.getItem("catID") +
  ".json";

/*(E1)Se crea una constante para tomar a la etiqueta*/
const carsContainer = document.getElementById("cars-container");
//(E2) array de productos original ordenado
let productsArr = [];
//(E2) array de productos filtrado
let currentProductsArr = [];
//(E2) nombre de la categoria
let nameCategory;

//(E2) se crea una const que tiene una funcion flecha con un paramerto el cual me crea el cuerpo de products.html
const showProducts = () => {
  //(E1)agregamos un primer fragmento a la etiqueta anteriormente llamada
  //=>Se recorre con un forEach el array currentProductsArr, para generar el html
  carsContainer.innerHTML = "";
  document.getElementById("catName").innerHTML = nameCategory;
  currentProductsArr.forEach((product) => {
    //(E3) creamos un div que tome el id del producto y lo agrega como nombre del id de la etiqueta. 
    //Se le agrega el atributo onClick donde se llama a la función guardarProducto. 
    const html = `
    <div id="${product.id}" onclick="guardarProducto(id)">
        <div class="list-group-item list-group-item-action cursor-active"> 
          <div class="row"> 
            <div class="col-3"> 
            <img src="${product.image}" alt="car image" class="img-thumbnail"> 
              </div> 
                <div class="col"> 
                  <div class="d-flex w-100 justify-content-between"> 
                  <div class="mb-1"> 
                  <small class="text-muted">${product.soldCount} vendidos</small> 
                  <h4>${product.name} - ${product.cost}${product.currency}</h4> 
                  <p>${product.description}</p> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div>
     </div>
        `;
    carsContainer.innerHTML += html;
  });
};

//(E2) función para buscar productos en un array
const searchProducts = (array) => {
  //(E2) si la query del input está vacía, se devuelve el array sin filtrar
  if (navbar.value == "") {
    return array;
  } else {
    return array.filter(
      (product) =>
        product.name.toLowerCase().includes(navbar.value.toLowerCase()) ||
        product.description.toLowerCase().includes(navbar.value.toLowerCase())
    );
  }
};

//(E2) función para filtrar productos por rango de precio
const filterProducts = (array, minPrice, maxPrice) => {
  return array.filter(
    (product) => product.cost >= minPrice && product.cost <= maxPrice
  );
};

//(E2) funciones que ordenan el array original por precio
const sortProductsAsc = () => {
  productsArr.sort((a, b) => a.cost - b.cost);
};

const sortProductsDesc = () => {
  productsArr.sort((a, b) => b.cost - a.cost);
};

//(E2) función que ordena el array original por cantidad de ventas
const sortProductsByCount = () => {
  productsArr.sort((a, b) => b.soldCount - a.soldCount);
};

//(E2)Se cambia el fragmento de "getJSONData" a este sector
document.addEventListener("DOMContentLoaded", function (e) {
  //(E2) Obtenemos los inputs del rango de precios
  let min = document.getElementById("rangeFilterCountMin");
  let max = document.getElementById("rangeFilterCountMax");

  //(E2) obtenemos los datos llamando a getJSONData, luego los mostramos llamando a showProducts
  getJSONData(carCategoryUrl).then(function (resultObj) {
    if (resultObj.status === "ok") {
      nameCategory = resultObj.data.catName;
      productsArr = resultObj.data.products;
      sortProductsAsc();
      currentProductsArr = productsArr.slice();

      showProducts();
    }
  });

  //(E2) función que actualiza currentProductsArr, buscando y filtrando por precio (si corresponde) los productos
  const updateCurrent = () => {
    currentProductsArr = searchProducts(productsArr);
    if (min.value > 0 && max.value > 0) {
      currentProductsArr = filterProducts(
        currentProductsArr,
        min.value,
        max.value
      );
    }
  };

  //(E2)cuando se le da click a la etiqueta designada, se ordena en orden ascendiente (precio)
  document.getElementById("sortAsc").addEventListener("click", () => {
    sortProductsAsc();
    updateCurrent();
    showProducts();
  });
  //(E2)cuando se le da click a la etiqueta designada, se ordena en orden descendiente (precio)
  document.getElementById("sortDesc").addEventListener("click", () => {
    sortProductsDesc();
    updateCurrent();
    showProducts();
  });
  //(E2)cuando se le da click a la etiqueta designada, se ordena de menos vendidos a mas vendidos
  document.getElementById("sortByCount").addEventListener("click", () => {
    sortProductsByCount();
    updateCurrent();
    showProducts();
  });

  //(E2)cuando se le da click a la etiqueta designada, filtro segun un rango de precios
  document.getElementById("rangeFilterCount").addEventListener("click", () => {
    //(E2) Arreglo Desafio
    updateCurrent();
    showProducts();
  });
  //(E2) cuando se le da click a la etiqueta designada, limpia el filtro de precio
  document.getElementById("clearRangeFilter").addEventListener("click", () => {
    min.value = "";
    max.value = "";
    sortProductsAsc();
    updateCurrent();
    showProducts();
  });

  //Agrega el correo en el nav
  correoNav();

  //(E2) Se crea el evento para la barra de navegación
  document.getElementById("navbar").addEventListener("input", () => {
    updateCurrent();
    showProducts();
  });
});

//(E3) función que toma el id como parámetro y lo agrega al local Storage, además, redirecciona al product-info.html
function guardarProducto(id)
{
  localStorage.setItem("idProduc",id)
  window.location.href="product-info.html"
};