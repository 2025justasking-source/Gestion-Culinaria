//usuarios simulados
let usuarios = [
    { id: 1, nombre: "Michael Quesada", correo: "mike@admin.com", rol: "Administrador", estado: "Activo" },
    { id: 2, nombre: "Alfredo Mercurio", correo: "Queen@cocina.com", rol: "Chef", estado: "Activo" },
    { id: 3, nombre: "Jhon Constantine", correo: "eldiablazo@usuario.com", rol: "Usuario", estado: "Activo" },
    { id: 4, nombre: "Stan Smith", correo: "cia@usuario.com", rol: "Usuario", estado: "Inactivo" },
    { id: 5, nombre: "Marie Curie", correo: "mariec@usuario.com", rol: "Usuario", estado: "Activo" },
    { id: 6, nombre: "Hans Landa", correo: "cazador@usuario.com", rol: "Usuario", estado: "Activo" },
    { id: 7, nombre: "Michael Scott", correo: "dunder@usuario.com", rol: "Usuario", estado: "Activo" },
    { id: 8, nombre: "Austin Powers", correo: "mojo@chef.com", rol: "Chef", estado: "Inactivo" },
    { id: 9, nombre: "Tia Florita", correo: "tia@chef.com", rol: "Chef", estado: "Inactivo" }
];

const tbody = document.getElementById('tablaUsuariosCuerpo');
const formCrear = document.getElementById('formCrearUsuario');
const buscador = document.getElementById('buscadorUsuarios');
const filtroRol = document.getElementById('filtroRol'); // Nuevo elemento capturado

// usuario que estamos aplicando cosas
let idUsuarioSeleccionado = null; 

// renderizado de DOM
function renderizarTabla(listaUsuarios) {
    tbody.innerHTML = '';
    listaUsuarios.forEach(user => {
        const tr = document.createElement('tr');

        const claseEstado = user.estado === 'Activo' ? 'badge-activo' : 'badge-baneado';

        tr.innerHTML = `
            <td><strong>${user.nombre}</strong></td>
            <td>${user.correo}</td>
            <td><span class="badge badge-rol">${user.rol}</span></td>
            <td><span class="badge ${claseEstado}">${user.estado}</span></td>
            <td>
                <!-- NUEVOS BOTONES DE ACCIÓN -->
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <button class="boton" onclick="abrirModalRol(${user.id})" style="padding: 4px 8px; font-size: 0.8rem;">Rol</button>
                    <button class="boton" onclick="abrirModalBan(${user.id})" style="padding: 4px 8px; font-size: 0.8rem; color: #c5221f; border-color: #c5221f;">Ban</button>
                    <button class="boton" onclick="eliminarUsuario(${user.id})" style="padding: 4px 8px; font-size: 0.8rem; color: white; background-color: #c5221f; border-color: #c5221f;">X</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// filtro
function aplicarFiltros() {
    const textoBusqueda = buscador.value.toLowerCase();
    const rolSeleccionado = filtroRol.value;

    const usuariosFiltrados = usuarios.filter(user => {
        // Verifica si el texto coincide con nombre o correo
        const coincideTexto = user.nombre.toLowerCase().includes(textoBusqueda) || user.correo.toLowerCase().includes(textoBusqueda);
        
        // Verifica si el rol coincide (o si está en "Todos")
        const coincideRol = (rolSeleccionado === 'Todos') || (user.rol === rolSeleccionado);
        
        return coincideTexto && coincideRol;
    });

    renderizarTabla(usuariosFiltrados);
}

// Listeners de los filtros
buscador.addEventListener('input', aplicarFiltros);
filtroRol.addEventListener('change', aplicarFiltros);


// creación de users
formCrear.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nuevoNombre').value.trim();
    const correo = document.getElementById('nuevoCorreo').value.trim();
    const rol = document.getElementById('nuevoRol').value;

    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre,
        correo: correo,
        rol: rol,
        estado: "Activo"
    };

    usuarios.push(nuevoUsuario);
    aplicarFiltros(); // Re-renderiza respetando los filtros actuales

    formCrear.reset();
    window.location.hash = '#';
    alert('Usuario creado exitosamente');
});

// eliminación de users
window.eliminarUsuario = function (id) {
    if (confirm('¿Está seguro de eliminar este usuario de forma permanente?')) {
        usuarios = usuarios.filter(user => user.id !== id);
        aplicarFiltros();
    }
};

// cambiar rol o baneas

window.abrirModalRol = function (id) {
    idUsuarioSeleccionado = id;
    window.location.hash = '#modalRol'; 
};

window.abrirModalBan = function (id) {
    idUsuarioSeleccionado = id;
    window.location.hash = '#modalBan'; 
};

// enviar Formulario de cambiar Rol
document.getElementById('formCambiarRol').addEventListener('submit', function (e) {
    e.preventDefault();
    const nuevoRol = document.getElementById('selectNuevoRol').value;
    
// Busca usuario y actualiza
    const index = usuarios.findIndex(u => u.id === idUsuarioSeleccionado);
    if (index !== -1) {
        usuarios[index].rol = nuevoRol;
        aplicarFiltros();
        window.location.hash = '#'; // Cierra el modal
        alert('Rol actualizado con éxito.');
    }
});

// envio el Formulario de banear usuario
document.getElementById('formBanearUsuario').addEventListener('submit', function (e) {
    e.preventDefault();
    const tiempoBan = document.getElementById('selectTiempoBan').value;
    
    // Busca usuario y actualiza
    const index = usuarios.findIndex(u => u.id === idUsuarioSeleccionado);
    if (index !== -1) {
        usuarios[index].estado = `Baneado (${tiempoBan})`;
        aplicarFiltros();
        window.location.hash = '#'; // Cierra el modal
        alert(`Usuario suspendido por: ${tiempoBan}`);
    }
});

// 
renderizarTabla(usuarios);