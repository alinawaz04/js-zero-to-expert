import * as model from "./model.js";
import { DEFAULT_ING_AMT, MODAL_CLOSE_SEC, API_URL, KEY } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";
import { AJAX } from "./helpers.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import cartView from "./views/cartView.js";

if (module.hot) {
  module.hot.accept;
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    // 4) updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

controlPagination = function (goToPage) {
  // render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // sdd/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

let def = 1;
const controlEditRecipe = async function (recipe) {
  console.log(recipe);

  const firstListItem = document.querySelector(
    ".recipe__ingredient-list li.recipe__ingredient"
  );
  const ing1 = document.querySelector(".ing-1");
  console.log(ing1);

  // Select the quantity, unit, and description elements within the first list item
  const quantityElement = firstListItem.querySelector(".recipe__quantity");
  const unitElement = firstListItem.querySelector(".recipe__unit");
  const descriptionElement = firstListItem.querySelector(
    ".recipe__description"
  );

  // Get the values of the quantity, unit, and description
  const quantity = quantityElement.textContent.trim();
  const unit = unitElement.textContent.trim();
  const descriptionTweak = descriptionElement.textContent.trim().split("\n");
  const description = (descriptionTweak[1] && descriptionTweak[1].trim()) || "";

  // Retrieve the input elements
  const quantityInput = document.querySelector(
    'input[name="ingredient-1-quantity"]'
  );
  const unitInput = document.querySelector('input[name="ingredient-1-unit"]');
  const descriptionInput = document.querySelector(
    'input[name="ingredient-1-description"]'
  );

  // Update the values of the input elements
  quantityInput.value = quantity;
  unitInput.value = unit;
  descriptionInput.value = description;

  for (let i = def; i < recipe.length; i++) {
    addRecipeView._addIngredient(
      recipe[i].quantity,
      recipe[i].unit,
      recipe[i].description
    );
  }
  def = recipe.length;

  const id = window.location.hash.slice(1);
  addRecipeView.toggleWindow();
  recipeView.renderSpinner();
  const deleteRecipe = await AJAX(`${API_URL}${id}?key=${KEY}`, null, "DELETE");
  window.location.hash = "";
};

// const cartSet = new Set();
const controlAddToCart = function (description) {
  model.addToCart(description);
};

const controlCartView = function () {
  cartView.render(model.state.cartSet);
};

const controlCartDelete = function (item) {
  console.log(item);
};

controlPrintPage = function () {};

const init = function () {
  bookmarksView.addHadlerRender(controlBookmarks);
  cartView.addHadlerRender(controlCartView);
  cartView.addHandlerDeleteItem(controlCartDelete);
  cartView.addHandlerPrintPage(controlPrintPage);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addhandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  recipeView.addHandlerEdit(controlEditRecipe);
  recipeView.addHandlerAddToCart(controlAddToCart);
};
init();

// const clearBookmarks = function () {
//   localStorage.clear();
// };
// clearBookmarks();
