import { API_URL, RES_PER_PAGE, KEY } from "./config";
// import { getJSON, sendJSON } from "./helpers";
import { AJAX } from "./helpers";
import addRecipeView from "./views/addRecipeView";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
  cart: [],
  cartSet: new Set(),
};

const createRecipeObject = function (data, editable = false) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    editable: editable,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err} poo poo`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} poo poo`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // mark current as not bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

export const addToCart = function (description) {
  if (description === "") return;
  state.cartSet.add(description);
  const cartArr = Array.from(state.cartSet);
  persistCart(cartArr);
  location.reload();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
  const cart = localStorage.getItem("cart");
  if (cart) state.cartSet = new Set(JSON.parse(cart));
  console.log(state.cartSet);
};

init();

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};
const clearCart = function () {
  localStorage.removeItem("cart");
};
clearCart();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = [];

    // Loop through each ingredient input field
    for (let i = 1; i <= addRecipeView.ingredientCount; i++) {
      let quantity = newRecipe[`ingredient-${i}-quantity`];
      let unit = newRecipe[`ingredient-${i}-unit`];
      let description = newRecipe[`ingredient-${i}-description`];

      // Only process the ingredient if all three parts are present
      // if (quantity && unit && description) {
      ingredients.push({
        quantity: +quantity,
        unit,
        description,
      });
      // }
    }

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
      editable: true,
    };

    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data, true);
    addBookmark(state.recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
};

export const persistCart = function (cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
};
