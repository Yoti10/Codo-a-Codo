//Agregamos header con javascript:

let hea=`

<a href="../index.html"><img src="../img/logo_buloneria.png" alt="" class="logo"></a>
        <button class="abrir-menu" id="abrir"><i class="bi bi-list"></i></button>
        
        <div class="nav-header" id="nav-header">
            <button class="cerrar-menu" id="cerrar"><i class="bi bi-x"></i></button>
            <ul class="nav-list-c">
                <li><a href="../html/productos.html">Productos</a></li>
                <li><a href="../html/quienes.html">Quienes Somos</a></li>
                <li><a href="../html/registro.html">Registro</a></li>
                <li><a href="../html/contacto.html">Contacto</a></li>
            </ul>
        
        </div>`;

document.querySelector("header").innerHTML=hea;

//agregamos footer con javascript:

let foot=`
<hr class="linea">
        <div class="footer-div">
        <a href="http://facebook.com"><img src="../img/logo-face.png" alt="facebook"></a>
        <a href="http://instagram.com"><img src="../img/logo-inst.png" alt="instagram"></a>
        <a href="http://twitter.com"><img src="../img/logo-tw.png" alt="twitter"></a>
        <a href="http://linkedin.com"><img src="../img/logo-linked.png" alt="linkedin"></a>
    
        <br>
        <p>Direccion: Calle Falsa 123, CABA</p>
        <p>Telefono: 1112345678</p>
        <p>Copyright 2023©</p>
        <p>Página Web Desarrollada en Curso Codo a Codo</p>
        </div>`;

document.querySelector("footer").innerHTML=foot;