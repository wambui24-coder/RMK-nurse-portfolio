/* =========================================================
   ROSE MUTHONI KOMAREK
   PREMIUM PORTFOLIO — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const header = document.getElementById("siteHeader");
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const pageLoader = document.getElementById("pageLoader");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (pageLoader) {
                pageLoader.classList.add("hidden");
            }

            body.classList.add("page-ready");

        }, 500);
    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");
                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });

        });
    }


    /* =====================================================
       THEME — DARK / LIGHT MODE
    ===================================================== */

    function setTheme(theme) {

        if (theme === "dark") {

            body.classList.add("dark-mode");

            if (themeToggle) {
                themeToggle.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to light mode"
                );
            }

        } else {

            body.classList.remove("dark-mode");

            if (themeToggle) {
                themeToggle.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to dark mode"
                );
            }
        }
    }


    let savedTheme = localStorage.getItem("rmk-theme");

    if (!savedTheme) {
        savedTheme = "light";
    }

    setTheme(savedTheme);


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isDark =
                body.classList.contains("dark-mode");

            const newTheme =
                isDark ? "light" : "dark";

            setTheme(newTheme);

            localStorage.setItem(
                "rmk-theme",
                newTheme
            );
        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".main-nav .nav-link");


    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {
                current =
                    section.getAttribute("id");
            }
        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            }

        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 600) {

                backToTop.classList.add("visible");

            } else {

                backToTop.classList.remove("visible");

            }
        }

        window.addEventListener(
            "scroll",
            updateBackToTop
        );

        updateBackToTop();


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


    let currentGalleryIndex = 0;


    function getGalleryImages() {

        return Array.from(
            document.querySelectorAll(
                ".gallery-item img"
            )
        );
    }


    function openLightbox(index) {

        const images =
            getGalleryImages();

        if (!images.length) return;

        currentGalleryIndex =
            (index + images.length) %
            images.length;

        const image =
            images[currentGalleryIndex];

        if (lightboxImage) {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt || "Rose Komarek gallery image";
        }

        if (lightbox) {

            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            body.classList.add(
                "lightbox-open"
            );
        }
    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove(
            "lightbox-open"
        );
    }


    function showNextImage() {

        const images =
            getGalleryImages();

        if (!images.length) return;

        openLightbox(
            currentGalleryIndex + 1
        );
    }


    function showPreviousImage() {

        const images =
            getGalleryImages();

        if (!images.length) return;

        openLightbox(
            currentGalleryIndex - 1
        );
    }


    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {
                    openLightbox(index);
                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }

            }
        );
    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {
                closeLightbox();
            }


            if (
                event.key === "ArrowRight"
            ) {
                showNextImage();
            }


            if (
                event.key === "ArrowLeft"
            ) {
                showPreviousImage();
            }

        }
    );


    /* =====================================================
       GALLERY HOVER EFFECT
    ===================================================== */

    galleryItems.forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {
                item.classList.add("gallery-hover");
            }
        );

        item.addEventListener(
            "mouseleave",
            () => {
                item.classList.remove(
                    "gallery-hover"
                );
            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".snapshot-card, " +
            ".about-image-wrapper, " +
            ".about-content, " +
            ".timeline-item, " +
            ".expertise-card, " +
            ".impact-card, " +
            ".gallery-item, " +
            ".language-item, " +
            ".contact-card"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "revealed"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );

                observer.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );
            }
        );
    }


    /* =====================================================
       HERO IMAGE SUBTLE MOVEMENT
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (
        hero &&
        heroImage &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                heroImage.style.transform =
                    `translate(${x * 7}px, ${y * 7}px)`;
            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "translate(0, 0)";
            }
        );
    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }

});