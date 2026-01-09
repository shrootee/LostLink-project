import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db, auth } from "./firebase.js";

import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const notifContainer = document.getElementById("notifContainer");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    console.log("No user logged in");
    return;
  }

  console.log("Logged in user:", user.uid);

  const q = query(
    collection(db, "foundReport"),
    where("ownerId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  console.log("Notifications found:", snapshot.size);

  // if (snapshot.empty) {
  //   notifContainer.innerHTML = "<p>No notifications yet</p>";
  //   return;
  // }

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    showNotification(data);
  });
});


async function showNotification(data) {
  const card = document.createElement("div");
  card.className = "notif-card";

  let imageHTML = "";
  let itemNameHTML = "";

  if (data.postId) {
    const postRef = doc(db, "lostItems1", data.postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();

      // ✅ ITEM NAME
      if (postData.itemName) {
        itemNameHTML = postData.itemName;
      }

      // ✅ IMAGE (string-based, CSS-friendly)
      if (postData.image) {
        imageHTML = `
          <img src="${postData.image}" alt="item image">
        `;
      }
    }
  }

  const time = data.createdAt
    ? data.createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

  card.innerHTML = `
    <div class="status">
      <div class="status-dot"></div>
      <div class="status-text">New Found Report</div>
    </div>

    <div class="notif-details">
      <div class="info">
        <p><strong>Item:</strong> ${itemNameHTML}</p>
        <p><strong>Location Found:</strong> ${data.finderlocation || ""}</p>
        <p><strong>Date:</strong> ${data.date || ""}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Finder Name:</strong> ${data.finderName || ""}</p>
        <p><strong>Contact:</strong> ${data.finderContact || ""}</p>
      </div>

      <div class="notiimg">
        ${imageHTML}
      </div>
    </div>

    <div class="message">
      Someone has reported an item that closely matches
      the details of your lost item.
    </div>
  `;

  notifContainer.appendChild(card);
}
