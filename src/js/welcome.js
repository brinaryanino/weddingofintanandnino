import { data } from "../assets/data/data.js";
import {
  addClassElement,
  getQueryParameter,
  removeClassElement,
} from "../utils/helper.js";

export const welcome = () => {
  /* =======================
     DOM ELEMENTS
  ======================== */
  const welcomeElement = document.querySelector(".welcome");
  const homeElement = document.querySelector(".home");
  const navbarElement = document.querySelector("header nav");

  const [_, figureElement, weddingToElement, openWeddingButton] =
    welcomeElement.children;

  const [audioMusic, audioButton] = document.querySelector(".audio").children;
  const [iconButton] = audioButton.children;

  /* =======================
     FIGURE (COUPLE)
  ======================== */
  const generateFigureContent = (bride) => {
    const {
      L: { name: brideLName },
      P: { name: bridePName },
      couple: coupleImage,
    } = bride;

    return `
      <img src="${coupleImage}" alt="couple animation">
      <figcaption>
        ${brideLName.split(" ")[1]} & ${bridePName.split(" ")[1]}
      </figcaption>
    `;
  };

  /* =======================
     GUEST NAME FROM URL
  ======================== */
  const generateParameterContent = () => {
    const nameInput = document.querySelector("#name");
    const params = getQueryParameter("to");

    let guestName = "Teman-teman semua";

    if (params) {
      guestName = decodeURIComponent(params.replace(/\+/g, " "));
    }

    weddingToElement.innerHTML = `
      Kepada Yth Bapak/Ibu/Saudara/i<br>
      <span id="guest-name"></span>
    `;

    const guestNameElement = document.querySelector("#guest-name");
    guestNameElement.textContent = guestName;

    // Autofill RSVP name
    if (nameInput) {
      nameInput.value = guestName;
    }
  };

  /* =======================
     AUDIO CONTROL
  ======================== */
  const initialAudio = () => {
    let isPlaying = false;

    audioMusic.innerHTML = `
      <source src="${data.audio}" type="audio/mp3">
    `;

    audioButton.addEventListener("click", () => {
      if (!isPlaying) {
        addClassElement(audioButton, "active");
        removeClassElement(iconButton, "bx-play-circle");
        addClassElement(iconButton, "bx-pause-circle");
        audioMusic.play();
      } else {
        removeClassElement(audioButton, "active");
        removeClassElement(iconButton, "bx-pause-circle");
        addClassElement(iconButton, "bx-play-circle");
        audioMusic.pause();
      }

      isPlaying = !isPlaying;
    });
  };

  /* =======================
     OPEN WEDDING ACTION
  ======================== */
  openWeddingButton.addEventListener("click", () => {
    addClassElement(document.body, "active");
    addClassElement(welcomeElement, "hide");

    setTimeout(() => {
      addClassElement(homeElement, "active");
      addClassElement(navbarElement, "active");
      addClassElement(audioButton, "show");

      removeClassElement(iconButton, "bx-play-circle");
      addClassElement(iconButton, "bx-pause-circle");
      audioMusic.play();
    }, 1500);

    setTimeout(() => {
      addClassElement(audioButton, "active");
    }, 3000);
  });

  /* =======================
     INITIALIZE
  ======================== */
  const initializeWelcome = () => {
    figureElement.innerHTML = generateFigureContent(data.bride);
    generateParameterContent();
    addClassElement(welcomeElement, "active");
  };

  initializeWelcome();
  initialAudio();
};
