document.addEventListener('DOMContentLoaded', () => {
    // obtener el usuario activo de la sesión activa
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (!usuarioActivo) {
        window.location.href = 'login.html';
        return;
    }

    // 2. datos del user 
    document.getElementById('perfilNombre').value = usuarioActivo.nombre || '';
    document.getElementById('perfilDescripcion').value = usuarioActivo.descripcion || '';
    document.getElementById('perfilIntereses').value = usuarioActivo.intereses || '';

    // Seleccion de avatar
    if (usuarioActivo.avatar) {
        const opcionesRadio = document.getElementsByName('avatar');
        for (let radio of opcionesRadio) {
            if (radio.value === usuarioActivo.avatar) {
                radio.checked = true;
                break;
            }
        }
    }

    // configurar boton de volver según el rol
    const btnVolver = document.getElementById('btnVolver');
    if (usuarioActivo.rol === 'admin') btnVolver.href = 'index_admin.html';
    else if (usuarioActivo.rol === 'chef') btnVolver.href = 'index_chef.html';
    else btnVolver.href = 'index_usuario.html';
});

// guardado
document.getElementById('formPerfil').addEventListener('submit', function (e) {
    e.preventDefault();

    let usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Capturar nuevos dats
    usuarioActivo.nombre = document.getElementById('perfilNombre').value.trim();
    usuarioActivo.descripcion = document.getElementById('perfilDescripcion').value.trim();
    usuarioActivo.intereses = document.getElementById('perfilIntereses').value.trim();

    const avatarSeleccionado = document.querySelector('input[name="avatar"]:checked').value;
    usuarioActivo.avatar = avatarSeleccionado;

    // Actualizar la sesión
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActivo));

    // Actualizar la base de datos global de usuarios
    let dbUsuarios = JSON.parse(localStorage.getItem('dbUsuarios'));
    const indice = dbUsuarios.findIndex(u => u.email === usuarioActivo.email);

    if (indice !== -1) {
        dbUsuarios[indice] = usuarioActivo;
        localStorage.setItem('dbUsuarios', JSON.stringify(dbUsuarios));
    }

    alert('¡Perfil actualizado con éxito!');

    // Redirigir al dashboard de cada uno
    if (usuarioActivo.rol === 'admin') window.location.href = 'index_admin.html';
    else if (usuarioActivo.rol === 'chef') window.location.href = 'index_chef.html';
    else window.location.href = 'index_usuario.html';
});