import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

console.log("js2 loaded");

const emailInput = document.querySelector("#emailinput");
const passwordInput = document.querySelector("#passwordinput");
const continueBtn = document.querySelector("#continue");
const errorBox = document.querySelector(".wronginput");

continueBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email.endsWith("@vit.edu")) {
    if (errorBox) errorBox.style.display = "block";
    return;
  }

  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "home.html";
  } catch (error) {
    if (errorBox) errorBox.style.display = "block";
    console.error(error.code, error.message);
  }
});



