//VALIDACION DE CAMPOS

function validar(){
    //use este método para prevenir que se envíe el formulario, evitando el error 405. 
    event.preventDefault();
    //definimos variables con los campos y divs como valor
    let usuario= document.getElementById("nombre");
    let mail= document.getElementById("correo");
    let pass= document.getElementById("contrasena");
    let passVerificada= document.getElementById("confirmar_contrasena");

    let msjNombre=document.getElementById("valid_nombre");
    let msjPass=document.getElementById("valid_pass");
    let msjVerifPass=document.getElementById("confirmar_contrasena");

    //definimos la variable de error
    let error=false;

    //ponemos en blanco (usando el caracter vacio "") el contenido de los divs de mensaje
    document.getElementById("valid_nombre").innerHTML="";
    document.getElementById("valid_correo").innerHTML="";
    document.getElementById("valid_pass").innerHTML="";
    document.getElementById("confirmar_contrasena").innerHTML="";

    if(nombre.value==""){ //se uso "===". no era esto
        document.getElementById("valid_nombre").innerHTML = "Ingresa un nombre por favor";
        error=true;
        nombre.focus();
        //se borró el error=true; extra - no era esto
    }else if(nombre.value.length<6){
        document.getElementById("valid_nombre").innerHTML = "El nombre debe tener al menos 6 caracteres";
        error=true;
        nombre.focus();
    }

    if(pass.value.length<8){
        document.getElementById("valid_pass").innerHTML="La contraseña es muy corta. Ingresa una con al menos 8 caracteres.";
        error=true;
        pass.focus();
    }

    if(passVerificada.value!=pass.value){
        document.getElementById("valid_verif_pass").innerHTML="Las contraseñas deben ser iguales. Por favor volve a ingresarla.";
        error=true;
        pass.focus();
    }

    if(error===false){

        alert("Datos enviados con exito!");
        //ponemos en blanco los campos
        document.getElementById("nombre").value="";
        document.getElementById("correo").value="";
        document.getElementById("contrasena").value="";
        document.getElementById("confirmar_contrasena").value="";

        //ponemos en blanco los divs
        document.getElementById("valid_nombre").innerHTML="";
        document.getElementById("valid_correo").innerHTML="";
        document.getElementById("valid_pass").innerHTML="";
        document.getElementById("valid_verif_pass").innerHTML="";
    }

    if (error)
        return false;
    else
        return true;
}