const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id], main[id]");
const searchInput = document.querySelector("#glossarySearch");
const glossaryItems = document.querySelectorAll(".glossary-item");
const scrollTopButton = document.querySelector(".scroll-top");
const currentYear = document.querySelector("#currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* ── Nav activo ── */
const setActiveLink = () => {
    let currentId = "inicio";
    sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 120) {
            currentId = section.id || "inicio";
        }
    });
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
};

const toggleScrollButton = () => {
    if (scrollTopButton) {
        scrollTopButton.classList.toggle("is-visible", window.scrollY > 520);
    }
};

window.addEventListener("scroll", () => { setActiveLink(); toggleScrollButton(); });

/* ── Glosario ── */
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        glossaryItems.forEach((item) => {
            const match = item.textContent.toLowerCase().includes(query) ||
                          (item.dataset.term || "").includes(query);
            item.classList.toggle("is-hidden", query !== "" && !match);
        });
    });
}

if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

setActiveLink();
toggleScrollButton();