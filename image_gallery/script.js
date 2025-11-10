
const apiKey = "Nz-GDqgbpS6GU3fNkBUcpOD8uUsikrd9M0dE2beDvHM"; // 🔑 got access key from https://unsplash.com/developers
const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");

let page = 1;
const perPage = 10;
let isLoading = false;


async function fetchImages() {
  if (isLoading) return; // prevent multiple fetches at once,cuz user might scroll too fast
  isLoading = true;
  loading.style.display = "block";

  const url = `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    displayImages(data);
    page++; 
  } catch (error) {
    console.error("Error fetching images:", error);
  } finally {
    isLoading = false;
    loading.style.display = "none";
  }
}


function displayImages(images) {
  images.forEach(img => {
    const imageElement = document.createElement("img");
    imageElement.src = img.urls.small;
    imageElement.alt = img.alt_description || "Unsplash image";
    gallery.appendChild(imageElement);
  });
}

// Infinite scroll listener
window.addEventListener("scroll", () => {
  // if user scrolled to nearby the bottom of the page then do load more...
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    fetchImages();
  }
});

//  Initial fetch
fetchImages();
