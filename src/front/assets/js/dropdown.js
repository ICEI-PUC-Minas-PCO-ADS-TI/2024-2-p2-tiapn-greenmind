// Seleciona os botões dropdown
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Adiciona o evento de clique para alternar os dropdowns
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', event => {
    event.preventDefault();

    const dropdownContent = toggle.nextElementSibling;

    // Fecha outros dropdowns
    dropdownToggles.forEach(otherToggle => {
      const otherContent = otherToggle.nextElementSibling;
      if (otherContent !== dropdownContent) {
        otherContent.classList.remove('show');
      }
    });

    // Alterna o dropdown clicado
    dropdownContent.classList.toggle('show');
  });
});

// Fecha dropdowns ao clicar fora
window.addEventListener('click', event => {
  if (!event.target.matches('.dropdown-toggle') && !event.target.closest('.dropdown-content')) {
    dropdownToggles.forEach(toggle => {
      toggle.nextElementSibling.classList.remove('show');
    });
  }
});


