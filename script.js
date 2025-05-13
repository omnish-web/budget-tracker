import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// 🔐 Your Firebase Config
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

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("form-section").style.display = "block";
  }
});
