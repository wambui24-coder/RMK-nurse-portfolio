/* =========================================================
   RMK WEBSITE
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body =
        document.body;

    const header =
        document.getElementById("header");

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");

    const themeToggle =
        document.getElementById("themeToggle");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const currentYear =
        document.getElementById("currentYear");



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("active");

            body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


            const icon =
                menuBtn.querySelector("i");

            if (icon) {

                icon.className =
                    isOpen
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars";

            }

        });


        /* Close after clicking a link */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                        body.classList.remove(
                            "menu-open"
                        );

                        menuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuBtn.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );

                        const icon =
                            menuBtn.querySelector("i");

                        if (icon) {

                            icon.className =
                                "fa-solid fa-bars";

                        }

                    }
                );

            });

    }



    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const savedTheme =
        localStorage.getItem("rmk-theme");


    if (savedTheme === "dark") {

        body.classList.add(
            "dark-mode"
        );

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;


        const dark =
            body.classList.contains(
                "dark-mode"
            );


        icon.className =
            dark
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";


        themeToggle.setAttribute(
            "aria-label",
            dark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "dark-mode"
                );


                const dark =
                    body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "rmk-theme",
                    dark
                        ? "dark"
                        : "light"
                );


                updateThemeIcon();

            }
        );

    }



    /* =====================================================
       HEADER ON SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();



    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateProgress() {

        if (!scrollProgress) return;


        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;


        scrollProgress.style.width =
            `${progress}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();



    /* =====================================================
       ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    function animateCounter(counter) {

        const target =
            Number(
                counter.dataset.target
            );

        const suffix =
            counter.dataset.suffix || "";


        if (!Number.isFinite(target)) {
            return;
        }


        const duration =
            1600;

        const start =
            performance.now();


        function update(now) {

            const progress =
                Math.min(
                    (now - start) / duration,
                    1
                );


            /* Smooth easing */

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * eased
                );


            counter.textContent =
                value.toLocaleString()
                +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        animateCounter(
                            entry.target
                        );


                        counterObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: .5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    } else {

        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );

            const suffix =
                counter.dataset.suffix || "";


            counter.textContent =
                target.toLocaleString()
                +
                suffix;

        });

    }



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: .12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveNav() {

        let current =
            "home";


        sections.forEach(section => {

            const top =
                section.offsetTop - 160;


            if (
                window.scrollY >= top
            ) {

                current =
                    section.id;

            }

        });


        navItems.forEach(link => {

            const href =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                href === `#${current}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();



    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


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
            "menu-open"
        );

    }


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                const alt =
                    item.dataset.alt || "";


                if (
                    !lightbox ||
                    !lightboxImage
                ) {
                    return;
                }


                lightboxImage.src =
                    image;

                lightboxImage.alt =
                    alt;


                lightbox.classList.add(
                    "active"
                );

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                body.classList.add(
                    "menu-open"
                );

            }
        );

    });


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
                event.key === "Escape"
            ) {

                closeLightbox();

            }

        }
    );



    /* =====================================================
       IMAGE ERROR HANDLING
       Prevent broken image icons from ruining the layout.
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                    console.warn(
                        "Image could not be loaded:",
                        image.src
                    );

                }
            );

        });

});