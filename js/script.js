/* ============================================================
   Interações da página: menu responsivo, links ativos e formulário.
   Nenhum dado é enviado; o formulário confirma visualmente o envio.
   ============================================================ */

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-content');
const menuLinks = document.querySelectorAll('.nav-content a');

// Abre e fecha o menu em dispositivos móveis.
menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao selecionar uma seção e mantém a navegação discreta.
menuLinks.forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Destaca no menu a seção que está visível na página.
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    menuLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

// Os botões dos serviços levam o visitante diretamente ao formulário.
document.querySelectorAll('.inquiry-button').forEach((button) => {
  button.addEventListener('click', () => document.querySelector('#formulario').scrollIntoView({ behavior: 'smooth' }));
});

// Simula o envio sem recarregar a página nem depender de um serviço externo.
const form = document.querySelector('#contact-form');
const status = document.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
  form.reset();
});
