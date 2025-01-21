document.addEventListener('DOMContentLoaded', function () {
    // Datos de coches JSON
    const cochesJSON = `[
        {"marca": "Toyota", "modelo": "Corolla", "edadMin": 30, "edadMax": 50, "precio": 20000, "transmision": "automatica", "uso": "ciudad", "familiar": "si", "traccion": "4x2", "cantidad": 10},
        {"marca": "Peugeot", "modelo": "208", "edadMin": 18, "edadMax": 30, "precio": 15000, "transmision": "manual", "uso": "ciudad", "familiar": "no", "traccion": "4x2", "cantidad": 15},
        {"marca": "Ford", "modelo": "Bronco", "edadMin": 30, "edadMax": 50, "precio": 40000, "transmision": "automatica", "uso": "todo tipo", "familiar": "si", "traccion": "4x4", "cantidad": 5},
        {"marca": "Kia", "modelo": "Carnival", "edadMin": 30, "edadMax": 50, "precio": 50000, "transmision": "automatica", "uso": "ruta", "familiar": "si", "traccion": "4x2", "cantidad": 8},
        {"marca": "BMW", "modelo": "540i", "edadMin": 30, "edadMax": 50, "precio": 60000, "transmision": "automatica", "uso": "ruta", "familiar": "si", "traccion": "4x2", "cantidad": 4},
        {"marca": "Fiat", "modelo": "Cronos", "edadMin": 18, "edadMax": 35, "precio": 15000, "transmision": "manual", "uso": "ciudad", "familiar": "si", "traccion": "4x2", "cantidad": 12},
        {"marca": "Audi", "modelo": "S4", "edadMin": 18, "edadMax": 65, "precio": 62000, "transmision": "automatica", "uso": "ciudad", "familiar": "no", "traccion": "4x4", "cantidad": 6},
        {"marca": "Subaru", "modelo": "Impreza", "edadMin": 50, "edadMax": 100, "precio": 20000, "transmision": "manual", "uso": "todo tipo", "familiar": "si", "traccion": "4x4", "cantidad": 7},
        {"marca": "Volkswagen", "modelo": "Golf", "edadMin": 18, "edadMax": 30, "precio": 35000, "transmision": "manual", "uso": "ruta", "familiar": "no", "traccion": "4x2", "cantidad": 10}
    ]`;

    // Guardar datos en localStorage 
    if (!localStorage.getItem('coches')) {
        localStorage.setItem('coches', cochesJSON);
    }

    // Recuperar datos de localStorage
    const coches = JSON.parse(localStorage.getItem('coches'));

    // Función para mostrar coches en el DOM
    function mostrarCoches(coches) {
        const listaCochesDiv = document.getElementById('listaCoches');
        listaCochesDiv.innerHTML = ''; // Limpiar lista anterior

        coches.forEach((coche, index) => {
            const cocheDiv = document.createElement('div');
            cocheDiv.classList.add('card', 'mb-3');
            cocheDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${coche.marca} ${coche.modelo}</h5>
                    <p class="card-text">Precio: $${coche.precio}</p>
                    <p class="card-text">Transmisión: ${coche.transmision}</p>
                    <p class="card-text">Uso: ${coche.uso}</p>
                    <p class="card-text">Familiar: ${coche.familiar}</p>
                    <p class="card-text">Tracción: ${coche.traccion}</p>
                    <p class="card-text">Cantidad en depósito: <span id="cantidad-${index}">${coche.cantidad}</span></p>
                    <button class="btn btn-primary" onclick="incrementarCantidad(${index})">Agregar Stock</button>
                </div>
            `;
            listaCochesDiv.appendChild(cocheDiv);
        });
    }

    // Función para incrementar la cantidad de coches y actualizar localStorage
    function incrementarCantidad(index) {
        coches[index].cantidad++;
        localStorage.setItem('coches', JSON.stringify(coches));
        document.getElementById(`cantidad-${index}`).textContent = coches[index].cantidad;
    }

    // Hacer que la función incrementarCantidad sea global
    window.incrementarCantidad = incrementarCantidad;

    // Mostrar todos los coches al cargar la página
    mostrarCoches(coches);

    // Filtrar coches según el criterio de búsqueda
    document.getElementById('buscar').addEventListener('input', function (event) {
        const textoBusqueda = event.target.value.toLowerCase();
        const cochesFiltrados = coches.filter(coche => {
            return coche.marca.toLowerCase().includes(textoBusqueda) || coche.modelo.toLowerCase().includes(textoBusqueda);
        });
        mostrarCoches(cochesFiltrados);
    });
});
