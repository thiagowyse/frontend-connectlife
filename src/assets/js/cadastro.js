document.addEventListener("DOMContentLoaded", () => {
  const cpfInput = document.getElementById("cpf");
  const cepInput = document.getElementById("cep");
  const form = document.getElementById("cadastroForm");

  if (!cpfInput || !cepInput || !form) {
    console.error("Campos CPF, CEP ou Formulário não encontrados.");
    return;
  }


  cpfInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
  });

  cepInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
  });


  function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
      toast.className = "toast";
    }, 3000);
  }

  // Validação CPF
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    if (resto !== Number(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto >= 10) resto = 0;
    return resto === Number(cpf.charAt(10));
  }

  function validarCEP(cep) {
    return /^\d{5}-?\d{3}$/.test(cep);
  }


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    let isValid = true;

    form.querySelectorAll(".form-control, .form-select").forEach((f) => {
      f.classList.remove("is-invalid", "is-valid");
    });

    function setValidation(id, condition) {
      const field = document.getElementById(id);
      if (!field) return;
      field.classList.add(condition ? "is-valid" : "is-invalid");
      if (!condition) isValid = false;
    }

    setValidation("nome", data.nome.trim() !== "");
    setValidation("cpf", validarCPF(data.cpf));
    setValidation("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email));
    setValidation("senha", data.senha.length >= 6);
    setValidation("confirmarSenha", data.senha === data.confirmarSenha);
    setValidation("dataNascimento", data.dataNascimento !== "");
    setValidation("cep", validarCEP(data.cep));
    setValidation("tipoUsuario", data.tipoUsuario !== "");

    if (!isValid) {
      showToast("Por favor, corrija os erros no formulário.", "error");
      return;
    }

    const btn = document.getElementById("cadastrarBtn");
    const btnText = btn.querySelector(".btn-text");
    const spinner = btn.querySelector(".spinner-border");
    btn.disabled = true;
    btnText.textContent = "Cadastrando...";
    spinner.classList.remove("d-none");

    try {
      const { confirmarSenha, ...dadosEnvio } = data;

      const response = await fetch("http://localhost:3000/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosEnvio),
      });

      const result = await response.json();

      if (response.ok) {
        showToast("Cadastro realizado com sucesso! Redirecionando...", "success");
        setTimeout(() => (window.location.href = "login.html"), 2000);
      } else {
        showToast(result.message || "Erro ao cadastrar.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Erro de conexão. Verifique sua internet.", "error");
    } finally {
      btn.disabled = false;
      btnText.textContent = "Cadastrar";
      spinner.classList.add("d-none");
    }
  });
});
