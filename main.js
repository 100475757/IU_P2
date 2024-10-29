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

// Modal register
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-open-register').addEventListener('click', function() {
        registerForm.reset();
        document.getElementById('childrenDetails').innerHTML = '';
        document.getElementById('modal-register').showModal();
    });
    document.getElementById('clearFields').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas limpiar todos los campos?')) {
            document.getElementById('registerForm').reset();
            document.getElementById('childrenDetails').innerHTML = '';
        }
    });
    document.getElementById('btn-close-register').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cancelar el registro?')) {
            document.getElementById('modal-register').close();
            document.getElementById('registerForm').reset();
            document.getElementById('childrenDetails').innerHTML = '';
        }
    });

    // Generación dinámica de campos de hijos
    const childrenInput = document.getElementById("children");
    const childrenDetails = document.getElementById("childrenDetails");

    childrenInput.addEventListener("input", function() {
        const numChildren = parseInt(childrenInput.value);
        childrenDetails.innerHTML = ""; // Limpiar campos previos

        if (numChildren > 0) {
            for (let i = 1; i <= numChildren; i++) {
                const childDiv = document.createElement("div");
                childDiv.classList.add("child-info");

                const nameLabel = document.createElement("label");
                nameLabel.textContent = `Nombre del hijo/hija ${i}`;
                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.id = `childName${i}`;
                nameInput.name = `childName${i}`;
                nameInput.minLength = 3;
                nameInput.required = true;

                const ageLabel = document.createElement("label");
                ageLabel.textContent = `Edad del hijo/hija ${i}`;
                const ageInput = document.createElement("input");
                ageInput.type = "number";
                ageInput.id = `childAge${i}`;
                ageInput.name = `childAge${i}`;
                ageInput.min = 1;
                ageInput.required = true;

                const toysLabel = document.createElement("label");
                toysLabel.textContent = `Juguetes favoritos del hijo/hija ${i}`;
                const toysInput = document.createElement("input");
                toysInput.type = "text";
                toysInput.id = `childToys${i}`;
                toysInput.name = `childToys${i}`;
                toysInput.required = true;

                childDiv.appendChild(nameLabel);
                childDiv.appendChild(nameInput);
                childDiv.appendChild(ageLabel);
                childDiv.appendChild(ageInput);
                childDiv.appendChild(toysLabel);
                childDiv.appendChild(toysInput);

                childrenDetails.appendChild(childDiv);
            }
        }
    });

    // Registro y validación
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const city = document.getElementById('city-registro').value;
        const country = document.getElementById('country-registro').value;
        const gender = document.getElementById('gender-registro').value;
        const childrenCount = parseInt(document.getElementById('children').value, 10);

        // Validar nombre de usuario
        if (username.length < 3) {
            alert('El nombre de usuario debe tener al menos 3 caracteres.');
            return;
        }

        // Validar contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*\W)(?=.{12,})/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener 12 caracteres de longitud, con mínimo 2 números, 1 carácter especial, 1 letra mayúscula y 1 letra minúscula.');
            return;
        }

        // Validar confirmación de contraseña
        const confirmPassword = document.getElementById('confirmPassword').value;
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

        // Validar ciudad
        if (city.length < 3) {
            alert('La ciudad debe tener al menos 3 caracteres.');
            return;
        }

        // Validar país
        if (country.length < 3) {
            alert('El país debe tener al menos 3 caracteres.');
            return;
        }

        // Validar detalles de hijos
        for (let i = 1; i <= childrenCount; i++) {
            const childName = document.getElementById(`childName${i}`).value;
            const childAge = document.getElementById(`childAge${i}`).value;
            const childToys = document.getElementById(`childToys${i}`).value;

            if (childName.length < 3) {
                alert(`El nombre del hijo/hija ${i} debe tener al menos 3 caracteres.`);
                return;
            }

            if (childAge <= 0) {
                alert(`La edad del hijo/hija ${i} debe ser un número positivo.`);
                return;
            }

            if (childToys.length < 3) {
                alert(`Los juguetes favoritos del hijo/hija ${i} deben tener al menos 3 caracteres.`);
                return;
            }
        }

        // Obtener usuarios almacenados en Local Storage o inicializar un array vacío
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Crear objeto del nuevo usuario
        const userData = {
            username,
            password,
            email,
            city,
            country,
            gender,
            children: []
        };

        for (let i = 1; i <= childrenCount; i++) {
            userData.children.push({
                name: document.getElementById(`childName${i}`).value,
                age: document.getElementById(`childAge${i}`).value,
                toys: document.getElementById(`childToys${i}`).value
            });
        }

        // Añadir nuevo usuario al array de usuarios
        users.push(userData);

        // Guardar el array de usuarios actualizado en Local Storage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso');
        document.getElementById('modal-register').close();
    });
});

// Modal Login
    
document.addEventListener('DOMContentLoaded', function() {
    // Botón para abrir el formulario de inicio de sesión
    document.getElementById('btn-open-login').addEventListener('click', function() {
        document.getElementById('loginForm').reset();
        document.getElementById('modal-login').showModal();
    });

    // Botón para cerrar el formulario de inicio de sesión
    document.getElementById('btn-close-login').addEventListener('click', function() {
        document.getElementById('modal-login').close();
    });

    // Enviar formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const loginUsername = document.getElementById('login-username').value;
        const loginPassword = document.getElementById('login-password').value;

        // Obtener los usuarios almacenados en Local Storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

        if (user) {
            alert('Inicio de sesión exitoso');
            document.getElementById('modal-login').close();
            document.getElementById('btn-open-login').classList.add('hidden');
            document.getElementById('btn-open-register').classList.add('hidden');
            document.getElementById('user-profile').classList.remove('hidden');
            
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
    // Mostrar u ocultar el menú desplegable del perfil
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");

    profileIcon.addEventListener("click", (event) => {
        event.stopPropagation(); // Evitar que el clic en el ícono cierre el menú
        profileMenu.classList.toggle("hidden");
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.add("hidden");
        }
    });
});
    //Juega
document.addEventListener('DOMContentLoaded', function() {
    // Lógica para manejar los clics en los botones del menú de juegos
    document.getElementById('btnClickTheCircle').addEventListener('click', function() {
        loadClickTheCircleGame();
    });

    document.getElementById('btnJuego2').addEventListener('click', function() {
        loadGameImage('Images/christmas-crush.jpeg');
    });

    document.getElementById('btnJuego3').addEventListener('click', function() {
        loadGameImage('Images/memory-de-navidad.jpg');
    });

    function loadClickTheCircleGame() {
        const gameContent = document.getElementById('gameContent');
        gameContent.style.backgroundImage = 'none'; // Eliminar la imagen de fondo
        gameContent.style.backgroundColor = 'whitesmoke'; // Establecer un color de fondo
        gameContent.innerHTML = `
            <div id="gameBoard">
                <div id="circle"></div>
            </div>
            <div id="gameInfo">
            <p>Puntos: <span id="score">0</span></p>
            <p>Tiempo restante: <span id="time">90</span> segundos</p>
            </div>
        `;

        let score = 0;
        let timeLeft = 90;
        const circle = document.getElementById('circle');
        const scoreDisplay = document.getElementById('score');
        const timeDisplay = document.getElementById('time');
        const gameBoard = document.getElementById('gameBoard');

        function moveCircle() {
            const x = Math.floor(Math.random() * (gameBoard.clientWidth - circle.clientWidth));
            const y = Math.floor(Math.random() * (gameBoard.clientHeight - circle.clientHeight));
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
        }

        circle.addEventListener('click', function() {
            score++;
            scoreDisplay.textContent = score;
            moveCircle();
        });

        const gameInterval = setInterval(function() {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                alert(`Juego terminado. Puntos obtenidos: ${score}`);
                gameContent.innerHTML = ''; // Limpiar el contenido del juego
            }
        }, 1000);

        function restoreBackground() {
            const gameContent = document.getElementById('gameContent');
            //gameContent.style.backgroundImage = 'url("../imagenes/gift-fondo-juego.gif")'; // Restaurar la imagen de fondo
            gameContent.style.backgroundColor = ''; // Restaurar el color de fondo
            gameContent.innerHTML = ''; // Limpiar el contenido del juego
        }

        moveCircle(); // Mover el círculo inicialmente
    }

    function loadGameImage(imageSrc) {
        restoreBackground();
        const gameContent = document.getElementById('gameContent');
        gameContent.innerHTML = `<img src="${imageSrc}" alt="Juego" style="width: 100%;">`;
    }

    function restoreBackground() {
        const gameContent = document.getElementById('gameContent');
        //gameContent.style.backgroundImage = 'url("../imagenes/gift-fondo-juego.gif")'; // Restaurar la imagen de fondo
        gameContent.style.backgroundColor = ''; // Restaurar el color de fondo
        gameContent.innerHTML = ''; // Limpiar el contenido del juego
    }
});




 