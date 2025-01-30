document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {  
            alert('Login exitoso');
            window.location.href = '/terapeuta'; // Cambia a la página de terapeuta
        } else {
            document.getElementById('error-message').style.display = 'block';        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'Hubo un problema al iniciar sesión.';
    }
});

document.getElementById('add-terapeuta-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;

    try {
        const response = await fetch('/terapeutas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name, apellido, correo: email, contraseña: password }),
        });

        if (response.ok) {
            alert('Terapeuta agregado exitosamente');
            document.getElementById('add-terapeuta-modal').style.display = 'none';
            document.getElementById('add-terapeuta-form').reset();

        } else {
            alert('ERROR Terapeuta');
            throw new Error('Error al agregar terapeuta');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

const modal = document.getElementById('add-terapeuta-modal');
const addTerapeutaBtn = document.getElementById('add-terapeuta-btn');
const closeBtn = document.querySelector('.close-btn');

// Abrir el modal
addTerapeutaBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Cerrar el modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
