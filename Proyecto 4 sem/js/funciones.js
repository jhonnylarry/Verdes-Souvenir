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
				<button class="btn-agregar-carrito">Agregar al carrito</button>
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

function agregarAlCarrito(id) {
	const carrito = obtenerCarrito();
	const producto = productos.find(p => p.id === id);
	if (!producto) return;
	const existe = carrito.find(item => item.id === id);
	if (existe) {
		existe.cantidad += 1;
	} else {
		carrito.push({ ...producto, cantidad: 1 });
	}
	guardarCarrito(carrito);
	alert('Producto agregado al carrito');
}

function agregarEventosCarrito() {
	document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
		btn.addEventListener('click', e => {
			const id = parseInt(btn.closest('.producto').dataset.id);
			agregarAlCarrito(id);
		});
	});
}
