import { data } from "../assets/data/data.js";

export const galeri = () => {
  const galeriElement = document.querySelector(".galeri");
  const showAllContainer = galeriElement.querySelector("div:nth-of-type(2)");

  const [
    _,
    figureElement,
    paginationElement,
    prevButton,
    nextButton,
    showAllButton,
  ] = galeriElement.children[0].children;

  const [__, showAllBox, closeButton] = showAllContainer.children;

  const renderImage = (item) => {
    figureElement.innerHTML = `
      <img 
        src="${item.image}" 
        alt="galeri image" 
        id="${item.id}" 
        class="fade-image"
      >
    `;
  };

  const initializeGallery = () => {
    const initialImage = data.galeri[0];
    renderImage(initialImage);

    paginationElement.innerHTML = "";
    data.galeri.forEach((item, index) => {
      paginationElement.innerHTML += `
        <li 
          data-id="${item.id}" 
          class="${index === 0 ? "active" : ""}"
        ></li>
      `;
    });

    updateNavigationButtons(initialImage.id);
  };

  const updateGalleryImage = (id) => {
    const selectedImage = data.galeri.find((item) => item.id === id);
    if (!selectedImage) return;

    const currentImg = figureElement.querySelector("img");
    if (currentImg) {
      currentImg.classList.add("fade-out");

      setTimeout(() => {
        renderImage(selectedImage);
      }, 300);
    } else {
      renderImage(selectedImage);
    }

    paginationElement.querySelectorAll("li").forEach((li) => {
      li.classList.toggle("active", parseInt(li.dataset.id) === id);
    });

    updateNavigationButtons(id);
  };

  const updateNavigationButtons = (id) => {
    nextButton.dataset.id = id;
    prevButton.dataset.id = id;
  };

  nextButton.addEventListener("click", () => {
    let id = parseInt(nextButton.dataset.id);
    if (id < data.galeri.length) {
      updateGalleryImage(id + 1);
    }
  });

  prevButton.addEventListener("click", () => {
    let id = parseInt(prevButton.dataset.id);
    if (id > 1) {
      updateGalleryImage(id - 1);
    }
  });

  paginationElement.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      updateGalleryImage(+e.target.dataset.id);
    }
  });

  showAllButton.addEventListener("click", () => {
    showAllBox.innerHTML = data.galeri
      .map((item) => `<img src="${item.image}" alt="image galeri">`)
      .join("");
    showAllContainer.classList.add("active");
  });

  closeButton.addEventListener("click", () => {
    showAllBox.innerHTML = "";
    showAllContainer.classList.remove("active");
  });

  initializeGallery();
};
