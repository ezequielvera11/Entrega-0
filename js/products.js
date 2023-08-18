/*Se crea una constante con el link donde se va a realizar el fetch*/
const carCategoryUrl =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";
/*Se crea una constante para tomar a la etiqueta*/
const carsContainer = document.getElementById("cars-container");

const showProducts = () => {
//Se utiliza la funcion "getJSONData" para hacer la peticion a la URL
//=>Evaluamos la respuesta y vemos que los datos se obtuvieron correctamente
//=>En caso de que sea positiva la evaluacion, agregamos un primer fragmento a la etiqueta anteriormente llamada
//=>Se recorre con un forEach en la parte de "products" de los datos obtenidos, para asi agregarlos posteriormente a la etiqueta llamada
  getJSONData(carCategoryUrl).then((res) => {
    if (res.status == "ok") {
      carsContainer.innerHTML += `
      <center>
        <h1>Productos</h1>
        <h3>Verás aquí todos los productos de la categoría ${res.data.catName}</h3>   
      </center>
      `;
      res.data.products.forEach((product) => {
        const html = `
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
        `;
        carsContainer.innerHTML += html;
      });
      console.log(res.data);
    }
  });
};

showProducts();
