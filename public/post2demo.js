import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const postsContainer = document.getElementById("postsContainer");

async function loadPosts() {
  try {
    const q = query(
      collection(db, "lostItems1"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach(docSnap => {
      createPost(docSnap.id, docSnap.data());
    });

//     if (docSnap.exists()) {
//   const postData = docSnap.data();

//   // UI fill (tumhara existing code)
//   itemNameEl.textContent = postData.itemName;
//   descEl.textContent = postData.description;

//   // ✅ YE LINE ADD KARO
//   postOwnerId = postData.userId;
// }
 
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

function createPost(docId, data) {
  const postId = docId;
const ownerId = data.ownerId;

  const post = document.createElement("div");
  post.className = "post";
  
    post.setAttribute("data-name", (data.itemName || "").toLowerCase());

  post.innerHTML = `
  <div class="pic">
    <img src="" alt="">
  </div>

  <div class="details">
    <div class="nameloc">

      <div class="item-name">
        <p class="item-name"></p>
      </div>

      <div class="locname">
        <img class="loc" src="locimg.png" alt="loc">
        <span></span>
      </div>

    </div>

    <div class="item-desc">
      <p class="item-desc"></p>
    </div>
  </div>
`;


post.querySelector(".pic img").src = data.image || "";

// item name
post.querySelector(".item-name p").textContent =
  data.itemName || "";

// campus
post.querySelector(".locname span").textContent =
  data.campus || "";

// description
post.querySelector(".item-desc p").textContent =
  data.description || "";


  post.addEventListener("click", () => {
  window.location.href =
    `detail.html?postId=${postId}&ownerId=${ownerId}`;
});




  postsContainer.appendChild(post);
}

loadPosts();


const searchInput = document.getElementById("navSearchInput");
const searchBtn = document.getElementById("navSearchBtn");

searchBtn.addEventListener("click", () => {
  const value = searchInput.value.toLowerCase().trim();
  const posts = document.querySelectorAll(".post");

  searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();   
    searchBtn.click();    
  }
});

  posts.forEach(post => {
    const name = post.getAttribute("data-name");

    if (!value || name.includes(value)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
});
