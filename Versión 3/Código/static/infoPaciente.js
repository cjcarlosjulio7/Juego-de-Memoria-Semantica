document.addEventListener('DOMContentLoaded', () => {
    cargarDatosEstadisticas();

    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');

    const botonNuevoJuego = document.getElementById("add-play-btn");
    if (botonNuevoJuego && pacienteId) {
        botonNuevoJuego.addEventListener("click", () => {
            window.location.href = `/juego?id=${pacienteId}`;
        });
    }

    window.addEventListener('focus', cargarDatosEstadisticas);

    const addPlayCloseBtn = document.getElementById('add-play-close');
    if (addPlayCloseBtn) {
        addPlayCloseBtn.addEventListener('click', () => {
            window.location.href = '/login';
        });
    }
});

async function cargarDatosEstadisticas() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const pacienteId = urlParams.get('id');
        if (!pacienteId) return;

        const response = await fetch(`/paciente/${pacienteId}/estadisticas`);
        if (!response.ok) {
            throw new Error('Error al obtener las estadísticas del paciente');
        }

        const estadisticas = await response.json();
        const patientList = document.getElementById('patient-list');
        if (!patientList) return;

        patientList.innerHTML = "";
        estadisticas.forEach((estadistica) => {
            const row = document.createElement('tr');
            const fecha = new Date(estadistica.fecha).toLocaleDateString();
            row.innerHTML = `
                <td>${estadistica.numero_errores}</td>
                <td>${estadistica.tiempo_juego}</td>
                <td>${fecha}</td>
            `;
            patientList.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { cargarDatosEstadisticas };
