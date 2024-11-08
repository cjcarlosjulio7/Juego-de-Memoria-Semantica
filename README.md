# Juego de Memoria Semántica

Este proyecto consiste en un **juego de memoria semántica** diseñado para ayudar a personas con principios de Alzheimer, con el objetivo de ralentizar la pérdida de memoria y mejorar su situación actual. El juego utiliza categorías y palabras para estimular la memoria y la asociación, buscando promover la actividad cognitiva de forma entretenida y accesible.

## Descripción del Juego

El jugador debe **arrastrar y soltar palabras** en su categoría correspondiente. Las categorías incluyen elementos comunes como "Cocina", "Aseo" y "Muebles". Al clasificar correctamente las palabras, el jugador recibe mensajes de retroalimentación, reforzando la memoria asociativa. Una vez que todas las palabras se han clasificado correctamente, el jugador pasa a la pantalla de felicitación.

## Tecnologías Utilizadas

Este proyecto está desarrollado con una **Arquitectura de Tres Capas**:

- **Frontend (Capa de Presentación)**: HTML, CSS y JavaScript para crear la interfaz de usuario y gestionar la interacción del usuario con el juego.
- **Backend (Capa de Lógica de Negocio)**: Se prevé un servidor en Python para gestionar la lógica avanzada del juego, como el registro de puntajes y tiempos.
- **Base de Datos (Capa de Datos)**: Se utiliza MongoDB para almacenar información sobre los jugadores, sus tiempos y estadísticas de partidas.

## Estructura del Proyecto

- `index.html`: Contiene la estructura HTML del juego.
- `styles.css`: Define los estilos y la apariencia de la interfaz de usuario.
- `script.js`: Implementa la lógica del juego, como el arrastre y el emparejamiento de categorías, así como la visualización de notificaciones.

## Integrantes del Grupo

- **Carlos Bayas**
- **Issac de la Caden**
- **Kevin Donoso**
- **Andrea Oña**
- **Daniel Oña**

## Cómo Jugar

1. Inicia el juego ingresando tu nombre en la pantalla de bienvenida y presionando "Iniciar Juego".
2. Arrastra cada palabra al área de su categoría correspondiente.
3. Si la palabra está en la categoría correcta, recibirás un mensaje de "¡Correcto!".
4. Al clasificar todas las palabras correctamente, se mostrará una pantalla de felicitación.
5. Puedes volver a jugar seleccionando "Jugar de Nuevo".


