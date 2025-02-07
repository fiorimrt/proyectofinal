document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnRecomendar').addEventListener('click', async function () {
        const marca = document.getElementById('marca').value.toLowerCase();
        const combustible = document.getElementById('combustible').value.toLowerCase();
        const transmision = document.getElementById('transmision').value.toLowerCase();
        const anio = parseInt(document.getElementById('anio').value);
        const cilindros = parseInt(document.getElementById('cilindros').value);
        const traccion = document.getElementById('traccion').value.toLowerCase();

        if (!marca && !combustible && !transmision && isNaN(anio) && isNaN(cilindros) && !traccion) {
            alert("Debe ingresar al menos un criterio para la búsqueda.");
            return;
        }

        try {
            const apiKey = "C0cMTWn3SfcyCRfWPwTbbA==vAMVqklGPX6ua9Jp";
            let url = "https://api.api-ninjas.com/v1/cars?";

            // parámetros de búsqueda

            const params = [];
            if (marca) params.push(`make=${encodeURIComponent(marca)}`);
            if (combustible) params.push(`fuel_type=${encodeURIComponent(combustible)}`);
            if (transmision) params.push(`transmission=${encodeURIComponent(transmision)}`);
            if (!isNaN(anio)) params.push(`year=${anio}`);
            if (!isNaN(cilindros)) params.push(`cylinders=${cilindros}`);
            if (traccion) params.push(`drivetrain=${encodeURIComponent(traccion)}`);


            url += params.join("&");

            console.log("URL de la API:", url);

            const response = await fetch(url, {
                headers: { "X-Api-Key": apiKey }
            });

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }

            const data = await response.json();

            console.log("Datos obtenidos de la API:", data);

            // DOM
            const resultadosDiv = document.getElementById('resultadosRecomendacion');
            resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

            // error
            if (data.length === 0) {
                resultadosDiv.innerHTML = '<p>No se encontraron coches que coincidan con tus criterios.</p>';
                return;
            }

            // mostrar los resultados
            data.forEach(coche => {
                const cocheDiv = document.createElement('div');
                cocheDiv.classList.add('card', 'mb-3');
                cocheDiv.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${coche.make} ${coche.model}</h5>
                        <p class="card-text">Año: ${coche.year}</p>
                        <p class="card-text">Combustible: ${coche.fuel_type}</p>
                        <p class="card-text">Transmisión: ${coche.transmission}</p>
                        <p class="card-text">Cilindros: ${coche.cylinders ?? 'No especificado'}</p>
                        <p class="card-text">Tracción: ${coche.drivetrain}</p>
                    </div>
                `;
                resultadosDiv.appendChild(cocheDiv);
            });

        } catch (error) {
            console.error("Error obteniendo datos de la API:", error);
            alert("Hubo un problema obteniendo los datos. Intenta nuevamente.");
        }
    });
});

// pagina de stock

const stockDeCoches = [
    { marca: 'Toyota', modelo: 'Corolla', edadMin: 30, edadMax: 50, precio: 20000, transmision: 'automatica', uso: 'ciudad', familiar: 'si', traccion: '4x2' },
    { marca: 'Peugeot', modelo: '208', edadMin: 18, edadMax: 30, precio: 15000, transmision: 'manual', uso: 'ciudad', familiar: 'no', traccion: '4x2' },
    { marca: 'Ford', modelo: 'Bronco', edadMin: 30, edadMax: 50, precio: 40000, transmision: 'automatica', uso: 'todo tipo', familiar: 'si', traccion: '4x4' },
    { marca: 'Kia', modelo: 'Carnival', edadMin: 30, edadMax: 50, precio: 50000, transmision: 'automatica', uso: 'ruta', familiar: 'si', traccion: '4x2' },
    { marca: 'BMW', modelo: '540i', edadMin: 30, edadMax: 50, precio: 60000, transmision: 'automatica', uso: 'ruta', familiar: 'si', traccion: '4x2' },
    { marca: 'Fiat', modelo: 'Cronos', edadMin: 18, edadMax: 35, precio: 15000, transmision: 'manual', uso: 'ciudad', familiar: 'si', traccion: '4x2' },
    { marca: 'Audi', modelo: 'S4', edadMin: 18, edadMax: 65, precio: 62000, transmision: 'automatica', uso: 'ciudad', familiar: 'no', traccion: '4x4' },
    { marca: 'Subaru', modelo: 'Impreza', edadMin: 50, edadMax: 100, precio: 20000, transmision: 'manual', uso: 'todo tipo', familiar: 'si', traccion: '4x4' },
    { marca: 'Volkswagen', modelo: 'Golf', edadMin: 18, edadMax: 30, precio: 35000, transmision: 'manual', uso: 'ruta', familiar: 'no', traccion: '4x2' }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnBuscar').addEventListener('click', function () {
        const buscar = document.getElementById('buscar').value.toLowerCase();

        const resultados = stockDeCoches.filter(coche =>
            coche.marca.toLowerCase().includes(buscar) ||
            coche.modelo.toLowerCase().includes(buscar) ||
            coche.transmision.toLowerCase().includes(buscar) ||
            coche.uso.toLowerCase().includes(buscar) ||
            coche.familiar.toLowerCase().includes(buscar) ||
            coche.traccion.toLowerCase().includes(buscar) ||
            coche.precio.toString().includes(buscar) ||
            coche.edadMin.toString().includes(buscar) ||
            coche.edadMax.toString().includes(buscar)
        );

        mostrarResultados(resultados);
    });
});

function mostrarResultados(coches) {
    const listaCoches = document.getElementById('listaCoches');
    listaCoches.innerHTML = '';

    if (coches.length === 0) {
        listaCoches.innerHTML = '<p>No se encontraron coches que coincidan con tus criterios.</p>';
        return;
    }

    const tabla = document.createElement('table');
    tabla.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Edad Mínima</th>
            <th>Edad Máxima</th>
            <th>Precio</th>
            <th>Transmisión</th>
            <th>Uso</th>
            <th>Familiar</th>
            <th>Tracción</th>
        </tr>
    `;
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    coches.forEach(coche => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${coche.marca}</td>
            <td>${coche.modelo}</td>
            <td>${coche.edadMin}</td>
            <td>${coche.edadMax}</td>
            <td>${coche.precio}</td>
            <td>${coche.transmision}</td>
            <td>${coche.uso}</td>
            <td>${coche.familiar}</td>
            <td>${coche.traccion}</td>
        `;
        tbody.appendChild(fila);
    });
    tabla.appendChild(tbody);

    listaCoches.appendChild(tabla);
}
