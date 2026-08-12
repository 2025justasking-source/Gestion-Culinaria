/* likes  */
const tabs = document.querySelectorAll(".cuadro");
const contenidos = document.querySelectorAll(".contenido-tab");

let likesState = {};

function initLikeDislike(card, indexKey) {

    const likeBtn = card.querySelector('img[alt="like"]');
    const dislikeBtn = card.querySelector('img[alt="dislike"]');
    const likesContainer = card.querySelector(".likes");
    let counter = document.createElement("span");
    counter.classList.add("like-counter");
    counter.textContent = likesState[indexKey] ?? "0";
    likesContainer.appendChild(counter);

    likeBtn.addEventListener("click", () => {
        let value = parseInt(counter.textContent) || 0;
        value++;
        counter.textContent = value;
        likesState[indexKey] = value;
    });


    dislikeBtn.addEventListener("click", () => {
        let value = parseInt(counter.textContent) || 0;
        value--;
        counter.textContent = value;
        likesState[indexKey] = value;
    });
}
/* seleccionar tabs */
document.querySelectorAll(".contenido-tab").forEach((contenido, tabIndex) => {
    contenido.querySelectorAll(".card").forEach((card, cardIndex) => {
        const indexKey = `${tabIndex}-${cardIndex}`;
        initLikeDislike(card, indexKey);
    });
});
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        contenidos.forEach(contenido => {
            contenido.classList.remove("activo");
        });
        contenidos[index].classList.add("activo");
        textoFiltro.textContent = "Todo";
        filtrarCards("todo");
    });
});
contenidos[0].classList.add("activo");
filtrarCards("todo");

/* menu de filtro */
const filtro = document.querySelector(".filtro");
const filtroBoton = document.querySelector(".filtro-boton");
const opcionesFiltro = document.querySelectorAll(".opcion-filtro");
const textoFiltro = filtroBoton.querySelector("h2");
filtroBoton.addEventListener("click", () => {
    filtro.classList.toggle("abierto");
});
opcionesFiltro.forEach(opcion => {

    opcion.addEventListener("click", () => {
        const periodoSeleccionado = opcion.textContent.trim().toLowerCase();
        textoFiltro.textContent = opcion.textContent;
        filtro.classList.remove("abierto");
        filtrarCards(periodoSeleccionado);
    });
});
function filtrarCards(periodo) {
    const contenidoActivo = document.querySelector(".contenido-tab.activo");
    if (!contenidoActivo) {
        return;
    }
    const cards = contenidoActivo.querySelectorAll(".card");
    cards.forEach(card => {
        const periodoCard = card.dataset.periodo;
        if (periodo === "todo" || periodoCard === periodo) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
// Cerrar el menú
document.addEventListener("click", (event) => {
    if (!filtro.contains(event.target)) {
        filtro.classList.remove("abierto");
    }
});