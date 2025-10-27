(()=>{

  const loginForm = (()=>{

    //elementos HTML
    const htmlElements = {
      form : document.querySelector("form"),
      user : document.querySelector("#user"),
      pass : document.querySelector("#pass"),
      msj : document.querySelector(".msj"),
    };

    //mis metodos
    const methods = {
      
      verificarDatos(user, clave){
        const datosObt = localStorage.getItem(user);        
        if(!datosObt){
          htmlElements.msj.innerHTML=`<span style="font-size:1.3rem; Color:RED;">Usuario o Clave incorrecta</span>`;
          return false;
        }
        const datos = JSON.parse(datosObt);
        if(!(clave === datos.pass)){ 
          htmlElements.msj.innerHTML=`<span style="font-size:1.3rem; Color:RED;">Usuario o Clave incorrecta</span>`;
          return false;
        }
        methods.iniciarSession(datos);
      },

      cifrarClave(pass){
          let hash = 0;
          for(let i=0; i< pass.length; i++){
                let car = pass.charCodeAt(i);
                hash = (hash << 5) - hash + car;
                hash |= 0;
          }
          return hash;
      },

      iniciarSession(user){
        localStorage.setItem("session", JSON.stringify(user));
        window.location.href = 'dashboard.html';
      }

    }

    //mi manejador de evento
    const handlers = {
        alEnviarLogin(e){
        e.preventDefault();
        const usuario = htmlElements.user.value.trim().toLowerCase();
        const clave = methods.cifrarClave(htmlElements.pass.value.trim());
        methods.verificarDatos(usuario, clave);        
      }
    };

    return {
      init(){
        htmlElements.form.addEventListener("submit",handlers.alEnviarLogin);

        const btnRegistrarse = document.querySelector("a");
          if (btnRegistrarse) {
              btnRegistrarse.addEventListener("click", function (e) {
                  e.preventDefault(); 
                        window.location.href = "user.html"; 
              })
          }

      }

    }


  })();

  loginForm.init();

})();
