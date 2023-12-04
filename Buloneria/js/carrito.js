const { createApp } = Vue;

// Crea la aplicación Vue y monta en el elemento con id 'app'
const app = createApp({
    data() {
        return {
            carrito: [],
            prods: [], 
            mostrarModal: false,
            
        };
    },
    methods: {
        eliminarDelCarrito(index) {
            swal({
                title: "¿Estás seguro?",
                text: "Estás por eliminar un producto del carrito de compras, se borra el producto completo no es por unidades.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    // Usuario confirmó la eliminación
                    swal("¡Eliminaste con éxito el producto del carrito!", {
                        icon: "success",
                    });
        
                    // Realizar la eliminación del producto
                    const productoEnCarrito = this.carrito[index];
        
                    // Incrementar el stock del producto eliminado
                    const productoOriginal = this.prods.find(p => p.id === productoEnCarrito.id);
                    productoOriginal.stock++;
        
                    // Eliminar el producto del carrito
                    this.carrito.splice(index, 1);
        
                    // Actualizar el carrito en localStorage
                    localStorage.setItem('carrito', JSON.stringify(this.carrito));
        
                    console.log(`Producto ${productoEnCarrito.nombre} eliminado del carrito.`);
                } else {
                    // Usuario canceló la eliminación
                    
                    
                    swal("El producto se conserva en el carrito", {
                        icon: "warning",
                    });
                }
            });
        },

        calcularTotalGeneral() {
            let totalGeneral = 0;
    
            // Recorre el carrito y suma el total de cada producto
            this.carrito.forEach(producto => {
                totalGeneral += producto.precio * producto.cantidad;
            });
    
            return totalGeneral;
        },
        mostrarPopup() {
            this.mostrarModal = true;
        },
        cerrarPopup() {
            this.mostrarModal = false;
        },
        finalizarCompra() {
            console.log("Evento para saber si se activa la función");
        
            // Usar Promise.all para esperar a que todas las solicitudes de actualización se completen
            const updatePromises = this.carrito.map(productoEnCarrito => {
                // Encontrar el producto correspondiente en la base de datos
                const productoOriginal = this.prods.find(p => p.id === productoEnCarrito.id);
        
                // Restar la cantidad comprada del stock del producto en la base de datos
                if (productoOriginal) {

                    console.log(productoOriginal.stock+productoEnCarrito.cantidad);// total de stock
                    console.log(productoOriginal.stock);//stock restando cantidad en carrito
                    console.log(productoEnCarrito.cantidad); // cantidad en carrito
                    
                    
                    productoOriginal.stock;
        
                    // Construir la URL para la actualización
                    const url = `https://yoti.pythonanywhere.com/productos/${productoEnCarrito.id}`;

                    //Evento para saber si las url se crean bien
                    console.log(url);
        
                    // Enviar la actualización a la base de datos
                    // Quise actualizar solo el stock
                    // pero no podia si no cargaba todos los datos de cada producto.
                    const options = {
                        body: JSON.stringify({
                            nombre: productoOriginal.nombre,
                            imagen: productoOriginal.imagen,
                            precio: productoOriginal.precio,
                            descripcion: productoOriginal.descripcion,
                            categoria: productoOriginal.categoria,
                            stock: productoOriginal.stock // actualiza con el nuevo numero de stock
                            }),
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow'
                    };
        
                    return fetch(url, options)
                        .then(response => response.json())
                        .then(data => {
                            console.log(`Stock actualizado para el producto ${productoEnCarrito.nombre}`);
                            return data; // Puedes devolver cualquier cosa que necesites aquí
                        })
                        .catch(err => {
                            console.error(`Error al actualizar el stock para el producto ${productoEnCarrito.nombre}`, err);
                            throw err; // Propagar el error para manejarlo más adelante si es necesario
                        });

                        

                        
                }
            });


                

                    

        
            // Esperar a que todas las solicitudes de actualización se completen
            Promise.all(updatePromises)
                .then(results => {
                    console.log("Todas las actualizaciones de stock completadas:", results);
                    swal ( "¡Compra exitosa! " , " ¡La operación ha finalizado correctamente! " , "success" )  
                   
                    // Limpiar el carrito
                    this.carrito = [];

                    // Actualizar el carrito en localStorage
                    localStorage.setItem('carrito', JSON.stringify(this.carrito));
        
                })
                .catch(error => {
                    console.error("Error en las actualizaciones de stock:", error);
                    // Manejar el error si es necesario
                    swal ( "¡Falló la compra!" , " ¡La operación ha sido incorrecta! " , "error" )
                });

               
        }
        
        
        
    },
    created() {
        const carritoGuardado = localStorage.getItem('carrito');
        const prodsGuardados = localStorage.getItem('prods'); // Obtener los productos guardados

        if (carritoGuardado) {
            this.carrito = JSON.parse(carritoGuardado);
        }

        if (prodsGuardados) {
            this.prods = JSON.parse(prodsGuardados);
        }

        localStorage.removeItem('productoAgregado');
    }
});

app.mount('#app');



