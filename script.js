// Initial References
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const userInput = document.getElementById("user-inp");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", searchMeal);

function searchMeal() {
    const userInp = userInput.value.trim();
    if (userInp === "") {
        displayMessage("Input Field Cannot Be Empty");
        return;
    }

    fetch(url + userInp)
        .then(response => response.json())
        .then(data => displayMeal(data.meals[0]))
        .catch(() => displayMessage("Invalid Input"));
}

function displayMessage(message) {
    result.innerHTML = `<h3>${message}</h3>`;
}

function displayMeal(myMeal) {
    console.log(myMeal);
    if (!myMeal) {
        displayMessage("Meal not found");
        return;
    }

    const ingredients = getIngredientsList(myMeal);

    result.innerHTML = `
    <img src="${myMeal.strMealThumb}">
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;

    const ingredientCon = document.getElementById("ingredient-con");
    const parent = document.createElement("ul");
    const recipe = document.getElementById("recipe");
    const hideRecipe = document.getElementById("hide-recipe");
    const showRecipe = document.getElementById("show-recipe");

    ingredients.forEach(ingredient => {
        const child = document.createElement("li");
        child.innerText = ingredient;
        parent.appendChild(child);
    });

    ingredientCon.appendChild(parent);

    hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
    });

    showRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
    });
}

function getIngredientsList(myMeal) {
    const ingredients = [];
    let count = 1;
    for (let i in myMeal) {
        const ingredientKey = `strIngredient${count}`;
        const measureKey = `strMeasure${count}`;
        if (i === ingredientKey && myMeal[i]) {
            const ingredient = myMeal[i];
            const measure = myMeal[measureKey];
            ingredients.push(`${measure} ${ingredient}`);
            count++;
        }
    }
    return ingredients;
}
