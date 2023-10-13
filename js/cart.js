document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products-container");
  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  correoNav();

  //(E5) busco los datos para trabajar con ellos
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  let products;
  if (!carrito) {
    const promesa = await fetch(url);
    const datosCompra = await promesa.json();
    products = datosCompra.articles;
  } else {
    products = carrito;
  }
  // console.log(lista);
  //(E5)en el comentario de abajo creo una posible estructura dandole un parametro, pero por ahora queda anulada, igualmente seria descomentar y
  //cambiar  en el forEach"datosCompra" por "compra"
  //const estructura = (compra) =>
  //{
  /*(E5)se crea una estructura prototipo con id para usarlos en el evento "input"*/
  products.forEach((articulo) => {
    const input = document.createElement("input");
    input.classList.add("cantidadArticulos");
    input.setAttribute("type", "number");
    input.setAttribute("value", articulo.count);
    input.setAttribute("id", articulo.id);
    input.setAttribute("min", 0);
    input.addEventListener("change", (e) => {
      const subTotalElem = document.getElementById(`subTotal-${articulo.id}`);
      subTotalElem.innerHTML =
        articulo.currency + " " + articulo.unitCost * e.target.value;
    });

    const row = document.createElement("tr");
    row.innerHTML += `
        <th class="d-lg-block d-md-none d-sm-none d-none"><img class="cart-img" src="${articulo.image}"></th>
        <th>${articulo.name}</th>
        <th class="d-lg-table-cell d-md-none d-sm-none d-none">${articulo.currency} ${articulo.unitCost}</th>
        <th></th>
        <th id="subTotal-${articulo.id}">${articulo.currency} ${articulo.unitCost}</th>
      `;
    container.appendChild(row);
    row.querySelector("th:nth-child(4)").appendChild(input);
  });
});
