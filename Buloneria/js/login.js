const { createApp } = Vue;

createApp({
    data() {
        return {
            usuarios: [],
            url: 'https://yoti.pythonanywhere.com/usuarios',
            email: "",
            pw: "",
            esAdmin: false,
            SesionActiva: false
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        login() {
            const foundUser = this.usuarios.find(user => (user.email.toLowerCase() === this.nombreEmail.toLowerCase() && user.pw === this.pw) 
                                                || (user.nombre.toLowerCase() === this.nombreEmail.toLowerCase() && user.pw === this.pw));
            if (foundUser) {
                if (foundUser.tipo === 'admin') {
                    alert("Inicio de sesión exitoso para admin");
                    this.esAdmin = true;
        
                    // Guardar esAdmin en localStorage
                    localStorage.setItem('esAdmin', JSON.stringify(true));

                    this.SesionActiva = true;
                    localStorage.setItem('SesionActiva', JSON.stringify(true));
                    
                    // Guardar el usuario actual en localStorage
                    localStorage.setItem('usuarioActual', JSON.stringify(foundUser));
                    
                    // Redirige a la página para usuarios admin
                    window.location.href = './admin.html';
                } else {
                    alert("Inicio de sesión exitoso para usuario no admin");
                    this.esAdmin = false;
                    // Guardar esAdmin en localStorage
                    localStorage.setItem('esAdmin', JSON.stringify(false));

                    // Guardar SesionActiva en localStorage
                    this.SesionActiva = true;
                    localStorage.setItem('SesionActiva', JSON.stringify(true));

                    // Guardar el usuario actual en localStorage
                    localStorage.setItem('usuarioActual', JSON.stringify(foundUser));
        
                    // Redirige a la página para usuarios no admin
                    window.location.href = './productos.html';
                }
            } else {
                alert("Credenciales incorrectas. Verifica tu email/nombre y contraseña.");
                
                this.SesionActiva = false;
                localStorage.setItem('SesionActiva', JSON.stringify(false));

                this.esAdmin = false;
                localStorage.setItem('esAdmin', JSON.stringify(false));
            }
        }
        
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app-login');
