(() => {
  const htmlElements = {
    form: document.querySelector("form"),
    actual: document.querySelector("#clave-actual"),
    nueva: document.querySelector("#nueva-clave"),
    msj: document.querySelector(".msj"),
  };

  const session = JSON.parse(localStorage.getItem("session"));
  const user = session ? session.user : null;
  if (!session || !user) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
    return;
  }

  const methods = {

    cifrarClave(pass) {
      let hash = 0;
      for (let i = 0; i < pass.length; i++) {
        let car = pass.charCodeAt(i);
        hash = (hash << 5) - hash + car;
        hash |= 0;
      }
      return hash;
    },

    actualizarClave(nuevaClave) {
      const datos = JSON.parse(localStorage.getItem(user));
      datos.pass = methods.cifrarClave(nuevaClave);
      localStorage.setItem(user, JSON.stringify(datos));

      // También en la sesión
      session.pass = datos.pass;
      localStorage.setItem("session", JSON.stringify(session));
    }

  };

  const handlers = {

    alEnviarFormulario(e) {
      e.preventDefault();

      const claveActual = htmlElements.actual.value.trim();
      const nuevaClave = htmlElements.nueva.value.trim();

      if (!claveActual || !nuevaClave) {
        htmlElements.msj.innerHTML = `<span style="color:red;">Ambos campos son obligatorios.</span>`;
        return;
      }

      const claveActualCifrada = methods.cifrarClave(claveActual);
      const datos = JSON.parse(localStorage.getItem(user));

      if (claveActualCifrada !== datos.pass) {
        htmlElements.msj.innerHTML = `<span style="color:red;">La clave actual no es correcta.</span>`;
        return;
      }

      methods.actualizarClave(nuevaClave);
      htmlElements.form.reset();
      window.location.href = "dashboard.html";
     
    }

  };

  if (htmlElements.form) {
    htmlElements.form.addEventListener("submit", handlers.alEnviarFormulario);
  }


  const btnDash = document.querySelector("a");
  if (btnDash) {
     btnDash.addEventListener("click", function (e) {
        e.preventDefault(); 
        window.location.href = "dashboard.html"; 
     })
  }


})();
