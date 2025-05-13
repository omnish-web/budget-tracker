import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const userEmail = user.email;
    sessionStorage.setItem("userEmail", userEmail);
  } else {
    // No user is signed in, redirect to login page
    window.location.href = "login.html";
  }
});

// Handle form submission
document.getElementById("expense-form").addEventListener("submit", (e) => {
  e.preventDefault();

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

  const scriptURL = "https://script.google.com/macros/library/d/1zy7sFCvyR26vlnfiJZZkPTwSDoZ7-ELop8exw5mfODff0UYVHnB9aBpE/2";

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors", // Required for frontend-only project
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
      description: description,
      amount: amount,
      type: type,
      userEmail: userEmail
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
