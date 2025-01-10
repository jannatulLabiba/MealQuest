document.getElementById("searchButton").addEventListener("click", function () {
  const mealName = document.getElementById("mealName").value;

  if (!mealName) {
    alert("Please enter a meal name!");
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        displayMeals(data.meals.slice(0, 5), data.meals);
      } else {
        displayMeals([], []);
      }
    })
    .catch((error) => {
      console.error("Error fetching meals:", error);
      document.getElementById("mealsDisplay").innerHTML = "Failed to fetch meals.";
    });
});

function displayMeals(meals, allMeals) {
  const displayDiv = document.getElementById("mealsDisplay");
  displayDiv.innerHTML = ""; // Clear previous results

  if (meals.length === 0) {
    displayDiv.innerHTML = "No meals found.";
    return;
  }

  meals.forEach((meal) => {
    const mealItem = document.createElement("div");
    mealItem.className = "mealItem";

    const mealImg = document.createElement("img");
    mealImg.src = meal.strMealThumb;
    mealImg.alt = "Meal Image";

    const mealName = document.createElement("h3");
    mealName.textContent = meal.strMeal;

    const mealInstruction = document.createElement("p");
    mealInstruction.textContent =
      "Cooking Instruction: " + meal.strInstructions.substring(0, 100) + "...";

    const mealID = document.createElement("p");
    mealID.textContent = "Meal ID: " + meal.idMeal;

    mealItem.appendChild(mealImg);
    mealItem.appendChild(mealName);
    mealItem.appendChild(mealInstruction);
    mealItem.appendChild(mealID);
    displayDiv.appendChild(mealItem);
  });

  if (allMeals.length > 5) {
    const showAllButton = document.createElement("button");
    showAllButton.className = "show-all-button";
    showAllButton.textContent = "SHOW ALL";
    showAllButton.onclick = function () {
      displayMeals(allMeals, []);
    };
    displayDiv.appendChild(showAllButton);
  }
}