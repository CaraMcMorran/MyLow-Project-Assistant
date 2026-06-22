/* =====================================================
   MYLOW V4.0
   APPLICATION FOUNDATION
===================================================== */

/* =====================================================
   GLOBAL APPLICATION STATE
===================================================== */

const MyLowState = {

store: null,

zipCode: null,

project: null,

projectType: null,

recommendationTier: "best",

primaryProduct: null,

companionProduct: null,

checklist: [],

cart: [],

budget: 0,

readiness: 0,

weather: null,

preparedOrder: null

};

/* =====================================================
   PROJECT TEMPLATES
===================================================== */

const ProjectTemplates = {

bathroom: {

title:
"Bathroom Paint Project",

description:
"Interior bathroom painting",

difficulty:
"Beginner Friendly",

weatherRequired:
false

},

kitchen: {

title:
"Kitchen Paint Project",

description:
"Interior kitchen painting",

difficulty:
"Beginner Friendly",

weatherRequired:
false

},

cabinet: {

title:
"Cabinet Paint Project",

description:
"Cabinet refinishing",

difficulty:
"Intermediate",

weatherRequired:
false

},

deck: {

title:
"Deck Stain Project",

description:
"Exterior deck staining",

difficulty:
"Intermediate",

weatherRequired:
true

},

fence: {

title:
"Fence Stain Project",

description:
"Exterior fence staining",

difficulty:
"Beginner Friendly",

weatherRequired:
true

},

livingroom: {

title:
"Living Room Paint Project",

description:
"Interior living room painting",

difficulty:
"Beginner Friendly",

weatherRequired:
false

}

};

/* =====================================================
   PROJECT DETECTION ENGINE
===================================================== */

function detectProjectType(query) {

const text =
query.toLowerCase();

if (
text.includes("bathroom")
) {
return "bathroom";
}

if (
text.includes("kitchen")
&& !text.includes("cabinet")
) {
return "kitchen";
}

if (
text.includes("cabinet")
) {
return "cabinet";
}

if (
text.includes("deck")
) {
return "deck";
}

if (
text.includes("fence")
) {
return "fence";
}

if (
text.includes("living room")
||
text.includes("livingroom")
) {
return "livingroom";
}

return null;

}

/* =====================================================
   DOM REFERENCES
===================================================== */

const projectSearch =
document.getElementById(
"projectSearch"
);

const searchBtn =
document.getElementById(
"searchBtn"
);

const workspace =
document.getElementById(
"workspace"
);

const projectControlBar =
document.getElementById(
"projectControlBar"
);

const projectTitle =
document.getElementById(
"projectTitle"
);

const readinessPercent =
document.getElementById(
"readinessPercent"
);

const readinessBar =
document.getElementById(
"readinessBar"
);

const systemBudgetTotal =
document.getElementById(
"systemBudgetTotal"
);

const weatherCard =
document.getElementById(
"weatherRecommendationCard"
);

const loadingOverlay =
document.getElementById(
"loadingOverlay"
);

/* =====================================================
   TOAST SYSTEM
===================================================== */

function showToast(message) {

const toast =
document.getElementById(
"globalToast"
);

const text =
document.getElementById(
"toastMessage"
);

if (!toast || !text) {
return;
}

text.textContent =
message;

toast.classList.remove(
"hidden"
);

setTimeout(() => {

toast.classList.add(
"hidden"
);

}, 3000);

}

/* =====================================================
   LOADING SYSTEM
===================================================== */

function showLoading() {

if (!loadingOverlay) {
return;
}

loadingOverlay.classList.remove(
"hidden"
);

}

function hideLoading() {

if (!loadingOverlay) {
return;
}

loadingOverlay.classList.add(
"hidden"
);

}

/* =====================================================
   PROJECT START
===================================================== */

function startProject() {

const query =
projectSearch.value.trim();

if (!query) {

showToast(
"Please describe your project."
);

return;

}

showLoading();

setTimeout(() => {

const projectType =
detectProjectType(query);

if (!projectType) {

hideLoading();

showToast(
"MyLow could not identify the project."
);

return;

}

loadProject(projectType);

hideLoading();

}, 800);

}

/* =====================================================
   LOAD PROJECT
===================================================== */

function loadProject(projectType) {

const template =
ProjectTemplates[
projectType
];

if (!template) {
return;
}

MyLowState.projectType =
projectType;

MyLowState.project =
template;

workspace.classList.remove(
"hidden"
);

projectControlBar.classList.remove(
"hidden"
);

projectTitle.textContent =
template.title;

document.getElementById(
"detectedProjectBadge"
).textContent =
template.title;

if (
template.weatherRequired
) {

weatherCard.classList.remove(
"hidden"
);

}
else {

weatherCard.classList.add(
"hidden"
);

}

showToast(
template.title +
" loaded."
);

renderProjectSystem();

}

/* =====================================================
   EVENT LISTENERS
===================================================== */

if (searchBtn) {

searchBtn.addEventListener(
"click",
startProject
);

}

if (projectSearch) {

projectSearch.addEventListener(
"keypress",
function(event) {

if (
event.key === "Enter"
) {

startProject();

}

}
);

}

/* =====================================================
   PRODUCT RECOMMENDATION DATABASE
===================================================== */

const ProductSystems = {

bathroom: {

best: {

primary: {
name: "HGTV HOME Infinity Paint",
price: 68.98,
aisle: "12",
bay: "04",
image: ""
},

companion: {
name: "ProBlock Primer",
price: 29.98,
aisle: "12",
bay: "06",
image: ""
},

budget: 286

},

better: {

primary: {
name: "Valspar Signature Paint",
price: 49.98,
aisle: "12",
bay: "05",
image: ""
},

companion: {
name: "Valspar Multi-Purpose Primer",
price: 24.98,
aisle: "12",
bay: "06",
image: ""
},

budget: 215

},

good: {

primary: {
name: "Project Source Interior Paint",
price: 34.98,
aisle: "12",
bay: "08",
image: ""
},

companion: {
name: "Project Source Primer",
price: 19.98,
aisle: "12",
bay: "09",
image: ""
},

budget: 165

}

},

kitchen: {

best: {

primary: {
name: "HGTV HOME Infinity Paint",
price: 68.98,
aisle: "12",
bay: "04",
image: ""
},

companion: {
name: "ProBlock Primer",
price: 29.98,
aisle: "12",
bay: "06",
image: ""
},

budget: 295

},

better: {

primary: {
name: "Valspar Signature Paint",
price: 49.98,
aisle: "12",
bay: "05",
image: ""
},

companion: {
name: "Valspar Primer",
price: 24.98,
aisle: "12",
bay: "06",
image: ""
},

budget: 225

},

good: {

primary: {
name: "Project Source Paint",
price: 34.98,
aisle: "12",
bay: "08",
image: ""
},

companion: {
name: "Project Source Primer",
price: 19.98,
aisle: "12",
bay: "09",
image: ""
},

budget: 170

}

},

cabinet: {

best: {

primary: {
name: "Cabinet & Furniture Paint",
price: 74.98,
aisle: "14",
bay: "04",
image: ""
},

companion: {
name: "Bonding Primer",
price: 32.98,
aisle: "14",
bay: "05",
image: ""
},

budget: 325

}

},

deck: {

best: {

primary: {
name: "Premium Deck Stain",
price: 59.98,
aisle: "18",
bay: "02",
image: ""
},

companion: {
name: "Deck Cleaner",
price: 22.98,
aisle: "18",
bay: "03",
image: ""
},

budget: 345

}

},

fence: {

best: {

primary: {
name: "Fence Stain",
price: 49.98,
aisle: "18",
bay: "06",
image: ""
},

companion: {
name: "Wood Cleaner",
price: 18.98,
aisle: "18",
bay: "07",
image: ""
},

budget: 245

}

}

};

/* =====================================================
   RENDER PROJECT SYSTEM
===================================================== */

function renderProjectSystem() {

const projectType =
MyLowState.projectType;

const tier =
MyLowState.recommendationTier;

const projectSystem =
ProductSystems[
projectType
];

if (!projectSystem) {
return;
}

const selectedSystem =
projectSystem[tier];

if (!selectedSystem) {
return;
}

MyLowState.primaryProduct =
selectedSystem.primary;

MyLowState.companionProduct =
selectedSystem.companion;

MyLowState.budget =
selectedSystem.budget;

/* PRIMARY PRODUCT */

document.getElementById(
"primaryProductName"
).textContent =
selectedSystem.primary.name;

document.getElementById(
"primaryProductPrice"
).textContent =
"$" +
selectedSystem.primary.price.toFixed(2);

document.getElementById(
"primaryProductLocation"
).textContent =
"📍 Aisle " +
selectedSystem.primary.aisle +
" • Bay " +
selectedSystem.primary.bay;

/* COMPANION PRODUCT */

document.getElementById(
"companionProductName"
).textContent =
selectedSystem.companion.name;

document.getElementById(
"companionProductPrice"
).textContent =
"$" +
selectedSystem.companion.price.toFixed(2);

document.getElementById(
"companionProductLocation"
).textContent =
"📍 Aisle " +
selectedSystem.companion.aisle +
" • Bay " +
selectedSystem.companion.bay;

/* BUDGET */

document.getElementById(
"systemBudgetTotal"
).textContent =
"$" +
selectedSystem.budget.toFixed(2);

/* PROJECT DIFFICULTY */

document.getElementById(
"projectDifficulty"
).textContent =
MyLowState.project.difficulty;

/* EXPLANATION */

updateSystemExplanation();

renderChecklist();

}

/* =====================================================
   SYSTEM EXPLANATION
===================================================== */

function updateSystemExplanation() {

const explanation =
document.getElementById(
"systemExplanation"
);

if (!explanation) {
return;
}

const project =
MyLowState.projectType;

if (
project === "bathroom"
) {

explanation.innerHTML = `
• Moisture resistant finish<br>
• Recommended for bathroom environments<br>
• Primer improves durability<br>
• Designed for DIY customers
`;

}

else if (
project === "deck"
) {

explanation.innerHTML = `
• Exterior weather protection<br>
• Cleaner improves stain adhesion<br>
• Recommended for outdoor projects<br>
• Better long-term durability
`;

}

else if (
project === "cabinet"
) {

explanation.innerHTML = `
• Smooth cabinet finish<br>
• Bonding primer improves adhesion<br>
• Durable for high-use surfaces<br>
• Designed for refinishing projects
`;

}

}

/* =====================================================
   GOOD / BETTER / BEST
===================================================== */

document
.querySelectorAll(
".tier-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

document
.querySelectorAll(
".tier-btn"
)
.forEach(btn => {

btn.classList.remove(
"active"
);

});

this.classList.add(
"active"
);

MyLowState.recommendationTier =
this.dataset.tier;

renderProjectSystem();

showToast(
this.dataset.tier.toUpperCase() +
" recommendation selected."
);

}
);

});

/* =====================================================
   WEATHER FRAMEWORK
===================================================== */

function renderWeatherWindow() {

if (
!MyLowState.project
||
!MyLowState.project.weatherRequired
) {
return;
}

const weatherContent =
document.getElementById(
"weatherWindowContent"
);

if (!weatherContent) {
return;
}

weatherContent.innerHTML = `
Best Weather Window

Thursday
72°
10% Rain Chance

Friday
75°
5% Rain Chance

Recommended Start Date:
Thursday
`;

}

/* =====================================================
   BUDGET UPDATE
===================================================== */

function updateBudget() {

const total =
MyLowState.budget;

document.getElementById(
"systemBudgetTotal"
).textContent =
"$" +
total.toFixed(2);

}

/* =====================================================
   PROJECT DETAIL CHANGES
===================================================== */

const updateProjectBtn =
document.getElementById(
"updateProjectBtn"
);

if (updateProjectBtn) {

updateProjectBtn.addEventListener(
"click",
function() {

renderProjectSystem();

showToast(
"Project recommendations updated."
);

}
);

}

/* =====================================================
   CHECKLIST DATABASE
===================================================== */

const ChecklistTemplates = {

bathroom: [

{
id:"paint",
name:"Interior Paint",
price:68.98,
qty:2,
aisle:"12",
bay:"04",
image:""
},

{
id:"primer",
name:"Primer",
price:29.98,
qty:1,
aisle:"12",
bay:"06",
image:""
},

{
id:"roller",
name:"Roller Kit",
price:16.98,
qty:1,
aisle:"13",
bay:"02",
image:""
},

{
id:"brush",
name:"Angled Brush",
price:12.98,
qty:1,
aisle:"13",
bay:"03",
image:""
},

{
id:"tape",
name:"Painter's Tape",
price:7.98,
qty:2,
aisle:"13",
bay:"05",
image:""
}

],

kitchen: [

{
id:"paint",
name:"Interior Paint",
price:68.98,
qty:2,
aisle:"12",
bay:"04",
image:""
},

{
id:"primer",
name:"Primer",
price:29.98,
qty:1,
aisle:"12",
bay:"06",
image:""
},

{
id:"roller",
name:"Roller Kit",
price:16.98,
qty:1,
aisle:"13",
bay:"02",
image:""
},

{
id:"brush",
name:"Angled Brush",
price:12.98,
qty:1,
aisle:"13",
bay:"03",
image:""
}

],

cabinet: [

{
id:"cabinetpaint",
name:"Cabinet Paint",
price:74.98,
qty:1,
aisle:"14",
bay:"04",
image:""
},

{
id:"bondingprimer",
name:"Bonding Primer",
price:32.98,
qty:1,
aisle:"14",
bay:"05",
image:""
},

{
id:"foamroller",
name:"Foam Roller",
price:14.98,
qty:1,
aisle:"14",
bay:"07",
image:""
}

],

deck: [

{
id:"stain",
name:"Deck Stain",
price:59.98,
qty:2,
aisle:"18",
bay:"02",
image:""
},

{
id:"cleaner",
name:"Deck Cleaner",
price:22.98,
qty:1,
aisle:"18",
bay:"03",
image:""
},

{
id:"applicator",
name:"Stain Applicator",
price:18.98,
qty:1,
aisle:"18",
bay:"04",
image:""
}

],

fence: [

{
id:"stain",
name:"Fence Stain",
price:49.98,
qty:2,
aisle:"18",
bay:"06",
image:""
},

{
id:"cleaner",
name:"Wood Cleaner",
price:18.98,
qty:1,
aisle:"18",
bay:"07",
image:""
},

{
id:"brush",
name:"Stain Brush",
price:14.98,
qty:1,
aisle:"18",
bay:"08",
image:""
}

]

};

/* =====================================================
   RENDER CHECKLIST
===================================================== */

function renderChecklist() {

const container =
document.getElementById(
"projectChecklistItems"
);

if (!container) {
return;
}

container.innerHTML = "";

const projectType =
MyLowState.projectType;

const items =
ChecklistTemplates[
projectType
];

if (!items) {
return;
}

MyLowState.checklist =
JSON.parse(
JSON.stringify(items)
);

items.forEach(item => {

const row =
document.createElement("div");

row.className =
"checklist-item";

row.dataset.itemId =
item.id;

row.innerHTML = `

<div class="checklist-item-left">

<div class="checklist-product-image">

<img
class="checklist-image"
src="${item.image}"
alt="${item.name}">

</div>

<div class="checklist-product-info">

<div class="checklist-category">

PROJECT ITEM

</div>

<h3>

${item.name}

</h3>

<div class="checklist-price">

$${item.price.toFixed(2)}

</div>

<div class="checklist-location-row">

<button
class="location-btn">

📍 Aisle ${item.aisle} • Bay ${item.bay}

</button>

<button
class="map-btn"
data-aisle="${item.aisle}"
data-bay="${item.bay}">

View Map

</button>

</div>

</div>

</div>

<div class="checklist-item-right">

<div class="quantity-controls">

<button
class="qty-btn decrease-btn"
data-id="${item.id}">

−

</button>

<div
class="qty-value"
id="qty-${item.id}">

${item.qty}

</div>

<button
class="qty-btn increase-btn"
data-id="${item.id}">

+

</button>

</div>

<div class="checklist-actions">

<button
class="primary-btn add-item-btn"
data-id="${item.id}">

Add To Cart

</button>

<button
class="secondary-btn remove-item-btn"
data-id="${item.id}">

Remove

</button>

</div>

</div>

`;

container.appendChild(
row
);

});

attachChecklistEvents();

updateChecklistStats();

}

/* =====================================================
   CHECKLIST EVENTS
===================================================== */

function attachChecklistEvents() {

document
.querySelectorAll(
".increase-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

updateItemQuantity(
this.dataset.id,
1
);

}
);

});

document
.querySelectorAll(
".decrease-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

updateItemQuantity(
this.dataset.id,
-1
);

}
);

});

document
.querySelectorAll(
".add-item-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

addItemToCart(
this.dataset.id
);

}
);

});

document
.querySelectorAll(
".remove-item-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

removeItemFromCart(
this.dataset.id
);

}
);

});

}

/* =====================================================
   QUANTITY CONTROL
===================================================== */

function updateItemQuantity(
itemId,
change
) {

const item =
MyLowState.checklist.find(
i => i.id === itemId
);

if (!item) {
return;
}

item.qty += change;

if (item.qty < 1) {
item.qty = 1;
}

const qtyDisplay =
document.getElementById(
"qty-" + itemId
);

if (qtyDisplay) {

qtyDisplay.textContent =
item.qty;

}

updateChecklistStats();

}

/* =====================================================
   CART
===================================================== */

function addItemToCart(
itemId
) {

const item =
MyLowState.checklist.find(
i => i.id === itemId
);

if (!item) {
return;
}

const existing =
MyLowState.cart.find(
i => i.id === itemId
);

if (!existing) {

MyLowState.cart.push(
{
...item
}
);

showToast(
item.name +
" added to cart."
);

}
else {

existing.qty =
item.qty;

}

updateCart();

}

function removeItemFromCart(
itemId
) {

MyLowState.cart =
MyLowState.cart.filter(
item =>
item.id !== itemId
);

updateCart();

showToast(
"Item removed."
);

}

/* =====================================================
   CART TOTALS
===================================================== */

function updateCart() {

let total = 0;
let count = 0;

MyLowState.cart.forEach(
item => {

count += item.qty;

total +=
item.price *
item.qty;

}
);

document.getElementById(
"cartCount"
).textContent =
count;

document.getElementById(
"cartTotal"
).textContent =
"$" +
total.toFixed(2);

updateReadiness();

}

/* =====================================================
   CHECKLIST SUMMARY
===================================================== */

function updateChecklistStats() {

let estimatedTotal = 0;

MyLowState.checklist.forEach(
item => {

estimatedTotal +=
item.price *
item.qty;

}
);

document.getElementById(
"checklistEstimatedTotal"
).textContent =
"$" +
estimatedTotal.toFixed(2);

}

/* =====================================================
   READINESS ENGINE
===================================================== */

function updateReadiness() {

const totalItems =
MyLowState.checklist.length;

const completedItems =
MyLowState.cart.length;

const percent =
Math.round(
(
completedItems /
totalItems
) * 100
);

MyLowState.readiness =
percent;

document.getElementById(
"readinessPercent"
).textContent =
percent + "%";

document.getElementById(
"readinessBar"
).style.width =
percent + "%";

document.getElementById(
"checklistCompletionPercent"
).textContent =
percent + "%";

document.getElementById(
"itemsAddedCount"
).textContent =
completedItems;

document.getElementById(
"checklistCompletionCount"
).textContent =
completedItems +
" / " +
totalItems;

}

/* =====================================================
   INITIALIZATION
===================================================== */

updateReadiness();

/* =====================================================
   STORE DATABASE (PLACEHOLDER)
   WILL BE REPLACED BY storeData.js
===================================================== */

const DemoStores = [

{
id:"0595",
name:"Mooresville Lowe's",
zip:"28117",
phone:"(704) 000-0000",
hours:"6AM - 10PM",
address:"Mooresville, NC"
},

{
id:"1122",
name:"Statesville Lowe's",
zip:"28625",
phone:"(704) 000-0000",
hours:"6AM - 10PM",
address:"Statesville, NC"
},

{
id:"3388",
name:"Huntersville Lowe's",
zip:"28078",
phone:"(704) 000-0000",
hours:"6AM - 10PM",
address:"Huntersville, NC"
}

];

/* =====================================================
   STORE SEARCH
===================================================== */

const zipCodeInput =
document.getElementById(
"zipCodeInput"
);

const findStoresBtn =
document.getElementById(
"findStoresBtn"
);

const storeResults =
document.getElementById(
"storeOptionsContainer"
);

const storeSearchResults =
document.getElementById(
"storeSearchResults"
);

const selectStoreBtn =
document.getElementById(
"selectStoreBtn"
);

function findStores() {

const zip =
zipCodeInput.value.trim();

if (!zip) {

showToast(
"Please enter a ZIP code."
);

return;

}

storeSearchResults.classList.remove(
"hidden"
);

storeResults.innerHTML = "";

DemoStores.forEach(store => {

const row =
document.createElement("div");

row.className =
"store-option";

row.innerHTML = `

<label>

<input
type="radio"
name="storeSelection"
value="${store.id}">

<strong>${store.name}</strong>

<br>

${store.address}

</label>

`;

storeResults.appendChild(
row
);

});

showToast(
"Stores found."
);

}

if (findStoresBtn) {

findStoresBtn.addEventListener(
"click",
findStores
);

}

/* =====================================================
   STORE SELECTION
===================================================== */

function selectStore() {

const selected =
document.querySelector(
'input[name="storeSelection"]:checked'
);

if (!selected) {

showToast(
"Please select a store."
);

return;

}

const store =
DemoStores.find(
s => s.id === selected.value
);

if (!store) {
return;
}

MyLowState.store =
store;

document.getElementById(
"activeStoreCard"
).classList.remove(
"hidden"
);

document.getElementById(
"selectedStoreName"
).textContent =
store.name;

document.getElementById(
"selectedStoreNumber"
).textContent =
store.id;

document.getElementById(
"selectedStorePhone"
).textContent =
store.phone;

document.getElementById(
"selectedStoreHours"
).textContent =
store.hours;

document.getElementById(
"selectedStoreAddress"
).textContent =
store.address;

document.getElementById(
"cartStoreName"
).textContent =
store.name;

showToast(
store.name +
" selected."
);

}

if (selectStoreBtn) {

selectStoreBtn.addEventListener(
"click",
selectStore
);

}

/* =====================================================
   CHANGE STORE
===================================================== */

const changeStoreBtn =
document.getElementById(
"changeStoreBtn"
);

if (changeStoreBtn) {

changeStoreBtn.addEventListener(
"click",
function() {

document
.getElementById(
"activeStoreCard"
)
.classList.add(
"hidden"
);

showToast(
"Choose a different store."
);

});

}

/* =====================================================
   STORE MAP MODAL
===================================================== */

const storeMapModal =
document.getElementById(
"storeMapModal"
);

function openStoreMap(
aisle,
bay
) {

document.getElementById(
"mapDestination"
).textContent =
"Aisle " +
aisle +
" • Bay " +
bay;

if (
MyLowState.store
) {

document.getElementById(
"mapStoreName"
).textContent =
MyLowState.store.name;

}

storeMapModal.classList.remove(
"hidden"
);

}

document.addEventListener(
"click",
function(event) {

if (
event.target.classList.contains(
"map-btn"
)
) {

openStoreMap(
event.target.dataset.aisle,
event.target.dataset.bay
);

}

}
);

/* =====================================================
   CLOSE MODALS
===================================================== */

document
.querySelectorAll(
".close-modal-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

const modal =
document.getElementById(
this.dataset.close
);

if (modal) {

modal.classList.add(
"hidden"
);

}

}
);

});

/* =====================================================
   VIEW STORE MAP
===================================================== */

const viewStoreMapBtn =
document.getElementById(
"viewStoreMapBtn"
);

if (viewStoreMapBtn) {

viewStoreMapBtn.addEventListener(
"click",
function() {

openStoreMap(
"12",
"04"
);

}
);

}

/* =====================================================
   ADDITIONAL SHOPPING
===================================================== */

const additionalShoppingBtn =
document.getElementById(
"additionalShoppingBtn"
);

function searchAdditionalShopping() {

const query =
document.getElementById(
"additionalShoppingSearch"
).value.trim();

if (!query) {

showToast(
"Enter a product to search."
);

return;

}

const results =
document.getElementById(
"additionalShoppingResults"
);

results.classList.remove(
"hidden"
);

results.innerHTML = `

<div class="shopping-result">

<h3>

${query}

</h3>

<p>

Future product catalog integration.

</p>

</div>

`;

showToast(
"Additional shopping search complete."
);

}

if (additionalShoppingBtn) {

additionalShoppingBtn.addEventListener(
"click",
searchAdditionalShopping
);

}

/* =====================================================
   PROJECT PREPARATION
===================================================== */

const prepareProjectBtn =
document.getElementById(
"prepareProjectBtn"
);

function prepareProjectOrder() {

if (
MyLowState.cart.length === 0
) {

showToast(
"Add project items before preparing an order."
);

return;

}

MyLowState.preparedOrder = {

id:
"PO-" +
Date.now(),

status:
"Prepared",

items:
MyLowState.cart.length,

store:
MyLowState.store
? MyLowState.store.name
: "Not Selected"

};

document.getElementById(
"preparedOrderId"
).textContent =
MyLowState.preparedOrder.id;

document.getElementById(
"preparedOrderStatus"
).textContent =
"Prepared";

showToast(
"Project order prepared."
);

}

if (prepareProjectBtn) {

prepareProjectBtn.addEventListener(
"click",
prepareProjectOrder
);

}

/* =====================================================
   SAVE PROJECT
===================================================== */

const saveProjectBtn =
document.getElementById(
"saveProjectBtn"
);

if (saveProjectBtn) {

saveProjectBtn.addEventListener(
"click",
function() {

document
.getElementById(
"saveProjectModal"
)
.classList.remove(
"hidden"
);

});

}

const confirmSaveProjectBtn =
document.getElementById(
"confirmSaveProjectBtn"
);

if (confirmSaveProjectBtn) {

confirmSaveProjectBtn.addEventListener(
"click",
function() {

const name =
document.getElementById(
"saveProjectName"
).value.trim();

if (!name) {

showToast(
"Enter a project name."
);

return;

}

showToast(
"Project saved: " +
name
);

document
.getElementById(
"saveProjectModal"
)
.classList.add(
"hidden"
);

});

}

/* =====================================================
   UPDATE CART PROJECT TYPE
===================================================== */

function updateProjectMetadata() {

const projectType =
MyLowState.project
? MyLowState.project.title
: "Not Detected";

document.getElementById(
"cartProjectType"
).textContent =
projectType;

}

const originalLoadProject =
loadProject;

loadProject = function(projectType) {

originalLoadProject(
projectType
);

updateProjectMetadata();

renderWeatherWindow();

};

/* =====================================================
   CHECKOUT FLOW
===================================================== */

const checkoutBtn =
document.getElementById(
"checkoutBtn"
);

const checkoutPage =
document.getElementById(
"checkoutPage"
);

if (checkoutBtn) {

checkoutBtn.addEventListener(
"click",
function() {

if (
MyLowState.cart.length === 0
) {

showToast(
"Add project items before checkout."
);

return;

}

checkoutPage.classList.remove(
"hidden"
);

window.scrollTo({
top:0,
behavior:"smooth"
});

renderCheckout();

}
);

}

function renderCheckout() {

const checkoutContent =
document.getElementById(
"checkoutContent"
);

if (!checkoutContent) {
return;
}

checkoutContent.innerHTML = `

<h2>

Review Your Project Order

</h2>

<p>

Store:
${MyLowState.store
? MyLowState.store.name
: "No Store Selected"}

</p>

<p>

Items:
${MyLowState.cart.length}

</p>

<p>

Estimated Total:
${document.getElementById(
"cartTotal"
).textContent}

</p>

<br>

<button
id="checkoutContinueBtn"
class="primary-btn">

Continue

</button>

`;

}

/* =====================================================
   COVERAGE CALCULATOR
===================================================== */

const coverageCalculatorBtn =
document.getElementById(
"coverageCalculatorBtn"
);

const coverageCalculatorModal =
document.getElementById(
"coverageCalculatorModal"
);

if (
coverageCalculatorBtn
&&
coverageCalculatorModal
) {

coverageCalculatorBtn.addEventListener(
"click",
function() {

coverageCalculatorModal.classList.remove(
"hidden"
);

}
);

}

const calculateCoverageBtn =
document.getElementById(
"calculateCoverageBtn"
);

if (calculateCoverageBtn) {

calculateCoverageBtn.addEventListener(
"click",
function() {

const width =
parseFloat(
document.getElementById(
"calculatorWidth"
).value
) || 0;

const length =
parseFloat(
document.getElementById(
"calculatorLength"
).value
) || 0;

const height =
parseFloat(
document.getElementById(
"calculatorHeight"
).value
) || 8;

const wallArea =
(
(width * height * 2)
+
(length * height * 2)
);

const gallons =
Math.max(
1,
Math.ceil(
wallArea / 350
)
);

document.getElementById(
"coverageResults"
).innerHTML = `

Estimated Paint Needed

<strong>

${gallons} Gallons

</strong>

<br><br>

Coverage Area

<strong>

${Math.round(wallArea)} sq ft

</strong>

`;

showToast(
"Coverage estimate updated."
);

}
);

}

/* =====================================================
   PROJECT WALKTHROUGH
===================================================== */

const walkthroughBtn =
document.getElementById(
"projectWalkthroughBtn"
);

if (walkthroughBtn) {

walkthroughBtn.addEventListener(
"click",
function() {

const modal =
document.getElementById(
"projectWalkthroughModal"
);

modal.classList.remove(
"hidden"
);

const content =
document.getElementById(
"walkthroughContent"
);

content.innerHTML = `

<ol>

<li>Prepare work area</li>

<li>Gather project materials</li>

<li>Repair damaged surfaces</li>

<li>Apply recommended products</li>

<li>Inspect finished project</li>

<li>Clean up workspace</li>

</ol>

`;

}
);

}

/* =====================================================
   SAVED PROJECTS DRAWER
===================================================== */

const savedProjectsBtn =
document.getElementById(
"savedProjectsBtn"
);

if (savedProjectsBtn) {

savedProjectsBtn.addEventListener(
"click",
function() {

document
.getElementById(
"savedProjectsDrawer"
)
.classList.remove(
"hidden"
);

}
);

}

/* =====================================================
   ACCOUNT DRAWER
===================================================== */

const accountBtn =
document.getElementById(
"accountBtn"
);

if (accountBtn) {

accountBtn.addEventListener(
"click",
function() {

document
.getElementById(
"accountDrawer"
)
.classList.remove(
"hidden"
);

}
);

}

/* =====================================================
   CLOSE DRAWERS
===================================================== */

document
.querySelectorAll(
".close-drawer-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

const drawer =
document.getElementById(
this.dataset.closeDrawer
);

if (drawer) {

drawer.classList.add(
"hidden"
);

}

}
);

});

/* =====================================================
   ASSISTANT PANEL
===================================================== */

const assistantAskBtn =
document.getElementById(
"assistantAskBtn"
);

if (assistantAskBtn) {

assistantAskBtn.addEventListener(
"click",
function() {

const question =
document.getElementById(
"assistantQuestion"
).value.trim();

if (!question) {
return;
}

const messages =
document.getElementById(
"assistantMessages"
);

const response =
document.createElement(
"div"
);

response.className =
"assistant-message";

response.innerHTML = `

<strong>You:</strong>

${question}

<br><br>

<strong>MyLow:</strong>

Based on your project,
review the recommended
project system and checklist
for best results.

`;

messages.appendChild(
response
);

document.getElementById(
"assistantQuestion"
).value = "";

}
);

}

/* =====================================================
   PROJECT PREPARATION COUNTER
===================================================== */

function updatePreparedOrderCount() {

if (
!MyLowState.preparedOrder
) {
return;
}

document.getElementById(
"accountPreparedOrders"
).textContent = "1";

}

/* =====================================================
   APPLICATION STARTUP
===================================================== */

function initializeMyLow() {

hideLoading();

updateReadiness();

showToast(
"MyLow Ready"
);

console.log(
"MyLow V4 Initialized"
);

}

document.addEventListener(
"DOMContentLoaded",
initializeMyLow
);

/* =====================================================
   PREPARED ORDER OVERRIDE
===================================================== */

const originalPrepareOrder =
prepareProjectOrder;

prepareProjectOrder =
function() {

originalPrepareOrder();

updatePreparedOrderCount();

};

/* =====================================================
   SAVE PROJECT COUNTER
===================================================== */

let savedProjectCount = 0;

if (confirmSaveProjectBtn) {

confirmSaveProjectBtn.addEventListener(
"click",
function() {

savedProjectCount++;

document.getElementById(
"accountSavedProjects"
).textContent =
savedProjectCount;

}
);

}

/* =====================================================
   END OF FILE
===================================================== */
