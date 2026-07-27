# Gestion-Culinaria
🧑‍🍳🧑‍🍳🧑‍🍳🧑‍🍳ENTREGA FINAL!
Grupo 3, fecha de entrega: 12 de Agosto, 2026.<br><br><br>


Integrantes del proyecto y rol que desempeñan <br><br><br>

A. Ingrid: Encargada de  crear funciones  para la sección  del chef.<br>
B. Adrian: Encargado de  crear funciones  para la sección del usuario <br>
C. Julio:  Encargado de  crear funciones  para la sección del admin del sitio <br>
D. Abraham:  Encargado de  crear funciones  para la sección del sitio comunidad<br> 

Flowchart asignaciones : https://app.eraser.io/workspace/yS6l6pAKOkrFHIvZcIts?origin=share <br><br>
================================================================= <br><br>

1-Cómo ejecutar/abrir el proyecto. <br><br>

Cómo se ejecuta/abre el proyecto sección Chef:

	Guardar en la estructura correcta: 

	html/ingredientes.html

	css/cheff.css
	
	JS/ingredientes.js

	Se abre el archivo ingredientes.html y se vincula a la hoja JS <script src="../JS/ingredientes.js"></script> antes de la labe /body.



================================================================= <br><br>



2-Funcionalidades e implementadas, (lista) por seccion Chef/Admin/Recetas/Comunidad.  <br><br>

Funcionalidades implementadas para la sección Chef:

	a-Agregar productos dinámicamente: el usuario escribe un nombre en el buscador y al presionar Enter o Buscar, aparece un nuevo ingrediente en la lista.

	b-Checkbox interactivo: cada producto tiene un checkbox que el usuario puede marcar o desmarcar.

	c-Asignación de la clase .item.


================================================================= <br><br>

3-Explicar brevemente la funcionalidad de Java.Script utilizada, recalcando su validacion y el manejo de eventos. <br><br>

Explicación de la funcionalidad de JavaScript para la sección Chef:

*Selección de elementos:  Usamos document.querySelector para “apuntar” al input, botón, lista y total.
Ejemplo:const inputProducto = document.querySelector('.buscador input');


*Manejo de eventos: Con addEventListener escuchamos acciones del usuario:

 	 -click en el botón → agrega un producto.

 	 -keypress en el input → si la tecla es Enter, agrega el producto.

	 -change en los checkboxes → recalcula el total.


*Programa valida antes de agregar un producto, verificamos que el campo no esté vacío:

	if (texto === '') {
 	 alert('Por favor, ingrese un producto.');
 	 return;
	}


*Se crea un nuevo Ingrediente  le damos la clase .item.

	nuevoItem.classList.add('item');

* Se genera un  precio aleatorio entre 1000 y 5000

 	 const precioRandom = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

*Se genera una opcion de eliminar producto de la lista de Ingredientess












================================================================= <br><br>


Alcance Y descipción. <br><br>

El sistema de recetas está diseñado para conectar tres tipos de usuarios: chefs, administradores y comunidad general. Cada módulo define funciones específicas: los chefs crean y comparten recetas con ingredientes, precios y niveles de dificultad; los usuarios buscan, filtran y guardan recetas según tipo, país o rango de precio; y los administradores gestionan contenido, métricas y moderación. Además, la comunidad puede seguir a los chefs, comentar, puntuar recetas y participar en retos culinarios. El alcance incluye la gestión completa del ciclo de vida de una receta desde su creación hasta su interacción social, garantizando una experiencia colaborativa, educativa y gamificada dentro de la plataforma. <br><br>


Para generar una participación continua en el Foro de  Gestion Culinaria S.A. la cual la conforman usuarios como: expertos en cocina, Chefs, moderadores; el fin es crear recetas sobre la inspiración culinaria que ayude a visualizar recetas, rankings, retroalimentación y tips entre la comunidad en tiempo real.  <br><br>

Este proyecto aborda esa brecha mediante un ecosistema de comunidad donde chefs expertos y aficionados no solo comparten recetas estructuradas por costos y rankings, sino que interactúan en tiempo real. La plataforma resuelve la desconexión entre planificar un menú, rankear y comentar; automatizando listas de compras basadas en ingredientes, instrucciones, y video disponibles. <br><br>

Además, formaliza la colaboración comunitaria al permitir versiones derivadas con atribución, moderación de contenido donde se incentive la participación de la comunidad que es la que da la principal fuente de retroalimentacion sobre las recetas posteadas. Así, la problemática inicial de desorganización se transforma en una experiencia gastronómica optimizada, medible y conectada. <br><br>
