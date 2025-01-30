const path = require("path");

const infoPacientePath = path.resolve(__dirname, "../static/infoPaciente.js");
const scriptPath = path.resolve(__dirname, "../static/script.js");
const terapeutaPath = path.resolve(__dirname, "../static/terapeuta.js");
const loginPath = path.resolve(__dirname, "../static/login.js");

const { cargarDatosEstadisticas } = require(infoPacientePath);
const { registrarEstadisticas, calcularTiempoJugado } = require(scriptPath);
const { cargarPacientes } = require(terapeutaPath);

// Mock para fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("Pruebas unitarias de los archivos estáticos JS", () => {
    beforeEach(() => {
        document.body.innerHTML = `
          <form id="login-form"></form>
          <div id="error-message" style="display:none"></div>
          <form id="add-terapeuta-form"></form>
          <button id="add-terapeuta-btn"></button>
          <div id="add-terapeuta-modal" style="display:none"></div>
          <table id="patient-list"></table>
          <tr id="patient-row" data-id="5"></tr>
        `;
      });
      
  test("registrarEstadisticas debería llamar a fetch con los datos correctos", async () => {
    await registrarEstadisticas(1, "00:10:30", 3);
    expect(fetch).toHaveBeenCalledWith("/registrar-estadisticas", expect.any(Object));
  });

  test("cargarPacientes debería llamar a fetch con la URL correcta", async () => {
    document.body.innerHTML = '<table id="patient-list"></table>';
    await cargarPacientes();
    expect(fetch).toHaveBeenCalledWith("/pacientes");
  });
});
