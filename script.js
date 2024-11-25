let API_URL = "https://dummyjson.com/products";

const productsContainer = document.querySelector('.products');

//filmleri görüntüleme
fetch(API_URL)
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

