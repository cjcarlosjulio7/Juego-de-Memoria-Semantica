// script.js
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const finalScreen = document.getElementById("final-screen");
const resultScreen = document.getElementById("result-screen");

// Función para mostrar una pantalla específica
function showScreen(screen) {
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    finalScreen.style.display = "none";
    resultScreen.style.display = "none";
    screen.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
    
    const startButton = document.getElementById("start-button");
    const newGameButton = document.getElementById("new-game-button");
    const exitButton = document.getElementById("exit-button");
    const restartButton = document.getElementById("restart-button");

    const userNameInput = document.getElementById("user-name");
    const playerNameDisplay = document.getElementById("player-name");

    
    // Iniciar juego
    startButton.addEventListener("click", () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            playerNameDisplay.textContent = userName;
            showScreen(gameScreen);
        } else {
            showNotification("EL NOMBRE ESTA VACÍO", false);
        }
    });

    // Botón de Nuevo Juego
    newGameButton.addEventListener("click", () => {
        location.reload(); 
        userNameInput.value = "";
    });

    // Botón de Salir
    exitButton.addEventListener("click", () => {
        location.reload();
        userNameInput.value = "";
    });

    // Botón de Jugar de Nuevo (pantalla de resultados)
    restartButton.addEventListener("click", () => {
        location.reload();
        userNameInput.value = "";
    });

    // Mostrar pantalla de inicio al cargar
    showScreen(startScreen);
});

// Seleccionar todas las palabras, las categorías y el contenedor de notificación
const words = document.querySelectorAll('.word');
const categories = document.querySelectorAll('.category');
const notification = document.getElementById('notification');
let remainingWords = words.length; // Contador de palabras restantes


// Función para mostrar el mensaje de notificación
function showNotification(message, isCorrect) {
    notification.textContent = message;
    notification.classList.toggle('correct', isCorrect);
    notification.classList.toggle('incorrect', !isCorrect);
    notification.style.visibility = 'visible';
    notification.style.opacity = '1';

    // Ocultar la notificación después de 2 segundos
    setTimeout(() => {
        notification.style.visibility = 'hidden';
        notification.style.opacity = '0';
    }, 2000);
}

words.forEach(word => {
    // Cuando comienza a arrastrar la palabra
    word.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', word.getAttribute('data-category'));
        word.classList.add('dragging');
    });

    // Cuando se termina de arrastrar la palabra
    word.addEventListener('dragend', () => {
        word.classList.remove('dragging');
    });
});

categories.forEach(category => {
    // Permitir que los elementos se suelten en la categoría
    category.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Lógica cuando se suelta una palabra en una categoría
    category.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedCategory = e.dataTransfer.getData('text/plain');
        const targetCategory = category.getAttribute('data-category');
        
        // Obtener el elemento de la palabra arrastrada
        const word = document.querySelector(`.word.dragging`);

        // Validar si la palabra arrastrada coincide con la categoría
        if (draggedCategory === targetCategory) {
            // Mostrar mensaje de correcto y ocultar la palabra
            showNotification("¡Correcto!", true);
            remainingWords--;
            
            setTimeout(() => word.remove(), 800); // Oculta la palabra después de un corto tiempo
        } else {
            // Mostrar mensaje de incorrecto
            showNotification("Incorrecto", false);
        }
        
        // Validar si ya no quedan palabras
        if(remainingWords==0){
            setTimeout(() => {
                showScreen(finalScreen);  // Cambiar a la pantalla de resultados después de 2 segundos
            }, 2000);  // 1000 milisegundos 
        }
        
    });
});

