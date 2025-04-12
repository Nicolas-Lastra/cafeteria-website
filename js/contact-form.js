document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    const modalTitle = document.getElementById("successModalLabel");
    const modalBody = document.querySelector("#successModal .modal-body");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);

        // Validación de campos requeridos
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(formObject.email)) {
            modalTitle.textContent = "Correo inválido";
            modalBody.textContent = "Por favor ingresa un correo electrónico válido.";
            modal.show();
            return;
        }

        try {
            const response = await fetch(form.action, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData
            });

            if (response.ok) {
                form.reset();
                modalTitle.textContent = "¡Gracias por tu mensaje!";
                modalBody.textContent = "Tu mensaje ha sido enviado correctamente. Te responderemos pronto.";
                modal.show();
            } else {
                const data = await response.json();
                modalTitle.textContent = "Error al enviar";
                modalBody.textContent = data?.errors?.[0]?.message || "Hubo un problema al enviar tu mensaje. Intenta más tarde.";
                modal.show();
            }
        } catch (error) {
            modalTitle.textContent = "Error de red";
            modalBody.textContent = "No se pudo enviar el formulario. Revisa tu conexión e intenta nuevamente.";
            modal.show();
        }
    });
}); 
