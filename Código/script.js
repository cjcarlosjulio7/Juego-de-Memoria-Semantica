// script.js
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");
const pantallaResultados = document.getElementById("pantalla-resultados");

// Función para mostrar una pantalla específica
function mostrarPantalla(pantalla) {
    pantallaInicio.style.display = "none";
    pantallaJuego.style.display = "none";
    pantallaFinal.style.display = "none";
    pantallaResultados.style.display = "none";
    pantalla.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
    
    const botonIniciar = document.getElementById("boton-iniciar");
    const botonNuevoJuego = document.getElementById("boton-nuevo-juego");
    const botonSalir = document.getElementById("boton-salir");
    const botonReiniciar = document.getElementById("boton-reiniciar");

    const inputNombreUsuario = document.getElementById("nombre-usuario");
    const nombreJugador = document.getElementById("nombre-jugador");

    // Iniciar juego
    botonIniciar.addEventListener("click", () => {
        const nombreUsuario = inputNombreUsuario.value.trim();
        if (nombreUsuario) {
            nombreJugador.textContent = nombreUsuario;
            mostrarPantalla(pantallaJuego);
        } else {
            mostrarNotificacion("EL NOMBRE ESTÁ VACÍO", false);
        }
    });

    // Botón de Nuevo Juego
    botonNuevoJuego.addEventListener("click", () => {
        location.reload(); 
        inputNombreUsuario.value = "";
    });

    // Botón de Salir
    botonSalir.addEventListener("click", () => {
        location.reload();
        inputNombreUsuario.value = "";
    });

    // Botón de Jugar de Nuevo (pantalla de resultados)
    botonReiniciar.addEventListener("click", () => {
        location.reload();
        inputNombreUsuario.value = "";
    });

    // Mostrar pantalla de inicio al cargar
    mostrarPantalla(pantallaInicio);
});

// Seleccionar todas las palabras, las categorías y el contenedor de notificación
const palabras = document.querySelectorAll('.palabra');
const categorias = document.querySelectorAll('.categoria');
const notificacion = document.getElementById('notificacion');
let palabrasRestantes = palabras.length; // Contador de palabras restantes

// Función para mostrar el mensaje de notificación
function mostrarNotificacion(mensaje, esCorrecto) {
    notificacion.textContent = mensaje;
    notificacion.classList.toggle('correcto', esCorrecto);
    notificacion.classList.toggle('incorrecto', !esCorrecto);
    notificacion.style.visibility = 'visible';
    notificacion.style.opacity = '1';

    // Ocultar la notificación después de 2 segundos
    setTimeout(() => {
        notificacion.style.visibility = 'hidden';
        notificacion.style.opacity = '0';
    }, 2000);
}

palabras.forEach(palabra => {
    // Cuando comienza a arrastrar la palabra
    palabra.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', palabra.getAttribute('data-categoria'));
        palabra.classList.add('arrastrando');
    });

    // Cuando se termina de arrastrar la palabra
    palabra.addEventListener('dragend', () => {
        palabra.classList.remove('arrastrando');
    });
});

categorias.forEach(categoria => {
    // Permitir que los elementos se suelten en la categoría
    categoria.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Lógica cuando se suelta una palabra en una categoría
    categoria.addEventListener('drop', (e) => {
        e.preventDefault();
        const categoriaArrastrada = e.dataTransfer.getData('text/plain');
        const categoriaObjetivo = categoria.getAttribute('data-categoria');
        
        // Obtener el elemento de la palabra arrastrada
        const palabra = document.querySelector(`.palabra.arrastrando`);

        // Validar si la palabra arrastrada coincide con la categoría
        if (categoriaArrastrada === categoriaObjetivo) {
            mostrarNotificacion("¡Correcto!", true);
            palabrasRestantes--;
            
            setTimeout(() => palabra.remove(), 800); // Oculta la palabra después de un corto tiempo
        } else {
            mostrarNotificacion("Incorrecto", false);
        }
        
        // Validar si ya no quedan palabras
        if (palabrasRestantes == 0) {
            setTimeout(() => {
                mostrarPantalla(pantallaFinal);  // Cambiar a la pantalla de resultados después de 2 segundos
            }, 2000);  
        }
    });
});
