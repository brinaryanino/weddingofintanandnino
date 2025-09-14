import { data } from "../assets/data/data.js";

async function loadComments() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwXUqhzMOxb_i2o-mhNGzaDVQmhg-aXQfe2hZGJ_9VusMDK2MxqmVEsF6xSqnsdQ4Ze7g/exec"
    );
    const data = await response.json();

    const container = document.getElementById("comments");
    container.innerHTML = "";

    data.forEach((row) => {
      container.innerHTML += `
        <div style="color:${row.color || "#000"}">
          <b>${row.name}</b> (${row.status})<br>
          ${row.message}<br>
          <small>${row.date}</small>
          <hr>
        </div>
      `;
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

loadComments();
