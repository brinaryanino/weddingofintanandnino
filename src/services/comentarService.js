import { data } from "../assets/data/data.js";

export const comentarService = {
  // Ambil komentar dari Apps Script
  getComentar: async function () {
    try {
      const SPREADSHEET_ID = "1gKLTa21AscSYRplFajRbGzoSlBh_fHJzF239PcP9ZsQ";
      const response = await fetch(
        `https://script.google.com/macros/s/${SPREADSHEET_ID}/exec`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error("Get error:", error);
      return { error: error.message };
    }
  },

  // Tambah komentar ke Apps Script
  addComentar: async function ({ id, name, status, message, date, color }) {
    const comentar = { id, name, status, message, date, color };

    try {
      const response = await fetch(
        `https://script.google.com/macros/s/${data.api}/exec`,
        {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comentar),
        }
      );

      if (!response.ok) throw new Error("Failed to post comment");
      return await response.json();
    } catch (error) {
      console.error("Post error:", error);
      return { error: error.message };
    }
  },
};
