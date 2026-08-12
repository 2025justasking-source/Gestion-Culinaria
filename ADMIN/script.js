const btnTipico = document.getElementById('filtro-tipico');
const btnPrecio = document.getElementById('filtro-precio');
const tarjetas = document.querySelectorAll('.tarjeta-receta');

if (btnTipico && btnPrecio) {
  let soloTipicos = false;
  let nivelPrecio = 'todos';

  const ordenPrecios = ['todos', 'bajo', 'medio', 'alto'];
  const etiquetasPrecio = {
    todos: 'Rango de precio',
    bajo: 'Precio: Bajo',
    medio: 'Precio: Medio',
    alto: 'Precio: Alto'
  };

  function aplicarFiltros() {
    tarjetas.forEach(tarjeta => {
      const esTipico = tarjeta.dataset.tipico === 'si';
      const precio = tarjeta.dataset.precio;

      const pasaTipico = !soloTipicos || esTipico;
      const pasaPrecio = nivelPrecio === 'todos' || precio === nivelPrecio;

      tarjeta.style.display = (pasaTipico && pasaPrecio) ? 'flex' : 'none';
    });
  }

  btnTipico.addEventListener('click', () => {
    soloTipicos = !soloTipicos;
    btnTipico.classList.toggle('activo', soloTipicos);
    btnTipico.textContent = soloTipicos ? 'Platos típicos ✓' : 'Platos típicos';
    aplicarFiltros();
  });

  btnPrecio.addEventListener('click', () => {
    const indiceActual = ordenPrecios.indexOf(nivelPrecio);
    nivelPrecio = ordenPrecios[(indiceActual + 1) % ordenPrecios.length];
    btnPrecio.textContent = etiquetasPrecio[nivelPrecio];
    btnPrecio.classList.toggle('activo', nivelPrecio !== 'todos');
    aplicarFiltros();
  });
}

/*  Botón de favoritos */
const botonesFavorito = document.querySelectorAll('.favorito');

botonesFavorito.forEach(boton => {
  const texto = boton.querySelector('.texto-favorito');

  boton.addEventListener('click', () => {
    const esFavorito = boton.classList.toggle('activo');
    texto.textContent = esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos';
  });
});