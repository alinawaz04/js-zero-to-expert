import icons from "url:../../img/icons.svg";
import fracty from "fracty";
import View from "./View.js";
import addRecipeView from "./addRecipeView.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _data;
  _errorMsg = "We could not find that recipe :( Please try again!";
  _msg;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMsg) {
    const markup = `
    <div class="error">
        <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._msg) {
    const markup = `
    <div class="message">
        <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerEdit(handler) {
    // Add event listener for the "Edit" button
    // Delegate event listener to parent element
    this._parentElement.addEventListener("click", function (e) {
      const editBtn = e.target.closest(".edit--btn");
      if (editBtn) {
        const quantityEls = document.querySelectorAll(".recipe__quantity");
        const unitEls = document.querySelectorAll(".recipe__unit");
        const descriptionEls = document.querySelectorAll(
          ".recipe__description"
        );

        const ingredients = [];

        // Iterate over the ingredient elements
        quantityEls.forEach((quantityEl, index) => {
          const unitEl = unitEls[index];
          const descriptionEl = descriptionEls[index];

          const quantity = quantityEl.textContent;
          const unit = unitEl.textContent;
          const descriptionTweak = descriptionEl.textContent.trim().split("\n");
          const description =
            (descriptionTweak[1] && descriptionTweak[1].trim()) || "";

          // Create an ingredient object
          const ingredient = { quantity, unit, description };

          // Add the ingredient object to the ingredients array
          ingredients.push(ingredient);
        });

        handler(ingredients);
      }
    });
  }

  addHandlerAddToCart(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const cartBtn = e.target.closest(".add-to-cart");

      if (!cartBtn) return;

      const descriptionEl = cartBtn.parentElement.querySelector(
        ".recipe__description"
      );
      console.log(descriptionEl);

      const descriptionTweak = descriptionEl.textContent.trim().split("\n");
      let description = "";
      if (descriptionTweak.length === 2) {
        description = (descriptionTweak[1] && descriptionTweak[1].trim()) || "";
      }
      if (descriptionTweak.length === 1) {
        description = (descriptionTweak[0] && descriptionTweak[0].trim()) || "";
      }

      console.log(description);

      handler(description.toLowerCase());
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <button class = "btn edit--btn"> Edit </button>
    </div>

    <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
    </div>
      
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
            </p>
            <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
            >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>`;
  }

  _generateMarkupIngredient(ing) {
    return `
            <li class="recipe__ingredient">
                <button class = "add-to-cart"> 
                <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                </svg>
                </button>
                <div class="recipe__quantity">${
                  ing.quantity ? fracty(ing.quantity) : ""
                }</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
                </div>
            </li>
            `;
  }
}

export default new RecipeView();
