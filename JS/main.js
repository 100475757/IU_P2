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
            localStorage.setItem('currentUser', JSON.stringify(user));
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
    
    // Función para cargar los datos del usuario desde localStorage
    // Función para cargar los datos del usuario desde localStorage
    function cargarDatosUsuario() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            document.getElementById('profileName').value = currentUser.username || '';
            document.getElementById('profileEmail').value = currentUser.email || '';
            document.getElementById('profileCity').value = currentUser.city || '';
            document.getElementById('profileCountry').value = currentUser.country || '';
            document.getElementById('profileGender').value = currentUser.gender || 'male';
        }
    }

    // Abrir el pop-up de perfil
    document.getElementById('miPerfilLink').addEventListener('click', function() {
        cargarDatosUsuario();
        document.getElementById('modal-profile').showModal();
    });

    // Cerrar el pop-up de perfil
    document.getElementById('btn-close-profile').addEventListener('click', function() {
        document.getElementById('modal-profile').close();
    });

    // Manejar la edición del perfil
    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener el usuario actual
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            // Actualizar los datos del usuario actual
            const userData = {
                ...currentUser, // Mantiene otros datos previos
                username: document.getElementById('profileName').value,
                email: document.getElementById('profileEmail').value,
                city: document.getElementById('profileCity').value,
                country: document.getElementById('profileCountry').value,
                gender: document.getElementById('profileGender').value
            };

            // Actualizar la lista de usuarios en Local Storage
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.map(user => user.username === currentUser.username ? userData : user);

            // Guardar los cambios en Local Storage
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            alert('Perfil actualizado');
            document.getElementById('modal-profile').close();
        } else {
            alert('Error al actualizar el perfil del usuario.');
        }
    });
        // Cartas
    document.getElementById('misCartasLink').addEventListener('click', function() {
        const letterList = document.getElementById('misCartasContent');
        letterList.innerHTML = ''; // Limpiar la lista de cartas
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userData.letters && userData.letters.length > 0) {
                userData.letters.forEach((letter, index) => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('letter');
                    listItem.setAttribute('draggable', true);
                    listItem.setAttribute('data-index', index);
                    listItem.innerHTML = `
                        <p><strong>Nombre:</strong> ${letter.nombre}</p>
                        <p><strong>Email:</strong> ${letter.correo}</p>
                        <p><strong>Ciudad:</strong> ${letter.ciudad}</p>
                        <p><strong>País:</strong> ${letter.pais}</p>
                        <p><strong>Carta:</strong> ${letter.carta}</p>
                        <button onclick="deleteLetter(${index})">Borrar</button>
                    `;
                    letterList.appendChild(listItem);
                });
                enableDragAndDrop();
            } else {
                letterList.innerHTML = '<p>No hay cartas guardadas</p>';
            }
            document.getElementById('modal-mis-cartas').showModal();
        }
    });
    document.getElementById('btn-close-mis-cartas').addEventListener('click', function() {
        document.getElementById('modal-mis-cartas').close();
    });
    document.getElementById("logout").addEventListener("click", function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('currentUser');
            document.getElementById('btn-open-login').classList.remove('hidden');
            document.getElementById('btn-open-register').classList.remove('hidden');
            document.getElementById('user-profile').classList.add('hidden');
        }
    });

    window.deleteLetter = function(index) {
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            userData.letters.splice(index, 1);
            localStorage.setItem('currentUser', JSON.stringify(userData));

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.map(user => user.username === userData.username ? userData : user);
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById('misCartasLink').click();
        }
    }

    // Manejar el envío de la carta
    document.getElementById('sendLetter').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const ciudad = document.getElementById('ciudad').value;
        const pais = document.getElementById('pais').value;
        const carta = document.getElementById('carta').value;

        const storedUserData = localStorage.getItem('currentUser');
        if (!storedUserData) {
            alert('Debes iniciar sesión para enviar una carta.');
            return;
        }

        const userData = JSON.parse(storedUserData);
        if (userData.email !== correo) {
            alert('El correo electrónico debe ser el mismo que utilizaste para registrarte.');
            return;
        }

        const newLetter = {
            nombre: nombre,
            correo: correo,
            ciudad: ciudad,
            pais: pais,
            carta: carta
        };

        if (!userData.letters) {
            userData.letters = [];
        }
        userData.letters.push(newLetter);

        localStorage.setItem('currentUser', JSON.stringify(userData));
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.map(user => user.username === userData.username ? userData : user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Carta enviada');
        document.getElementById('sendLetter').reset();
    });

    // Función para habilitar drag and drop
    function enableDragAndDrop() {
        const letters = document.querySelectorAll('.letter');
        let dragSrcEl = null;

        function handleDragStart(event) {
            dragSrcEl = this;
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/html', this.innerHTML);
            this.classList.add('dragging');
        }

        function handleDragOver(event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.dataTransfer.dropEffect = 'move';
            return false;
        }

        function handleDrop(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (dragSrcEl !== this) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = event.dataTransfer.getData('text/html');
                updateLettersOrder();
            }
            return false;
        }

        function handleDragEnd() {
            letters.forEach(letter => {
                letter.classList.remove('dragging');
            });
        }

        letters.forEach(letter => {
            letter.addEventListener('dragstart', handleDragStart, false);
            letter.addEventListener('dragover', handleDragOver, false);
            letter.addEventListener('drop', handleDrop, false);
            letter.addEventListener('dragend', handleDragEnd, false);
        });
    }

    function updateLettersOrder() {
        const lettersList = document.getElementById('misCartasContent');
        const letters = lettersList.querySelectorAll('.letter');
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            userData.letters = Array.from(letters).map(letter => {
                const index = letter.getAttribute('data-index');
                return userData.letters[index];
            });
            localStorage.setItem('currentUser', JSON.stringify(userData));

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.map(user => user.username === userData.username ? userData : user);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    document.addEventListener('DOMContentLoaded', function() {
        // Lógica para manejar los clics en los botones del menú de juegos
    const gameButtons = {
        btnClickTheCircle: loadClickTheCircleGame,
        btnJuego2: () => loadGameImage('Images/christmas-crush.jpeg'),
        btnJuego3: () => loadGameImage('Images/memory-de-navidad.jpg')
    };
    
    Object.keys(gameButtons).forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', gameButtons[buttonId]);
    });
    
    function loadClickTheCircleGame() {
        const contenido = document.getElementById('contenido');
        setContenidoStyle(contenido, 'black', 'none');
        contenido.innerHTML = `
            <div id="Info">
                <p>Puntos: <span id="score">0</span></p>
                <p>Tiempo restante: <span id="time">90</span> segundos</p>
            </div>
            <div id="tablero">
                <div id="circle"></div>
            </div>
        `;
    
        let score = 0;
        let timeLeft = 90;
        const circle = document.getElementById('circle');
        const scoreDisplay = document.getElementById('score');
        const timeDisplay = document.getElementById('time');
        const tablero = document.getElementById('tablero');
    
        const moveCircle = () => {
            const x = Math.floor(Math.random() * (tablero.clientWidth - circle.clientWidth));
            const y = Math.floor(Math.random() * (tablero.clientHeight - circle.clientHeight));
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
        };
    
        circle.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            moveCircle();
        });
    
        const gameInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                alert(`Juego terminado. Puntos obtenidos: ${score}`);
                restoreBackground();
            }
        }, 1000);
    
        moveCircle(); // Mover el círculo inicialmente
    }
    
    function loadGameImage(imageSrc) {
        restoreBackground();
        document.getElementById('contenido').innerHTML = `<img src="${imageSrc}" alt="Juego" style="width: 100%;">`;
    }
    
    function setContenidoStyle(element, color, image) {
        element.style.backgroundColor = color;
        element.style.backgroundImage = image;
    }
    
    function restoreBackground() {
        const contenido = document.getElementById('contenido');
        contenido.innerHTML = ''; // Limpiar el contenido del juego
    }
});
});
   