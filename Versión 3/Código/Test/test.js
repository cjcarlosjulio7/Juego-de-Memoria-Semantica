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
          <button id="add-play-close"></button>
        `;
      });

  test("cargarDatosEstadisticas debería llamar a fetch con la URL correcta", async () => {
    global.window = { location: { search: "?id=123" } };
    document.body.innerHTML = '<table id="patient-list"></table>';
    await cargarDatosEstadisticas();
    expect(fetch).toHaveBeenCalledWith("/paciente/123/estadisticas");
  });

  test("calcularTiempoJugado debería retornar un string en formato HH:MM:SS", () => {
    const tiempo = calcularTiempoJugado();
    expect(tiempo).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  test("registrarEstadisticas debería llamar a fetch con los datos correctos", async () => {
    await registrarEstadisticas(1, "00:10:30", 3);
    expect(fetch).toHaveBeenCalledWith("/registrar-estadisticas", expect.any(Object));
  });

  test("El modal de login debería abrirse al hacer clic en el botón", () => {
    document.body.innerHTML = '<button id="add-terapeuta-btn"></button><div id="add-terapeuta-modal" style="display:none"></div>';
    require(loginPath);
    document.getElementById("add-terapeuta-btn").click();
    expect(document.getElementById("add-terapeuta-modal").style.display).toBe("block");
  });

  test("El modal de login debería cerrarse al hacer clic en el botón de cierre", () => {
    document.body.innerHTML = '<div id="add-terapeuta-modal" style="display:block"></div><button class="close-btn"></button>';
    require(loginPath);
    document.querySelector(".close-btn").click();
    expect(document.getElementById("add-terapeuta-modal").style.display).toBe("none");
  });

  test("Al hacer clic en un paciente, debe redirigir a su infoPaciente", () => {
    document.body.innerHTML = '<table><tr id="patient-row" data-id="5"></tr></table>';
    const row = document.getElementById("patient-row");
    global.window = { location: { href: "" } };
    require(terapeutaPath);
    row.click();
    expect(global.window.location.href).toBe("/infoPaciente?id=5");
  });

  test("cargarPacientes debería llamar a fetch con la URL correcta", async () => {
    document.body.innerHTML = '<table id="patient-list"></table>';
    await cargarPacientes();
    expect(fetch).toHaveBeenCalledWith("/pacientes");
  });

  test("Debería enviar los datos correctos al agregar un terapeuta", async () => {
    document.body.innerHTML = '<form id="add-terapeuta-form"></form>';
    require(loginPath);
    const form = document.getElementById("add-terapeuta-form");
    form.dispatchEvent(new Event("submit"));
    expect(fetch).toHaveBeenCalledWith("/terapeutas", expect.any(Object));
  });

  test("Debería mostrar mensaje de error si login falla", async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
    document.body.innerHTML = '<div id="error-message" style="display:none"></div><form id="login-form"></form>';
    require(loginPath);
    await document.getElementById("login-form").dispatchEvent(new Event("submit"));
    expect(document.getElementById("error-message").style.display).toBe("block");
  });
});
