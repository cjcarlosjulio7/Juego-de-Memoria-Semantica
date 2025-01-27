// script.js
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");
// Variables para manejar el tiempo
let tiempoInicio; // Tiempo en que inicia el juego
let tiempoJugado; // Tiempo total jugado
let pacienteId = null; // ID del paciente
const urlParams = new URLSearchParams(window.location.search);


// Función para mostrar una pantalla específica
function mostrarPantalla(pantalla) {
    pantallaJuego.style.display = "none";
    pantallaFinal.style.display = "none";
    pantalla.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
    
    const botonNuevoJuego = document.getElementById("boton-nuevo-juego");
    const botonSalir = document.getElementById("boton-salir");
    const botonSalir2 = document.getElementById("boton-salir2");
    const botonReiniciar = document.getElementById("boton-reiniciar");
    
    // Botón de Nuevo Juego
    
    botonNuevoJuego.addEventListener("click", () => {
        location.reload(); 
        inputNombreUsuario.value = "";
    });

    // Botón de Salir
    botonSalir.addEventListener("click", () => {
        window.history.back(); // Redirige a la página anterior
    });

     // Botón de Salir (pantalla de resultados)
     botonSalir2.addEventListener("click", () => {
        window.history.back(); // Redirige a la página anterior
    });

    // Botón de Jugar de Nuevo (pantalla de resultados)
    botonReiniciar.addEventListener("click", () => {
        location.reload();
    });

    // Registrar el tiempo de inicio cuando carga la pantalla del juego
    tiempoInicio = new Date(); // Guardar el tiempo de inicio

    // Mostrar pantalla de inicio al cargar
    mostrarPantalla(pantallaJuego);
});

// Seleccionar todas las palabras, las categorías y el contenedor de notificación
const palabras = document.querySelectorAll('.palabra');
const categorias = document.querySelectorAll('.categoria');
const notificacion = document.getElementById('notificacion');
const overlay = document.getElementById('overlay');
let palabrasRestantes = palabras.length; // Contador de palabras restantes
let palabrasIncorrectas = 0; // Contador de palabras incorrectas


// Función para mostrar el mensaje de notificación
function mostrarNotificacion(mensaje, esCorrecto) {
    notificacion.textContent = mensaje;
    notificacion.classList.toggle('correcto', esCorrecto);
    notificacion.classList.toggle('incorrecto', !esCorrecto);
    notificacion.style.visibility = 'visible';
    notificacion.style.opacity = '1';
    overlay.style.display = 'block';


    // Ocultar la notificación después de 1 segundos y bloquear el contenido
    setTimeout(() => {
        notificacion.style.visibility = 'hidden';
        notificacion.style.opacity = '0';
        overlay.style.display = 'none';
    }, 1000);

}

function calcularTiempoJugado() {
    const tiempoFinal = new Date(); // Registrar el tiempo de finalización
    const tiempoJugadoMs = tiempoFinal - tiempoInicio; // Diferencia en milisegundos

    // Convertir a horas, minutos y segundos
    const horas = Math.floor(tiempoJugadoMs / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoJugadoMs % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoJugadoMs % (1000 * 60)) / 1000);

    // Formatear en HH:MM:SS
    tiempoJugado = 
        `${horas.toString().padStart(2, '0')}:` +
        `${minutos.toString().padStart(2, '0')}:` +
        `${segundos.toString().padStart(2, '0')}`;
}

function finalizarJuego() {
    calcularTiempoJugado();
    // Registrar estadísticas
    pacienteId = urlParams.get('id');
    registrarEstadisticas(pacienteId, tiempoJugado, palabrasIncorrectas);
}

async function registrarEstadisticas(pacienteId, tiempo, errores) {
    try {
        const response = await fetch('/registrar-estadisticas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paciente_id: pacienteId,
                tiempo_juego: tiempo,
                errores: errores
            })
        });

        if (!response.ok) {
            new Error("Error al registrar estadísticas.");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

async function cargarPalabras() {
    try {
        const response = await fetch('/obtener-palabras');  // Ruta del backend para palabras aleatorias
        const palabras = await response.json();

        const contenedorPalabras = document.querySelector('.palabras');
        contenedorPalabras.innerHTML = '';  // Limpiar palabras anteriores

        palabras.forEach(palabra => {
            const div = document.createElement('div');
            div.classList.add('palabra');
            div.setAttribute('draggable', 'true');
            div.setAttribute('data-categoria', palabra.categoria);
            div.textContent = palabra.palabra;
            contenedorPalabras.appendChild(div);
        });

        asignarEventosDragAndDrop();  // Activar los eventos después de agregar palabras
    } catch (error) {
        console.error('Error cargando palabras:', error);
    }
}

// Función para asignar eventos Drag and Drop después de cargar dinámicamente
function asignarEventosDragAndDrop() {
    const palabras = document.querySelectorAll('.palabra');
    const categorias = document.querySelectorAll('.categoria');

    palabras.forEach(palabra => {
        palabra.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', palabra.getAttribute('data-categoria'));
            palabra.classList.add('arrastrando');
        });

        palabra.addEventListener('dragend', () => {
            palabra.classList.remove('arrastrando');
        });
    });

    categorias.forEach(categoria => {
        categoria.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        categoria.addEventListener('drop', (e) => {
            e.preventDefault();
            const categoriaArrastrada = e.dataTransfer.getData('text/plain');
            const categoriaObjetivo = categoria.getAttribute('data-categoria');
            const palabra = document.querySelector(`.palabra.arrastrando`);

            if (categoriaArrastrada === categoriaObjetivo) {
                mostrarNotificacion("¡Correcto! Muy bien", true);
                palabra.remove();
            } else {
                mostrarNotificacion("¡Inténtalo de nuevo!", false);
                palabrasIncorrectas++;
            }

            if (document.querySelectorAll('.palabra').length === 0) {
                finalizarJuego();
                setTimeout(() => mostrarPantalla(pantallaFinal), 1000);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarPalabras();  // Cargar palabras dinámicamente al inicio del juego
});




