// Función para calcular el tiempo restante hasta el 24 de diciembre a las 23:59

function calcularTiempoRestante() {
    const ahora = new Date();
    const añoActual = ahora.getFullYear();
    const fechaObjetivo = new Date(añoActual, 11, 24, 23, 59, 0); // Mes 11 es diciembre (0-indexado)
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        document.getElementById('contador').innerHTML = '🎅 ¡Feliz Navidad! 🎅';
        clearInterval(interval); 
    }

    // Calcular los días, horas, minutos y segundos
    const segundosTotales = Math.floor(diferencia / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const díasTotales = Math.floor(horasTotales / 24);

    const segundos = segundosTotales % 60;
    const minutos = minutosTotales % 60;
    const horas = horasTotales % 24;
    const días = díasTotales;

    document.getElementById('dias').innerHTML = días;
    document.getElementById('horas').innerHTML = horas;
    document.getElementById('minutos').innerHTML= minutos;
    document.getElementById('segundos').innerHTML= segundos;
}

const interval = setInterval(calcularTiempoRestante, 1000);
calcularTiempoRestante();