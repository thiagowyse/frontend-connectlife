document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (email.length > 0 && password.length > 0) {
            console.log('Dados do formulário:');
            console.log('E-mail:', email);
            console.log('Senha:', password);
            console.log('Lembrar senha:', rememberMe);

            // adicionar a lógica para enviar os dados para um servidor
            
            //   

            alert('Login simulado realizado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});