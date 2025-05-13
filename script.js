// Firebase configuration (already present in your HTML file)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC1DOQF-58tc2FkLk4LJ8sW7wabb4mOq94",
    authDomain: "budget-tracker-bf734.firebaseapp.com",
    projectId: "budget-tracker-bf734",
    storageBucket: "budget-tracker-bf734.firebasestorage.app",
    messagingSenderId: "252573094881",
    appId: "1:252573094881:web:ad39c79c7c6a1571c3b8a0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById("login-btn");
const logoutButton = document.getElementById("logout-btn");
const userEmailDisplay = document.getElementById("user-email");

// Sign in with Google
loginButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      userEmailDisplay.textContent = `Logged in as: ${user.email}`;
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
});

// Sign out
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      userEmailDisplay.textContent = "Not logged in";
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
});

// Monitor auth status
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmailDisplay.textContent = `Logged in as: ${user.email}`;
  } else {
    userEmailDisplay.textContent = "Not logged in";
  }
});

// Handle form submission
document.getElementById("expense-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  const user = auth.currentUser;

  if (!user) {
    alert("Please log in first.");
    return;
  }

  const userEmail = user.email;

  // 🔁 REPLACE WITH YOUR DEPLOYED WEB APP URL:
  const scriptURL = "https://script.google.com/macros/s/AKfycbz_Of7I9jBqZHnoQ9fdD42SWKp_rZ_h-2Obg9CyN5UpCHK4dwxmp7DleL105wJV2Lfw/exec";

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors", // Required for frontend-only project
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: date,
      category: category,
      description: description,
      amount: amount,
      type: type,
      userID: userEmail,
    }),
  })
    .then(() => {
      alert("Data sent to Google Sheet!");
      document.getElementById("expense-form").reset();
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      alert("Error sending data.");
    });
});
