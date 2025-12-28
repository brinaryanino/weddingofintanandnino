import { data } from "../assets/data/data.js";

export const galeri = () => {
  const galeriElement = document.querySelector(".galeri");
  const container = galeriElement.children[0];
  const showAllContainer = galeriElement.querySelector("div:nth-of-type(2)");

  const [
    _,
    figureElement,
    paginationElement,
    prevButton,
    nextButton,
    showAllButton,
  ] = container.children;

  const [__, showAllBox, closeButton] = showAllContainer.children;

  /* =========================
     MOBILE CHECK
     ========================= */
  const isMobile = () => window.innerWidth <= 768;

  /* =========================
     DESKTOP MODE (AS IS)
     ========================= */
  const renderSingleImage = (item) => {
    figureElement.innerHTML = `
      <img src="${item.image}" loading="lazy" alt="galeri image" class="fade-image">
    `;
  };

  const initDesktop = () => {
    let currentIndex = 0;

    const update = () => {
      renderSingleImage(data.galeri[currentIndex]);

      paginationElement.innerHTML = data.galeri
        .map(
          (_, i) => `<li class="${i === currentIndex ? "active" : ""}"></li>`
        )
        .join("");
    };

    nextButton.onclick = () => {
      if (currentIndex < data.galeri.length - 1) {
        currentIndex++;
        update();
      }
    };

    prevButton.onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        update();
      }
    };

    paginationElement.onclick = (e) => {
      const index = [...paginationElement.children].indexOf(e.target);
      if (index !== -1) {
        currentIndex = index;
        update();
      }
    };

    update();
  };

  /* =========================
     MOBILE SLIDER MODE (2x2)
     ========================= */
  const initMobile = () => {
    const perSlide = 4;
    const slides = [];

    for (let i = 0; i < data.galeri.length; i += perSlide) {
      slides.push(data.galeri.slice(i, i + perSlide));
    }

    figureElement.innerHTML = `
      <div class="galeri-slider">
        ${slides
          .map(
            (group) => `
          <div class="slide">
            ${group
              .map(
                (item, idx) => `
              <img 
                src="${item.image}" 
                loading="${idx < 2 ? "eager" : "lazy"}"
              >
            `
              )
              .join("")}
          </div>
        `
          )
          .join("")}
      </div>
    `;

    paginationElement.innerHTML = slides
      .map((_, i) => `<li class="${i === 0 ? "active" : ""}"></li>`)
      .join("");

    const slider = figureElement.querySelector(".galeri-slider");

    slider.addEventListener("scroll", () => {
      const index = Math.round(slider.scrollLeft / slider.offsetWidth);
      [...paginationElement.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    });

    // sembunyikan panah di mobile
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  };

  /* =========================
     SHOW ALL (FULLSCREEN)
     ========================= */
  showAllButton.onclick = () => {
    showAllBox.innerHTML = data.galeri
      .map((item) => `<img src="${item.image}" loading="lazy">`)
      .join("");
    showAllContainer.classList.add("active");
  };

  closeButton.onclick = () => {
    showAllBox.innerHTML = "";
    showAllContainer.classList.remove("active");
  };

  /* =========================
     INIT
     ========================= */
  if (isMobile()) {
    initMobile();
  } else {
    initDesktop();
  }
};
