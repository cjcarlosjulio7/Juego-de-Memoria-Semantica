document.addEventListener('DOMContentLoaded', () => {
    cargarDatosEstadisticas();

    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');

    const botonNuevoJuego = document.getElementById("add-play-btn");

    if (botonNuevoJuego && pacienteId) {
        botonNuevoJuego.addEventListener("click", () => {
            // Redirigimos al juego pasándole el ID del paciente en la URL
            window.location.href = `/juego?id=${pacienteId}`;
        });
    }

    window.addEventListener('focus', cargarDatosEstadisticas);
});

async function cargarDatosEstadisticas() {
    try {
        // Obtener el ID del paciente desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const pacienteId = urlParams.get('id');
        
        // Hacer la petición al backend para obtener las estadísticas del paciente
        const response = await fetch(`/paciente/${pacienteId}/estadisticas`);

        if (!response.ok) {
            throw new Error('Error al obtener las estadísticas del paciente');
        }

        const estadisticas = await response.json();
        const patientList = document.getElementById('patient-list');

        // Limpiar la tabla antes de cargar los nuevos datos
        patientList.innerHTML = "";

        estadisticas.forEach((estadistica, index) => {
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
