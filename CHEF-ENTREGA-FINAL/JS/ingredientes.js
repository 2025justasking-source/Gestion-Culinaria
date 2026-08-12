
const inputProducto = document.querySelector('.buscador input');
const btnBuscar = document.querySelector('.buscador button');
const listaIngredientes = document.querySelector('.lista-ingredientes');
const totalPrecio = document.querySelector('.total-precio');


function actualizarTotal() {
    
  let total = 0;
  const items = document.querySelectorAll('.lista-ingredientes .item');

  items.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const precio = parseInt(item.querySelector('.precio').textContent.trim());
    if (checkbox.checked) total += precio;
  });

  totalPrecio.textContent = total;
}

function eliminarItem(item) {
  item.remove();
  actualizarTotal();
}

btnBuscar.addEventListener('click', () => {
  const texto = inputProducto.value.trim();

  if (texto === '') {
    alert('Por favor, ingrese un producto.');
    return;
  }

  // Generar precio aleatorio entre 1000 y 5000
  const precioRandom = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  // Crear nuevo ingrediente
  const nuevoItem = document.createElement('label');
  nuevoItem.classList.add('item');
  nuevoItem.innerHTML = `
    <input type="checkbox">
    <span>${texto}</span>
    <span class="precio">${precioRandom}</span>
    <button class="btn-eliminar">🗑️</button>
  `;

  // Agregar a la lista
  listaIngredientes.appendChild(nuevoItem);

  // Añadir listeners
  nuevoItem.querySelector('input[type="checkbox"]').addEventListener('change', actualizarTotal);
  nuevoItem.querySelector('.btn-eliminar').addEventListener('click', () => eliminarItem(nuevoItem));

  // Limpiar input
  inputProducto.value = '';
});

// Evento para agregar producto al presionar Enter
inputProducto.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') btnBuscar.click();
});

// Añadir listeners a los checkboxes existentes
document.querySelectorAll('.lista-ingredientes input[type="checkbox"]').forEach(chk => {
  chk.addEventListener('change', actualizarTotal);
});
