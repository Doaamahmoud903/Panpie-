let catTab = document.getElementById('cat-tab');
let searchTab = document.getElementById('search-tab');
let areaTab = document.getElementById('area-tab');
let ingTab = document.getElementById('ing-tab');
let contactTab = document.getElementById('contact-tab');
let mealDetails = document.getElementById('meal-details');
let searchContainer = document.getElementById('search-container');
let mainContainer = document.getElementById('main-container');
let submitButton;
let ageError , nameError , emailError , phoneError ,passwordError ,rePasswordError= "";

////////////////////////////////////////////////////////////////////
$(document).ready(()=>{
    searchByName("").then(()=>{
        $("#loading-container").fadeOut(500);
        $("body").css("overflow","visible");
        $("#inner-loading").fadeOut(500);
    })
});

function openSidebar(){
    $('.nav-sidebar').animate({left : 0},500); 
    $('i.open-close-icon').removeClass('fa-bars');
    $('i.open-close-icon').addClass('fa-times');
     
    for (let i = 0; i < 6; i++) {
        $('.links-item').eq(i).animate({
            top:0
        },(i+5)*100)
        }

}
function closeSidebar(){
    let boxWidth = $('.nav-sidebar .sidebar-tab').outerWidth();
    $('.nav-sidebar').animate({left : -boxWidth}, 500, 'linear');
    $('i.open-close-icon').removeClass('fa-times');
    $('i.open-close-icon').addClass('fa-bars');

    $('.links-item').animate({top: -300},500);


}
closeSidebar();


$('i.open-close-icon').click(()=>{
    if($('.nav-sidebar').css('left') == '0px'){
       closeSidebar();
    }else{
        openSidebar();

    }
})



///////////////////////////////////////////////////////////////////////
function displayMeals(arr){
     let cartoona ="" ;
     for(let i = 0 ; i < arr.length ; i++){
        cartoona+=`
        <div class="col-md-3 mx-auto mt-3">
				<div onclick="clearAndGetSpecificMeal('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
					<img src="${arr[i].strMealThumb}" class="w-100" alt="">
					<div class="meal-overlay position-absolute d-flex align-items-center justify-content-center">
						<p>${arr[i].strMeal}</p>
					</div>
				</div>
		</div>`;

     }
     mainContainer.innerHTML = cartoona;
}

function clearAndGetSpecificMeal(mealId) {
    mainContainer.innerHTML = ""; // Clear the main container
    getSpecificMeal(mealId); // Call the original function
    
}

//////////////////////////////////////////////////////////////////////////////////////////////
async function getCategories(){
    $("#inner-loading").fadeIn(200);
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response = await response.json();
    displayCategory(response.categories);
    $("#inner-loading").fadeOut(200);
}

function displayCategory(arr){
    let cartoona ="" ;
    for(let i = 0 ; i < arr.length ; i++){
       cartoona+=`
       <div class="col-md-3 mt-3 py-2">
               <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                   <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
                   <div class="meal-overlay position-absolute d-flex align-items-center justify-content-center">
                       <p>${arr[i].strCategory}</p>
                   </div>
               </div>
       </div>`;

    }
    mainContainer.innerHTML = cartoona;
    $("#inner-loading").fadeOut(200);    // Then hide the loader
}
catTab.addEventListener('click', ()=>{
    closeSidebar();
    mainContainer.innerHTML="";
    searchContainer.innerHTML="";
    getCategories();
});

//////////////////////////////////////////////////////////////
async function getArea() {
    $("#inner-loading").fadeIn(200);
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response = await response.json();
    displayArea(response.meals);
    $("#inner-loading").fadeOut(200);


}
function displayArea(arr){
    let cartoona ="" ;
    for(let i = 0 ; i < arr.length ; i++){
       cartoona+=`
       <div class="col-md-3 mt-4 mx-2 card">
               <div onclick="getCategoryArea('${arr[i].strArea}')" class="meal w-100 rounded-2 card-body cursor-pointer">
                    <p class="card-text fw-bold" >${arr[i].strArea}</p>
               </div>
       </div>`;

    }
    mainContainer.innerHTML = cartoona;
}
areaTab.addEventListener('click', ()=>{
    closeSidebar();
    mainContainer.innerHTML="";
    searchContainer.innerHTML="";
    getArea();
});

////////////////////////////////////////////////////////////////////////////////////////
async function getIngrediants() {
    $("#inner-loading").fadeIn(200);
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    response = await response.json();
    displayIngrediants(response.meals.slice(0,100));
    $("#inner-loading").fadeOut(200);


}
function displayIngrediants(arr){
    let cartoona ="" ;
    for(let i = 0 ; i < arr.length ; i++){
        let description = arr[i].strDescription ? arr[i].strDescription.split(" ").slice(0,15).join(" ") : "No description available";
       cartoona+=`
       <div class="col-md-3 mt-4 card ms-3">
               <div onclick="getCategoryIng('${arr[i].strIngredient}')" class="meal rounded-2 card-body cursor-pointer">
                    <p class="card-title fw-bold bg-black text-white ps-2">${arr[i].strIngredient}</p>
                    <img src="https://www.themealdb.com/images/ingredients/${arr[i].strIngredient}.png" class="card-img-top" alt="...">
                    <p class="card-body">${description}</p>
               </div>
       </div>`;

    }
    mainContainer.innerHTML = cartoona;
}
ingTab.addEventListener('click', ()=>{
    closeSidebar();
    mainContainer.innerHTML="";
    searchContainer.innerHTML="";
    getIngrediants();
});

/////////////////////////////////////////////////////////////
async function getCategoryMeals(category){
    $("#inner-loading").fadeIn(200);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response= await response.json();
    displayMeals(response.meals);
    $("#inner-loading").fadeOut(200);

    
}

//////////////////////////////////////////////////////////
async function getCategoryArea(area) {
    $("#inner-loading").fadeIn(200);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response= await response.json();
    displayMeals(response.meals);
    $("#inner-loading").fadeOut(200);

}

//////////////////////////////////////////////////////////
async function getCategoryIng(ingrediant) {
    $("#inner-loading").fadeIn(200);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`);
    response= await response.json();
    displayMeals(response.meals);
    $("#inner-loading").fadeOut(200);
}
//////////////////////////////////////////////////////////
async function getSpecificMeal(mealId) {
    mainContainer.innerHTML="";
    $("#inner-loading").fadeIn(200);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    response= await response.json();
    displaySpecificMeal(response.meals[0]);
    $("#inner-loading").fadeOut(200);
}



function displaySpecificMeal(meal){
    let ingrediants=``;
    for (let i = 0; i < 10; i++) {
        if(meal[`strIngredient${i}`]){
            ingrediants += `<div class="btn tabColor text-white fs-5 ms-2 mt-2 text-capitalize">
								<span class="text-danger">${meal[`strMeasure${i}`]} </span> ${meal[`strIngredient${i}`]}
							</div>`
        }
        
    }
    let tags = meal.strTags?.split(",");
    if(!tags) tags= [];
    let tagsList=``;
    for (let i = 0; i < tags.length; i++) {
        tagsList += `<div class="btn tabColor text-white fs-5 ms-2 mt-2 text-capitalize">
						${tags[i]}
					</div>`
        
    }
    let instruction =meal.strInstructions ? meal.strInstructions.split(" ").slice(0,60).join(" ") : "No instruction available";
    let cartoona =`
    <div class="row py-5 d-flex justify-content-center primaryFont" id="meal-details">
    		<div class="col-md-4">
				<div class="meal-photo">
					<img src="${meal.strMealThumb}" alt="meal-deails" class="w-100 rounded-2" />
					<div class="meal-heading mt-2 text-center">
						<h2>${meal.strMeal}</h2>
					</div>
				</div>
			</div>
			<div class="col-md-7  ms-5">
				<div class="meal-info">
					<div class="meal-instruction ">
						<h2>Instruction</h2>
						<p class="fs-5">${instruction}</p>
						<p class="fs-4">Area : ${meal.strArea}</p>
						<p class="fs-4">Category : ${meal.strCategory}</p>
					</div>
					<hr/>
					<div class="meal-reciepe mb-3 py-2">
						<h2>Reciepe ..</h2>
						<div class="meal-tabs">
							${ingrediants}
						</div>
					</div>
					<hr/>
					<div class="meal-tags mb-3 py-2">
						<h2>Tags</h2>
						${tagsList}
					</div>
                    <hr/>
                    <a type="button" target="_blank" href="${meal.strSource}" class="fs-5 btn btn-primary">
							Source
					</a>
					<a type="button" target="_blank" href="${meal.strYoutube}" class="fs-5 btn btn-danger">
							Youtube
					</a>
			</div>
		</div>
        </div>

    `;
   
    mainContainer.innerHTML =cartoona;
   
}
//////////////////////////////////////////////
searchTab.addEventListener('click', ()=>{
    closeSidebar();
    showSearchData();
    mainContainer.innerHTML="";
    
});
contactTab.addEventListener('click',()=>{
    closeSidebar();
    showContacts();

});

function showSearchData() {
    let cartoona = `<form class="row g-3 pt-5">
			        <div class="col-md-6">
			          <input onkeyup="searchByName(this.value)" type="text" class="form-control transparent-input" placeholder="Search By Name">
			        </div>
			        <div class="col-md-6">
			          <input onkeyup="searchByLetter(this.value)" maxlength="1" type="text" class="form-control transparent-input" placeholder="Search By First Letter">
			        </div>
               </form>`;
    searchContainer.innerHTML = cartoona;
}

async function searchByLetter(letter) {
    $("#inner-loading").fadeIn(200);
    letter == ""? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      response = await response.json();
      response.meals?displayMeals(response.meals):displayMeals([]);
    $("#inner-loading").fadeOut(200);


}
async function searchByName(term){    
    $("#inner-loading").fadeIn(200);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
    response.meals? displayMeals(response.meals) : displayMeals([]);
    $("#inner-loading").fadeOut(200);

  }

  function showContacts(){
    mainContainer.innerHTML = `
    <div class="contact mx-auto d-flex text-center justify-content-center align-items-center min-vh-100">
        <div class="container w-75 ">
		    <div class="row g-4">
				<div class="col-md-6">
					<input name="name" onkeyup="inputValidate()" id="nameInput" type="text" class="form-control" placeholder="Enter Fullname">
                    <small id="nameError" class="text-danger">${nameError ? nameError : ""}</small>
				</div>
				<div class="col-md-6">
					<input name="phone" onkeyup="inputValidate()" id="phoneInput" type="number" class="form-control" placeholder="Enter Phone">
                    <small id="phoneError" class="text-danger">${phoneError ? phoneError : ""}</small>
				</div>
				<div class="col-md-6">
					<input name="email" onkeyup="inputValidate()" id="emailInput" type="text" class="form-control" placeholder="Enter Email">
                    <small id="emailError" class="text-danger">${emailError ? emailError : ""}</small>
				</div>
				<div class="col-md-6">
					<input name="age" onkeyup="inputValidate()" id="ageInput" type="number" class="form-control" placeholder="Enter Age">
					<small id="ageError" class="text-danger">${ageError ? ageError : ""}</small>
				</div>
				<div class="col-md-6">
					<input name="password" onkeyup="inputValidate()" id="passwordInput" type="password" class="form-control" placeholder="Enter Password">
                    <small id="passwordError" class="text-danger">${passwordError ? passwordError : ""}</small>
				</div>
				<div class="col-md-6">
					<input name="rePassword" onkeyup="inputValidate()" id="rePasswordInput" type="password" class="form-control" placeholder="Enter Re-Password">
                    <small id="rePasswordError" class="text-danger">${rePasswordError ? rePasswordError : ""}</small>
				</div>
			</div>
			<button disabled id="submitButton" class="btn btn-success w-25 mt-5 fs-5">Submit</button>
		</div>
    </div>`;
    
    submitButton = document.getElementById('submitButton');

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true;
    });
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true;
    });
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true;
    });
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true;
    });
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true;
    });
    document.getElementById("rePasswordInput").addEventListener("focus", () => {
        rePasswordInputTouched = true;
    });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function ageValidation() {
    const age = document.getElementById("ageInput").value;
    if (age < 18 || age > 100) {
        ageError = "Age must be between 18 and 100";
        document.getElementById("ageError").textContent = ageError;
        return false;
    } else {
        ageError = "";
        document.getElementById("ageError").textContent = ageError;
        return true;
    }
}

function nameValidation() {
    const name = document.getElementById("nameInput").value;
    if (!(/^[a-zA-Z '.-]*[A-Za-z][^-]$/.test(name))) {
        nameError = "Your name must be at least 6 characters long.";
        document.getElementById("nameError").textContent = nameError;
        return false;
    } else {
        nameError = "";
        document.getElementById("nameError").textContent = nameError;
        return true;
    }
}

function emailValidation() {
    const email = document.getElementById("emailInput").value;
    if (!(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(email))) {
        emailError = "Please enter a valid email address.";
        document.getElementById("emailError").textContent = emailError;
        return false;
    } else {
        emailError = "";
        document.getElementById("emailError").textContent = emailError;
        return true;
    }
}

function phoneValidation() {
    const phone = document.getElementById("phoneInput").value;
    if (!(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(phone))) {
        phoneError = "Please enter a valid mobile number.";
        document.getElementById("phoneError").textContent = phoneError;
        return false;
    } else {
        phoneError = "";
        document.getElementById("phoneError").textContent = phoneError;
        return true;
    }
}

function passwordValidation() {
    const password = document.getElementById("passwordInput").value;
    const rePassword = document.getElementById("rePasswordInput").value;
    
    if (password.length < 8) {
        passwordError = "Password must be at least 8 characters.";
        document.getElementById("passwordError").textContent = passwordError;
        return false;
    } else if (password !== rePassword) {
        rePasswordError = "Passwords do not match.";
        document.getElementById("rePasswordError").textContent = rePasswordError;
        return false;
    } else {
        passwordError = "";
        rePasswordError = "";
        document.getElementById("passwordError").textContent = passwordError;
        document.getElementById("rePasswordError").textContent = rePasswordError;
        return true;
    }
}

function inputValidate() {
    if (nameInputTouched) {
        nameValidation();
    }
    if (emailInputTouched) {
        emailValidation();
    }
    if (phoneInputTouched) {
        phoneValidation();
    }
    if (ageInputTouched) {
        ageValidation();
    }
    if (passwordInputTouched || rePasswordInputTouched) {
        passwordValidation();
    }

    if (
        nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation()
    ) {
        submitButton.removeAttribute("disabled");
        submitButton.addEventListener('click', function() {
        window.location.href = "index.html";
        })
    } else {
        submitButton.setAttribute("disabled", true);
    }
}
