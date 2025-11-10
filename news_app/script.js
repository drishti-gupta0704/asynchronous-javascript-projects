
const apiKey = "d9d35e06a67b49899e2f209b0a75ef6a"; // 🔑 Get it from https://newsapi.org/
let currentPage = 1;
const pageSize = 10;
let currentQuery = "technology";

const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

async function fetchNews() {
  const url = `https://newsapi.org/v2/everything?q=${currentQuery}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;

  newsContainer.innerHTML = `<p style="text-align:center;">Loading...</p>`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length === 0) {
      newsContainer.innerHTML = `<p style="text-align:center;">No results found</p>`;
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = `<p style="text-align:center;">Error fetching news.</p>`;
    console.error("Error:", error);
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300x150'}" alt="news">
      <h3>${article.title}</h3>
      <p>${article.description ? article.description.slice(0, 100) + "..." : "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(card);
  });

  pageNumber.textContent = `Page ${currentPage}`;
  prevBtn.disabled = currentPage === 1;
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    currentPage = 1;
    fetchNews();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  fetchNews();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchNews();
  }
});

// Loading the initial news
fetchNews();   