function initProductFilter() {
  const priceFilter = document.getElementById("price-filter");

  if (priceFilter) {
    priceFilter.addEventListener("change", (e) => {
      filterProducts(e.target.value);
    });
  }

  initFlipCards();
}

function initFlipCards() {
  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
}

function filterProducts(priceRange) {
  const allProducts = document.querySelectorAll(".feature-card");
  let visibleCount = 0;

  allProducts.forEach((product) => {
    const price = parseFloat(product.dataset.price);
    let shouldShow = false;

    if (priceRange === "all") {
      shouldShow = true;
    } else {
      const [min, max] = priceRange.split("-").map(Number);
      shouldShow = price >= min && price < max;
    }

    if (shouldShow) {
      product.style.display = "";
      visibleCount++;
    } else {
      product.style.display = "none";
    }
  });

  updateProductCount(visibleCount);
}

function updateProductCount(count) {
  const productsCount = document.getElementById("products-count");
  if (productsCount) {
    productsCount.textContent = `${count} produit${count !== 1 ? "s" : ""}`;
  }
}

export { initProductFilter };
