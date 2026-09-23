//Swtiching between search by options
const searchOptionBtns = document.querySelectorAll(".search-option-btn");
const searchOptions = document.querySelectorAll(".search-option");

const ingredientInput = document.querySelector("#ingredient");
const searchBtn = document.querySelector(".search-btn");

//search by ingredient using api
const apiKey = "MY_API_KEY";
const spoonacular = "https://api.spoonacular.com/recipes";

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



searchBtn.addEventListener("click", () => {
  getRecipes("ingredient", ingredientInput.value);
});

async function getRecipes(searchType, searchValue) {
  let url;

  if (searchType === "ingredient") {
    url = `${spoonacular}/findByIngredients?ingredients=${searchValue}&apiKey=${apiKey}`;
  }
  if (searchType === "cuisine") {

  }
  if (searchType === "dietary") {
    
  }

  try {
    const response = await fetch(url);

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("Error fetching recipes:", error);
  }
}