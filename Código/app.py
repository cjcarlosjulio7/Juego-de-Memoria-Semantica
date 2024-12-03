from flask import Flask, render_template, request, jsonify
from db_connection import create_connection

app = Flask(__name__)

# Ruta para mostrar el formulario de login
@app.route('/')
def mostrar_login():
    return render_template('login.html')

# Ruta para el login del terapeuta
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM terapeutas WHERE correo = %s AND contraseña = SHA2(%s, 256)",
        (email, password)
    )
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    
    if user:
        return jsonify({"message": "Login exitoso", "terapeuta": user}), 200
    return jsonify({"message": "Credenciales incorrectas"}), 401

# Ruta para obtener la lista de pacientes
@app.route('/pacientes', methods=['GET'])
def obtener_pacientes():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pacientes")
    pacientes = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify({"pacientes": pacientes}), 200

# Ruta para registrar los resultados de una jugada
@app.route('/registrar_jugada', methods=['POST'])
def registrar_jugada():
    data = request.json
    paciente_id = data.get('paciente_id')
    errores = data.get('errores')
    tiempo = data.get('tiempo')
    
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO jugadas (paciente_id, errores, tiempo) VALUES (%s, %s, %s)",
        (paciente_id, errores, tiempo)
    )
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"message": "Resultados registrados"}), 201

if __name__ == '__main__':
    app.run(debug=True)
