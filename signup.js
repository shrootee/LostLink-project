
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const emailInput = document.querySelector("#emailinput");
const passwordInput = document.querySelector("#passwordinput");
const continueBtn = document.querySelector("#continue");
const errorBox = document.querySelector(".wronginput");


continueBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  
  if (!email.endsWith("@vit.edu")) {
    if (errorBox) errorBox.style.display = "block";
    return;
  }

  
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    
    window.location.href = "home.html";
  } catch (error) {
    alert(error.message);
    console.error(error.code);
  }
});
