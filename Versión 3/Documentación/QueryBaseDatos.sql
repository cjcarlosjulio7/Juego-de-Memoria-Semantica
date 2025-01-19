CREATE DATABASE MemoriaSemantica;
USE MemoriaSemantica;

-- Tabla para los terapeutas
CREATE TABLE Terapeutas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL
);

-- Tabla para los pacientes
CREATE TABLE Pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    terapeuta_id INT NOT NULL,
    FOREIGN KEY (terapeuta_id) REFERENCES Terapeutas(id)
);

-- Tabla para las estadísticas de los juegos
CREATE TABLE Estadisticas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    numero_errores INT NOT NULL,
    tiempo_juego TIME NOT NULL,
    fecha DATE NOT NULL, -- Columna añadida para registrar la fecha del juego
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id)
);


-- creación de terapeuta de prueba
INSERT INTO Terapeutas (nombre, apellido, correo, contraseña) 
VALUES ('Carlos', 'Bayas', 'carlos.bayas@prueba.com', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5');