
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
