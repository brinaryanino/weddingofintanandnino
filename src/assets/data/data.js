export const data = {
  bride: {
    L: {
      id: 1,
      name: "Brinarya Nino Sudhipurwa S.Kom",
      child: "Putra Pertama",
      father: "Subri Ahadi",
      mother: "Sunariyati Karya Ningdiah",
      image: "./src/assets/images/cowo.png",
    },
    P: {
      id: 2,
      name: "Bdn. Intan Zahiroh S.Keb",
      child: "Putri Kelima",
      father: "Zainul Falach",
      mother: "Dewi Maryam",
      image: "./src/assets/images/cewe.png",
    },

    couple: "./src/assets/images/couple.png",
  },

  time: {
    marriage: {
      year: "2026",
      month: "Januari",
      date: "17",
      day: "Sabtu",
      hours: {
        start: "08.00",
        finish: "Selesai",
      },
    },
    reception: {
      year: "2026",
      month: "Januari",
      date: "17",
      day: "Sabtu",
      hours: {
        start: "10.00",
        finish: "Selesai",
      },
    },
    address:
      "Jl. Raya Puntir, Purwosari, Pasuruan, Jawa Timur (Tb Rizquna Sumber Agung)",
  },

  link: {
    calendar: "https://calendar.app.google/4YX8aFRTKbATBmyP6",
    map: "https://maps.app.goo.gl/xbBdK7W7SYjzhEbF9",
  },

  galeri: [
    {
      id: 1,
      image: "./src/assets/images/1.png",
    },
    {
      id: 2,
      image: "./src/assets/images/2.png",
    },
    {
      id: 3,
      image: "./src/assets/images/3.png",
    },
    {
      id: 4,
      image: "./src/assets/images/4.png",
    },
    {
      id: 5,
      image: "./src/assets/images/5.png",
    },
  ],

  bank: [
    {
      id: 1,
      name: "BCA",
      icon: "./src/assets/images/bca.png",
      rekening: "3151304514",
      pemilik: "Intan Zahiroh",
    },
    {
      id: 2,
      name: "Mandiri",
      icon: "./src/assets/images/mandiri.png",
      rekening: "1610010938822",
      pemilik: "Brinarya Nino Sudhipurwa",
    },
  ],

  audio: "./src/assets/audio/wedding.mp3",

  api: "https://script.google.com/macros/s/AKfycby7zQVZWcAwLdgCwxl4BOqaoFDZAfBK2775DY01mEem8njp_M2sPmUH0TCC70XgbNW8Rg/exec",

  navbar: [
    {
      id: 1,
      teks: "Home",
      icon: "bx bxs-home-heart",
      path: "#home",
    },
    {
      id: 2,
      teks: "Mempelai",
      icon: "bx bxs-group",
      path: "#bride",
    },
    {
      id: 3,
      teks: "Tanggal",
      icon: "bx bxs-calendar-check",
      path: "#time",
    },
    {
      id: 4,
      teks: "Galeri",
      icon: "bx bxs-photo-album",
      path: "#galeri",
    },
    {
      id: 5,
      teks: "Ucapan",
      icon: "bx bxs-message-rounded-dots",
      path: "#wishas",
    },
  ],
};
