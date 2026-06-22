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
// PROJECT TEMPLATES
// =========================

const projectTemplates = {

bathroom:{
title:"Bathroom Paint Project",
budget:"$136.90",
weather:false,
paint:"HGTV HOME Infinity Paint",
primer:"ProBlock Primer"
},

kitchen:{
title:"Kitchen Paint Project",
budget:"$142.90",
weather:false,
paint:"HGTV HOME Infinity Paint",
primer:"ProBlock Primer"
},

cabinet:{
title:"Cabinet Paint Project",
budget:"$149.90",
weather:false,
paint:"Cabinet Paint",
primer:"Bonding Primer"
},

deck:{
title:"Deck Stain Project",
budget:"$189.90",
weather:true,
paint:"Deck Stain",
primer:"Deck Cleaner"
},

fence:{
title:"Fence Stain Project",
budget:"$159.90",
weather:true,
paint:"Fence Stain",
primer:"Wood Cleaner"
}

};

// =========================
// PROJECT TYPE DETECTION
// =========================

let project = null;

if(query.includes("bathroom")){
project = projectTemplates.bathroom;
}

else if(query.includes("kitchen")){
project = projectTemplates.kitchen;
}

else if(query.includes("cabinet")){
project = projectTemplates.cabinet;
}

else if(query.includes("deck")){
project = projectTemplates.deck;
}

else if(query.includes("fence")){
project = projectTemplates.fence;
}

if(project){

projectTitle.innerText =
project.title;

budgetTotal.innerText =
project.budget;

readinessPercent.innerText =
"0%";

// Weather

if(project.weather){

weatherPlanner.classList.remove(
"hidden"
);

}
else{

weatherPlanner.classList.add(
"hidden"
);

}

// Paint Recommendation

document
.getElementById(
"selectedPaintName"
)
.innerText =
project.paint;

// Primer Recommendation

const primerTitle =
document.querySelectorAll(
".recommendation-card h3"
);

if(primerTitle.length > 1){

primerTitle[1].innerText =
project.primer;

}

// Shopping List

const shoppingItems =
document.querySelectorAll(
".shopping-item h3"
);

if(shoppingItems.length > 0){

shoppingItems[0].innerText =
project.paint;

}

if(shoppingItems.length > 1){

shoppingItems[1].innerText =
project.primer;

}

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
// =========================
// COVERAGE CALCULATOR
// =========================

let paintGallons = 2;

const estimateBtn =
document.getElementById(
"estimateBtn"
);

const estimateModal =
document.getElementById(
"estimateModal"
);

const useEstimateBtn =
document.getElementById(
"useEstimateBtn"
);

const closeEstimateBtn =
document.getElementById(
"closeEstimateBtn"
);

if(estimateBtn){

estimateBtn.addEventListener(
"click",
function(){

estimateModal.classList.remove(
"hidden"
);

});

}

if(closeEstimateBtn){

closeEstimateBtn.addEventListener(
"click",
function(){

estimateModal.classList.add(
"hidden"
);

});

}

if(useEstimateBtn){

useEstimateBtn.addEventListener(
"click",
function(){

paintGallons =
estimatedGallons ||
parseInt(
document.getElementById(
"roomSize"
).value
);

updatePaintQuantity();
  
document.getElementById(
"paintQuantity"
).innerText =
paintGallons +
" Gallons";

updatePaintEstimate();

estimateModal.classList.add(
"hidden"
);

});

}
function updatePaintEstimate(){

const paintItem =
document.querySelector(
".shopping-item h3"
);

const paintPrice =
68.98;

const totalPaintPrice =
paintPrice *
paintGallons;

const firstPrice =
document.querySelector(
".shopping-item .item-price"
);

if(firstPrice){

firstPrice.innerText =
"$" +
totalPaintPrice.toFixed(2);

}

}
// =========================
// COVERAGE CALCULATOR V2
// =========================

let estimatedGallons = 2;

const calculateDimensionsBtn =
document.getElementById(
"calculateDimensionsBtn"
);

const calculateSqFtBtn =
document.getElementById(
"calculateSqFtBtn"
);

if(calculateDimensionsBtn){

calculateDimensionsBtn.addEventListener(
"click",
function(){

alert("Dimensions Calculator Running");
  
const width =
parseFloat(
document.getElementById(
"roomWidth"
).value
) || 0;

const length =
parseFloat(
document.getElementById(
"roomLength"
).value
) || 0;

const height =
parseFloat(
document.getElementById(
"roomHeight"
).value
) || 8;

const wallArea =
(
(width * height * 2)
+
(length * height * 2)
);

estimatedGallons =
Math.max(
1,
Math.ceil(
wallArea / 350
)
);

document.getElementById(
"estimateGallons"
).innerText =
estimatedGallons +
" Gallons";

});

}

if(calculateSqFtBtn){

calculateSqFtBtn.addEventListener(
"click",
function(){

const sqft =
parseFloat(
document.getElementById(
"squareFeetInput"
).value
) || 0;

estimatedGallons =
Math.max(
1,
Math.ceil(
sqft / 350
)
);

document.getElementById(
"estimateGallons"
).innerText =
estimatedGallons +
" Gallons";

});

}
// =========================
// QUANTITY CONTROLS
// =========================

const paintQtyDisplay =
document.getElementById(
"paintQty"
);

const paintPriceDisplay =
document.getElementById(
"paintTotalPrice"
);

const paintPlus =
document.getElementById(
"paintPlus"
);

const paintMinus =
document.getElementById(
"paintMinus"
);

const paintUnitPrice =
68.98;

function updatePaintQuantity(){

if(!paintQtyDisplay){
return;
}

paintQtyDisplay.innerText =
paintGallons;

paintPriceDisplay.innerText =
"$" +
(
paintGallons *
paintUnitPrice
).toFixed(2);

}

if(paintPlus){

paintPlus.addEventListener(
"click",
function(){

paintGallons++;

updatePaintQuantity();

updateBudget();

});

}

if(paintMinus){

paintMinus.addEventListener(
"click",
function(){

if(paintGallons > 1){

paintGallons--;

updatePaintQuantity();

updateBudget();

}

});

}

updatePaintQuantity();
