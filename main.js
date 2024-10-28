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


// Registro de usuarios

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-open-register').addEventListener('click', function() {
        document.getElementById('modal-register').showModal();
    });
    document.getElementById('btn-close-register').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres cerrar la ventana?')) {
            document.getElementById('modal-register').close();
        }
    });

    document.getElementById('register-form').addEventListener('reset', function(event) {
        if (!confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
            event.preventDefault();
        }
    });

    document.getElementById('children').addEventListener('input', function() {
        const childrenCount = parseInt(this.value, 10);
        const childrenDetails = document.getElementById('children-details');
        childrenDetails.innerHTML = '';

        for (let i = 0; i < childrenCount; i++) {
            const childDiv = document.createElement('div');
            childDiv.classList.add('form-group-reg');
            childDiv.innerHTML = `
                <label for="child-name-${i}">Nombre del hijo/hija ${i + 1} *</label>
                <input type="text" id="child-name-${i}" name="child-name-${i}" required minlength="3" placeholder="Introduce el nombre del hijo/hija ${i + 1}">
                <label for="child-age-${i}">Edad del hijo/hija ${i + 1} *</label>
                <input type="number" id="child-age-${i}" name="child-age-${i}" required min="0" placeholder="Introduce la edad del hijo/hija ${i + 1}">
                <label for="child-toys-${i}">Juguetes favoritos del hijo/hija ${i + 1}</label>
                <input type="text" id="child-toys-${i}" name="child-toys-${i}" placeholder="Introduce los juguetes favoritos del hijo/hija ${i + 1}">
            `;
            childrenDetails.appendChild(childDiv);
        }
    });

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const email = document.getElementById('email').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const gender = document.getElementById('gender').value;
        const children = parseInt(document.getElementById('children').value, 10);

        // Validar contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener al menos 12 caracteres, con mínimo 2 números, 1 carácter especial, 1 letra mayúscula y 1 letra minúscula.');
            return;
        }

        // Validar confirmación de contraseña
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Validar correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('El correo electrónico no es válido.');
            return;
        }

        const user = {
            username: username,
            password: password,
            email: email,
            city: city,
            country: country,
            gender: gender,
            children: []
        };

        for (let i = 0; i < children; i++) {
            const childName = document.getElementById(`child-name-${i}`).value;
            const childAge = document.getElementById(`child-age-${i}`).value;
            const childToys = document.getElementById(`child-toys-${i}`).value;

            user.children.push({
                name: childName,
                age: childAge,
                toys: childToys
            });
        }

        localStorage.setItem(username, JSON.stringify(user));
        alert('Usuario registrado con éxito');
        document.getElementById('modal-register').close();
    });
});
