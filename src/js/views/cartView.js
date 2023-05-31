import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";
import * as model from "../model.js";

class CartView extends View {
  _parentElement = document.querySelector(".cart__list");
  _errorMsg = "Cart Empty";
  _msg = "";

  addHadlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerDeleteItem(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const deleteBtn = e.target.closest(".cart-btn");

      if (!deleteBtn) return;

      // Get the parent list item element
      const listItem = deleteBtn.closest(".cart-list-item");

      // Get the text content of the cart item
      const cartItemText = listItem
        .querySelector(".cart-item")
        .textContent.trim();
      console.log(cartItemText);

      model.state.cartSet.delete(cartItemText);
      persistCart(model.state.cartSet);

      // Call the handler with the cart item text as an argument
      handler(cartItemText);

      // Remove the list item from the DOM
      listItem.remove();
    });
  }

  _generateMarkup() {
    const arr = Array.from(this._data);
    return arr
      .map(
        item =>
          `<li class="cart-list-item">
          <div class="cart-item">
          ${item.charAt(0).toUpperCase() + item.slice(1)}
          </div>
          <button class="cart-btn">&times;</button>
          </li>
          `
      )
      .join("\n");
  }
}

export default new CartView();
