import { data } from "../assets/data/data.js";

export const comentarService = {
  // Ambil komentar dari Apps Script
  getComentar: async function () {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbzUkkSDXYjNUubrkKioKAyPFCHhgJqZXDXWERbYktDok8NKrfcWE8bvvBhYGJ2FMBnt3g/exec`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error("Get error:", error);
      console.log("Gagal mengambil:111", error);
      return { error: error.message };
    }
  },

  // Tambah komentar ke Apps Script
  addComentar: async function ({ id, name, status, message, date, color }) {
    const comentar = { id, name, status, message, date, color };

    try {
      const response = await fetch(data.api, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comentar),
      });

      if (!response.ok) throw new Error("Failed to post comment");
      console.log("Gagal mengambil komentar:", error);
      return await response.json();
    } catch (error) {
      console.error("Post error:", error);
      console.log("Gagal mengambil:", error);
      return { error: error.message };
    }
  },
};
