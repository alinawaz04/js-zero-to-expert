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
        .textContent.trim()
        .toLowerCase();
      console.log(cartItemText);

      model.state.cartSet.delete(cartItemText);

      // Retrieve the cart items from localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      // Remove the item from the storedCart array
      const updatedCart = storedCart.filter(item => item !== cartItemText);

      // Save the updated cart items back to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Call the handler with the cart item text as an argument
      handler(cartItemText);

      // Remove the list item from the DOM
      listItem.remove();
    });
  }

  addHandlerPrintPage(handler) {
    const printBtn = document.getElementById("print-btn");
    if (!printBtn) return;

    printBtn.addEventListener("click", () => {
      const printWindow = window.open("", "_blank");
      const cart = localStorage.getItem("cart");

      const cartArray = JSON.parse(cart);
      const cartFormattedString = cartArray
        .map(item => `- ${this._capitalizeFirstLetter(item)}`)
        .join("<br>");

      if (!cart) return;
      printWindow.document.write(`
        <html>
          <head>
            <title>Shopping Cart</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
  
              h1 {
                text-align: center;
                color: #333;
              }
  
              ul {
                list-style-type: disc;
                padding-left: 20px;
                text-align: center
              }
  
              li {
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <h1>Shopping Cart</h1>
            <ul>
               ${cartFormattedString}
            </ul>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    });
  }

  _capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _generateMarkup() {
    this._data = Array.from(this._data);
    return this._data
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
