document.addEventListener("DOMContentLoaded", () => {
  //(E7) Valida que el usuario este logeado
  const logeado = localStorage.getItem("estaLogeado");

  if (!logeado) {
    window.location.href = "/login.html";
  }

  //(E7) Función que realiza el cambio en la foto del usuario
  const formulario = document.getElementById("formProfile");
  const fotoPerfil = document.getElementById("fotoPerfil");

  function saveFileToLocalStorage() {
    const fileInput = document.getElementById("fotoPerfil");

    if (fileInput.files.length === 0) {
      return;
    }
    const selectedFile = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target.result;
      localStorage.setItem("profile_picture", fileContent);
    };
    reader.readAsDataURL(selectedFile);

    location.reload();
  }

  //(E7) Evento al botón del formulario que valida que los campos obligatorios estén completos
  //y guarda la información en el localStorage
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!formulario.checkValidity()) {
      e.stopPropagation();
    } else {
      profile = {
        primerNombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        email: email.value,
        telefono: telefono.value,
      };
      saveFileToLocalStorage();
      localStorage.setItem("profile", JSON.stringify(profile));
    }

    formulario.classList.add("was-validated");
  });

  let profile = JSON.parse(localStorage.getItem("profile"));

  //(E7) Se muestran los datos del usuario y/o se guarda la información por default
  const imgPerfil = document.getElementById("imgPerfil");
  imgPerfil.src =
    localStorage.getItem("profile_picture") ||
    "./img/img_perfil.png";

  primerNombre.value = profile.primerNombre || "";
  segundoNombre.value = profile.segundoNombre || "";
  primerApellido.value = profile.primerApellido || "";
  segundoApellido.value = profile.segundoApellido || "";
  telefono.value = profile.telefono || "";
  email.value = localStorage.getItem("correo");
});
