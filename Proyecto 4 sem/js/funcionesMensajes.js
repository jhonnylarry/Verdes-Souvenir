function mostrarMensajes() {
  const mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
  const tbody = document.getElementById("lista-mensajes");
  tbody.innerHTML = "";

  if (mensajes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:15px;">No hay mensajes guardados.</td></tr>`;
    return;
  }

  mensajes.forEach((m, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td style="padding:8px;">${escapeHtml(m.nombre)}</td>
      <td style="padding:8px;">${escapeHtml(m.email)}</td>
      <td style="padding:8px; max-width:400px; white-space:normal;">${escapeHtml(m.mensaje)}</td>
      <td style="padding:8px;">
        <button onclick="eliminarMensaje(${index})" style="background:#c00; color:white; border:none; padding:6px 10px; border-radius:5px; cursor:pointer;">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function eliminarMensaje(index) {
  let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
  if (!confirm("¿Eliminar este mensaje?")) return;
  mensajes.splice(index, 1);
  localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));
  mostrarMensajes();
}

function eliminarTodos() {
  let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
  if (mensajes.length === 0) {
    alert("No hay mensajes para eliminar.");
    return;
  }
  if (!confirm("¿Eliminar TODOS los mensajes?")) return;
  localStorage.removeItem("mensajesContacto");
  mostrarMensajes();
}

function escapeHtml(text) {
  if (!text && text !== 0) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarMensajes();
  const btnTodos = document.getElementById("btn-eliminar-todos");
  if (btnTodos) btnTodos.addEventListener("click", eliminarTodos);
});
