const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

// Simulated user data storage
const users = [];

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  // Simulate registration by adding user data to the array
  users.push({ username, password });

  showMessage("Registration successful. You can now log in.", "success");
  registerForm.reset();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Simulate authentication by checking user data in the array
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    showMessage("Login successful. Redirecting to secured page...", "success");
    // Simulate redirecting to a secured page
    setTimeout(() => {
      window.location.href = "secured.html";
    }, 2000);
  } else {
    showMessage("Login failed. Please check your credentials.", "error");
    loginForm.reset();
  }
});

function showMessage(text, type) {
  message.textContent = text;
  message.classList.add(type);
  setTimeout(() => {
    message.textContent = "";
    message.classList.remove(type);
  }, 3000);
}
