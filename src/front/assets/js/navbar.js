document.addEventListener("DOMContentLoaded", () => {
    // Animação dos elementos zigzag
    const zigzagItems = document.querySelectorAll(".zigzag-item");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            // Opcional: remova a classe para repetir o efeito ao rolar para cima
            // entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.1, // Quando 10% do elemento está visível
      }
    );
  
    zigzagItems.forEach((item) => observer.observe(item));
  
    // Ocultar/Mostrar Navbar ao rolar
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
      if (currentScroll > lastScrollTop) {
        // Rolando para baixo, esconde a navbar
        navbar.classList.add('hidden');
      } else {
        // Rolando para cima, mostra a navbar
        navbar.classList.remove('hidden');
      }
  
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Garante que não haverá valores negativos
    });
  });
  