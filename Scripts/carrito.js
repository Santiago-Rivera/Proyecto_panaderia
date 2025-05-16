 // Productos disponibles (de productos.html)
        const productos = [
            { nombre: "Pan Integral", precio: 1.00 },
            { nombre: "Pastel de Chocolate", precio: 1.50 },
            { nombre: "Empanadas de Queso", precio: 0.80 },
            { nombre: "Croissant", precio: 1.20 },
            { nombre: "Pan de Yuca", precio: 0.90 },
            { nombre: "Torta de Zanahoria", precio: 1.30 },
            { nombre: "Pan de Bono", precio: 1.00 },
            { nombre: "Galletas Artesanales", precio: 0.60 }
        ];

        // Simulación de carrito usando localStorage
        function obtenerCarrito() {
            return JSON.parse(localStorage.getItem('carrito')) || [];
        }

        function guardarCarrito(carrito) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }

        function renderCarrito() {
            const carrito = obtenerCarrito();
            const tbody = document.getElementById('carrito-body');
            tbody.innerHTML = '';
            let total = 0;

            if (carrito.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5">El carrito está vacío.</td></tr>`;
            } else {
                carrito.forEach(item => {
                    const producto = productos.find(p => p.nombre === item.nombre);
                    const precio = producto ? producto.precio : 0;
                    const subtotal = precio * item.cantidad;
                    total += subtotal;
                    tbody.innerHTML += `
                        <tr>
                            <td>${item.nombre}</td>
                            <td>$${precio.toFixed(2)}</td>
                            <td>
                                <button class="cantidad-btn" onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
                                ${item.cantidad}
                                <button class="cantidad-btn" onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
                            </td>
                            <td>$${subtotal.toFixed(2)}</td>
                            <td>
                                <button class="eliminar-btn" onclick="eliminarItem('${item.nombre}')">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
            }
            document.getElementById('carrito-total').textContent = "Total: $" + total.toFixed(2);
        }

        function cambiarCantidad(nombre, cambio) {
            let carrito = obtenerCarrito();
            const idx = carrito.findIndex(item => item.nombre === nombre);
            if (idx > -1) {
                carrito[idx].cantidad += cambio;
                if (carrito[idx].cantidad <= 0) {
                    carrito.splice(idx, 1);
                }
                guardarCarrito(carrito);
                renderCarrito();
            }
        }

        function eliminarItem(nombre) {
            let carrito = obtenerCarrito();
            carrito = carrito.filter(item => item.nombre !== nombre);
            guardarCarrito(carrito);
            renderCarrito();
        }

        function vaciarCarrito() {
            localStorage.removeItem('carrito');
            renderCarrito();
        }

        // Inicializar
        renderCarrito();