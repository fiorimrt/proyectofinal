document.getElementById('btnRecomendar').addEventListener('click', function () {

    const presupuesto = parseInt(document.getElementById('presupuesto').value);
    const edad = parseInt(document.getElementById('edad').value);
    const usoCoche = document.getElementById('usoCoche').value;
    const autoFamiliar = document.getElementById('autoFamiliar').value;
    const transmision = document.getElementById('transmision').value;
    const traccion = document.getElementById('traccion').value;


    if (isNaN(presupuesto) || isNaN(edad) || !usoCoche || !autoFamiliar || !transmision || !traccion) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }


    const coches = [
        {
            marca: 'Toyota',
            modelo: 'Corolla',
            edadMin: 30,
            edadMax: 50,
            precio: 20000,
            transmision: 'automatica',
            uso: 'ciudad',
            familiar: 'si',
            traccion: '4x2'
        },
        {
            marca: 'Peugeot',
            modelo: '208',
            edadMin: 18,
            edadMax: 30,
            precio: 15000,
            transmision: 'manual',
            uso: 'ciudad',
            familiar: 'no',
            traccion: '4x2'
        },
        {
            marca: 'Ford',
            modelo: 'Bronco',
            edadMin: 30,
            edadMax: 50,
            precio: 40000,
            transmision: 'automatica',
            uso: 'todo tipo',
            familiar: 'si',
            traccion: '4x4'
        },
        {
            marca: 'Kia',
            modelo: 'Carnival',
            edadMin: 30,
            edadMax: 50,
            precio: 50000,
            transmision: 'automatica',
            uso: 'ruta',
            familiar: 'si',
            traccion: '4x2'
        },
        {
            marca: 'BMW',
            modelo: '540i',
            edadMin: 30,
            edadMax: 50,
            precio: 60000,
            transmision: 'automatica',
            uso: 'ruta',
            familiar: 'si',
            traccion: '4x2'
        },
        {
            marca: 'Fiat',
            modelo: 'Cronos',
            edadMin: 18,
            edadMax: 35,
            precio: 15000,
            transmision: 'manual',
            uso: 'ciudad',
            familiar: 'si',
            traccion: '4x2'
        },
        {
            marca: 'Audi',
            modelo: 'S4',
            edadMin: 18,
            edadMax: 65,
            precio: 62000,
            transmision: 'automatica',
            uso: 'ciudad',
            familiar: 'no',
            traccion: '4x4'
        },
        {
            marca: 'Subaru',
            modelo: 'Impreza',
            edadMin: 50,
            edadMax: 100,
            precio: 20000,
            transmision: 'manual',
            uso: 'todo tipo',
            familiar: 'si',
            traccion: '4x4'
        },
        {
            marca: 'Volkswagen',
            modelo: 'Golf',
            edadMin: 18,
            edadMax: 30,
            precio: 35000,
            transmision: 'manual',
            uso: 'ruta',
            familiar: 'no',
            traccion: '4x2'
        }
    ];

    // Logica 
    let recomendaciones = coches.filter(coche => {
        return coche.precio <= presupuesto &&
            edad >= coche.edadMin && edad <= coche.edadMax &&
            (coche.uso === usoCoche || coche.uso === 'todo tipo') &&
            coche.familiar === autoFamiliar &&
            coche.transmision === transmision &&
            coche.traccion === traccion;
    });

    //  DOM
    const resultadosDiv = document.getElementById('resultadosRecomendacion');
    resultadosDiv.innerHTML = '';

    if (recomendaciones.length > 0) {
        recomendaciones.forEach(coche => {
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
                </div>
            `;
            resultadosDiv.appendChild(cocheDiv);
        });
    } else {
        resultadosDiv.innerHTML = '<p>No se encontraron coches que coincidan con tus criterios.</p>';
    }
});
