// datos almacenados simulados
const usuariosPorDefecto = [
    { nombre: "Michael Quesada", email: "admin@admin.com", password: "12345", rol: "admin" },
    { nombre: "Alfredo Mercurio", email: "chef@chef.com", password: "12345", rol: "chef" },
    { nombre: "Hans Landa", email: "usuario@usuario.com", password: "12345", rol: "usuario" }
];

// crear user
if (!localStorage.getItem('dbUsuarios')) {
    localStorage.setItem('dbUsuarios', JSON.stringify(usuariosPorDefecto));
}

// cosntantes de busqueda
const btnTabLogin = document.getElementById('btnTabLogin');
const btnTabRegistro = document.getElementById('btnTabRegistro');
const formLogin = document.getElementById('formLogin');
const formRegistro = document.getElementById('formRegistro');
const divAlerta = document.getElementById('mensajeAlerta');

function mostrarAlerta(mensaje, tipo) {
    divAlerta.textContent = mensaje;
    divAlerta.className = `alerta ${tipo}`;
}

function ocultarAlerta() {
    divAlerta.className = 'alerta';
    divAlerta.style.display = 'none';
}

// Cambiar a registro
btnTabRegistro.addEventListener('click', () => {
    btnTabLogin.classList.remove('active');
    btnTabRegistro.classList.add('active');
    formLogin.classList.remove('active');
    formRegistro.classList.add('active');
    ocultarAlerta();
});

// Cambiar a login
btnTabLogin.addEventListener('click', () => {
    btnTabRegistro.classList.remove('active');
    btnTabLogin.classList.add('active');
    formRegistro.classList.remove('active');
    formLogin.classList.add('active');
    ocultarAlerta();
});


// (CREAR USUARIO) ---
formRegistro.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('regNombre').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const rol = document.getElementById('regRol').value;

    // cosas obligatorias
    if (!nombre || !email || !password || !rol) {
        mostrarAlerta('Todos los campos son obligatorios.', 'error');
        return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(email)) {
        mostrarAlerta('Formato de correo no válido.', 'error');
        return;
    }

    if (password.length < 5) {
        mostrarAlerta('La contraseña debe tener al menos 5 caracteres.', 'error');
        return;
    }

    // Obtener usuarios actuales
    let dbUsuarios = JSON.parse(localStorage.getItem('dbUsuarios'));

    // Verificacion de registro de correo
    const usuarioExiste = dbUsuarios.find(u => u.email === email);
    if (usuarioExiste) {
        mostrarAlerta('Este correo ya está registrado.', 'error');
        return;
    }

    // Guardar nuevo user
    dbUsuarios.push({ nombre, email, password, rol });
    localStorage.setItem('dbUsuarios', JSON.stringify(dbUsuarios));

    mostrarAlerta('Cuenta creada con éxito. Ahora puedes iniciar sesión.', 'exito');
    formRegistro.reset();

    // animacion de login
    setTimeout(() => {
        btnTabLogin.click();
    }, 2000);
});


// validacion y redireccion
formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        mostrarAlerta('Por favor ingresa correo y contraseña.', 'error');
        return;
    }

    // Obtener usuarios actuales
    const dbUsuarios = JSON.parse(localStorage.getItem('dbUsuarios'));

    // Buscar al usuario
    const usuarioEncontrado = dbUsuarios.find(u => u.email === email && u.password === password);

    if (!usuarioEncontrado) {
        mostrarAlerta('Correo o contraseña incorrectos.', 'error');
        return;
    }

    // redireccion
    mostrarAlerta(`¡Bienvenido ${usuarioEncontrado.nombre}! Redirigiendo...`, 'exito');

    // guardado de sesion para el nombre del user 
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));

    // delay
    setTimeout(() => {
        if (usuarioEncontrado.rol === 'admin') {
            window.location.href = 'index_admin.html';
        } else if (usuarioEncontrado.rol === 'chef') {
            window.location.href = 'index_chef.html';
        } else {
            window.location.href = 'index_usuario.html';
        }
    }, 1500);
});