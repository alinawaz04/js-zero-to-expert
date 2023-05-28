import { RES_PER_PAGE } from "../config";
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
  ingredientCount = 4;
  _ingColumn = document.querySelector(".ingredients");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addIngredientHandler();
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

  _addIngredient() {
    this.ingredientCount++;

    const label = document.createElement("label");
    label.textContent = `Ingredient ${this.ingredientCount}`;

    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.name = `ingredient-${this.ingredientCount}-quantity`;

    const unitInput = document.createElement("input");
    unitInput.type = "text";
    unitInput.name = `ingredient-${this.ingredientCount}-unit`;

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.name = `ingredient-${this.ingredientCount}-description`;

    this._ingColumn.appendChild(label);
    this._ingColumn.appendChild(quantityInput);
    this._ingColumn.appendChild(unitInput);
    this._ingColumn.appendChild(descriptionInput);
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
