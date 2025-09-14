import { data } from "../assets/data/data.js";

export const comentarService = {
  // Ambil komentar dari Apps Script
  getComentar: async function () {
    try {
      const response = await fetch(data.api);
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
      const response = await fetch(data.api, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comentar),
      });

      if (!response.ok) throw new Error("Failed to post comment");
      return await response.json();
    } catch (error) {
      console.error("Post error:", error);
      return { error: error.message };
    }
  },
};
