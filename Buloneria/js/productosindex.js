document.addEventListener("DOMContentLoaded", function () {
    // Elemento donde deseas mostrar los productos
    const productosContainer = document.querySelector(".cards");
  
    // Realiza una solicitud para cargar el JSON
    fetch("https://yoti.pythonanywhere.com/productos")
      .then(response => response.json())
      .then(data => {
        // Obtén un arreglo aleatorio de 3 productos
        const productosAleatorios = obtenerProductosAleatorios(data, 3);
  
        // Procesa los datos y muestra los productos aleatorios
        productosAleatorios.forEach(producto => {
          const productoHTML = `
            <article class="produc">
            <div class="producto">
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <h3>${producto.nombre}</h3>
              <p><span class="p-line-index">$${producto.precio.toFixed(2)}</span></p>
              </div>
            </article>
          `;
          productosContainer.innerHTML += productoHTML;
        });
      })
      .catch(error => console.error("Error al cargar los productos: " + error));
  });
  
// Función para tener productos aleatorios
function obtenerProductosAleatorios(productos, cantidad) {
    const productosAleatorios = [];     // Un arreglo vacío para almacenar los productos aleatorios
    const copiaProductos = [...productos];  // Una copia del arreglo original de productos
  
    // El bucle se ejecuta hasta que se hayan seleccionado la cantidad deseada de productos aleatorios
    while (productosAleatorios.length < cantidad && copiaProductos.length > 0) {
      // Genera un índice aleatorio dentro del rango de la copiaProductos
      const indiceAleatorio = Math.floor(Math.random() * copiaProductos.length);
  
      // Selecciona el producto en el índice aleatorio y lo agrega al arreglo de productos aleatorios
      productosAleatorios.push(copiaProductos.splice(indiceAleatorio, 1)[0]);
      // Elimina el producto seleccionado de la copia para evitar duplicados
    }
  
    return productosAleatorios;  // Devuelve el arreglo de productos aleatorios
  }