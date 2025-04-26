 // Função para alternar o popup
    function toggleCalendar() {
      const calendar = document.getElementById('calendar-popup');
      calendar.classList.toggle('active');
    }

    // Fecha o popup ao clicar fora dele
    document.addEventListener('click', function(event) {
      const calendar = document.getElementById('calendar-popup');
      const icon = document.querySelector('.calendar-icon');
      if (!calendar.contains(event.target) && !icon.contains(event.target)) {
        calendar.classList.remove('active');
      }
    });