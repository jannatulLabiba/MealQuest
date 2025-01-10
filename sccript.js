function searchMeals() {
    var mealName = document.getElementById("mealName").value;
    if (!mealName) {
      alert("Please enter a meal name!");
      return;
    }
  
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName;
  
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.meals) {
          displayMeals(data.meals.slice(0, 5), data.meals);
        } else {
          displayMeals([], []);
        }
      })
      .catch(function (error) {
        console.log("Error fetching meals:", error);
        document.getElementById("mealsDisplay").innerHTML = "Failed to fetch meals.";
      });
  }
  
  function displayMeals(meals, allMeals) {
    var displayDiv = document.getElementById("mealsDisplay");
    displayDiv.innerHTML = ""; 
  
    if (meals.length === 0) {
      displayDiv.innerHTML = "No meals found.";
      return;
    }
  
    meals.forEach(function (meal) {
      var mealItem = document.createElement("div");
      mealItem.className = "mealItem";
  
      var mealImg = document.createElement("img");
      mealImg.src = meal.strMealThumb;
      mealImg.alt = "Meal Image";
  
      var mealName = document.createElement("h3");
      mealName.textContent = meal.strMeal;
  
      var mealInstruction = document.createElement("p");
      mealInstruction.textContent = "Cooking Instruction: " + meal.strInstructions.substring(0, 100) + "...";
  
      var mealID = document.createElement("p");
      mealID.textContent = "Meal ID: " + meal.idMeal;
  
      mealItem.appendChild(mealImg);
      mealItem.appendChild(mealName);
      mealItem.appendChild(mealInstruction);
      mealItem.appendChild(mealID);
      displayDiv.appendChild(mealItem);
    });
  
    if (allMeals.length > 5) {
      var showAllButton = document.createElement("button");
      showAllButton.className = "show-all-button";
      showAllButton.textContent = "SHOW ALL";
      showAllButton.onclick = function () {
        displayMeals(allMeals, []);
      };
      displayDiv.appendChild(showAllButton);
    }
  }