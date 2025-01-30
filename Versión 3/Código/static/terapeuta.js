document.addEventListener('DOMContentLoaded', () => {
    cargarPacientes();

    const addPatientForm = document.getElementById('add-patient-form');
    if (addPatientForm) {
        addPatientForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const apellido = document.getElementById('apellido').value;
            const age = document.getElementById('age').value;

            try {
                const response = await fetch('/pacientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: name, apellido, edad: age }),
                });

                if (response.ok) {
                    alert('Paciente agregado exitosamente');
                    document.getElementById('add-patient-modal').style.display = 'none';
                    document.getElementById('add-patient-form').reset();
                    cargarPacientes();
                } else {
                    throw new Error('Error al agregar paciente');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    const modal = document.getElementById('add-patient-modal');
    const addPatientBtn = document.getElementById('add-patient-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (addPatientBtn) {
        addPatientBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const addPlayCloseBtn = document.getElementById('add-play-close');
    if (addPlayCloseBtn) {
        addPlayCloseBtn.addEventListener('click', () => {
            window.location.replace('/login');
        });
    }
});

async function cargarPacientes() {
    try {
        const response = await fetch('/pacientes');
        if (!response.ok) {
            throw new Error('Error al obtener la lista de pacientes');
        }
        
        const pacientes = await response.json();
        const patientList = document.getElementById('patient-list');
        if (!patientList) return;
        
        patientList.innerHTML = "";
        
        pacientes.forEach(paciente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.nombre}</td>
                <td>${paciente.apellido}</td>
                <td>${paciente.edad}</td>
            `;
            row.addEventListener("click", () => {
                window.location.href = `/infoPaciente?id=${paciente.id}`;
            });
            patientList.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { cargarPacientes };
