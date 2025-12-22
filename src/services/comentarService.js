import { data } from "../assets/data/data.js";

export const comentarService = {
  // GET komentar
  getComentar: async () => {
    try {
      const response = await fetch(data.api, {
        method: "GET",
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      console.log("Get response:", response);
      const text = await response.text();
      return JSON.parse(text);

    } catch (error) {
      console.error("Get error:", error);
      return { error: error.message };
    }
  },

  // POST komentar
  addComentar: async ({ id, name, status, message, date, color }) => {
    try {
      const body = new URLSearchParams({
        id,
        name,
        status,
        message,
        date,
        color
      });
      const res = await fetch(data.api, {
        method: "POST",
        body
        color,
      });
      const res = await fetch(data.api, {
        method: "POST",
        body,
      });
      const text = await res.text();
      console.log("RAW:", text);
      return JSON.parse(text);
    } catch (err) {
      console.error("POST ERROR:", err);
      return { error: err.message };
    }
  }
};
