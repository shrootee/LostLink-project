import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// const params = new URLSearchParams(window.location.search);
// const postId = params.get("id");

const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");
const ownerId = params.get("ownerId");






// window.postOwnerId = null;



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
    window.postItemName = data.itemName;
window.postImage = data.image;
// document.getElementById("postItemName").value = data.itemName;
// document.getElementById("postImage").value = data.image;


    window.postOwnerId = data.ownerId;


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



