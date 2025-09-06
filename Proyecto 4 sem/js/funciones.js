//productos.html
function mostrarResumenCarrito() {
	const contenedor = document.getElementById('carrito-contenido');
	const totalDiv = document.getElementById('carrito-total');
	if (!contenedor) return;
	const carrito = obtenerCarrito();
	if (carrito.length === 0) {
		contenedor.innerHTML = '<p>El carrito está vacío.</p>';
		if (totalDiv) totalDiv.textContent = '';
		return;
	}
	let total = 0;
	contenedor.innerHTML = `
		<table style="width:100%; max-width:700px; margin:auto; background:#fff; border-radius:10px; box-shadow:0 2px 8px #0001;">
			<thead>
				<tr>
					<th>Producto</th>
					<th>Precio</th>
					<th>Cantidad</th>
					<th>Subtotal</th>
				</tr>
			</thead>
			<tbody>
				${carrito.map(item => {
					const subtotal = item.precio * item.cantidad;
					total += subtotal;
					return `<tr>
						<td><img src="${item.imagen}" alt="${item.nombre}" style="width:60px;vertical-align:middle;"> ${item.nombre}</td>
						<td>$${item.precio.toLocaleString('es-CL')}</td>
						<td>${item.cantidad}</td>
						<td>$${subtotal.toLocaleString('es-CL')}</td>
					</tr>`;
				}).join('')}
			</tbody>
		</table>
	`;
		if (totalDiv) totalDiv.textContent = `$${total.toLocaleString('es-CL')}`;
}

// Ejecutar solo en carrito.html
if (document.getElementById('carrito-contenido')) {
	document.addEventListener('DOMContentLoaded', mostrarResumenCarrito);
}
// Arreglo de productos
const productos = [
	{
		id: 1,
		nombre: "Copa de vino jinete",
		precio: 6500,
		imagen: "img/Productos/Copa vino .png"
	},
	{
		id: 2,
		nombre: "Vaso de whisky Escudo",
		precio: 5990,
		imagen: "img/Productos/Vaso whisky.png"
	},
	{
		id: 3,
		nombre: "Vaso shopero Escudo",
		precio: 5500,
		imagen: "img/Productos/Vaso shopero.png"
	},
	{
		id: 4,
		nombre: "Placa Escuadron caballos",
		precio: 6990,
		imagen: "img/Productos/Imagen 1.jpg"
	},
	{
		id: 5,
		nombre: "Placa Carabinero en bici",
		precio: 4500,
		imagen: "img/Productos/Imagen 2.jpg"
	},
	{
		id: 6,
		nombre: "Placa motorizados",
		precio: 7990,
		imagen: "img/Productos/Imagen 3.jpg"
	},
	{
		id: 7,
		nombre: "Placa Control",
		precio: 8990,
		imagen: "img/Productos/Imagen 4.jpg"
	},
	{
		id: 8,
		nombre: "Placa Patrulla",
		precio: 2990,
		imagen: "img/Productos/Imagen 5.jpg"
	}
];

// Renderizar productos dinámicamente
document.addEventListener('DOMContentLoaded', () => {
	const contenedor = document.querySelector('.lista-productos');
	if (contenedor) {
		contenedor.innerHTML = productos.map(prod => `
			<div class="producto" data-id="${prod.id}">
				<img src="${prod.imagen}" alt="${prod.nombre}">
				<h2>${prod.nombre}</h2>
				<p>$${prod.precio.toLocaleString('es-CL')}</p>
				<div class="agregar-carrito-cantidad">
				  <input type="number" min="1" value="1" class="input-cantidad" style="width:60px; margin-right:8px;">
				  <button class="btn-agregar-carrito">Agregar al carrito</button>
				</div>
			</div>
		`).join('');
	}
	agregarEventosCarrito();
});

// Carrito de compras
function obtenerCarrito() {
	return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id, cantidad) {
	const carrito = obtenerCarrito();
	const producto = productos.find(p => p.id === id);
	if (!producto) return;
	const existe = carrito.find(item => item.id === id);
	if (existe) {
		existe.cantidad += cantidad;
	} else {
		carrito.push({ ...producto, cantidad });
	}
	guardarCarrito(carrito);
	alert('Producto agregado al carrito');
}

function agregarEventosCarrito() {
	document.querySelectorAll('.producto').forEach(productoDiv => {
		const btn = productoDiv.querySelector('.btn-agregar-carrito');
		const input = productoDiv.querySelector('.input-cantidad');
		btn.addEventListener('click', e => {
			const id = parseInt(productoDiv.dataset.id);
			const cantidad = parseInt(input.value) || 1;
			agregarAlCarrito(id, cantidad);
		});
	});
}

// contacto.html
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

    // 📌 Guardar en LocalStorage
    const nuevoMensaje = { nombre, email, mensaje, fecha: new Date().toLocaleString() };

    // Revisar si ya hay mensajes guardados
    let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];
    mensajes.push(nuevoMensaje);

    // Guardar nuevamente
    localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

    alert("Mensaje guardado correctamente ✅");

    // Limpiar formulario
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensaje").value = "";
  });
});

