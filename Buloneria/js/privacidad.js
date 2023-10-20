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
window.addEventListener('load', obtenerFechaUltimaModificacion());