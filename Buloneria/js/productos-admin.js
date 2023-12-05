const { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        usuarios:[],
        //url:'http://localhost:5000/productos', 
        // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)

        url:'https://yoti.pythonanywhere.com/productos',   // url json productos
        url2:'https://yoti.pythonanywhere.com/usuarios', // url json usuarios
        mostrarProductos: true, // Nuevo estado para rastrear qué tabla mostrar
        error:false,
        cargando:true,
        id:0,
        nombre:"", 
        imagen:"",
        precio:0,
        stock:0,
        descripcion:"",
        categoria:"",
        busqueda: "",
        productosFiltrados: [],
        
        email: "",
        pw: "",
        tipo: "cliente",
        
    }
     
    },
    methods: {
        
        fetchData() {
            const url = this.mostrarProductos ? this.url : this.url2;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (this.mostrarProductos) {
                        this.productos = data;
                    } else {
                        this.usuarios = data;
                    }
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        eliminarUsuarios(id) {
            this.mostrarProductos = false;
            this.fetchData();
            
            const url = this.url2+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            // array con los campos que contienen los productos
            let producto = {
                nombre:this.nombre,
                imagen:this.imagen,
                precio: this.precio,
                stock: this.stock,
                descripcion: this.descripcion,
                categoria:this.categoria

            }
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    // Si cargo el producto redirige a la pagina del CRUD
                    window.location.href = "../html/admin.html";  
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // Error si no se puede grabar
                })      
        },

        filtrarProductos() {
            this.productosFiltrados = this.productos.filter(producto => {
                const busquedaLowerCase = this.busqueda.toLowerCase();
        
                // Busqueda por filtro
                //  Ejemplo de busqueda por categoria = "cat:tarugos"
                if (busquedaLowerCase.startsWith('id:')) {
                    const id = producto.id.toString().toLowerCase();
                    return id.includes(busquedaLowerCase.substring(3));
                } else if (busquedaLowerCase.startsWith('desc:')) {
                    const descripcion = producto.descripcion.toLowerCase();
                    return descripcion.includes(busquedaLowerCase.substring(5));
                } else if (busquedaLowerCase.startsWith('cat:')) {
                    const categoria = producto.categoria.toLowerCase();
                    return categoria.includes(busquedaLowerCase.substring(4));
                } else if (busquedaLowerCase.startsWith('precio:')) {
                    const precio = producto.precio.toString().toLowerCase();
                    return precio.includes(busquedaLowerCase.substring(7));
                } else {
                    //Para buscar por nombre no hace falta filtro
                    return (
                        producto.nombre.toLowerCase().includes(busquedaLowerCase) 
                    );
                }
            });
        }
    
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')


  function mostrartablaProductos() {
    // Guarda el elemento por ID
    const tablaProductos = document.getElementById(`tabla-productos`);
    const tablaUsuarios = document.getElementById(`tabla-usuarios`);

    // Ocultar tabla de usuarios si está visible
    if (tablaUsuarios.classList.contains("mostrar-tabla")) {
        tablaUsuarios.classList.remove("mostrar-tabla");
        tablaUsuarios.classList.add("ocultar-tabla");
    }

    // Cambia la tabla de productos entre oculto y visible
    tablaProductos.classList.toggle("mostrar-tabla");
    tablaProductos.classList.toggle("ocultar-tabla");
}

function mostrartablaUsuarios() {
    // Guarda el elemento por ID
    const tablaProductos = document.getElementById(`tabla-productos`);
    const tablaUsuarios = document.getElementById(`tabla-usuarios`);

    // Ocultar tabla de productos si está visible
    if (tablaProductos.classList.contains("mostrar-tabla")) {
        tablaProductos.classList.remove("mostrar-tabla");
        tablaProductos.classList.add("ocultar-tabla");
    }

    // Cambia la tabla de usuarios entre oculto y visible
    tablaUsuarios.classList.toggle("mostrar-tabla");
    tablaUsuarios.classList.toggle("ocultar-tabla");
}