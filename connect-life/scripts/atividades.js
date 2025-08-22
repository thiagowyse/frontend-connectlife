const diasContainer = document.getElementById("dias");
const mesAno = document.getElementById("mes-ano");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let dataAtual = new Date();

function renderizarCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    mesAno.textContent = `${nomesMeses[mes]}, ${ano}`;

    let diasHtml = "";
    let diaSemana = primeiroDia.getDay(); // 0 = domingo, 1 = segunda...

    // Ajusta para começar na segunda
    let inicio = diaSemana === 0 ? 6 : diaSemana - 1;

    diasHtml += "<tr>";
    for (let i = 0; i < inicio; i++) {
        diasHtml += "<td></td>";
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        if ((inicio + dia - 1) % 7 === 0 && dia !== 1) {
            diasHtml += "</tr><tr>";
        }

        // Destacar o dia de hoje
        const hoje = new Date();
        const classeAtivo =
            dia === hoje.getDate() &&
                mes === hoje.getMonth() &&
                ano === hoje.getFullYear()
                ? "class='ativo'"
                : "";

        diasHtml += `<td ${classeAtivo}>${dia}</td>`;
    }

    diasHtml += "</tr>";
    diasContainer.innerHTML = diasHtml;
}

prevBtn.addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    renderizarCalendario();
});

nextBtn.addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    renderizarCalendario();
});

renderizarCalendario();
