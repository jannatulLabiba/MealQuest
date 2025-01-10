// Get meal ID from URL
const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");

if (mealId) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        displayMealDetail(data.meals[0]);
      } else {
        document.getElementById("mealDetail").innerHTML = "Meal not found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching meal details:", error);
      document.getElementById("mealDetail").innerHTML = "Failed to fetch meal details.";
    });
}

function displayMealDetail(meal) {
  const detailDiv = document.getElementById("mealDetail");

  const mealName = `<h1>${meal.strMeal}</h1>`;
  const mealImg = `<img src="${meal.strMealThumb}" alt="Meal Image" class="meal-image">`;
 
  // Display ingredients
  let ingredients = "<ul>";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients += `<li>${ingredient} - ${measure}</li>`;
    }
  }
  ingredients += "</ul>";

  const mealIngredients = `<h3>Ingredients:</h3>${ingredients}`;
  const mealInstructions = `<h3>Cooking Instructions:</h3><p>${meal.strInstructions}</p>`;

  detailDiv.innerHTML = `${mealName}${mealImg}${mealIngredients}${mealInstructions}`;
}