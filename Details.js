import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

async function loadPostDetails() {
  if (!postId) {
    console.error("No post ID in URL");
    return;
  }

  try {
    const docRef = doc(db, "lostItems1", postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Post not found");
      return;
    }

    const data = docSnap.data();

    document.querySelector(".reportedimg").innerHTML =
      `<img src="${data.image || ""}" alt="">`;

    document.querySelector(".reportedimgname").textContent =
      data.itemName || "";

    document.querySelector(".reportedimgdesc").textContent =
      data.description || "";

    document.querySelector(".reportedname").textContent =
      data.reporterName || "";

    document.querySelector(".reportedcontact").textContent =
      data.contact || "";

    document.querySelector(".reportedloc").textContent =
      data.location || "";

    document.querySelector(".reportedcampus").textContent =
      data.campus || "";

    document.querySelector(".reporteddate").textContent =
      data.createdAt?.toDate().toLocaleDateString() || "";

  } catch (err) {
    console.error("Error loading post details:", err);
  }
}

loadPostDetails();


const foundBtn = document.getElementById("foundBtn");

foundBtn.addEventListener("click", async () => {

  const finderName =
    document.querySelector(".finder-form input[placeholder='Enter your name']").value.trim();

  const finderContact =
    document.querySelector(".finder-form input[placeholder='Enter phone or email']").value.trim();

  const finderMessage =
    document.querySelector(".infooffinder").value.trim();

  const foundDate =
    document.getElementById("lostDate").value;

    const submmited = document.querySelector(".submmited");

  if (!finderName || !finderContact) {
    alert("Please enter name and contact");
    return;
  }

  try {
    await addDoc(collection(db, "foundReports"), {
      postId: postId,          
      finderName: finderName,
      finderContact: finderContact,
      message: finderMessage,
      date: foundDate,
      createdAt: serverTimestamp()
    });

   
    submmited.style.display="block";


    // clear form
    document.querySelector(".finder-form").reset?.();

  } catch (error) {
    console.error("Error saving found report:", error);
  }
});
