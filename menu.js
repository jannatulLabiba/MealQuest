document.addEventListener("DOMContentLoaded", function () {
    fetchMenu();
  });
  
  function fetchMenu() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.categories) {
          displayMenu(data.categories);
        } else {
          document.getElementById("menuDisplay").innerHTML = "No menu items found.";
        }
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        document.getElementById("menuDisplay").innerHTML = "Failed to fetch menu items.";
      });
  }
  
  function displayMenu(categories) {
    const menuDisplay = document.getElementById("menuDisplay");
    menuDisplay.innerHTML = ""; // Clear previous content
  
    categories.forEach((category) => {
      const menuItem = document.createElement("div");
      menuItem.className = "menu-item";
  
      const menuImg = document.createElement("img");
      menuImg.src = category.strCategoryThumb;
      menuImg.alt = category.strCategory;
  
      const menuTitle = document.createElement("h3");
      menuTitle.textContent = category.strCategory;
  
      const menuDesc = document.createElement("p");
      menuDesc.textContent = category.strCategoryDescription.substring(0, 100) + "...";
  
      menuItem.appendChild(menuImg);
      menuItem.appendChild(menuTitle);
      menuItem.appendChild(menuDesc);
      menuDisplay.appendChild(menuItem);
    });
  }