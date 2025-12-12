import { initCart } from "./cart.js";
import { initContactForm } from "./contact-form.js";
import { initProductFilter } from "./product-filter.js";

document.addEventListener("DOMContentLoaded", function () {
  initCart();
  initContactForm();
  initProductFilter();
});
