(() => {

  const htmlElements = {
    form: document.querySelector("form"),
    nuevoNombre: document.querySelector("#nuevo-nombre"),
    msj: document.querySelector(".msj"),
  };


  const session = JSON.parse(localStorage.getItem("session"));
  const user = session ? session.user : null;


  if (!session || !user) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
    return;
  }

  htmlElements.nuevoNombre.value = session.nombre;

  const methods = {

    actualizarNombre(nuevoNombre) {
      const datos = JSON.parse(localStorage.getItem(user));
      datos.nombre = nuevoNombre;

      localStorage.setItem(user, JSON.stringify(datos));
      
      session.nombre = nuevoNombre;
      localStorage.setItem("session", JSON.stringify(session));
    }

  };

  const handlers = {

    alEnviarFormulario(e) {
      e.preventDefault();

      const nuevoNombre = htmlElements.nuevoNombre.value.trim();

      if (!nuevoNombre) {
        htmlElements.msj.innerHTML = `<span style="color:red;">El campo no puede estar vacío.</span>`;
        return;
      }

      methods.actualizarNombre(nuevoNombre);
      htmlElements.form.reset();

        window.location.href = "dashboard.html";
      
    }

  };

  // Inicializar
  htmlElements.form.addEventListener("submit", handlers.alEnviarFormulario);

  const btnDash = document.querySelector("a");
  if (btnDash) {
     btnDash.addEventListener("click", function (e) {
        e.preventDefault(); 
        window.location.href = "dashboard.html"; 
     })
  }


})();