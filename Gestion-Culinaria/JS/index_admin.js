document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('graficoActividad').getContext('2d');
   
    // Gráfico de pastel
    new Chart(ctx, {
        type: 'doughnut', 
        data: {
            labels: ['Usuarios Activos', 'Nuevas Recetas', 'Reportes Pendientes'],
            datasets: [{
                label: 'Métricas Actuales',
                data: [142, 56, 2], 
                backgroundColor: [
                    '#6B2D82', 
                    '#B980D1', 
                    '#c5221f'  
                ],
                hoverOffset: 4,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Segoe UI', Roboto, sans-serif",
                            size: 13
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
});

// botones de moderacion

window.accionReporte = function(idReporte, accion) {
    const alertaCard = document.getElementById(`alerta-${idReporte}`);
    
    if (accion === 'ignorar') {
        alertaCard.style.transition = "opacity 0.5s ease";
        alertaCard.style.opacity = "0";
        setTimeout(() => alertaCard.remove(), 500);
    } 
    else if (accion === 'eliminarPost') {
        if(confirm("¿Estás seguro de eliminar permanentemente este contenido?")) {
            alert("El contenido ha sido eliminado de la plataforma.");
            alertaCard.remove();
        }
    } 
    else if (accion === 'banear') {
        if(confirm("¡Atención! ¿Deseas eliminar a este usuario del sistema (Ban definitivo)?")) {
            alert("El usuario ha sido baneado y sus credenciales revocadas.");
            alertaCard.remove();
        }
    }
};