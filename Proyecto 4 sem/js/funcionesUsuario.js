//boton para enviar a crear usuario
document.addEventListener("DOMContentLoaded", () => {
  const btnNuevo = document.getElementById("btn-nuevo-usuario");
  if (btnNuevo) {
    btnNuevo.addEventListener("click", () => {
      window.location.href = "nuevousuario.html";
    });
  }
});

//mostrar los usuarios en la tabla
document.addEventListener("DOMContentLoaded", () => {
  mostrarUsuarios();
});

function mostrarUsuarios() {
  const tbody = document.getElementById("lista-usuarios");
  tbody.innerHTML = "";

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.forEach((u, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${u.run}</td>
      <td>${u.nombre}</td>
      <td>${u.apellidos}</td>
      <td>${u.correo}</td>
      <td>${u.direccion}</td>
      <td>${u.region}</td>
      <td>${u.comuna}</td>
      <td>${u.tipoUsuario}</td>
      <td>${u.contrasena}</td>
      <td>
        <button onclick="editarUsuario(${index})">Editar</button>
        <button onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}

// boton para eliminar usuario
function eliminarUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.splice(index, 1); // elimina el usuario en esa posición
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios(); // recarga la tabla
}

// boton para editar usuario
function editarUsuario(index) {
  localStorage.setItem("usuarioEditar", index); // guardamos el índice
  window.location.href = "crearUsuario.html"; // vamos al formulario
}

//editar usuario en la tabla
function editarUsuario(index) {
  const tbody = document.getElementById("lista-usuarios");
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const u = usuarios[index];

  tbody.rows[index].innerHTML = `
    <td><input type="text" id="edit-run-${index}" value="${u.run}"></td>
    <td><input type="text" id="edit-nombre-${index}" value="${u.nombre}"></td>
    <td><input type="text" id="edit-apellidos-${index}" value="${u.apellidos}"></td>
    <td><input type="email" id="edit-correo-${index}" value="${u.correo}"></td>
    <td><input type="text" id="edit-direccion-${index}" value="${u.direccion}"></td>
    <td><input type="text" id="edit-region-${index}" value="${u.region}"></td>
    <td><input type="text" id="edit-comuna-${index}" value="${u.comuna}"></td>
    <td><input type="text" id="edit-tipo-${index}" value="${u.tipoUsuario}"></td>
    <td><input type="password" id="edit-contrasena-${index}" value="${u.contrasena}"></td>
    <td>
      <button onclick="guardarUsuario(${index})">Guardar</button>
      <button onclick="mostrarUsuarios()">Cancelar</button>
    </td>
  `;
}

function guardarUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios[index] = {
    run: document.getElementById(`edit-run-${index}`).value.trim(),
    nombre: document.getElementById(`edit-nombre-${index}`).value.trim(),
    apellidos: document.getElementById(`edit-apellidos-${index}`).value.trim(),
    correo: document.getElementById(`edit-correo-${index}`).value.trim(),
    direccion: document.getElementById(`edit-direccion-${index}`).value.trim(),
    region: document.getElementById(`edit-region-${index}`).value.trim(),
    comuna: document.getElementById(`edit-comuna-${index}`).value.trim(),
    tipoUsuario: document.getElementById(`edit-tipo-${index}`).value.trim(),
    contrasena: document.getElementById(`edit-contrasena-${index}`).value.trim()
  };

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios(); // recargar tabla
}
