import { data } from "../assets/data/data.js";

export const comentarService = {
  getComentar: async function () {
    try {
      const response = await fetch(data.api);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      return { error: error && error.message };
    }
  },

  addComentar: async function ({ id, name, status, message, date, color }) {
    const comentar = {
      id: id,
      name: name,
      status: status,
      message: message,
      date: date,
      color: color,
    };

    try {
      const response = await fetch(data.api, {
        method: "POST",
        // mode: 'cors', // 'cors' is the default, so you can remove this line
        redirect: "follow", // Good practice for Apps Script
        headers: {
          "Content-Type": "application/json", // Use text/plain for this simple case
        },
        body: JSON.stringify(comentar), // The data is sent as a JSON string
      });

      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Post error:", error);
      return { error: error && error.message };
    }
  },
};
