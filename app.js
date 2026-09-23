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

//search by ingredient using api
const apiKey = "MY_API_KEY";
const spoonacular = "https://api.spoonacular.com/recipes/";
const addRecipeInfo = "&addRecipeInformation=true";

const useFakeData = true;

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
  createRecipeCards(data);
});

//search by cuisine choice
cuisineOptions.forEach((button) => {
  button.addEventListener("click", async () => {
    recipeResults.innerHTML = "";
    const cuisine = event.target.dataset.search;
    const data = await getRecipes("cuisine", cuisine);
    createRecipeCards(data);
  });
});

//search by dietary choice
dietaryOptions.forEach((button) => {
  button.addEventListener("click", async () => {
    recipeResults.innerHTML = "";
    const dietary = event.target.dataset.search;
    const data = await getRecipes("dietary", dietary);
    createRecipeCards(data);
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
      return data.results;
    }
    console.log(data);
    return data.results;
  } catch (error) {
    console.log("Error fetching recipes:", error);
  }
}

function createRecipeCards(data) {
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
    li.addEventListener("click", () => {
      getRecipeInfo(li.dataset.id);
    });

    ul.append(li);
  });
  recipeResults.append(ul);
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
  ingredientList.className = "ingredients";

  recipe.extendedIngredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient.name;
    ingredientList.append(ingredientItem);
  });

  modalPopup.innerHTML = `
    <button class="favorite-btn">
      <i class="fa-regular fa-heart"></i>
    </button>
    <h2 class="recipe-title">${recipe.title}</h2>
    <button class="close-btn">
      <i class="fa-solid fa-x close"></i>
    </button>
    <img class="recipe-img" src="${recipe.image}" alt="${recipe.title}"/>
    <p class="prep-time">Prep Time: ${recipe.preparationMinutes}</p>
    <p class="cook-time">Cook Time: ${recipe.cookingMinutes}</p>
    <p class="total-time">Total Time: ${recipe.readyInMinutes}</p>
  `;

  modalPopup.append(ingredientList);

  modalPopup.append(recipe.instructions);

  const closeBtn = document.querySelector(".close-btn");
  const favoriteBtn = document.querySelector(".favorite-btn");

  //implements ability to close modal
  closeBtn.addEventListener("click", () => {
    modalPopup.classList.add("hidden");
  });

  //implements ability to add recipe to favorites
  favoriteBtn.addEventListener("click", () => {
    //add to favorites localStorage
  });

  modalPopup.classList.remove("hidden");
}
