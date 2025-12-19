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

      console.log("Komentar berhasil ditambahkan:");
      // reset form
      form.reset();

      // render ulang komentar biar kelihatan langsung
      await renderComments();
    } catch (err) {
      console.log("Gagal menambahkan komentar:", err);
      alert("Gagal kirim komentar: " + err.message);
    }
  });
}
