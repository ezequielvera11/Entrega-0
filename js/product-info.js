document.addEventListener("DOMContentLoaded", async () => {
  //id de div linea 40
  /*(E3) Creamos constantes donde almacenamos la información que creamos en el html, 
    además guardamos la url con el producto y los llamamos según el id.*/

  const divInfo = document.getElementById("product-info");
  const productInfo = localStorage.getItem("idProduc");
  let puntuacion = 0;
  const stars = document.querySelectorAll(".star");
  const urlInfo = `https://japceibal.github.io/emercado-api/products/${productInfo}.json`;

  /* (E3) con el JSONData accedemos ala información de cada producto y creamos el cuerpo del html*/
  const res1 = await getJSONData(urlInfo);
  divInfo.innerHTML = "";
  divInfo.innerHTML += `
      <div>
          <h3 id="nomProducto">${res1.data.name}</h3>
          <hr id="hrProductos">
          <strong>Precio</strong>
          <p>${res1.data.currency}${res1.data.cost}</p>
          <strong>Descripción</strong>
          <p>${res1.data.description}</p>
          <strong>Categoría</strong>
          <p>${res1.data.category}</p>
          <strong>Cantidad de vendidos</strong>
          <p>${res1.data.soldCount}</p>
          <strong>Imágenes ilustrativas</strong>   
      </div>    
  `;
  res1.data.images.forEach((img) => {
    divInfo.innerHTML += `<img src= "${img}" class="imgProductos">`;
  });

  correoNav();

  //(E3)Accedemos al json de los comentarios
  //(E3)Con un forEach recorremos el array para poder mostrar los comentarios y puntajes de cada uno de los productos
  const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${productInfo}.json`;
  const res2 = await getJSONData(urlComments);
  divInfo.innerHTML += `
          <h4 id="tituloComentarios">Comentarios</h4>`;
  res2.data.forEach((element) => {
    divInfo.innerHTML += `
      <div class="comentario">
          <br>
          <p><strong> ${element.user} </strong> - ${element.dateTime} - 
              <span class="fa fa-star ${
                element.score >= 1 && "checked"
              }"></span>
              <span class="fa fa-star ${
                element.score >= 2 && "checked"
              }"></span>
              <span class="fa fa-star ${
                element.score >= 3 && "checked"
              }"></span>
              <span class="fa fa-star ${
                element.score >= 4 && "checked"
              }"></span>
              <span class="fa fa-star ${
                element.score == 5 && "checked"
              }"></span> </p>
          <p>${element.description}</p>
      </div>    
  `;
  });

  /*(E3) cuando el usuario envía la información, pasa a mostrarse en pantalla junto al resto de las opiniones*/
  document.getElementById("formPuntuacion").addEventListener("submit", (e) => {
    e.preventDefault();
    divInfo.innerHTML += `
        <div class="comentario">
        <br>
        <p><strong> ${localStorage.getItem(
          "correo"
        )} </strong> - ${new Date().toLocaleDateString()} - 
            <span class="fa fa-star ${puntuacion >= 1 && "checked"}"></span>
            <span class="fa fa-star ${puntuacion >= 2 && "checked"}"></span>
            <span class="fa fa-star ${puntuacion >= 3 && "checked"}"></span>
            <span class="fa fa-star ${puntuacion >= 4 && "checked"}"></span>
            <span class="fa fa-star ${
              puntuacion == 5 && "checked"
            }"></span> </p>
        <p>${document.getElementById("opinionUsuario").value}</p>
    </div> `;

    //(E3) una vez que se manda la info, se limpia el valor del textarea y la calificación por estrellas
    document.getElementById("opinionUsuario").value = "";
    stars.forEach((star) => {
      star.classList.remove("checked");
    });
  });

  //(E3) Creamos funcion que pinte estrellas segun la calificacion del usuario
  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("checked");
        puntuacion = i + 1;
      }
      for (let i = index + 1; i < stars.length; i++) {
        stars[i].classList.remove("checked");
      }
    });
  });
});
