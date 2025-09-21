// funcionesProductos.js
// Lógica para crear productos y almacenarlos en localStorage

// Guardar producto en localStorage (nuevo o edición)
function guardarProducto(producto, esEdicion = false) {
  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  if (esEdicion) {
    const idx = productos.findIndex(p => p.codigo === producto.codigo);
    if (idx !== -1) {
      productos[idx] = producto;
    }
  } else {
    productos.push(producto);
  }
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Obtener todos los productos
function obtenerProductos() {
  return JSON.parse(localStorage.getItem('productos')) || [];
}

// Evento para el formulario de nuevo producto
if (document.getElementById('form-nuevo-producto')) {
  document.getElementById('form-nuevo-producto').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigo = document.getElementById('codigo').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    const stockCritico = document.getElementById('stockCritico').value ? parseInt(document.getElementById('stockCritico').value) : null;
    const categoria = document.getElementById('categoria').value;
    let imagen = null;
    const inputImg = document.getElementById('imagen');
    if (inputImg && inputImg.files && inputImg.files[0]) {
      // Guardar solo el nombre del archivo (no el archivo en sí)
      imagen = inputImg.files[0].name;
    }
    // Validación básica extra
    if (!codigo || codigo.length < 3 || !nombre || nombre.length > 100 || isNaN(precio) || precio < 0 || isNaN(stock) || stock < 0 || !categoria) {
      alert('Por favor, completa correctamente los campos obligatorios.');
      return;
    }
    const producto = {
      codigo,
      nombre,
      descripcion,
      precio,
      stock,
      stockCritico,
      categoria,
      imagen
    };
    guardarProducto(producto, false);
    alert('Producto creado exitosamente.');
    this.reset();
  });
}

// Evento para el formulario de edición de producto
if (document.getElementById('form-editar-producto')) {
  document.getElementById('form-editar-producto').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigo = document.getElementById('codigo').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    const stockCritico = document.getElementById('stockCritico').value ? parseInt(document.getElementById('stockCritico').value) : null;
    const categoria = document.getElementById('categoria').value;
    let imagen = null;
    const inputImg = document.getElementById('imagen');
    if (inputImg && inputImg.files && inputImg.files[0]) {
      imagen = inputImg.files[0].name;
    } else {
      // Mantener imagen actual si no se sube nueva
      const productos = obtenerProductos();
      const prod = productos.find(p => p.codigo === codigo);
      if (prod && prod.imagen) imagen = prod.imagen;
    }
    if (!codigo || codigo.length < 3 || !nombre || nombre.length > 100 || isNaN(precio) || precio < 0 || isNaN(stock) || stock < 0 || !categoria) {
      alert('Por favor, completa correctamente los campos obligatorios.');
      return;
    }
    const producto = {
      codigo,
      nombre,
      descripcion,
      precio,
      stock,
      stockCritico,
      categoria,
      imagen
    };
    guardarProducto(producto, true);
    alert('Producto actualizado exitosamente.');
    window.location.href = 'mostrar-producto.html';
  });
}
