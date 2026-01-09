import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");
const ownerId = params.get("ownerId");

const foundBtn = document.getElementById("foundBtn");
const submmitedmsg = document.querySelector(".submmited-msg");



foundBtn.addEventListener("click", async () => {

  // const postItemName =
  // document.getElementById("postItemName").value;

// const postImage =
//   document.getElementById("postImage").value;

  const finderName =
    document.querySelector(".finder-form input[placeholder='Enter your name']").value.trim();

  const finderContact =
    document.querySelector(".finder-form input[placeholder='Enter phone or email']").value.trim();

    // const finderlocation =
    // document.querySelector(".finder-form input[placeholder='Location or description']").value.trim();

    const finderlocation = document.querySelector(".infooffinder").value.trim();

  // const finderMessage =
  //   document.querySelector(".infooffinder").value.trim();

  const foundDate =
    document.getElementById("lostDate").value;

    const submmited = document.querySelector(".submmited");

  if (!finderName || !finderContact) {
    alert("Please enter name and contact");
    return;
  }

  



  try {
    await addDoc(collection(db, "foundReport"), {
      postId: postId,     
      ownerId: ownerId,    
      finderName: finderName,
      finderContact: finderContact,
      finderlocation: finderlocation,
      // message: finderMessage,
      date: foundDate,
      // itemName: postItemName,
      // image: postImage,
      createdAt: serverTimestamp()
    });

    submmitedmsg.style.display="block";
   
    // submmited.style.display="block";


    // clear form
    document.querySelector(".finder-form").reset?.();

  } catch (error) {
    console.error("Error saving found report:", error);
  }
});