// script.js

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const resultScreen = document.getElementById("result-screen");

    const startButton = document.getElementById("start-button");
    const newGameButton = document.getElementById("new-game-button");
    const exitButton = document.getElementById("exit-button");
    const restartButton = document.getElementById("restart-button");

    const userNameInput = document.getElementById("user-name");
    const playerNameDisplay = document.getElementById("player-name");

    // Función para mostrar una pantalla específica
    function showScreen(screen) {
        startScreen.style.display = "none";
        gameScreen.style.display = "none";
        resultScreen.style.display = "none";
        screen.style.display = "flex";
    }

    // Iniciar juego
    startButton.addEventListener("click", () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            playerNameDisplay.textContent = userName;
            showScreen(gameScreen);
        } else {
            alert("Por favor ingresa tu nombre");
        }
    });

    // Botón de Nuevo Juego
    newGameButton.addEventListener("click", () => {
        showScreen(startScreen);
        userNameInput.value = "";
    });

    // Botón de Salir
    exitButton.addEventListener("click", () => {
        showScreen(startScreen);
        userNameInput.value = "";
    });

    // Botón de Jugar de Nuevo (pantalla de resultados)
    restartButton.addEventListener("click", () => {
        showScreen(startScreen);
        userNameInput.value = "";
    });

    // Mostrar pantalla de inicio al cargar
    showScreen(startScreen);
});
