// js/dashboard.js

// Exemplo: array de eventos para exibição no dashboard
const eventosDisponiveis = [
    { titulo: "Torneio Rápido", data: "15/03" },
    { titulo: "Campeonato Estadual", data: "22/03" },
    { titulo: "Aberto de Xadrez", data: "05/04" }
];

const eventosList = document.querySelector("#eventos ul");
if (eventosList) {
    eventosList.innerHTML = "";
    eventosDisponiveis.forEach(evento => {
        const li = document.createElement("li");
        li.textContent = `📅 ${evento.titulo} - ${evento.data}`;
        eventosList.appendChild(li);
    });
}
