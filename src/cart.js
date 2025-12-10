const CART_KEY = "chocolat_cart";

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showNotification(`${product.name} ajouté au panier`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function updateQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(cart);
    updateCartCount();
    renderCart();
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  renderCart();
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const count = getCartItemCount();
    countEl.textContent = count > 0 ? `(${count})` : "";
  }
}

function showNotification(message) {
  const existing = document.querySelector(".cart-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function renderCart() {
  const cartEmpty = document.getElementById("cart-empty");
  const cartContent = document.getElementById("cart-content");
  const cartItems = document.getElementById("cart-items");
  const cartTotalPrice = document.getElementById("cart-total-price");

  if (!cartItems) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = "block";
    if (cartContent) cartContent.style.display = "none";
    return;
  }

  if (cartEmpty) cartEmpty.style.display = "none";
  if (cartContent) cartContent.style.display = "block";

  cartItems.innerHTML = cart
    .map((item) => {
      let imgPath = item.img;
      if (imgPath.startsWith("/img/")) {
        imgPath = ".." + imgPath;
      } else if (imgPath.startsWith("img/")) {
        imgPath = "../" + imgPath;
      }
      return `
        <div class="cart-item" data-id="${item.id}">
            <img src="${imgPath}" alt="${item.name}" class="cart-item__img" />
            <div class="cart-item__details">
                <h3 class="cart-item__name">${item.name}</h3>
                <p class="cart-item__price">${item.price.toFixed(2)} CHF</p>
            </div>
            <div class="cart-item__quantity">
                <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item__total">${(item.price * item.quantity).toFixed(2)} CHF</div>
            <button class="cart-item__remove" data-id="${item.id}">&times;</button>
        </div>
    `;
    })
    .join("");

  if (cartTotalPrice) {
    cartTotalPrice.textContent = `${getCartTotal().toFixed(2)} CHF`;
  }
}

function initCart() {
  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".feature-card");
      if (card) {
        const product = {
          id: card.dataset.id,
          name: card.dataset.name,
          price: parseFloat(card.dataset.price),
          img: card.dataset.img,
        };
        addToCart(product);
      }
    });
  });

  const cartItems = document.getElementById("cart-items");
  if (cartItems) {
    renderCart();

    cartItems.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (!id) return;

      if (e.target.classList.contains("qty-minus")) {
        updateQuantity(id, -1);
      } else if (e.target.classList.contains("qty-plus")) {
        updateQuantity(id, 1);
      } else if (e.target.classList.contains("cart-item__remove")) {
        removeFromCart(id);
      }
    });
  }

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
}

export { initCart };
