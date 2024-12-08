import mysql.connector
from mysql.connector import Error

def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',  # usuario de MySQL
            password='P@ssw0rd',  # Cambia esto por tu contraseña de MySQL
            database='memoriasemantica'  # Nombre de la base de datos
        )
        if connection.is_connected():
            print("Conexión exitosa a la base de datos")
        return connection
    except Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None
