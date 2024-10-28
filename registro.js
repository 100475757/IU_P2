// Registro de usario

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-open-register').addEventListener('click', function() {
        document.getElementById('modal-register').showModal();
    });
    document.getElementById('btn-close-register').addEventListener('click', function() {
        document.getElementById('modal-register').close();
    });
});