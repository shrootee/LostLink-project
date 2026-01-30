const home = document.querySelector(".home");
const yourreports = document.querySelector(".yourreports");
const notiimg = document.querySelector("#notiimg");
const pluslogo = document.querySelector("#pluslogo");
const dot3 = document.querySelector("#dot3");



// yourreports?.addEventListener("click", () => {
//   window.location.href = "yourreports.html";
// });

notiimg?.addEventListener("click", () => {
  window.location.href = "./noti.html";
});

home?.addEventListener("click", () => {
  window.location.href = "./home.html";
});

pluslogo?.addEventListener("click", () => {
  window.location.href = "report.html";
});

yourreports?.addEventListener("click", () => {
  window.location.href = "myreports.html";
});

dot3?.addEventListener("click", () => {
  window.location.href = "myreports.html";
});