const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const listofmeals = document.getElementById('listofmeals')
const btnKenya = document.getElementById('kenyameals')
const kenyaMealapp = document.getElementById('btnKenya')
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const hidesection = document.getElementById("hide-meals").style.display = "none";
const form = document.getElementById('addIngridients')

// for scrolling meals to right and left
const productContainers = [...document.querySelectorAll('.product')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

// fuction for scrolling to right and left
productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;

    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})


// event listeners
searchBtn.addEventListener('click', getMealList);
kenyaMealapp.addEventListener('click', foodKenya)
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// funtion to display section and hide log in
function showItems() {
    document.getElementById("hide-meals").style.display = "block";
    document.getElementById("sign-in").style.display = "none";
}

// function to get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal for international meals
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// funtion to create kenya meals
fetch(`https://api.npoint.io/2eea172ce6ce1997759e/meals/`).then((response) => response.json())
    .then(json => {
        json.map(data => {
            console.log(data)
            kenyaMealapp.append(foodKenya(data))

        })
    })



function foodKenya({ strFood, strMealThumb }) {
    let container = document.createElement("container")
    container.innerHTML = `
                 <div id="space" class = "meal-item">
                <div class = "meal-img">
                      <img src = "${strMealThumb}" alt = "Food">
                     </div>
             <div class = "meal-name">
             <h3>${strFood}</h3>
             <a href = "#" class = "recipe-btn">Get Recipe</a>
            </div>
        </div>
                 </div> >
       <!-- end of meal item -->
              
        
    `;
    return container
}
// post new meal to get ingrideients
form.addEventListener('submit', function (e) {
    // prevent auto submit
    e.preventDefault()

    let name = document.getElementById('strFood').value
    let image = document.getElementById('strMealThumb').value

    fetch("https://api.npoint.io/2eea172ce6ce1997759e/meals/", {
        method: 'POST',
        body: JSON.stringify({
            strMeal: strFood,
            strMealThumb: strMealThumb
        }),
        headers: {
            "content-Type": "applictaion/json; charset=UTF-8"
        }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
})
// funtion to display section and hide log in
function showItems() {
    document.getElementById("hide-meals").style.display = "block";
    document.getElementById("sign-in").style.display = "none";
}

// function to get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}
