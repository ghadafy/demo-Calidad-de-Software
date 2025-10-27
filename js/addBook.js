(()=>{

    const registerBook = (()=>{

        const htmlElements = {
            form : document.querySelector("form"),
            titulo : document.querySelector("#titulo"),
            autor : document.querySelector("#autor"),
            fechaLectura : document.querySelector("#fecha-lectura"),
            pags : document.querySelector("#numero-pags"),
            recomendado : document.querySelector("input[name='recomendado']:checked"),
            tabla: document.querySelector("table tbody"),
            nombreSession: document.querySelector("#nombreSession"),
            datosNumericos: document.querySelector(".datos-numericos"),
            barraVerde: document.querySelector('#barraRecomendados'),
            barraRoja: document.querySelector('#barraNoRecomendados'),
            rec:document.querySelector('#txtRecomendados'),
            noRec:document.querySelector('#txtNoRecomendados'),
        };

        
        const session = JSON.parse(localStorage.getItem('session'));
        const user = session ? session.user : null;
        
        const methods = {
            
            //metodo para obtener los libros
            obtenerLibros(){
                const datos = localStorage.getItem(`libros_${user}`);
                if(!datos){
                    return [];
                }
                else{
                    return JSON.parse(datos);
                }
            },


            //metodo que crea la tabla, actualiza estadistica y grafico
            repintarTabla(){
                const libros = methods.obtenerLibros();
                let contenido ='';
     
                if(libros.length===0){
                contenido +=`<tr> 
                                <td  colspan="6">No hay libros registrados</td>    
                                
                            </tr>`;    
                }

                libros.forEach((libro)=>{
                contenido +=`<tr> 
                                <td class="izquierda">${libro.titulo}</td>    
                                <td class="izquierda">${libro.autor}</td> 
                                <td style="text-align: center;">${libro.fecha}</td> 
                                <td style="text-align: center;">${libro.paginas}</td> 
                                <td style="text-align: center;">${libro.recom}</td> 
                                <td style="text-align: center;"> <button  data-titulo="${libro.titulo}" class='eliminar'> Eliminar</button> </td>
                            </tr>`;
                })

                htmlElements.tabla.innerHTML = `${contenido}`;

                document.querySelectorAll(".eliminar").forEach(btn=>{
                    btn.addEventListener('click', (e)=>{
                        const titulo = e.target.dataset.titulo;
                        const confirmar = confirm(`Seguro que desea eliminar el Libro: "${titulo}"? `);
                        if(confirmar){
                        methods.eliminarLibro(titulo);
                        }
                    });
                });
                 //datos estadisticos
                const total = libros.length;
                let sumaPaginas = 0;
                let promedio = 0;
                for(let i=0; i<libros.length; i++){
                        sumaPaginas += Number(libros[i].paginas) || 0;
                }
                if(total > 0){
                    promedio = (sumaPaginas/total).toFixed(0);
                }else{
                    promedio = 0
    ;           }
                htmlElements.datosNumericos.innerHTML= `<span class="sub-tit-est">Libros leídos</span>: <strong class="negrita">${total}</strong> <br> <span class="sub-tit-est">Promedio de páginas por libro</span>: <strong class="negrita">${promedio}</strong> `;
                    
                //grafica
                let recomendados = libros.filter(libro => libro.recom === 'SI').length;
                let noRecomendados = libros.filter(libro => libro.recom === 'NO').length;    
                let porcentajeRecomendado = 0;
                let porcentajeNoRecomendado = 0;    
                if(total > 0){
                    porcentajeRecomendado = (recomendados / total) * 100;
                    porcentajeNoRecomendado = 100-porcentajeRecomendado;
                }                
                // console.log("recomendados",recomendados, ", NO recomendados", noRecomendados)
                htmlElements.barraVerde.style.width = `${porcentajeRecomendado}%`;
                htmlElements.barraRoja.style.width = `${porcentajeNoRecomendado}%`;
                htmlElements.rec.innerHTML = `${recomendados}`;
                htmlElements.noRec.innerHTML = `${noRecomendados}`;
                },

            //metodo para guardar los libros
            guardarLibros(libros){
            localStorage.setItem(`libros_${user}`, JSON.stringify(libros));

            },

            //metodo para agregar los libros
            agregarLibro(libro){
                const libros = methods.obtenerLibros();
                libros.push(libro);
                methods.guardarLibros(libros);
                methods.repintarTabla();

                 
            },

            //metodo para eliminar los libros 
            eliminarLibro(titulo) {
                let libros = methods.obtenerLibros();
                libros = libros.filter(libro => libro.titulo !== titulo);
                methods.guardarLibros(libros);
                methods.repintarTabla();
            },

            
        };


        const handlers = {

            alEnviarLibro(e){
                e.preventDefault();             
                 const titulo = htmlElements.titulo.value.trim();
                 const autor = htmlElements.autor.value.trim();
                 const paginas = htmlElements.pags.value.trim();
                 const fecha = htmlElements.fechaLectura.value.trim();
                 const recomInput = document.querySelector("input[name='recomendado']:checked");
                 const recom = recomInput ? recomInput.value.trim() : "";
                if(!titulo || !autor || !paginas || !fecha || !recom){
                    alert("Debes completar todos los campos...")
                    return;
                }
                const libro = {titulo, autor, paginas, fecha, recom};
                methods.agregarLibro(libro);
                htmlElements.form.reset();                

            }

        }

        return {
            init(){
                if(!user){
                    alert("Debes estar logueado"),
                         window.location.href = "login.html";
                        return;
                }
     
                if(session){
                    document.querySelector("#usuario-logueado").innerHTML=`Bienvenido(a): <span class="nombre"> ${session.nombre} </span>`;
                    
                }else{
                     alert("Debes estar logueado"),
                    window.location.href = "login.html";
                    return;
                 }

                htmlElements.form.addEventListener("submit", handlers.alEnviarLibro);
                methods.repintarTabla();         
                const btnCerrar = document.querySelector("#cerrar-session");
                if (btnCerrar) {
                    btnCerrar.addEventListener("click", function (e) {
                        e.preventDefault(); 
                        const confirmar = confirm("¿Estás seguro de cerrar sesión?");
                        if (confirmar) {
                            localStorage.removeItem("session"); 
                            window.location.href = "login.html"; 
                        }
                    });
                }

                const btnCambiarNombre = document.querySelector("#editar-usuario");
                if (btnCambiarNombre) {
                    btnCambiarNombre.addEventListener("click", function (e) {
                    e.preventDefault(); 
                        window.location.href = "editar-user.html"; 
                    })
                }

                const btnCambiarClave = document.querySelector("#editar-clave");
                if (btnCambiarClave) {
                    btnCambiarClave.addEventListener("click", function (e) {
                    e.preventDefault();                      
                        window.location.href = "editar-clave.html"; 
                    })
                }

            }

        };

    })();

    registerBook.init();

})();