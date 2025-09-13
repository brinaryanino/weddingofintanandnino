import { data } from "../assets/data/data.js";

export const comentarService = {
  getComentar: async function () {
    try {
      const response = await fetch(data.api);
      return await response.json();
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
          "Content-Type": "text/plain;charset=utf-8", // Use text/plain for this simple case
        },
        body: JSON.stringify(comentar), // The data is sent as a JSON string
      });

      return await response.json(); // Now you can read the response
    } catch (error) {
      console.error("Post error:", error);
      return { error: error.message };
    }
  },
};

// This is an example of the function that runs when the user clicks "submit"
async function handleFormSubmit(event) {
  event.preventDefault(); // Stop the form from reloading the page

  // 1. Show the loading indicator
  const loadingSpinner = document.getElementById("loading"); // Assuming you have an element with id="loading"
  loadingSpinner.style.display = "block";

  // Create the data object from your form
  const newCommentData = {
    id: Date.now(), // Generate a simple unique ID
    name: document.getElementById("nameInput").value,
    status: "Hadir", // Or get from form
    message: document.getElementById("messageInput").value,
    date: new Date().toISOString(),
    color: "#000000", // Or generate randomly
  };

  // 2. Save the new comment
  const postResponse = await comentarService.addComentar(newCommentData);

  // 3. Check if it was successful, then fetch ALL comments
  if (postResponse && !postResponse.error) {
    const commentsResponse = await comentarService.getComentar();

    // 4. Update the UI with the new list of comments
    if (commentsResponse && commentsResponse.data) {
      displayComments(commentsResponse.data); // This is your function that renders the comments to HTML
    }
  } else {
    alert("Failed to save comment."); // Show an error
  }

  // 5. Hide the loading indicator
  loadingSpinner.style.display = "none";
}

// Make sure you have a function to display the comments
function displayComments(comments) {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML = ""; // Clear the old comments

  // Loop through the comments and create HTML for each one
  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = `
      <strong>${comment.name}</strong> (${comment.status})
      <p>${comment.message}</p>
      <small>${comment.date}</small>
    `;
    commentsContainer.appendChild(commentElement);
  });
}
