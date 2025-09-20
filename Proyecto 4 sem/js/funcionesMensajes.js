function mostrarMensajes() {
  let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
  const tbody = document.getElementById("lista-mensajes");
  tbody.innerHTML = "";

  if (mensajes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No hay mensajes guardados.</td></tr>`;
    return;
  }

  mensajes.forEach((m, index) => {
    let fila = `
      <tr>
        <td>${m.nombre}</td>
        <td>${m.email}</td>
        <td>${m.mensaje}</td>
        <td>${m.fecha}</td>
        <td>
          <button onclick="eliminarMensaje(${index})">Eliminar</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += fila;
  });
}

function eliminarMensaje(index) {
  let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
  mensajes.splice(index, 1); // elimina 1 elemento en la posición index
  localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));
  mostrarMensajes(); // refresca la tabla
}

// Inicializar cuando carga la página
document.addEventListener("DOMContentLoaded", mostrarMensajes);
