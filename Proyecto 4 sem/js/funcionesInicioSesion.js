// funcionesInicioSesion.js
// Lógica y validaciones para el inicio de sesión de usuarios

// Usuario de prueba para dashboard (solo si no existe ya en localStorage)
const usuarioAdminPrueba = {
  run: "12345678K",
  nombre: "Admin",
  apellidos: "Prueba",
  correo: "admin@duoc.cl",
  direccion: "Dirección admin",
  region: "Región Metropolitana",
  comuna: "Santiago",
  fechaNacimiento: "1990-01-01",
  tipoUsuario: "administrador",
  contrasena: "admin1234"
};

function crearUsuarioAdminPrueba() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existe = usuarios.find(u => u.correo === usuarioAdminPrueba.correo);
  if (!existe) {
    usuarios.push(usuarioAdminPrueba);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
}

// Validación de correo (igual que registro)
function validarCorreo(correo) {
  if (!correo) return false;
  if (correo.length > 100) return false;
  return /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

// Validación de contraseña
function validarContrasena(contrasena) {
  return contrasena && contrasena.length >= 4 && contrasena.length <= 10;
}

// Validar inicio de sesión
function validarInicioSesion(e) {
  e.preventDefault();
  const correo = document.getElementById('correo-login').value.trim();
  const contrasena = document.getElementById('contrasena-login').value;
  let errores = [];

  if (!correo) errores.push('El correo es requerido.');
  else if (!validarCorreo(correo)) errores.push('Correo inválido o no permitido.');

  if (!contrasena) errores.push('La contraseña es requerida.');
  else if (!validarContrasena(contrasena)) errores.push('La contraseña debe tener entre 4 y 10 caracteres.');

  const erroresDiv = document.getElementById('errores-login');
  if (errores.length > 0) {
    erroresDiv.innerHTML = errores.map(e => `<li>${e}</li>`).join('');
    erroresDiv.style.display = 'block';
    return false;
  } else {
    erroresDiv.style.display = 'none';
    // Buscar usuario
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
    if (!usuario) {
      erroresDiv.innerHTML = '<li>Correo o contraseña incorrectos.</li>';
      erroresDiv.style.display = 'block';
      return false;
    }
    // Redirección según tipo de usuario
    if (usuario.tipoUsuario === 'administrador') {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'home.html';
    }
    return true;
  }
}

// Inicialización
if (document.getElementById('form-login')) {
  document.addEventListener('DOMContentLoaded', () => {
    crearUsuarioAdminPrueba();
    document.getElementById('form-login').addEventListener('submit', validarInicioSesion);
  });
}
