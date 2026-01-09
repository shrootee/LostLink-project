import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth } from "./firebase.js";

const imageInput = document.querySelector("#imageInput");
const previewImage = document.querySelector("#previewImage");
const submitBtn = document.querySelector("#submit");
const submitMsg = document.querySelector("#submitmsg");
const allErrors = document.querySelectorAll(".error-msg");
const nameInput = document.querySelector("#nameinput");
const locationInput = document.querySelector("#whereloc");
const descriptionInput = document.querySelector("#describeuserlostitem");
const phoneInput = document.querySelector("#enterphone");
const dateInput = document.querySelector("#lostDate");
const contactNameInput = document.querySelector("#contactname");
const campusOptions = document.querySelectorAll('input[name="selection"]');

allErrors.forEach(err => err.style.display = "none");




imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  previewImage.src = URL.createObjectURL(file);
  previewImage.style.display = "block";
});


function getSelectedCampus() {
  let selected = "";
  campusOptions.forEach((radio) => {
    if (radio.checked) {
      selected = radio.nextElementSibling.innerText;
    }
  });
  return selected;
}


async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "LostLink-c");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dqs8iee0t/image/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();
  return data.secure_url;
}


submitBtn.addEventListener("click", async () => {


  
  
   document.querySelectorAll(".error-msg")
    .forEach(err => err.style.display = "none");

  let hasError = false;

   if (nameInput.value.trim() === "") {
    nameInput.nextElementSibling.style.display = "block";
    hasError = true;
  }


   if (descriptionInput.value.trim() === "") {
    descriptionInput.nextElementSibling.style.display = "block";
    hasError = true;
  }


   if (!getSelectedCampus()) {
    document.querySelector(".campus-error").style.display = "block";
    hasError = true;
  }

  if (locationInput.value.trim() === "") {
    locationInput.nextElementSibling.style.display = "block";
    hasError = true;
  }

  if (contactNameInput.value.trim() === "") {
    contactNameInput.nextElementSibling.style.display = "block";
    hasError = true;
  }

  if (phoneInput.value.trim() === "") {
    phoneInput.nextElementSibling.style.display = "block";
    hasError = true;
  }

  if (dateInput.value.trim() === "") {
    dateInput.nextElementSibling.style.display = "block";
    hasError = true;
  }


   if (hasError) return;

  try {
    let imageURL = "";

    if (imageInput.files[0]) {
      imageURL = await uploadImageToCloudinary(imageInput.files[0]);
    }

    await addDoc(collection(db, "lostItems1"), {
      itemName: nameInput.value,
      reporterName: contactNameInput.value,
      contact: phoneInput.value,
      campus: getSelectedCampus(),
      image: imageURL,
      date: dateInput.value,
      location: locationInput.value,
      description: descriptionInput.value,
      ownerId: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });

    submitMsg.style.display = "block";
    submitMsg.scrollIntoView({
    behavior: "smooth",
  block: "center"
});


  } catch (error) {
    console.error("Error saving to Firestore:", error);
  }
});
