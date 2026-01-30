import { db, auth } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const myPostsContainer = document.getElementById("mypostsContainer");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    myPostsContainer.innerHTML = "<p>Please login to see your reports.</p>";
    return;
  }

  try {
    const q = query(
      collection(db, "lostItems1"),
      where("ownerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      myPostsContainer.innerHTML = "<p>No reports found.</p>";
      return;
    }

    snapshot.forEach(docSnap => {
      
      createMyPost(docSnap.id, docSnap.data());
    });

  } catch (err) {
    console.error(err);
  }
});

function createMyPost(docId, data) {
  const post = document.createElement("div");
  post.className = "post-card";

  const time = data.createdAt
    ? data.createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

  const imageHTML = data.image
    ? `<div class="post-img">
         <img src="${data.image}" alt="item image">
       </div>`
    : "";

  post.innerHTML = `
    <div class="info">
      <p class="dot3"><strong>⋮</strong></p>
      <div class="delbox">Delete</div>

      <p><strong>Item:</strong> ${data.itemName || ""}</p>
      <p><strong>Location Found:</strong> ${data.location || ""}</p>
      <p><strong>Date:</strong> ${data.date || ""}</p>
      <p><strong>Finder Name:</strong> ${data.reporterName || ""}</p>
      <p><strong>Contact:</strong> ${data.contact || ""}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Campus:</strong> ${data.campus || ""}</p>
    </div>

    <div class="mypostimg">
      ${imageHTML}
    </div>
  `;

  // 🔥 SAME ELEMENTS, SAME PLACE — ONLY LOGIC ADDED
  const dot3 = post.querySelector(".dot3");
  const delbox = post.querySelector(".delbox");

  delbox.style.display = "none"; // default hide

    delbox.addEventListener("click", async () => {
    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "lostItems1", docId));
      post.remove(); // UI se bhi hata do
    } catch (err) {
      console.error("Delete failed:", err);
    }
  });


  dot3.addEventListener("click", () => {
    delbox.style.display =
      delbox.style.display === "block" ? "none" : "block";
  });

  myPostsContainer.appendChild(post);
}
