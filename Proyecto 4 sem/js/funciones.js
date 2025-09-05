// js/funciones.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".tabla-contacto button");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const nombre  = document.getElementById("nombre").value.trim();
    const email   = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Verificar campos vacíos
    const faltantes = [];
    if (!nombre)  faltantes.push("Nombre");
    if (!email)   faltantes.push("Email");
    if (!mensaje) faltantes.push("Mensaje");

    if (faltantes.length > 0) {
      alert("Faltan datos: " + faltantes.join(", "));
      return;
    }

    // Validar longitudes
    if (nombre.length > 100) {
      alert("El nombre no puede superar los 100 caracteres.");
      return;
    }

    if (email.length > 100) {
      alert("El correo no puede superar los 100 caracteres.");
      return;
    }

    if (mensaje.length > 500) {
      alert("El mensaje no puede superar los 500 caracteres.");
      return;
    }

        // Validar dominios permitidos en correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) {
      alert("El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return;
    }

    // Si todo está OK
    alert("Formulario enviado correctamente ✅");
  });
});
