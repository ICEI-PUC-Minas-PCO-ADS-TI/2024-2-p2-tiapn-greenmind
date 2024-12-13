// Detecta o scroll da página
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let sections = document.querySelectorAll('.project');
  
    sections.forEach(function(section) {
      if (scrollPosition > section.offsetTop - window.innerHeight + 100) {
        section.classList.add('active');
      }
    });
  });
  