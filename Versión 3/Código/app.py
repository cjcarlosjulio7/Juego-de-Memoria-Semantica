from datetime import timedelta
from flask import Flask, render_template, request, jsonify, redirect, url_for  
from db_connection import create_connection

app = Flask(__name__)

# Ruta para mostrar el formulario de login
@app.route('/')
def index():
    return redirect(url_for('login'))

# Ruta para el login del terapeuta
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
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
    else:
        return render_template('login.html')

# Ruta para la pestaña del terapeuta
@app.route('/terapeuta')
def terapeuta():
    return render_template('terapeuta.html')


@app.route('/pacientes', methods=['GET'])
def obtener_pacientes():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT id, nombre, apellido, edad FROM pacientes")
    pacientes = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(pacientes), 200

@app.route('/pacientes', methods=['POST'])
def agregar_paciente():
    data = request.json
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    edad = data.get('edad')
    terapeuta= 1

    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO pacientes (nombre, apellido, edad, terapeuta_id ) VALUES (%s, %s, %s, %s)",
        (nombre, apellido, edad, terapeuta)
    )
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Paciente agregado exitosamente"}), 201


@app.route('/infoPaciente')
def info_paciente():
    paciente_id = request.args.get('id')  # Obtener el ID del paciente desde los parámetros de la URL
    
    # Obtener los datos del paciente desde la base de datos
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pacientes WHERE id = %s", (paciente_id,))
    paciente = cursor.fetchone()
    cursor.close()
    connection.close()

    # Verificar si el paciente existe
    if not paciente:
        return "Paciente no encontrado", 404

    # Renderizar la página con los detalles del paciente
    return render_template('infoPaciente.html', paciente=paciente)

#obtener datos para la tabla de Jugadas where paciente_id = id
@app.route('/paciente/<int:id>/estadisticas')
def obtener_estadisticas(id):
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    
    # Consulta para obtener las estadísticas del paciente
    cursor.execute("SELECT numero_errores, tiempo_juego, fecha FROM estadisticas WHERE paciente_id = %s", (id,))

    estadisticas = cursor.fetchall()

     # Convertir tiempo_total de timedelta a un formato legible
    for estadistica in estadisticas:
        if isinstance(estadistica['tiempo_juego'], timedelta):
            total_seconds = estadistica['tiempo_juego'].total_seconds()
            hours = int(total_seconds // 3600)
            minutes = int((total_seconds % 3600) // 60)
            seconds = int(total_seconds % 60)
            estadistica['tiempo_juego'] = f"{hours:02}:{minutes:02}:{seconds:02}"  # Formato hh:mm:ss

    cursor.close()
    connection.close()
    
    return jsonify(estadisticas)

#juego
@app.route('/juego')
def juego():
    paciente_id = request.args.get('id')
    
    print(f"ID del paciente: {paciente_id}")
    # Aquí puedes pasar el paciente_id al HTML del juego
    return render_template('index.html', paciente_id=paciente_id)


@app.route('/registrar-estadisticas', methods=['POST'])
def registrar_estadisticas():
    data = request.get_json()
    paciente_id = data.get('paciente_id')
    tiempo_juego = data.get('tiempo_juego')
    errores = data.get('errores')

    if not paciente_id or not tiempo_juego or errores is None:
        return jsonify({'error': 'Datos incompletos'}), 400

    try:
        connection = create_connection()
        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO estadisticas (paciente_id, numero_errores ,tiempo_juego, fecha)
            VALUES (%s, %s, %s, CURDATE())
        """, (paciente_id, errores, tiempo_juego))

        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'message': 'Estadísticas registradas exitosamente.'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Error al guardar las estadísticas.'}), 500

@app.route('/terapeutas', methods=['POST'])
def agregar_terapeuta():
    data = request.json
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    correo = data.get('correo')
    contraseña = data.get('contraseña')

    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO terapeutas (nombre, apellido, correo, contraseña) VALUES (%s, %s, %s, SHA2(%s, 256))",
        (nombre, apellido, correo, contraseña)
    )
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Terapeuta agregado exitosamente"}), 201

if __name__ == '__main__':
    app.run(debug=True)
