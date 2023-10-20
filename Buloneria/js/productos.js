//JSON Buloneria: http://45.235.98.217:16113/buloneria/Buloneria.json


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
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <p>${producto.nombre}</p>
              <p>Precio: $${producto.precio.toFixed(2)}</p>
              <p>${producto.descripcion}</p>
              <p>Categoría: ${producto.categoria}</p>
            </div>
          `;
          contenedorProductos.innerHTML += productoHTML;
        });
      })
      .catch(error => console.error("Error al cargar los productos: " + error));
  });