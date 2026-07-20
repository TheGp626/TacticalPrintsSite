/* ==========================================================================
   TacticalPrints — cart (localStorage based)
   No payment provider wired up yet — checkout collects an order summary
   and hands off via mailto. Swap CHECKOUT_EMAIL and the checkout handler
   in cart.html once a payment method (Stripe Payment Links / Snipcart) is chosen.
   ========================================================================== */

const CART_KEY = "tp_cart_v1";
const CHECKOUT_EMAIL = "patryk@tacticalprints.de";

// Some browsers block localStorage entirely (private/incognito mode, or a page
// opened straight from disk via file:// with strict storage settings). Detect
// that up front and fall back to an in-memory cart for the session instead of
// letting every add-to-cart click throw silently.
let _memoryCart = [];
let _storageOK = false;
try {
  const testKey = "__tp_storage_test__";
  localStorage.setItem(testKey, "1");
  localStorage.removeItem(testKey);
  _storageOK = true;
} catch (e) {
  _storageOK = false;
  console.warn("TacticalPrints: localStorage unavailable, using in-memory cart for this session.", e);
}

function getCart() {
  if (!_storageOK) return _memoryCart;
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return _memoryCart;
  }
}

function saveCart(cart) {
  if (_storageOK) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      _storageOK = false;
      _memoryCart = cart;
      console.warn("TacticalPrints: localStorage write failed, switching to in-memory cart.", e);
    }
  } else {
    _memoryCart = cart;
  }
  updateCartBadge();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
  showToast("Added to cart");
}

function removeFromCart(id) {
  saveCart(getCart().filter(item => item.id !== id));
}

function setQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartLines() {
  // joins stored cart (id/qty) with live PRODUCTS data
  return getCart()
    .map(item => {
      const product = (typeof PRODUCTS !== "undefined") ? PRODUCTS.find(p => p.id === item.id) : null;
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

function cartSubtotal() {
  return cartLines().reduce((sum, l) => sum + l.lineTotal, 0);
}

function updateCartBadge() {
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = cartCount();
  });
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
