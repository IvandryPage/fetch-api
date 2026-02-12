const form = document.getElementById("login-form");
const gallerySection = document.getElementById("gallery-section");
const loadBtn = document.getElementById("load-btn");
const gallery = document.getElementById("gallery");

const API = "https://api.thecatapi.com/v1/images/search?limit=6";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  form.style.display = "none";
  gallerySection.style.display = "block";
});

loadBtn.addEventListener("click", async function () {
  gallery.innerHTML = "Loading...";

  const res = await fetch(API);
  const data = await res.json();

  gallery.innerHTML = "";

  data.forEach(cat => {
    const img = document.createElement("img");
    img.src = cat.url;
    gallery.appendChild(img);
  });
});
