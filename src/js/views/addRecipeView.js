import { DEFAULT_ING_AMT, RES_PER_PAGE } from "../config";
import View from "./View";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _msg = "Recipe successfully uploaded";
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _btnEdit = document.querySelector(".edit__btn");
  _btnEditIng = document.querySelector(".btn--edit");
  ingredientCount = DEFAULT_ING_AMT;
  _ingColumn = document.querySelector(".ingredients");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addIngredientHandler();
    this._deleteIngredientHandler();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      if (!e.submitter.classList.contains("upload__btn")) {
        return;
      }
      handler(data);
    });
  }

  _addIngredientHandler() {
    this._btnEdit.addEventListener("click", e => {
      e.preventDefault();
      this._addIngredient();
    });
  }

  _addIngredient(quantity = "", unit = "", description = "") {
    this.ingredientCount++;

    const ingredientContainer = document.createElement("div");
    ingredientContainer.classList.add("ingredient-container");

    const label = document.createElement("label");
    label.textContent = `Ingredient ${this.ingredientCount}`;

    const quantityInput = document.createElement("input");
    quantityInput.value = quantity;
    quantityInput.type = "text";
    quantityInput.name = `ingredient-${this.ingredientCount}-quantity`;
    quantityInput.placeholder = "Quantity";

    const unitInput = document.createElement("input");
    unitInput.value = unit;
    unitInput.type = "text";
    unitInput.name = `ingredient-${this.ingredientCount}-unit`;
    unitInput.placeholder = "Unit";

    const descriptionInput = document.createElement("input");
    descriptionInput.value = description;
    descriptionInput.type = "text";
    descriptionInput.name = `ingredient-${this.ingredientCount}-description`;
    descriptionInput.placeholder = "Description";
    // descriptionInput.required = true;

    ingredientContainer.appendChild(label);
    ingredientContainer.appendChild(quantityInput);
    ingredientContainer.appendChild(unitInput);
    ingredientContainer.appendChild(descriptionInput);

    // Remove any existing delete buttons
    const existingDeleteButtons = document.querySelectorAll(".delete-ing");
    existingDeleteButtons.forEach(button => button.classList.add("hidden"));

    if (this.ingredientCount > 1) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-ing");
      deleteButton.innerHTML = "&times;";
      ingredientContainer.appendChild(deleteButton);
    }

    this._ingColumn.appendChild(ingredientContainer);
  }

  _deleteIngredientHandler() {
    this._parentElement.addEventListener("click", e => {
      const deleteBtn = e.target.closest(".delete-ing");
      if (!deleteBtn) return;

      const ingItem = deleteBtn.closest(".ingredient-container");
      const ingredientItems = document.querySelectorAll(
        ".ingredient-container"
      );
      const ingCount = ingredientItems.length;

      if (this.ingredientCount > 1) {
        ingItem.remove();
        this.ingredientCount--;

        // Check if there is a second-to-last ingredient
        if (ingCount > 2) {
          // Get the new second-to-last ingredient
          const secondToLastIngItem = ingredientItems[ingCount - 2];
          const deleteButton = secondToLastIngItem.querySelector(".delete-ing");

          // Remove the hidden class from the delete button
          if (deleteButton) {
            deleteButton.classList.remove("hidden");
          }
        }
      }
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
