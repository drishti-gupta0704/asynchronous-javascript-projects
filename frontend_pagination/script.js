

const data = [
  "Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
  "Item 6", "Item 7", "Item 8", "Item 9", "Item 10",
  "Item 11", "Item 12", "Item 13", "Item 14", "Item 15",
  "Item 16", "Item 17", "Item 18", "Item 19", "Item 20"
];

let currentPage = 1;
const itemsPerPage = 5;
const totalPages = Math.ceil(data.length / itemsPerPage);

const itemsDiv = document.getElementById("items");
const pageInfo = document.getElementById("pageInfo");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");


function displayItems() {

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = data.slice(start, end);


  itemsDiv.innerHTML = paginatedItems.map(item => `<p>${item}</p>`).join("");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;


  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}


nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayItems();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayItems();
  }
});

//  doing Initial rendering
displayItems();
