//Swtiching between search by options
const searchOptionBtns = document.querySelectorAll(".search-option-btn");
const searchOptions = document.querySelectorAll(".search-option");

const ingredientInput = document.querySelector("#ingredient");
const searchBtn = document.querySelector(".search-btn");

//recipe results section
const recipeResults = document.querySelector("#recipe-results");

//cuisine options
const cuisineOptions = document.querySelectorAll(".cuisine-option");

//dietary options
const dietaryOptions = document.querySelectorAll(".dietary-option");

//modal
const modalPopup = document.querySelector("#modal-popup");

//favorites
let favorites = [];
const favoriteRecipes = document.querySelector(".favorite-recipes");

//search by ingredient using api
const apiKey = "MY_API_KEY";
const spoonacular = "https://api.spoonacular.com/recipes/";
const addRecipeInfo = "&addRecipeInformation=true";

const useFakeData = true;

document.addEventListener("DOMContentLoaded", () => {
  favorites = retrieveFavorites();
  displayFavorites();
});

searchOptionBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    //remove class of active from all and then add it to the target
    searchOptionBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    searchOptions.forEach((option) => {
      option.classList.add("hidden");
      if (event.target.dataset.search === option.dataset.search) {
        option.classList.remove("hidden");
      }
    });
    event.target.classList.add("active");
    event.target.dataset.search;
  });
});

//search ingredient results
searchBtn.addEventListener("click", async () => {
  recipeResults.innerHTML = "";
  const data = await getRecipes("ingredient", ingredientInput.value);
  console.log("my data", data);
  createRecipeCards(data, recipeResults);
});

//search by cuisine choice
cuisineOptions.forEach((button) => {
  button.addEventListener("click", async () => {
    recipeResults.innerHTML = "";
    const cuisine = event.target.dataset.search;
    const data = await getRecipes("cuisine", cuisine);
    createRecipeCards(data, recipeResults);
  });
});

//search by dietary choice
dietaryOptions.forEach((button) => {
  button.addEventListener("click", async () => {
    recipeResults.innerHTML = "";
    const dietary = event.target.dataset.search;
    const data = await getRecipes("dietary", dietary);
    createRecipeCards(data, recipeResults);
  });
});

async function getRecipes(searchType, searchValue) {
  let url;

  if (searchType === "ingredient") {
    url = `${spoonacular}complexSearch?includeIngredients=${searchValue}${addRecipeInfo}&apiKey=${apiKey}`;
  }
  if (searchType === "cuisine") {
    url = `${spoonacular}complexSearch?cuisine=${searchValue}${addRecipeInfo}&apiKey=${apiKey}`;
  }
  if (searchType === "dietary") {
    url = `${spoonacular}complexSearch?diet=${searchValue}${addRecipeInfo}&apiKey=${apiKey}`;
  }

  try {
    if (useFakeData) {
      const response = await fetch("fakeData.json");
      const data = await response.json();
      return data.results;
    } else {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.results.length) {
        alert("No recipes found. Try searching for something else.");
      }

      return data.results;
    }
    console.log(data);
    return data.results;
  } catch (error) {
    console.log("Error fetching recipes:", error);
    alert("There was an issue loading the data, thank you for your patience.");
  }
}

function createRecipeCards(data, destination) {
  const ul = document.createElement("ul");
  ul.className = "recipes";

  data.forEach((recipe) => {
    const li = document.createElement("li");
    li.className = "recipe-card";
    li.dataset.id = `${recipe.id}`;
    li.innerHTML = `
    <h2 class="recipe-title">${recipe.title}</h2>
    <img class="recipe-img" src="${recipe.image}" alt="${recipe.title}"/>
    <p class="recipe-time">${recipe.readyInMinutes} min.</p>
    <p class="recipe-servings">Servings: ${recipe.servings}</p>
    `;

    if (destination === favoriteRecipes) {
      li.addEventListener("click", () => {
        createRecipeModal(recipe);
      });
    } else {
      li.addEventListener("click", () => {
        getRecipeInfo(recipe.id);
      });
    }

    ul.append(li);
  });
  destination.append(ul);
}

//fetch the data for the particular recipe clicked on
async function getRecipeInfo(recipe_id) {
  let recipe;

  if (useFakeData) {
    const response = await fetch("fakeData.json");
    const data = await response.json();

    recipe = data.results.find((recipe) => recipe.id == recipe_id);
  } else {
    const url = `${spoonacular}${recipe_id}/information?includeNutrition=true&apiKey=${apiKey}`;

    const response = await fetch(url);
    recipe = await response.json();
  }

  createRecipeModal(recipe);
}

//create the modal popup for the clicked on recipe
function createRecipeModal(recipe) {
  const ingredientList = document.createElement("ul");
  const ingredientDiv = document.createElement("div");
  ingredientDiv.className = "ingredients";

  //search recipe object for nutritional info
  const chosenNutrients = ["Calories", "Protein", "Carbohydrates", "Fat"];
  const nutrients = recipe.nutrition.nutrients.filter((nutrient) =>
    chosenNutrients.includes(nutrient.name),
  );
  const nutritionDiv = document.createElement("div");
  nutritionDiv.className = "nutrition";

  nutrients.forEach((nutrient) => {
    const nutrientType = document.createElement("p");
    const nutrientAmount = document.createElement("p");

    nutrientType.className = "nutrient-type";
    nutrientAmount.className = "nutrient-amount";

    nutrientType.textContent = nutrient.name;
    nutrientAmount.textContent = `${nutrient.amount} ${nutrient.unit}`;

    nutritionDiv.append(nutrientType, nutrientAmount);
  });

  recipe.extendedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient.name;
    ingredientList.append(ingredientItem);
  });

  const isFavorite = favorites.some((favorite) => favorite.id === recipe.id);

  modalPopup.innerHTML = `
    <button class="favorite-btn">
      <i class="${isFavorite ? "fa-solid" : "fa-regular"} fa-heart"></i>
    </button>
    <h2 class="recipe-title">${recipe.title}</h2>
    <button class="close-btn">
      <i class="fa-solid fa-x close"></i>
    </button>
    <p class="servings">Servings: ${recipe.servings}</p>
    <img class="recipe-img" src="${recipe.image}" alt="${recipe.title}"/>
    <p class="prep-time">Prep Time: ${recipe.preparationMinutes}</p>
    <p class="cook-time">Cook Time: ${recipe.cookingMinutes}</p>
    <p class="total-time">Total Time: ${recipe.readyInMinutes}</p>
  `;

  ingredientDiv.innerHTML = `<h3>Ingredients</h3>`;
  ingredientDiv.append(ingredientList);
  modalPopup.append(ingredientDiv);

  const instructionsDiv = document.createElement("div");
  const instructionsHTML = document.createElement("div");
  instructionsDiv.className = "instructions";
  instructionsDiv.innerHTML = `<h3>Instructions</h3>`;
  instructionsHTML.innerHTML = recipe.instructions;

  instructionsDiv.append(instructionsHTML);

  modalPopup.append(instructionsDiv);
  modalPopup.append(nutritionDiv);

  const closeBtn = document.querySelector(".close-btn");
  const favoriteBtn = document.querySelector(".favorite-btn");

  //implements ability to close modal
  closeBtn.addEventListener("click", () => {
    modalPopup.classList.add("hidden");
  });

  //implements ability to add recipe to favorites
  favoriteBtn.addEventListener("click", () => {
    updateFavorite(recipe);
  });

  modalPopup.classList.remove("hidden");
}

//update list of favorite recipes but clicking heart icon
function updateFavorite(recipe) {
  const recipeCard = document.querySelector(`[data-id="${recipe.id}"]`);

  const favoriteBtn = modalPopup.querySelector(".favorite-btn");
  const heartIcon = favoriteBtn.querySelector("i");
  const isFavorite = favorites.some((favorite) => favorite.id === recipe.id);

  if (isFavorite) {
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular");
    recipeCard.classList.remove("favorite");

    favorites = favorites.filter((favorite) => favorite.id !== recipe.id);
  } else {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
    recipeCard.classList.add("favorite");

    favorites.push(recipe);
  }

  saveFavesLocally();
  displayFavorites();
}

function displayFavorites() {
  favoriteRecipes.innerHTML = "";
  if (favorites === []) {
    return;
  } else {
    createRecipeCards(favorites, favoriteRecipes);
  }
}

function saveFavesLocally() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function retrieveFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}
