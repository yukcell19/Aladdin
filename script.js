let productsURL = "https://dummyjson.com/products";
let categoriesURL = "https://dummyjson.com/products/category-list"

const productsContainer = document.querySelector('.products');
const categoryitems = document.querySelector(".category-items")


fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    getProducts(data.products);
  });

function getProducts(products) {
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("pitem");
    productItem.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}" />
          <div class="pinfo">
            <p>${product.title}</p>
            <span>$${product.price}</span>
            <button type="button" class="btn btn-primary">Buy</button>
          </div>
        `;
        productsContainer.appendChild(productItem);
  });
}


fetch(categoriesURL)
.then((response) => response.json())
.then((data) => {
  getCategories(data)
})

function getCategories(categories){
  categories.forEach((category) => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("category-item");
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    categoryItem.innerHTML = `
      <a href="">${capitalizedCategory}</a>
    `
    categoryitems.appendChild(categoryItem);
  })
}

//sayfalar arası geçiş işlemleri
const paginationContainer = document.querySelector(".pagination");
// Belirli bir sayfanın ürünlerini getir
function paginationEvents(page) {
  const limit = 30; // Her sayfada gösterilecek ürün sayısı
  const skip = (page - 1) * limit; // Kaç ürün atlanacağını hesapla
  fetch(`${productsURL}?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      productsContainer.innerHTML = ""; // Önce mevcut ürünleri temizle
      getProducts(data.products); // Yeni ürünleri ekle
    });
}

paginationContainer.addEventListener("click", (e) => {
  const pageButton = e.target.closest(".page-btn"); // En yakın .page-btn elementini bul
  if (pageButton) {
    const page = parseInt(pageButton.dataset.page); // Hangi sayfa tıklandıysa al
    paginationEvents(page); // İlgili sayfanın ürünlerini getir

    // Aktif sayfa butonunu işaretle
    document.querySelectorAll(".page-btn").forEach((button) => {
      button.classList.toggle("active", button === pageButton);
    });
  }
});

