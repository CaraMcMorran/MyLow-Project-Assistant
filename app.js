// =========================
// MYLOW V3.0
// PROJECT DETECTION ENGINE
// =========================

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("projectSearch");

const workspace =
document.getElementById("workspace");

const projectTitle =
document.getElementById("projectTitle");

const weatherPlanner =
document.getElementById("weatherPlanner");

const budgetTotal =
document.getElementById("budgetTotal");

const readinessPercent =
document.getElementById("readinessPercent");

// =========================
// PROJECT START
// =========================

function startProject(){

const query =
searchInput.value
.trim()
.toLowerCase();

if(query===""){

alert(
"Please describe your project."
);

return;

}

// show workspace

workspace.classList.remove(
"hidden"
);

// =========================
// BATHROOM
// =========================

if(
query.includes("bathroom")
){

projectTitle.innerText =
"Bathroom Paint Project";

budgetTotal.innerText =
"$136.90";

readinessPercent.innerText =
"0%";

weatherPlanner.classList.add(
"hidden"
);

return;

}

// =========================
// KITCHEN
// =========================

if(
query.includes("kitchen")
){

projectTitle.innerText =
"Kitchen Paint Project";

budgetTotal.innerText =
"$142.90";

readinessPercent.innerText =
"0%";

weatherPlanner.classList.add(
"hidden"
);

return;

}

// =========================
// DECK
// =========================

if(
query.includes("deck")
||
query.includes("stain")
){

projectTitle.innerText =
"Deck Stain Project";

budgetTotal.innerText =
"$189.90";

readinessPercent.innerText =
"0%";

weatherPlanner.classList.remove(
"hidden"
);

return;

}

// =========================
// FENCE
// =========================

if(
query.includes("fence")
){

projectTitle.innerText =
"Fence Stain Project";

budgetTotal.innerText =
"$159.90";

readinessPercent.innerText =
"0%";

weatherPlanner.classList.remove(
"hidden"
);

return;

}

// =========================
// CABINETS
// =========================

if(
query.includes("cabinet")
){

projectTitle.innerText =
"Cabinet Paint Project";

budgetTotal.innerText =
"$149.90";

readinessPercent.innerText =
"0%";

weatherPlanner.classList.add(
"hidden"
);

return;

}

// =========================
// DEFAULT
// =========================

projectTitle.innerText =
"Custom Project";

budgetTotal.innerText =
"$0.00";

weatherPlanner.classList.add(
"hidden"
);

}

// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener(
"click",
startProject
);

// =========================
// ENTER KEY
// =========================

searchInput.addEventListener(
"keypress",
function(event){

if(
event.key==="Enter"
){

startProject();

}

});

// =========================
// WALKTHROUGH BUTTON
// =========================

const walkthroughBtn =
document.getElementById(
"walkthroughBtn"
);

if(walkthroughBtn){

walkthroughBtn.addEventListener(
"click",
function(){

alert(
`Project Walkthrough

1. Prepare the room

2. Patch imperfections

3. Sand repairs

4. Prime repairs

5. Cut in edges

6. Roll walls

7. Apply second coat

8. Cleanup`
);

});

}

// =========================
// COLLAPSE DETAILS
// =========================

const detailsBtn =
document.getElementById(
"toggleDetailsBtn"
);

if(detailsBtn){

detailsBtn.addEventListener(
"click",
function(){

const details =
document.getElementById(
"projectDetailsContent"
);

if(
details.classList.contains(
"hidden"
)
){

details.classList.remove(
"hidden"
);

this.innerText =
"Project Details ▼";

}
else{

details.classList.add(
"hidden"
);

this.innerText =
"Project Details ►";

}

});

}
// =========================
// CART + READINESS SYSTEM
// =========================

let cartCount = 0;
let cartTotal = 0;

const cartCountDisplay =
document.getElementById("cartCount");

const cartTotalDisplay =
document.getElementById("cartTotal");

const readinessDisplay =
document.getElementById("readinessPercent");

const readinessBar =
document.getElementById("readinessBar");

function updateReadiness(){

const totalItems =
document.querySelectorAll(
".shopping-item"
).length;

const completedItems =
document.querySelectorAll(
".completed-item"
).length;

const percent =
Math.round(
(completedItems / totalItems) * 100
);

readinessDisplay.innerText =
percent + "%";

if(readinessBar){

readinessBar.style.width =
percent + "%";

}

}

document
.querySelectorAll(".add-cart-btn")
.forEach(button=>{

button.addEventListener(
"click",
function(){

const item =
this.closest(
".shopping-item"
);

if(
item.classList.contains(
"completed-item"
)
){
return;
}

const price =
parseFloat(
item.dataset.price
);

item.classList.add(
"completed-item"
);

cartCount++;

cartTotal += price;

cartCountDisplay.innerText =
cartCount;

cartTotalDisplay.innerText =
"$" +
cartTotal.toFixed(2);

this.innerText =
"Added ✓";

updateReadiness();

updateBudget();

});

});

document
.querySelectorAll(".already-have-btn")
.forEach(button=>{
updateBudget();

button.addEventListener(
"click",
function(){

const item =
this.closest(
".shopping-item"
);

if(
item.classList.contains(
"completed-item"
)
){
return;
}

item.classList.add(
"completed-item"
);

this.innerText =
"Already Owned ✓";

updateReadiness();

});

});

updateReadiness();
document
.querySelectorAll(".why-btn")
.forEach(button=>{

button.addEventListener(
"click",
function(){

const whyContent =
this.nextElementSibling;

whyContent.classList.toggle(
"hidden"
);

if(
whyContent.classList.contains(
"hidden"
)
){

this.innerText =
"Why We Recommend This Item";

}
else{

this.innerText =
"Hide Recommendation Details";

}

});

});
// =========================
// PRODUCT MODAL
// =========================

const changeButtons =
document.querySelectorAll(
".change-product-btn"
);

const productModal =
document.getElementById(
"productModal"
);

changeButtons.forEach(button=>{

button.addEventListener(
"click",
function(){

productModal.classList.remove(
"hidden"
);

});

});

document
.getElementById(
"closeModalBtn"
)
.addEventListener(
"click",
function(){

productModal.classList.add(
"hidden"
);

});
document
.querySelectorAll(
"#productModal .primary-btn"
)
.forEach(button=>{

button.addEventListener(
"click",
function(){

const product =
this.dataset.product;

const price =
this.dataset.price;

const paintItem =
document.querySelector(
".shopping-item h3"
);

const paintPrice =
document.querySelector(
".shopping-item .item-price"
);

paintItem.innerText =
product;

paintPrice.innerText =
"$" + price;

document
.getElementById(
"selectedPaintName"
)
.innerText =
product;

productModal.classList.add(
"hidden"
);

});

});
function updateBudget(){

let total = 0;

document
.querySelectorAll(
".shopping-item"
)
.forEach(item=>{

if(
item.classList.contains(
"completed-item"
)
){

const price =
parseFloat(
item.dataset.price
);

total += price;

}

});

document
.getElementById(
"budgetTotal"
)
.innerText =
"$" + total.toFixed(2);

}
