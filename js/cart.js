//(E6)
const precioSubTotal = document.getElementById("sub");
const precioEnvio = document.getElementById("costEnvio");
const precioTotal = document.getElementById("pagoTotal");
const radios = document.getElementById("radios");
const infoCostos = document.getElementById("infoCostos");
const envioForm = document.getElementById("btnFormEnvio");
const formCarrito = document.getElementById("formCarrito");
const radio1 = document.getElementById("tarjetaCredito");
const radio2 = document.getElementById("transferenciaBancaria");
const alertaPago = document.getElementById("alertaPago");
const alertaFormulario = document.getElementById("alertaFormulario")
//(E6)lista con identificador y precio/ variabes para subtotal, envio y total
let subProductos = [];
let subTotal = 0;
let selecEnvio=false;
let envio = 0;
let total = 0;

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

  /*(E5)se crea una estructura prototipo con id para usarlos en el evento "input"*/
  let numProduct = 0;
  products.forEach((articulo) => {
    const input = document.createElement("input");
    input.classList.add("cantidadArticulos");
    input.setAttribute("type", "number");
    input.setAttribute("value", articulo.count);
    input.setAttribute("id", articulo.id);
    input.setAttribute("min", 0);
    input.setAttribute("required", true)
    input.addEventListener("change", (e) => {
      const subTotalElem = document.getElementById(`subTotal-${articulo.id}`);
      subTotalElem.innerHTML =
        articulo.currency + " " + articulo.unitCost * e.target.value;

      //(E6) cuando se detecta un cambio en el imput agregamos ese cambio al precio del producto en la lista
      //------------
      subProductos.forEach((producto) => 
      {
        if (articulo.id == producto.id) 
        {
          if(articulo.currency == "UYU")
            {
              producto.precio = (articulo.unitCost/40) * e.target.value;
            }
          else
            {
              producto.precio = articulo.unitCost * e.target.value;
            };
          
        };
      });
      //------------

      const productIndex = carrito.findIndex((p) => p.id == articulo.id);
      carrito[productIndex].count = e.target.value;
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    const row = document.createElement("tr", { id: "Art" + articulo.id });
    row.innerHTML += `
        <td class="d-lg-block d-md-none d-sm-none d-none"><img class="cart-img" src="${
          articulo.image
        }"></td>
        <td>${articulo.name}</td>
        <td class="d-lg-table-cell d-md-none d-sm-none d-none">${
          articulo.currency
        } ${articulo.unitCost}</td>
        <td></td>
        <td id="subTotal-${articulo.id}">${articulo.currency} ${
      articulo.unitCost * articulo.count
    }</td>
        <td><button class="btn btn-light" id="${numProduct}" onclick="eliminarArt(id)">
        <span class="fas fa-trash"></span>
        </td>
      `;

    container.appendChild(row);
    row.querySelector("td:nth-child(4)").appendChild(input);
    numProduct++;

    //(E6) vamos agregando id y precio a medida que estructuramos los productos en el html
    if(articulo.currency == "UYU")
    {
      subProductos.push({id:articulo.id,precio:(articulo.unitCost/40)*articulo.count})
    }
    else
    {
      subProductos.push({id:articulo.id,precio:articulo.unitCost*articulo.count})
    };
  });

  const inputTabla = document.getElementsByClassName("cantidadArticulos")
    formCarrito.addEventListener("submit", (e) => {
      e.preventDefault();

      if(!radio1.checked && !radio2.checked) {
        alertaPago.innerHTML = "";
        alertaPago.innerHTML += `
        <p style="color: red;">Debe seleccionar una forma de pago<p>
        `;
      } else {
        alertaPago.innerHTML = "";
      };

      if(Array.from(inputTabla).every(input => input.value > 0) && formCarrito.checkValidity()) {
     
        alertaFormulario.innerHTML += `
        <div class="alert alert-success" role="alert">
        ¡Has comprado con éxito!
        </div>
        `;
    
        setTimeout(() => {
          location.reload();
        }, 1500);
    
      } else {
        alertaFormulario.innerHTML += `
        <div class="alert alert-danger d-flex justify-content-between" role="alert">
        Comprueba que has completado todos los campos
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        setTimeout(() => {
        alertaFormulario.innerHTML = "";
        }, 7000);
      }
    });


  //(E6) calculamos el sub total y lo mostramos en su apartado
  subProductos.forEach((producto) => {
    subTotal = subTotal + producto.precio;
  });
  precioSubTotal.innerHTML = "USD " + subTotal;


  //(E6) detectamos cualquier cambio dentro de la etiqueta container y modificamos el subTotal en consecuencia
  container.addEventListener("change", () => {
    subTotal = 0;
    subProductos.forEach((producto) => {
      subTotal = subTotal + producto.precio;
    });
    precioSubTotal.innerHTML = "USD " + subTotal;
    if (selecEnvio) 
    {
      envioYTotal();
    }
  });

  //(E6) Evento para agregar el costo del envio
  radios.addEventListener("change", () => 
  {
    envioYTotal();
  });
});

function eliminarArt(id) {
  let nuevaArray = JSON.parse(localStorage.getItem("carrito"));
  nuevaArray.splice(id, 1);

  localStorage.setItem("carrito", JSON.stringify(nuevaArray));
  location.reload();
}

//(E6) funcion para modificar el costo de envio y el costo total en cosecuencia
function envioYTotal()
{
  var opciones = document.getElementsByName("envio");
    for (var radio of opciones) {
      if (radio.checked) {
        envio = Math.trunc(subTotal * (radio.value / 100));
      }
    }
    precioEnvio.innerHTML = "USD " + envio;
    total = envio + subTotal;
    precioTotal.innerHTML = "USD " + total;
    selecEnvio=true
  
};

(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function disabledInput() {
  let tarjetaCredito = document.getElementById('tarjetaCredito');
  let transferenciaBancaria = document.getElementById('transferenciaBancaria');
  let numeroTarjeta = document.getElementById('numeroTarjeta');
  let codigoSeguridad = document.getElementById('codigoSeguridad');
  let vencimiento = document.getElementById('vencimiento');
  let numeroCuenta = document.getElementById('numeroCuenta');

  if (transferenciaBancaria.checked) {
    numeroTarjeta.disabled = true;
    codigoSeguridad.disabled = true;
    vencimiento.disabled = true;
    numeroCuenta.disabled = false;
  } else if (tarjetaCredito.checked) {
    numeroTarjeta.disabled = false;
    codigoSeguridad.disabled = false;
    vencimiento.disabled = false;
    numeroCuenta.disabled = true;
  }
}



