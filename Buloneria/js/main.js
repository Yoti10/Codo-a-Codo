const navBar = document.querySelector("#nav-header");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    navBar.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    navBar.classList.remove("visible");
});


function obtenerFechaUltimaModificacion() {
    // Objeto date que representa la ultima modificacion del documento HTML:
    const ultimaModificacion = new Date(document.lastModified);

    const formato = { year: 'numeric', month: '2-digit', day: '2-digit' };
    //year y day: 'numeric' o '2-digit'
    //month: 'numeric', '2-digit', short, long, narrow
    const fechaFormateada = ultimaModificacion.toLocaleDateString('es-ES', formato);

    document.getElementById('actual').textContent += fechaFormateada;
}

//el metodo ejecuta la funcion al momento que se carga la pagina web
window.addEventListener('load', obtenerFechaUltimaModificacion);