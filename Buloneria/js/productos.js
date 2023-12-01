//JSON Buloneria TEST: http://45.235.98.217:16113/buloneria/Buloneria.json
// JSON Buloneria WEB: https://d2revenge.com/Json/Buloneria.json
/*

// script.js
document.addEventListener("DOMContentLoaded", function () {
    const contenedorProductos = document.getElementById("contenedor-productos");
  
    // Realiza una solicitud HTTP para obtener los datos desde la URL
    fetch('http://45.235.98.217:16113/buloneria/Buloneria.json')
      .then(response => response.json())
      .then(data => {
        const productos = data.productos;
  
        productos.forEach(producto => {
          const productoHTML = `
            <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" onmouseover="showDescription(this, '${producto.descripcion}')" onmouseout="hideDescription(this)">
              <p class="p-line">${producto.nombre}</p>
            
              
              <br>
              <p><span id="precio" class="precio">$${producto.precio.toFixed(2)} </span></p>
            </div>
          `;
          contenedorProductos.innerHTML += productoHTML;
        });
      })
      .catch(error => console.error("Error al cargar los productos: " + error));
  });

 */

  //<p><span>Categoría: </span> ${producto.categoria}</p>
  //<span id="precio"> </span>
/* 
 <div class="popup">
<p>${producto.descripcion}</p>
</div>
*/

const { createApp } = Vue;
createApp({
    data() {
        return {
            url: 'https://yoti.pythonanywhere.com/productos',
            prods: [],
            prodsFinales:[],
            categorias:[],
            categoria:""
           
        }
    },
    methods: {
        fetchdata(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.prods = data;//-->propiedad del objeto json
                    this.prodsFinales=data;
                    
                    for (producto of this.prods) {
                        if (this.categorias.indexOf(producto.categoria) < 0)
                           
                        this.categorias.push(producto.categoria)
                    }
                    //console.log(this.categorias)
                    //------------------------



                }
                );
        },
        filtrarCateg(){
            categoria=document.querySelector("select").value

            if (categoria === "todos") {
        this.prodsFinales = this.prods;
    } else {
        this.prodsFinales = this.prods.filter(x => x.categoria === categoria);
    }
        },
        ordenarProds(){
            if(document.querySelector("#nombre-prod").checked)
                this.prodsFinales.sort((a,b)=> a.nombre.toUpperCase() >  b.nombre.toUpperCase() ? 1:-1)
            else if (document.querySelector("#precio-prod").checked)
                this.prodsFinales.sort((a,b)=> a.precio - b.precio)
        }
    },
    created() {
        this.fetchdata(this.url)
    }

}).mount('#app')
