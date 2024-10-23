// Función para calcular el tiempo restante hasta el 24 de diciembre a las 23:59
function calcularTiempoRestante() {
    const ahora = new Date();
    const añoActual = ahora.getFullYear();
    const fechaObjetivo = new Date(añoActual, 11, 24, 23, 59, 0); // Mes 11 es diciembre (0-indexado)

    // Si la fecha objetivo ya pasó este año, usar el próximo año
    if (ahora > fechaObjetivo) {
        fechaObjetivo.setFullYear(añoActual + 1);
    }

    const diferencia = fechaObjetivo - ahora;

    const segundosTotales = Math.floor(diferencia / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const díasTotales = Math.floor(horasTotales / 24);

    const segundos = segundosTotales % 60;
    const minutos = minutosTotales % 60;
    const horas = horasTotales % 24;
    const días = díasTotales;

    // Actualizar el HTML con los valores calculados
    document.getElementById('dias').textContent = días;
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;
}

// Actualizar el contador cada segundo
setInterval(calcularTiempoRestante, 1000);

// Llamar a la función una vez para inicializar el contador inmediatamente
calcularTiempoRestante();