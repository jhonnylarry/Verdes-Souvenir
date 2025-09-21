// Mostrar resumen del carrito en carrito.html


function mostrarResumenCarrito() {
  const contenedor = document.getElementById('carrito-contenido');
  const totalDiv = document.getElementById('carrito-total');
  if (!contenedor) return;
  let carrito = obtenerCarrito();
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p style="text-align:center; font-size:1.1rem; margin:40px 0;">El carrito está vacío.</p>';
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
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				${carrito.map(item => {
					const subtotal = item.precio * item.cantidad;
					total += subtotal;
					// Si la imagen no contiene una ruta, prepende la ruta de productos
					let imgSrc = item.imagen || '';
					if (imgSrc && !imgSrc.includes('/')) {
						imgSrc = '../../img/Productos/' + imgSrc;
					}
					return `<tr data-codigo="${item.codigo}">
						<td><img src="${imgSrc}" alt="${item.nombre}" style="width:60px;vertical-align:middle;"> ${item.nombre}</td>
						<td>$${item.precio.toLocaleString('es-CL')}</td>
						<td><input type="number" min="1" value="${item.cantidad}" class="input-cantidad-carrito" style="width:60px;"></td>
						<td>$${subtotal.toLocaleString('es-CL')}</td>
						<td><button class="btn-eliminar-carrito">Eliminar</button></td>
					</tr>`;
				}).join('')}
			</tbody>
		</table>
		<div style="margin-top:30px; text-align:center;">
			<button id="btn-proceder-pago" style="padding:12px 28px; background:#0077cc; color:#fff; border:none; border-radius:8px; font-size:1.1rem; cursor:pointer;">Proceder al pago</button>
		</div>
	`;
  if (totalDiv) totalDiv.textContent = `$${total.toLocaleString('es-CL')}`;

  // Eventos para eliminar y modificar cantidad
  document.querySelectorAll('.btn-eliminar-carrito').forEach(btn => {
    btn.addEventListener('click', e => {
      const tr = btn.closest('tr');
      const codigo = tr.dataset.codigo;
      eliminarDelCarrito(codigo);
    });
  });
  document.querySelectorAll('.input-cantidad-carrito').forEach(input => {
    input.addEventListener('change', e => {
      const tr = input.closest('tr');
      const codigo = tr.dataset.codigo;
      let cantidad = parseInt(input.value);
      if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
      modificarCantidadCarrito(codigo, cantidad);
    });
  });
  // Botón para proceder al pago
  const btnPago = document.getElementById('btn-proceder-pago');
  if (btnPago) {
    btnPago.addEventListener('click', () => {
      window.location.href = 'pago.html';
    });
  }
}

function eliminarDelCarrito(codigo) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.codigo !== codigo);
  guardarCarrito(carrito);
  mostrarResumenCarrito();
}

function modificarCantidadCarrito(codigo, cantidad) {
  let carrito = obtenerCarrito();
  const item = carrito.find(p => p.codigo === codigo);
  if (item) {
    item.cantidad = cantidad;
    guardarCarrito(carrito);
    mostrarResumenCarrito();
  }
}

// Ejecutar solo en carrito.html
if (document.getElementById('carrito-contenido')) {
	document.addEventListener('DOMContentLoaded', mostrarResumenCarrito);
}
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
