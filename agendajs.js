// js/agenda.js

// Array de eventos (pode ser substituído por uma API)
const events = [
    {
        title: "Campeonato Interno",
        desc: "Competição amigável para demonstrar habilidades e aprimorar estratégias.",
        date: "2025-03-15T14:00",
        displayDate: "15 de março, 2025 - 14:00",
        day: "15",
        month: "Mar",
        category: "campeonato",
        location: "Clube de Xadrez Nanuque - Sala Principal"
    },
    {
        title: "Workshop de Estratégias",
        desc: "Uma oportunidade única para aprimorar seu jogo com dicas práticas.",
        date: "2025-04-22T10:00",
        displayDate: "22 de abril, 2025 - 10:00",
        day: "22",
        month: "Abr",
        category: "workshop",
        location: "Clube de Xadrez Nanuque - Auditório"
    }
    // Adicione mais eventos conforme necessário
];

const eventsSection = document.getElementById("eventsSection");
const noEventsMessage = document.getElementById("noEventsMessage");

function renderEvents() {
    eventsSection.innerHTML = "";
    events.forEach(evento => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.setAttribute("data-title", evento.title.toLowerCase());
        card.setAttribute("data-date", evento.date);
        card.setAttribute("data-category", evento.category);

        card.innerHTML = `
            <div class="event-date">
                ${evento.day}
                <small>${evento.month}</small>
            </div>
            <div class="event-details">
                <h2>${evento.title}</h2>
                <p>${evento.desc}</p>
                <p class="event-time">${evento.displayDate}</p>
                <button class="saiba-mais"
                    data-title="${evento.title}"
                    data-desc="${evento.desc}"
                    data-date="${evento.displayDate}"
                    data-location="${evento.location}">
                    Saiba Mais
                </button>
            </div>
        `;
        eventsSection.appendChild(card);
    });
}

// Renderiza os eventos ao carregar a página
renderEvents();

// Modal functionality
const modal = document.getElementById("eventModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalDate = document.getElementById("modalDate");
const modalLocation = document.getElementById("modalLocation");
const modalMapLink = document.getElementById("modalMapLink");
const closeModal = document.querySelector(".close");

function openModal(button) {
    const title = button.getAttribute("data-title");
    const desc = button.getAttribute("data-desc");
    const date = button.getAttribute("data-date");
    const location = button.getAttribute("data-location");

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalDate.textContent = date;
    modalLocation.textContent = "Local: " + location;
    modalMapLink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(location);
    modal.style.display = "flex";
}

document.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("saiba-mais")) {
        openModal(e.target);
    }
});

function closeTheModal() {
    modal.style.display = "none";
}

closeModal.addEventListener("click", closeTheModal);

window.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeTheModal();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.style.display === "flex") {
        closeTheModal();
    }
});

function filtrarEventos() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const dateValue = document.getElementById("dateFilter").value;
    const categoryValue = document.getElementById("categoryFilter").value;
    let anyVisible = false;

    document.querySelectorAll(".event-card").forEach(card => {
        const title = card.getAttribute("data-title");
        const eventDate = card.getAttribute("data-date").split("T")[0];
        const eventCategory = card.getAttribute("data-category");

        const matchSearch = title.includes(searchValue);
        const matchDate = dateValue === "" || eventDate === dateValue;
        const matchCategory = categoryValue === "" || eventCategory === categoryValue;

        if (matchSearch && matchDate && matchCategory) {
            card.style.display = "";
            anyVisible = true;
        } else {
            card.style.display = "none";
        }
    });

    noEventsMessage.style.display = anyVisible ? "none" : "block";
}

document.getElementById("searchInput").addEventListener("input", filtrarEventos);
document.getElementById("dateFilter").addEventListener("change", filtrarEventos);
document.getElementById("categoryFilter").addEventListener("change", filtrarEventos);
