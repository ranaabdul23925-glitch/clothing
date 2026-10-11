(() => {
  const productGrid = document.getElementById("productGrid");
  const cartCount = document.getElementById("cartCount");
  const drawerCount = document.getElementById("drawerCount");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const toast = document.getElementById("toast");
  let cart = [];
  let toastTimer;

  const money = (amount) => new Intl.NumberFormat("en-PK", {
    style: "currency", currency: "PKR", maximumFractionDigits: 0
  }).format(amount).replace("PKR", "Rs.");

  function renderProducts(filter = "All") {
    const products = window.PRODUCTS || [];
    const visible = filter === "All" ? products : products.filter(p => p.category === filter);
    productGrid.innerHTML = visible.map(product => `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
          <button class="quick-add" data-add="${product.id}">Add to bag +</button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-meta"><span class="product-price">${money(product.price)}</span><span class="product-category">${product.category}</span></div>
          <div class="color-dots" aria-label="Available colors">${product.colors.map(color => `<span class="color-dot" style="background:${color}" title="${color}"></span>`).join("")}</div>
        </div>
      </article>`).join("");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }

  function openCart() {
    cartDrawer.classList.add("open");
    cartBackdrop.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    cartBackdrop.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function addToCart(id) {
    const product = window.PRODUCTS.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    renderCart();
    showToast(`${product.name} added to your bag`);
  }

  function updateQuantity(id, delta) {
    const item = cart.find(entry => entry.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(entry => entry.id !== id);
    renderCart();
  }

  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = totalItems;
    drawerCount.textContent = `(${totalItems})`;
    cartSubtotal.textContent = money(subtotal);
    cartEmpty.hidden = cart.length > 0;
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="">
        <div>
          <h3>${item.name}</h3>
          <p>${money(item.price)}</p>
          <div class="quantity-controls">
            <button data-quantity="${item.id}" data-delta="-1" aria-label="Remove one">−</button>
            <span>${item.quantity}</span>
            <button data-quantity="${item.id}" data-delta="1" aria-label="Add one">+</button>
          </div>
        </div>
        <button class="remove-item" data-remove="${item.id}">Remove</button>
      </div>`).join("");
  }

  productGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(button.dataset.add);
  });

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderProducts(button.dataset.filter);
    });
  });

  document.getElementById("openCart").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);
  cartItems.addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-quantity]");
    const removeButton = event.target.closest("[data-remove]");
    if (quantityButton) updateQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.delta));
    if (removeButton) {
      cart = cart.filter(item => item.id !== removeButton.dataset.remove);
      renderCart();
    }
  });
  document.getElementById("checkoutButton").addEventListener("click", () => {
    showToast(cart.length ? "Checkout will be connected in the backend phase." : "Your bag is empty.");
  });

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();
    if (email) {
      document.getElementById("newsletterMessage").textContent = "Thanks — newsletter signup is a demo and is not stored yet.";
      event.target.reset();
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeCart(); });
  renderProducts();
  renderCart();
})();
