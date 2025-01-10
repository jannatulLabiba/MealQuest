function displayMeals(meals, allMeals) {
    const displayDiv = document.getElementById("mealsDisplay");
    displayDiv.innerHTML = ""; 
  
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
  
      const mealLink = document.createElement("a");
      mealLink.href = `meal.html?id=${meal.idMeal}`;
      mealLink.textContent = "View Details";
      mealLink.className = "mealDetailsLink";
  
      mealItem.appendChild(mealImg);
      mealItem.appendChild(mealName);
      mealItem.appendChild(mealLink);
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