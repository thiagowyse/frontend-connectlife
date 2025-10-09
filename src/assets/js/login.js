document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token); 
            showToast("Login realizado com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "./dashboard.html";
            }, 1000);
        } else {
            const error = await response.json();
            showToast(error.mensagem || "Erro ao fazer login.", "error");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        showToast("Erro de conexão com o servidor.", "error");
    }
});


function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}
