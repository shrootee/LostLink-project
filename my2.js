const emailInput = document.querySelector("#email input");
const passwordInput = document.querySelector("#password input");
const continueBtn = document.querySelector("#continue");
const spinner = document.querySelector("#spinner");
const btnText = document.querySelector("#btnText");

continueBtn.addEventListener("click", function(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  console.log(`email is : ${email}`);
  console.log(`password is : ${password}`);

  // Email validation
  if (!email.endsWith("@vit.edu")) {
    alert("Email must end with @vit.edu");
    return;
  }

  // Password validation (DDMMYYYY)
  const dobPattern = /^\d{8}$/;
  if (!dobPattern.test(password)) {
    alert("Password must be DDMMYYYY format.");
    return;
  }

  // Storing the data
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  // Simulate processing delay then redirect
  setTimeout(() => {
    window.location.href = "home.html";
  }, 2000);
});
