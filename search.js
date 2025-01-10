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
        displayMeals(data.meals.slice(0, 5), data.meals); // Pass the first 5 meals and all meals
      } else {
        document.getElementById("mealsDisplay").innerHTML = "No meals found.";
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

  meals.forEach((meal) => {
    const mealItem = document.createElement("div");
    mealItem.className = "mealItem";

    const mealImg = document.createElement("img");
    mealImg.src = meal.strMealThumb;
    mealImg.alt = "Meal Image";

    const mealName = document.createElement("h3");
    mealName.textContent = meal.strMeal;

    const mealID = document.createElement("p");
    mealID.textContent = `Meal ID: ${meal.idMeal}`;

    mealItem.appendChild(mealImg);
    mealItem.appendChild(mealName);
    mealItem.appendChild(mealID);

    // Add click event to navigate to the meal detail page
    mealItem.addEventListener("click", () => {
      window.location.href = `meal-detail.html?id=${meal.idMeal}`;
    });

    displayDiv.appendChild(mealItem);
  });

  if (allMeals.length > meals.length) {
    const showAllButton = document.createElement("button");
    showAllButton.className = "show-all-button";
    showAllButton.textContent = "SHOW ALL";
    showAllButton.addEventListener("click", () => displayMeals(allMeals, [])); // Show all meals
    displayDiv.appendChild(showAllButton);
  }
}