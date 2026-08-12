document.addEventListener('DOMContentLoaded', () => {
    // notificaciones
    const btnNotificaciones = document.getElementById('btnNotificaciones');
    const menuNotificaciones = document.getElementById('menuNotificaciones');

    btnNotificaciones.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click se propague al documento
        menuNotificaciones.classList.toggle('activo');
    });

    document.addEventListener('click', (e) => {
        if (!menuNotificaciones.contains(e.target) && e.target !== btnNotificaciones) {
            menuNotificaciones.classList.remove('activo');
        }
    });

    //perfil
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (usuarioActivo) {
        // Nombre
        if (usuarioActivo.nombre) {
            document.getElementById('displayNombreUsuario').textContent = usuarioActivo.nombre;
        }

        // Avatar
        if (usuarioActivo.avatar) {
            const avatarContenedor = document.getElementById('displayAvatarUsuario');
            avatarContenedor.innerHTML = `<span style="font-size: 1.8rem; line-height: 1;">${usuarioActivo.avatar}</span>`;
            avatarContenedor.style.backgroundColor = 'var(--fondo)';
            avatarContenedor.style.border = '2px solid var(--morado-oscuro)';
        }

        // Descripción 
        if (usuarioActivo.descripcion) {
            document.getElementById('displayDescripcionUsuario').textContent = usuarioActivo.descripcion;
        } else if (usuarioActivo.rol) {

            document.getElementById('displayDescripcionUsuario').textContent = `Rol: ${usuarioActivo.rol}`;
        }
    }
});