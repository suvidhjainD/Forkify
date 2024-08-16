import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipie = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1> load recipie
    await model.loadRecipe(id);

    //  2> Rending recipie
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.RenderErrorHandeling();
  }
};

const controlSearch = async function () {
  try {
    resultsView.renderSpinner();
    //1> Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2> Load results
    await model.loadSearchResults(query);

    //3 Render results
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipie);
  searchView.addHandlerSearch(controlSearch);
};
init();
