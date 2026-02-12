const form = document.getElementById("login-form");
const gallerySection = document.getElementById("gallery-section");
const loadBtn = document.getElementById("load-btn");
const gallery = document.getElementById("gallery");

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=6";

/* ---------- LOGIN FLOW ---------- */
function handleLogin(event) {
  event.preventDefault();

  showGallery();
}

function showGallery() {
  form.style.display = "none";
  gallerySection.style.display = "block";
}

/* ---------- FETCH FLOW ---------- */
async function handleLoadCats() {
  setLoadingState(true);

  try {
    const cats = await fetchCats();
    renderCats(cats);
  } catch (error) {
    showError("Failed to load cats.");
  } finally {
    setLoadingState(false);
  }
}

async function fetchCats() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

/* ---------- RENDERING ---------- */
function renderCats(cats) {
  gallery.innerHTML = "";

  cats.forEach(cat => {
    const img = document.createElement("img");
    img.src = cat.url;
    img.alt = "Cat image";
    gallery.appendChild(img);
  });
}

function showError(message) {
  gallery.innerHTML = `<p>${message}</p>`;
}

function setLoadingState(isLoading) {
  if (isLoading) {
    loadBtn.disabled = true;
    gallery.textContent = "Loading...";
  } else {
    loadBtn.disabled = false;
  }
}

/* ---------- EVENT LISTENERS ---------- */
form.addEventListener("submit", handleLogin);
loadBtn.addEventListener("click", handleLoadCats);
