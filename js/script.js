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



const btn = document.querySelector(".content-dev");
const text = document.querySelector(".desenvolvido");
const topLine = document.querySelector(".top");
const bottomLine = document.querySelector(".bottom");

btn.addEventListener("mouseenter", () => {

    gsap.to(btn,{
        duration:.4,
        scale:1.08,
        y:-4,
        boxShadow:"0 0 30px rgba(255, 0, 0, 0.35)",
        ease:"power3.out"
    });

    gsap.to(topLine,{
        scaleX:1,
        duration:.35,
        ease:"power2.out"
    });

    gsap.to(bottomLine,{
        scaleX:1,
        duration:.35,
        ease:"power2.out"
    });

    gsap.to(text,{
        duration:.35,
        textShadow:"0 0 8px #ff0000",
        ease:"power2.out"
    });

});

btn.addEventListener("mouseleave", () => {

    gsap.to(btn,{
        duration:.35,
        scale:1,
        y:0,
        boxShadow:"0 0 0 rgba(0,0,0,0)",
        ease:"power3.out"
    });

    gsap.to(topLine,{
        scaleX:0,
        duration:.3
    });

    gsap.to(bottomLine,{
        scaleX:0,
        duration:.3
    });

    gsap.to(text,{
        duration:.3,
        textShadow:"0 0 0 transparent"
    });

});

btn.addEventListener("mousemove",(e)=>{

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;

    gsap.to(btn,{
        x:x*0.12,
        y:y*0.12,
        duration:.4,
        ease:"power2.out"
    });

});

btn.addEventListener("mouseleave",()=>{

    gsap.to(btn,{
        x:0,
        y:0,
        duration:.7,
        ease:"elastic.out(1,0.45)"
    });

});