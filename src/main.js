import { home } from "./js/home.js";
import { bride } from "./js/bride.js";
import { time } from "./js/time.js";
import { galeri } from "./js/galeri.js";
import { wishas } from "./js/wishas.js";
import { navbar } from "./js/navbar.js";
import { welcome } from "./js/welcome.js";
import { comentarService } from "./services/comentarService.js";

// load content
document.addEventListener("DOMContentLoaded", async () => {
  AOS.init();

  welcome();
  navbar();
  home();
  bride();
  time();
  galeri();
  wishas();

  await renderComments();
  setupForm();
});

async function renderComments() {
  const container = document.getElementById("comment-list");
  container.innerHTML = "<li>Loading...</li>";

  try {
    const data = await comentarService.getComentar();
    console.log("Data komentar:", data);

    if (!data || data.length === 0) {
      container.innerHTML = "<li>Belum ada komentar</li>";
      return;
    }

    container.innerHTML = "";

    data.forEach((row) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="comment-item">
          <strong>${row.name}</strong> (${
        row.status === "y" ? "Hadir" : "Tidak Hadir"
      })<br>
          ${row.message}<br>
          <small>${row.date}</small>
        </div>
      `;
      container.appendChild(li);
    });
  } catch (err) {
    container.innerHTML = `<li style="color:red;">Error: ${err.message}</li>`;
  }
}

// In your app.js or main.js file

const loadInitialComments = async () => {
  loadingSpinner.style.display = "block";

  // Fetch the comments
  const response = await comentarService.getComentar();

  // ADD THIS CHECK!
  // This ensures you only proceed if 'response.data' is an actual array.
  if (response && Array.isArray(response.data)) {
    displayComments(response.data);
  } else {
    // Handle the error gracefully if the API fails
    console.error("Failed to load comments or no comments found:", response);
    commentsContainer.innerHTML =
      "<p>Gagal memuat ucapan. Coba segarkan halaman.</p>"; // "Failed to load comments. Try refreshing."
  }

  loadingSpinner.style.display = "none";
};
// Handle submit form
function setupForm() {
  const form = document.getElementById("comment-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const status = form.status.value;
    const message = form.message.value.trim();
    const date = new Date().toLocaleString("id-ID");
    // id bisa pakai timestamp biar unik
    const newComment = {
      id: Date.now().toString(),
      name,
      status,
      message,
      date,
      color: "#000000",
    };

    try {
      const res = await comentarService.addComentar(newComment);
      console.log("Hasil POST:", res);

      // reset form
      form.reset();

      // render ulang komentar biar kelihatan langsung
      await renderComments();
    } catch (err) {
      alert("Gagal kirim komentar: " + err.message);
    }
  });
}
