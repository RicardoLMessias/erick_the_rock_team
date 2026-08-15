/* ============================================================
   MENU MOBILE
============================================================ */

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-content");
const menuLinks = document.querySelectorAll(".nav-content a");

if (menuButton && menu) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            menu.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

    });

}


/* ============================================================
   FECHAR MENU AO CLICAR
============================================================ */

menuLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (menu) {
            menu.classList.remove("open");
        }

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* ============================================================
   LINK ATIVO DO MENU
============================================================ */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


if (sections.length) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        menuLinks.forEach(
                            (link) => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute("href") ===
                                    `#${entry.target.id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        (section) => {

            observer.observe(
                section
            );

        }
    );

}


/* ============================================================
   BOTÕES DOS SERVIÇOS
============================================================ */

document
    .querySelectorAll(
        ".inquiry-button"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const formulario =
                    document.querySelector(
                        "#formulario"
                    );

                if (formulario) {

                    formulario.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* ============================================================
   FORMULÁRIO
============================================================ */

const form =
    document.querySelector(
        "#contact-form"
    );

const status =
    document.querySelector(
        ".form-status"
    );


if (form && status) {

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "ENVIANDO...";

            }


            status.textContent = "";


            const formData =
                new FormData(form);


            const dados = {

                nome:
                    formData.get("nome"),

                email:
                    formData.get("email"),

                celular:
                    formData.get("celular"),

                mensagem:
                    formData.get("mensagem")

            };


            try {

                const response =
                    await fetch(
                        "/api/contact",
                        {

                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    dados
                                )

                        }
                    );


                const resultado =
                    await response.json();


                if (
                    !response.ok ||
                    !resultado.success
                ) {

                    throw new Error(
                        resultado.message ||
                        "Erro ao enviar formulário."
                    );

                }


                status.textContent =
                    "MENSAGEM ENVIADA COM SUCESSO!";


                form.reset();


            } catch (error) {

                console.error(
                    "Erro ao enviar formulário:",
                    error
                );


                status.textContent =
                    "NÃO FOI POSSÍVEL ENVIAR A MENSAGEM. TENTE NOVAMENTE OU ENTRE EM CONTATO PELO WHATSAPP.";


            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "ENVIAR MENSAGEM";

                }

            }

        }
    );

}


/* ============================================================
   LOADER
============================================================ */

let progress = 0;

const bar =
    document.getElementById(
        "progress-bar"
    );

const loader =
    document.getElementById(
        "loader"
    );

const content =
    document.getElementById(
        "content"
    );

const loaderImage =
    document.querySelector(
        ".loader-image"
    );

const progressContainer =
    document.querySelector(
        ".progress-container"
    );


if (
    bar &&
    loader &&
    content &&
    loaderImage &&
    progressContainer
) {

    const interval =
        setInterval(
            () => {

                progress +=
                    Math.random() * 10;


                if (progress >= 100) {

                    progress = 100;

                    clearInterval(
                        interval
                    );

                }


                bar.style.width =
                    `${progress}%`;


                progressContainer.setAttribute(
                    "aria-valuenow",
                    Math.round(progress)
                );


                const opacity =
                    progress / 100;


                loaderImage.style.setProperty(
                    "--load-opacity",
                    opacity
                );


                const blinkDuration =
                    0.16 +
                    (
                        opacity *
                        opacity *
                        1.24
                    );


                loaderImage.style.setProperty(
                    "--blink-duration",
                    `${blinkDuration}s`
                );


                const blinkMinOpacity =
                    0.3 +
                    (
                        opacity *
                        0.7
                    );


                loaderImage.style.setProperty(
                    "--blink-min-opacity",
                    blinkMinOpacity
                );


                if (progress === 100) {

                    loaderImage.classList.add(
                        "carregado"
                    );


                    setTimeout(
                        () => {

                            loader.classList.add(
                                "fade-out"
                            );


                            setTimeout(
                                () => {

                                    loader.style.display =
                                        "none";

                                    content.classList.add(
                                        "show"
                                    );


                                    if (
                                        window.ScrollTrigger
                                    ) {

                                        ScrollTrigger.refresh();

                                    }

                                },
                                900
                            );

                        },
                        1500
                    );

                }

            },
            200
        );

}


/* ============================================================
   GSAP + SCROLLTRIGGER
============================================================ */

if (
    window.gsap &&
    window.ScrollTrigger
) {

    gsap.registerPlugin(
        ScrollTrigger
    );


    const gsapSections =
        gsap.utils.toArray(
            "main > section"
        );


    gsapSections.forEach(
        (section) => {

            const internalItems =
                section.querySelectorAll(
                    ":scope > div, .texto > *, .live > *, .part-titulo > *, .partners > *, .mediakit-content > *, .contato-content > *, .contato-footer > *"
                );


            if (
                !internalItems.length
            ) {
                return;
            }


            gsap.timeline({

                scrollTrigger: {

                    trigger:
                        section,

                    start:
                        "top 80%",

                    end:
                        "center center",

                    scrub:
                        3,

                    markers:
                        false,

                    invalidateOnRefresh:
                        true

                }

            }).fromTo(

                internalItems,

                {

                    y:
                        64,

                    opacity:
                        0

                },

                {

                    y:
                        0,

                    opacity:
                        1,

                    duration:
                        1,

                    ease:
                        "power2.out",

                    stagger:
                        0.02

                }

            );

        }
    );

}


/* ============================================================
   DESENVOLVIDO POR DRK
============================================================ */

const btn =
    document.querySelector(
        ".content-dev"
    );

const text =
    document.querySelector(
        ".desenvolvido"
    );

const topLine =
    document.querySelector(
        ".top"
    );

const bottomLine =
    document.querySelector(
        ".bottom"
    );


if (
    btn &&
    window.gsap
) {

    btn.addEventListener(
        "mouseenter",
        () => {

            gsap.to(
                btn,
                {

                    duration:
                        .4,

                    scale:
                        1.08,

                    y:
                        -4,

                    boxShadow:
                        "0 0 30px rgba(255, 0, 0, 0.35)",

                    ease:
                        "power3.out"

                }
            );


            if (topLine) {

                gsap.to(
                    topLine,
                    {

                        scaleX:
                            1,

                        duration:
                            .35,

                        ease:
                            "power2.out"

                    }
                );

            }


            if (bottomLine) {

                gsap.to(
                    bottomLine,
                    {

                        scaleX:
                            1,

                        duration:
                            .35,

                        ease:
                            "power2.out"

                    }
                );

            }


            if (text) {

                gsap.to(
                    text,
                    {

                        duration:
                            .35,

                        textShadow:
                            "0 0 8px #ff0000",

                        ease:
                            "power2.out"

                    }
                );

            }

        }
    );


    btn.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                btn.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            gsap.to(
                btn,
                {

                    x:
                        x * 0.12,

                    y:
                        y * 0.12,

                    duration:
                        .4,

                    ease:
                        "power2.out"

                }
            );

        }
    );


    btn.addEventListener(
        "mouseleave",
        () => {

            gsap.to(
                btn,
                {

                    scale:
                        1,

                    x:
                        0,

                    y:
                        0,

                    boxShadow:
                        "0 0 0 rgba(0,0,0,0)",

                    duration:
                        .7,

                    ease:
                        "elastic.out(1,0.45)"

                }
            );


            if (topLine) {

                gsap.to(
                    topLine,
                    {
                        scaleX: 0,
                        duration: .3
                    }
                );

            }


            if (bottomLine) {

                gsap.to(
                    bottomLine,
                    {
                        scaleX: 0,
                        duration: .3
                    }
                );

            }


            if (text) {

                gsap.to(
                    text,
                    {

                        textShadow:
                            "0 0 0 transparent",

                        duration:
                            .3

                    }
                );

            }

        }
    );

}


/* ============================================================
   BOTÃO CONSULTORIA
============================================================ */

const btn2 =
    document.querySelector(
        ".consultoria"
    );


if (
    btn2 &&
    window.gsap
) {

    btn2.addEventListener(
        "mouseenter",
        () => {

            gsap.to(
                btn2,
                {

                    duration:
                        .4,

                    scale:
                        1.08,

                    y:
                        -4,

                    boxShadow:
                        "0 0 30px rgba(255, 0, 0, 0.35)",

                    ease:
                        "power3.out"

                }
            );

        }
    );


    btn2.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                btn2.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            gsap.to(
                btn2,
                {

                    x:
                        x * 0.12,

                    y:
                        y * 0.12,

                    duration:
                        .4,

                    ease:
                        "power2.out"

                }
            );

        }
    );


    btn2.addEventListener(
        "mouseleave",
        () => {

            gsap.to(
                btn2,
                {

                    scale:
                        1,

                    x:
                        0,

                    y:
                        0,

                    boxShadow:
                        "0 0 0 rgba(0,0,0,0)",

                    duration:
                        .7,

                    ease:
                        "elastic.out(1,0.45)"

                }
            );

        }
    );

}


/* ============================================================
   GALERIA DE TRANSFORMAÇÕES
============================================================ */

const galleryTrack =
    document.querySelector(
        ".galeria-track"
    );


const galleryCards =
    window.gsap
        ? gsap.utils.toArray(
            ".transformacao-card"
        )
        : Array.from(
            document.querySelectorAll(
                ".transformacao-card"
            )
        );


const nextControl =
    document.querySelector(
        ".controle-next"
    );


const prevControl =
    document.querySelector(
        ".controle-prev"
    );


const indicatorsContainer =
    document.querySelector(
        ".galeria-indicadores"
    );


let galleryIndex = 0;

let galleryCardsPerView = 3;

let galleryCardWidth = 0;

const galleryGap = 14;


/* ============================================================
   CARDS VISÍVEIS
============================================================ */

function calculateCardsPerView() {

    if (
        window.innerWidth <= 600
    ) {

        galleryCardsPerView = 1;

    } else if (
        window.innerWidth <= 900
    ) {

        galleryCardsPerView = 2;

    } else {

        galleryCardsPerView = 3;

    }

}


/* ============================================================
   TOTAL DE PÁGINAS
============================================================ */

function getTotalPages() {

    if (
        !galleryCards.length
    ) {
        return 0;
    }


    return Math.ceil(
        galleryCards.length /
        galleryCardsPerView
    );

}


/* ============================================================
   CRIAR INDICADORES
============================================================ */

function createIndicators() {

    if (
        !indicatorsContainer
    ) {
        return;
    }


    indicatorsContainer.innerHTML =
        "";


    const totalPages =
        getTotalPages();


    for (
        let i = 0;
        i < totalPages;
        i++
    ) {

        const indicator =
            document.createElement(
                "span"
            );


        indicator.className =
            "galeria-indicador";


        if (
            i === galleryIndex
        ) {

            indicator.classList.add(
                "active"
            );

        }


        indicator.addEventListener(
            "click",
            () => {

                goToGallerySlide(
                    i
                );

            }
        );


        indicatorsContainer.appendChild(
            indicator
        );

    }

}


/* ============================================================
   ATUALIZAR INDICADORES
============================================================ */

function updateIndicators() {

    if (
        !indicatorsContainer
    ) {
        return;
    }


    indicatorsContainer
        .querySelectorAll(
            ".galeria-indicador"
        )
        .forEach(
            (
                indicator,
                index
            ) => {

                indicator.classList.toggle(
                    "active",
                    index === galleryIndex
                );

            }
        );

}


/* ============================================================
   CALCULAR GALERIA
============================================================ */

function calculateGallery() {

    calculateCardsPerView();


    if (
        !galleryCards.length ||
        !galleryTrack
    ) {
        return;
    }


    galleryCardWidth =
        galleryCards[0].offsetWidth +
        galleryGap;


    const totalPages =
        getTotalPages();


    if (
        galleryIndex >=
        totalPages
    ) {

        galleryIndex =
            Math.max(
                0,
                totalPages - 1
            );

    }


    createIndicators();


    gsap.set(
        galleryTrack,
        {

            x:
                -(
                    galleryIndex *
                    galleryCardsPerView *
                    galleryCardWidth
                )

        }
    );


    updateIndicators();

}


/* ============================================================
   IR PARA SLIDE
============================================================ */

function goToGallerySlide(index) {

    const totalPages =
        getTotalPages();


    if (
        !totalPages ||
        !galleryTrack
    ) {
        return;
    }


    if (index < 0) {

        index =
            totalPages - 1;

    }


    if (
        index >= totalPages
    ) {

        index = 0;

    }


    galleryIndex =
        index;


    const movement =
        galleryIndex *
        galleryCardsPerView *
        galleryCardWidth;


    gsap.to(
        galleryTrack,
        {

            x:
                -movement,

            duration:
                .8,

            ease:
                "power3.inOut",

            overwrite:
                true

        }
    );


    updateIndicators();

}


/* ============================================================
   CONTROLES DA GALERIA
============================================================ */

if (nextControl) {

    nextControl.addEventListener(
        "click",
        () => {

            goToGallerySlide(
                galleryIndex + 1
            );

        }
    );

}


if (prevControl) {

    prevControl.addEventListener(
        "click",
        () => {

            goToGallerySlide(
                galleryIndex - 1
            );

        }
    );

}


/* ============================================================
   HOVER DOS CARDS
============================================================ */

galleryCards.forEach(
    (card) => {

        const image =
            card.querySelector(
                "img"
            );


        if (!image) {
            return;
        }


        card.addEventListener(
            "mouseenter",
            () => {

                gsap.to(
                    image,
                    {

                        scale:
                            1.06,

                        filter:
                            "grayscale(0%)",

                        duration:
                            .65,

                        ease:
                            "power3.out"

                    }
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    image,
                    {

                        scale:
                            1,

                        filter:
                            "grayscale(100%)",

                        duration:
                            .65,

                        ease:
                            "power3.out"

                    }
                );

            }
        );

    }
);


/* ============================================================
   MODAL DA GALERIA
============================================================ */

const galleryModal =
    document.querySelector(
        ".galeria-modal"
    );


const modalOverlay =
    document.querySelector(
        ".galeria-modal-overlay"
    );


const modalContent =
    document.querySelector(
        ".galeria-modal-content"
    );


const modalBody =
    document.querySelector(
        ".modal-body"
    );


const modalImage =
    document.querySelector(
        ".modal-imagem"
    );


const modalClose =
    document.querySelector(
        ".modal-fechar"
    );


const modalPrevious =
    document.querySelector(
        ".modal-anterior"
    );


const modalNext =
    document.querySelector(
        ".modal-proxima"
    );


const modalCurrent =
    document.querySelector(
        ".modal-atual"
    );


const modalTotal =
    document.querySelector(
        ".modal-total"
    );


/* ============================================================
   INFORMAÇÕES DA ALUNA
============================================================ */

const modalInfo =
    document.querySelector(
        ".modal-transformacao-info"
    );


const modalAluno =
    document.querySelector(
        ".modal-aluna"
    );


const modalPesoInicial =
    document.querySelector(
        ".modal-peso-inicial"
    );


const modalPesoAtual =
    document.querySelector(
        ".modal-peso-atual"
    );


const modalProcesso =
    document.querySelector(
        ".modal-processo"
    );


let modalIndex = 0;

let modalAnimating = false;


/* ============================================================
   CRIAR BANCO DE DADOS DAS TRANSFORMAÇÕES

   Os valores vêm de:

   data-aluna=""
   data-peso-inicial=""
   data-peso-atual=""
   data-processo=""
============================================================ */

const galleryImages =
    galleryCards
        .map(
            (card) => {

                const image =
                    card.querySelector(
                        "img"
                    );


                if (!image) {
                    return null;
                }


                return {

                    src:
                        image.getAttribute(
                            "src"
                        ),

                    alt:
                        image.getAttribute(
                            "alt"
                        ) || "",


                    aluna:
                        card.dataset.aluna ||
                        "",


                    pesoInicial:
                        card.dataset.pesoInicial ||
                        "",


                    pesoAtual:
                        card.dataset.pesoAtual ||
                        "",


                    processo:
                        card.dataset.processo ||
                        ""

                };

            }
        )
        .filter(Boolean);


/* ============================================================
   TOTAL DE FOTOS NO MODAL
============================================================ */

if (modalTotal) {

    modalTotal.textContent =
        galleryImages.length;

}


/* ============================================================
   PREENCHER CONTEÚDO DO MODAL
============================================================ */

function updateModalContent(
    image
) {

    if (!image) {
        return;
    }


    if (modalImage) {

        modalImage.src =
            image.src;

        modalImage.alt =
            image.alt;

    }


    if (modalAluno) {

        modalAluno.textContent =
            image.aluna;

    }


    if (modalPesoInicial) {

        modalPesoInicial.textContent =
            image.pesoInicial;

    }


    if (modalPesoAtual) {

        modalPesoAtual.textContent =
            image.pesoAtual;

    }


    if (modalProcesso) {

        modalProcesso.textContent =
            image.processo;

    }


    if (modalCurrent) {

        modalCurrent.textContent =
            modalIndex + 1;

    }

}


/* ============================================================
   ABRIR MODAL
============================================================ */

function openGalleryModal(
    index
) {

    if (
        !galleryModal ||
        !modalImage ||
        !galleryImages.length ||
        modalAnimating
    ) {
        return;
    }


    modalAnimating =
        true;


    modalIndex =
        index;


    updateModalContent(
        galleryImages[
            modalIndex
        ]
    );


    galleryModal.classList.add(
        "is-open"
    );


    galleryModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    gsap.killTweensOf(
        [

            galleryModal,

            modalOverlay,

            modalContent,

            modalBody,

            modalImage,

            modalInfo,

            modalClose,

            modalPrevious,

            modalNext

        ]
    );


    /* Fundo */

    gsap.set(
        galleryModal,
        {
            opacity: 1
        }
    );


    if (modalOverlay) {

        gsap.set(
            modalOverlay,
            {
                opacity: 0
            }
        );

    }


    /* Conteúdo */

    if (modalBody) {

        gsap.set(
            modalBody,
            {

                opacity:
                    0,

                scale:
                    .94,

                y:
                    30

            }
        );

    }


    /* Imagem */

    gsap.set(
        modalImage,
        {

            opacity:
                0,

            scale:
                .88,

            x:
                0,

            filter:
                "blur(10px)"

        }
    );


    /* Informações */

    if (modalInfo) {

        gsap.set(
            modalInfo,
            {

                opacity:
                    0,

                x:
                    35

            }
        );

    }


    /* Botão fechar */

    if (modalClose) {

        gsap.set(
            modalClose,
            {

                opacity:
                    0,

                scale:
                    .65,

                rotation:
                    -90

            }
        );

    }


    /* Seta esquerda */

    if (modalPrevious) {

        gsap.set(
            modalPrevious,
            {

                opacity:
                    0,

                x:
                    -30

            }
        );

    }


    /* Seta direita */

    if (modalNext) {

        gsap.set(
            modalNext,
            {

                opacity:
                    0,

                x:
                    30

            }
        );

    }


    /* ========================================================
       TIMELINE DE ENTRADA
    ======================================================== */

    const tl =
        gsap.timeline({

            onComplete:
                () => {

                    modalAnimating =
                        false;

                }

        });


    if (modalOverlay) {

        tl.to(
            modalOverlay,
            {

                opacity:
                    1,

                duration:
                    .35,

                ease:
                    "power2.out"

            }
        );

    }


    if (modalBody) {

        tl.to(
            modalBody,
            {

                opacity:
                    1,

                scale:
                    1,

                y:
                    0,

                duration:
                    .55,

                ease:
                    "power4.out"

            },
            "-=.18"
        );

    }


    tl.to(
        modalImage,
        {

            opacity:
                1,

            scale:
                1,

            filter:
                "blur(0px)",

            duration:
                .65,

            ease:
                "power4.out"

        },
        "-=.38"
    );


    if (modalInfo) {

        tl.to(
            modalInfo,
            {

                opacity:
                    1,

                x:
                    0,

                duration:
                    .5,

                ease:
                    "power3.out"

            },
            "-=.5"
        );

    }


    if (modalPrevious) {

        tl.to(
            modalPrevious,
            {

                opacity:
                    1,

                x:
                    0,

                duration:
                    .35,

                ease:
                    "power3.out"

            },
            "-=.35"
        );

    }


    if (modalNext) {

        tl.to(
            modalNext,
            {

                opacity:
                    1,

                x:
                    0,

                duration:
                    .35,

                ease:
                    "power3.out"

            },
            "<"
        );

    }


    if (modalClose) {

        tl.to(
            modalClose,
            {

                opacity:
                    1,

                scale:
                    1,

                rotation:
                    0,

                duration:
                    .4,

                ease:
                    "back.out(1.7)"

            },
            "-=.3"
        );

    }

}


/* ============================================================
   FECHAR MODAL
============================================================ */

function closeGalleryModal() {

    if (
        !galleryModal ||
        !galleryModal.classList.contains(
            "is-open"
        ) ||
        modalAnimating
    ) {
        return;
    }


    modalAnimating =
        true;


    const tl =
        gsap.timeline({

            onComplete:
                () => {

                    galleryModal.classList.remove(
                        "is-open"
                    );


                    galleryModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    document.body.style.overflow =
                        "";


                    if (modalImage) {

                        modalImage.src =
                            "";

                    }


                    modalAnimating =
                        false;

                }

        });


    /* Informações saindo */

    if (modalInfo) {

        tl.to(
            modalInfo,
            {

                opacity:
                    0,

                x:
                    25,

                duration:
                    .2,

                ease:
                    "power2.in"

            }
        );

    }


    /* Imagem saindo */

    tl.to(
        modalImage,
        {

            opacity:
                0,

            scale:
                .9,

            filter:
                "blur(8px)",

            duration:
                .3,

            ease:
                "power3.in"

        },
        "<"
    );


    /* Corpo */

    if (modalBody) {

        tl.to(
            modalBody,
            {

                opacity:
                    0,

                scale:
                    .95,

                y:
                    20,

                duration:
                    .3,

                ease:
                    "power3.in"

            },
            "-=.1"
        );

    }


    /* Fundo */

    if (modalOverlay) {

        tl.to(
            modalOverlay,
            {

                opacity:
                    0,

                duration:
                    .25,

                ease:
                    "power2.in"

            },
            "-=.2"
        );

    } else {

        tl.to(
            galleryModal,
            {

                opacity:
                    0,

                duration:
                    .25

            },
            "-=.2"
        );

    }

}


/* ============================================================
   TROCAR IMAGEM DO MODAL
============================================================ */

function changeModalImage(
    direction
) {

    if (
        !galleryImages.length ||
        !modalImage ||
        modalAnimating
    ) {
        return;
    }


    modalAnimating =
        true;


    /*
        Próxima:

        imagem atual sai para esquerda
        próxima entra pela direita

        Anterior:

        imagem atual sai para direita
        anterior entra pela esquerda
    */


    const exitX =
        direction > 0
            ? -120
            : 120;


    const enterX =
        direction > 0
            ? 120
            : -120;


    const tl =
        gsap.timeline();


    /* ========================================================
       TEXTO SAI
    ======================================================== */

    if (modalInfo) {

        tl.to(
            modalInfo,
            {

                opacity:
                    0,

                y:
                    12,

                duration:
                    .2,

                ease:
                    "power2.in"

            }
        );

    }


    /* ========================================================
       FOTO ATUAL SAI
    ======================================================== */

    tl.to(
        modalImage,
        {

            x:
                exitX,

            opacity:
                0,

            scale:
                .92,

            filter:
                "blur(10px)",

            duration:
                .3,

            ease:
                "power3.in",


            onComplete:
                () => {

                    /* Próximo índice */

                    modalIndex +=
                        direction;


                    if (
                        modalIndex >=
                        galleryImages.length
                    ) {

                        modalIndex =
                            0;

                    }


                    if (
                        modalIndex < 0
                    ) {

                        modalIndex =
                            galleryImages.length -
                            1;

                    }


                    /* Atualiza foto e dados */

                    updateModalContent(
                        galleryImages[
                            modalIndex
                        ]
                    );


                    /* Coloca nova foto
                       no lado contrário */

                    gsap.set(
                        modalImage,
                        {

                            x:
                                enterX,

                            opacity:
                                0,

                            scale:
                                .92,

                            filter:
                                "blur(10px)"

                        }
                    );


                    if (modalInfo) {

                        gsap.set(
                            modalInfo,
                            {

                                opacity:
                                    0,

                                y:
                                    12

                            }
                        );

                    }

                }

        },
        modalInfo
            ? "-=.1"
            : 0
    );


    /* ========================================================
       NOVA FOTO ENTRA
    ======================================================== */

    tl.to(
        modalImage,
        {

            x:
                0,

            opacity:
                1,

            scale:
                1,

            filter:
                "blur(0px)",

            duration:
                .55,

            ease:
                "power4.out"

        }
    );


    /* ========================================================
       NOVOS DADOS ENTRAM
    ======================================================== */

    if (modalInfo) {

        tl.to(
            modalInfo,
            {

                opacity:
                    1,

                y:
                    0,

                duration:
                    .4,

                ease:
                    "power3.out"

            },
            "-=.38"
        );

    }


    tl.eventCallback(
        "onComplete",
        () => {

            modalAnimating =
                false;

        }
    );

}


/* ============================================================
   ABRIR MODAL AO CLICAR NO CARD
============================================================ */

galleryCards.forEach(
    (
        card,
        index
    ) => {

        card.addEventListener(
            "click",
            () => {

                openGalleryModal(
                    index
                );

            }
        );

    }
);


/* ============================================================
   FECHAR MODAL
============================================================ */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            closeGalleryModal();

        }
    );

}


/* ============================================================
   CLICAR NO FUNDO
============================================================ */

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        () => {

            closeGalleryModal();

        }
    );

}


/* ============================================================
   FOTO ANTERIOR
============================================================ */

if (modalPrevious) {

    modalPrevious.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            changeModalImage(
                -1
            );

        }
    );

}


/* ============================================================
   PRÓXIMA FOTO
============================================================ */

if (modalNext) {

    modalNext.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            changeModalImage(
                1
            );

        }
    );

}


/* ============================================================
   HOVER DAS SETAS DO MODAL
============================================================ */

[
    modalPrevious,
    modalNext
].forEach(
    (button) => {

        if (!button) {
            return;
        }


        button.addEventListener(
            "mouseenter",
            () => {

                if (
                    modalAnimating
                ) {
                    return;
                }


                gsap.to(
                    button,
                    {

                        scale:
                            1.12,

                        duration:
                            .2,

                        ease:
                            "power2.out"

                    }
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    button,
                    {

                        scale:
                            1,

                        duration:
                            .2,

                        ease:
                            "power2.out"

                    }
                );

            }
        );

    }
);


/* ============================================================
   HOVER BOTÃO FECHAR
============================================================ */

if (modalClose) {

    modalClose.addEventListener(
        "mouseenter",
        () => {

            if (
                modalAnimating
            ) {
                return;
            }


            gsap.to(
                modalClose,
                {

                    scale:
                        1.12,

                    rotation:
                        90,

                    duration:
                        .25,

                    ease:
                        "power2.out"

                }
            );

        }
    );


    modalClose.addEventListener(
        "mouseleave",
        () => {

            gsap.to(
                modalClose,
                {

                    scale:
                        1,

                    rotation:
                        0,

                    duration:
                        .25,

                    ease:
                        "power2.out"

                }
            );

        }
    );

}


/* ============================================================
   CONTROLES PELO TECLADO
============================================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !galleryModal ||
            !galleryModal.classList.contains(
                "is-open"
            )
        ) {
            return;
        }


        if (
            event.key ===
            "Escape"
        ) {

            closeGalleryModal();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            changeModalImage(
                -1
            );

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            changeModalImage(
                1
            );

        }

    }
);


/* ============================================================
   RESIZE
============================================================ */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    calculateGallery();


                    if (
                        window.ScrollTrigger
                    ) {

                        ScrollTrigger.refresh();

                    }

                },
                250
            );

    }
);


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

calculateGallery();