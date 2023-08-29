function showModalAndRedirect(isSuccess) {
    const modalId = isSuccess ? 'successModal' : 'errorModal';
    const modal = document.getElementById(modalId);

    modal.style.display = 'block';

    setTimeout(function () {
        modal.style.display = 'none';
        window.location.href = '/form.html'; // Redireccionar al formulario después de 5 segundos
    }, 5000); // Esperar 5 segundos
}
