(()=>{

    const register = (()=>{

        //elementos del DOM
        const htmlElements ={
            form : document.querySelector("form"),
            nombre : document.querySelector("#name"),
            user : document.querySelector("#user"),
            pass : document.querySelector("#pass"),
            msj : document.querySelector(".msj"), 
        }


        const methods = {

            guardarUsuario(nombre, usuario, pass){
                let user = usuario;
                let datos = {
                    'user' : user,
                    'nombre' : nombre,
                    'pass' : pass
                };

                localStorage.setItem(user, JSON.stringify(datos))
            },


            validarExistencia(usuario){
                return localStorage.getItem(usuario) !== null;
            },


            cifrarClave(pass){
                let hash = 0;
                for(let i=0; i< pass.length; i++){
                    let car = pass.charCodeAt(i);
                    hash = (hash << 5) - hash + car;
                    hash |= 0;
                }
                return hash;
            }

            
        
        };

        const handlers = {
            alEnviarForm(e){
                e.preventDefault();
                const nombre = htmlElements.nombre.value.trim();
                const usuario = htmlElements.user.value.trim().toLowerCase();
                const pass = methods.cifrarClave(htmlElements.pass.value.trim());

                if(!nombre || !usuario || !pass){
                    htmlElements.msj.innerHTML = `<span style="font-size:0.8rem;">Todo los campos son <strong style="Color:RED;">OBLIGATORIOS</strong></span>`;
                    return;
                }

                if(methods.validarExistencia(usuario)){
                    htmlElements.msj.innerHTML = `<span style="font-size:1.3rem;">  <strong style="Color:RED;"> Usuario invalido </strong></span>`;
                    return;
                }

                methods.guardarUsuario(nombre, usuario, pass);
                alert("Usuario registrado correctamente");
                window.location.href = 'login.html';
                htmlElements.form.reset();
                htmlElements.msj.innerHTML=""; 
            
            }

        };


        return {
            init(){
                htmlElements.form.addEventListener("submit", handlers.alEnviarForm)

                const btnLoging = document.querySelector("a");
                if (btnLoging) {
                    btnLoging.addEventListener("click", function (e) {
                        e.preventDefault(); 
                        window.location.href = "login.html"; 
                    })
                }


            }
        };

    })();

    register.init();

})();