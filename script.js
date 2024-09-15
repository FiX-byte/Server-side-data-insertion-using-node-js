document
  .getElementById("usernameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;

    fetch("submit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${encodeURIComponent(username)}`,
    })
      .then((response) => response.text())
      .then((result) => {
        document.getElementById("message").textContent = result;
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("message").textContent = "An error occurred.";
      });
  });
