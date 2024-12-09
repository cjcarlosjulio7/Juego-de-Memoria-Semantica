# Juego de Memoria Semántica

Este proyecto consiste en un **juego de memoria semántica** diseñado para ayudar a personas con principios de Alzheimer, con el objetivo de ralentizar la pérdida de memoria y mejorar su situación actual. El juego utiliza categorías y palabras para estimular la memoria y la asociación, buscando promover la actividad cognitiva de forma entretenida y accesible.

## Descripción del Juego

El jugador debe **arrastrar y soltar palabras** en su categoría correspondiente. Las categorías incluyen elementos comunes como "Cocina", "Aseo" y "Muebles". Al clasificar correctamente las palabras, el jugador recibe mensajes de retroalimentación, reforzando la memoria asociativa. Una vez que todas las palabras se han clasificado correctamente, el jugador pasa a la pantalla de felicitación.

## Requisitos Previos

### Software
- Python 3.8 o superior
- MySQL Server y MySQL Workbench
- Un editor de texto o IDE (como Visual Studio Code o PyCharm)

### Bibliotecas de Python
Instalar las siguientes dependencias usando `pip`:
- Flask
- mysql-connector-python

---

## Pasos para Ejecutar el Proyecto

### 1. Clonar el Repositorio

   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>

### 2. Crear la Base de Datos con el Archivo QueryBaseDatos
1. Ubica el archivo `QueryBaseDatos.sql` en el directorio raíz del proyecto.
2. Abre **MySQL Workbench** e inicia sesión con tu usuario y contraseña de MySQL.
3. Ve a la pestaña `File > Open Script` y selecciona el archivo `QueryBaseDatos.sql`.
4. Ejecuta el script presionando el botón `Run` (o `Ctrl + Enter`).
5. Verifica que las tablas y datos iniciales se hayan creado correctamente desde el panel de exploración de esquema en MySQL Workbench.

---

### 3. Configurar la Conexión a la Base de Datos
1. Abre el archivo `db_connection.py`.
2. Actualiza los datos de conexión para que coincidan con tu configuración local:
   ```python
   import mysql.connector

   def create_connection():
       return mysql.connector.connect(
           host="localhost",
           user="<USUARIO>",          # Reemplaza con tu usuario de MySQL
           password="<CONTRASEÑA>",   # Reemplaza con tu contraseña de MySQL
           database="memoria_semantica"
       )
---

### 4. Instala las dependencias en Visual Studio Code 

  pip install flask
  pip install mysql-connector-python

### 5. Ejecutar la aplicación 

  inicia el servidor de desarrollo ejecutando el archivo app-py o en el terminal mendiante el comando: 

  python app.py





