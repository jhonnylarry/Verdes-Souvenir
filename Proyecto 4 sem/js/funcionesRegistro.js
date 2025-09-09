// funcionesRegistro.js
// Validaciones y lógica para el formulario de registro de usuarios

// Arreglo de regiones y comunas (ejemplo, puedes agregar más)
const regionesYcomunas = [
  {
    region: "Región Metropolitana",
    comunas: ["Santiago", "Maipú", "Puente Alto", "Las Condes", "La Florida"]
  },
  {
    region: "Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
  },
  {
    region: "Biobío",
    comunas: ["Concepción", "Talcahuano", "Coronel", "Los Ángeles"]
  }
];

// Validación de RUN chileno (sin puntos ni guion)
function validarRun(run) {
  if (!run) return false;
  if (run.length < 7 || run.length > 9) return false;
  return /^[0-9]{7,8}[0-9kK]$/.test(run);
}

// Validación de correo
function validarCorreo(correo) {
  if (!correo) return false;
  if (correo.length > 100) return false;
  return /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

// Cargar regiones en el select
function cargarRegiones() {
  const selectRegion = document.getElementById('region');
  selectRegion.innerHTML = '<option value="">Seleccione región</option>' +
    regionesYcomunas.map(r => `<option value="${r.region}">${r.region}</option>`).join('');
}

// Cargar comunas según región
function cargarComunas() {
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');
  const regionSeleccionada = selectRegion.value;
  selectComuna.innerHTML = '<option value="">Seleccione comuna</option>';
  if (!regionSeleccionada) return;
  const regionObj = regionesYcomunas.find(r => r.region === regionSeleccionada);
  if (regionObj) {
    selectComuna.innerHTML += regionObj.comunas.map(c => `<option value="${c}">${c}</option>`).join('');
  }
}

// Validar y procesar formulario
function validarRegistro(e) {
  e.preventDefault();
  let errores = [];
  const run = document.getElementById('run').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const region = document.getElementById('region').value;
  const comuna = document.getElementById('comuna').value;

  if (!run) errores.push('El RUN es requerido.');
  else if (!validarRun(run)) errores.push('RUN inválido. Debe tener entre 7 y 9 caracteres, sin puntos ni guion.');

  if (!nombre) errores.push('El nombre es requerido.');
  else if (nombre.length > 50) errores.push('El nombre no puede superar 50 caracteres.');

  if (!apellidos) errores.push('Los apellidos son requeridos.');
  else if (apellidos.length > 100) errores.push('Los apellidos no pueden superar 100 caracteres.');

  if (!correo) errores.push('El correo es requerido.');
  else if (!validarCorreo(correo)) errores.push('Correo inválido o no permitido.');

  if (!direccion) errores.push('La dirección es requerida.');
  else if (direccion.length > 300) errores.push('La dirección no puede superar 300 caracteres.');

  if (!region) errores.push('Debe seleccionar una región.');
  if (!comuna) errores.push('Debe seleccionar una comuna.');

  const erroresDiv = document.getElementById('errores-registro');
  if (errores.length > 0) {
    erroresDiv.innerHTML = errores.map(e => `<li>${e}</li>`).join('');
    erroresDiv.style.display = 'block';
    return false;
  } else {
    erroresDiv.style.display = 'none';
    // Guardar usuario en localStorage
    const nuevoUsuario = {
      run,
      nombre,
      apellidos,
      correo,
      direccion,
      region,
      comuna,
      fechaNacimiento: document.getElementById('fechaNacimiento').value
    };
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso. Usuario guardado localmente.');
    document.getElementById('form-registro').reset();
    return true;
  }
}

// Eventos al cargar la página
if (document.getElementById('form-registro')) {
  document.addEventListener('DOMContentLoaded', () => {
    cargarRegiones();
    document.getElementById('region').addEventListener('change', cargarComunas);
    document.getElementById('form-registro').addEventListener('submit', validarRegistro);
  });
}
