/* =====================================================
   MYLOW V4.1
   PROJECT-FIRST EXPERIENCE
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

ownedItems: [],

budget: 0,

readiness: 0,

weather: null,

preparedOrder: null

};

/* =====================================================
   PROJECT INTELLIGENCE ENGINE
===================================================== */

const ProjectTemplates = {

bathroomPaint: {

title:
"Bathroom Paint Project",

description:
"Interior bathroom painting",

difficulty:
"Beginner Friendly",

weatherRequired:
false,

defaults: {

roomType:
"Bathroom",

surfaceType:
"Drywall",

surfaceCondition:
"Good",

finishType:
"Satin"

}

},

kitchenPaint: {

title:
"Kitchen Paint Project",

description:
"Interior kitchen painting",

difficulty:
"Beginner Friendly",

weatherRequired:
false,

defaults: {

roomType:
"Kitchen",

surfaceType:
"Drywall",

surfaceCondition:
"Good",

finishType:
"Satin"

}

},

cabinetPaint: {

title:
"Cabinet Paint Project",

description:
"Cabinet refinishing",

difficulty:
"Intermediate",

weatherRequired:
false,

defaults: {

roomType:
"Kitchen",

surfaceType:
"Wood",

surfaceCondition:
"Good",

finishType:
"Satin"

}

},

deckStain: {

title:
"Deck Stain Project",

description:
"Exterior deck staining",

difficulty:
"Intermediate",

weatherRequired:
true,

defaults: {

roomType:
"Deck",

surfaceType:
"Wood",

surfaceCondition:
"Good",

finishType:
"Stain"

}

},

fenceStain: {

title:
"Fence Stain Project",

description:
"Fence restoration",

difficulty:
"Beginner Friendly",

weatherRequired:
true,

defaults: {

roomType:
"Fence",

surfaceType:
"Wood",

surfaceCondition:
"Good",

finishType:
"Stain"

}

},

livingRoomPaint: {

title:
"Living Room Paint Project",

description:
"Interior wall painting",

difficulty:
"Beginner Friendly",

weatherRequired:
false,

defaults: {

roomType:
"Living Room",

surfaceType:
"Drywall",

surfaceCondition:
"Good",

finishType:
"Eggshell"

}

}

};

/* =====================================================
   PROJECT DETECTION ENGINE 2.0
===================================================== */

function detectProjectType(query) {

const text =
query.toLowerCase();

/* CABINETS */

if (
text.includes("cabinet")
||
text.includes("cabinets")
) {

return "cabinetPaint";

}

/* DECK */

if (
text.includes("deck")
) {

return "deckStain";

}

/* FENCE */

if (
text.includes("fence")
) {

return "fenceStain";

}

/* KITCHEN */

if (
text.includes("kitchen")
) {

return "kitchenPaint";

}

/* BATHROOM */

if (
text.includes("bathroom")
) {

return "bathroomPaint";

}

/* LIVING ROOM */

if (
text.includes("living room")
||
text.includes("livingroom")
) {

return "livingRoomPaint";

}

/* FALLBACK */

return "bathroomPaint";

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

const projectSummaryBar =
document.getElementById(
"projectSummaryBar"
);

const projectTitle =
document.getElementById(
"projectTitle"
);

const weatherSection =
document.getElementById(
"weatherSection"
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

const toastMessage =
document.getElementById(
"toastMessage"
);

if (
!toast
||
!toastMessage
) {
return;
}

toastMessage.textContent =
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
   LOADING
===================================================== */

function showLoading() {

if (
loadingOverlay
) {

loadingOverlay.classList.remove(
"hidden"
);

}

}

function hideLoading() {

if (
loadingOverlay
) {

loadingOverlay.classList.add(
"hidden"
);

}

}

/* =====================================================
   APPLY PROJECT DEFAULTS
===================================================== */

function applyProjectDefaults(project) {

if (
!project
||
!project.defaults
) {
return;
}

const defaults =
project.defaults;

const roomType =
document.getElementById(
"roomType"
);

const surfaceType =
document.getElementById(
"surfaceType"
);

const surfaceCondition =
document.getElementById(
"surfaceCondition"
);

const finishType =
document.getElementById(
"finishType"
);

if (roomType) {
roomType.value =
defaults.roomType;
}

if (surfaceType) {
surfaceType.value =
defaults.surfaceType;
}

if (surfaceCondition) {
surfaceCondition.value =
defaults.surfaceCondition;
}

if (finishType) {
finishType.value =
defaults.finishType;
}

}

/* =====================================================
   LOAD PROJECT
===================================================== */

function loadProject(projectType) {

const project =
ProjectTemplates[
projectType
];

if (!project) {
return;
}

MyLowState.projectType =
projectType;

MyLowState.project =
project;

workspace.classList.remove(
"hidden"
);

projectSummaryBar.classList.remove(
"hidden"
);

projectTitle.textContent =
project.title;

applyProjectDefaults(
project
);

/* WEATHER */

if (
project.weatherRequired
) {

weatherSection.classList.remove(
"hidden"
);

}
else {

weatherSection.classList.add(
"hidden"
);

}

showToast(
project.title +
" loaded."
);

/* NEXT ENGINES */

renderWeatherWindow();

renderProjectSystem();

}

/* =====================================================
   START PROJECT
===================================================== */

function startProject() {

const query =
projectSearch.value.trim();

if (!query) {

showToast(
"Describe your project first."
);

return;

}

showLoading();

setTimeout(() => {

const projectType =
detectProjectType(
query
);

loadProject(
projectType
);

hideLoading();

}, 700);

}

/* =====================================================
   EVENTS
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
   PROJECT SYSTEM DATABASE
===================================================== */

const ProjectSystems = {

bathroomPaint: {

best: {

primary: {
name: "HGTV HOME Infinity Interior Paint",
price: 68.98,
aisle: "12",
bay: "04",
image: ""
},

companion: {
name: "KILZ Mold & Mildew Primer",
price: 29.98,
aisle: "12",
bay: "06",
image: ""
},

budget: 286

},

better: {

primary: {
name: "Valspar Signature Interior Paint",
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
price: 18.98,
aisle: "12",
bay: "09",
image: ""
},

budget: 165

}

},

kitchenPaint: {

best: {

primary: {
name: "HGTV HOME Infinity Interior Paint",
price: 68.98,
aisle: "12",
bay: "04",
image: ""
},

companion: {
name: "KILZ Kitchen & Bath Primer",
price: 31.98,
aisle: "12",
bay: "06",
image: ""
},

budget: 295

},

better: {

primary: {
name: "Valspar Signature Interior Paint",
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

budget: 225

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
price: 18.98,
aisle: "12",
bay: "09",
image: ""
},

budget: 175

}

},

cabinetPaint: {

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

},

better: {

primary: {
name: "Cabinet Enamel",
price: 59.98,
aisle: "14",
bay: "04",
image: ""
},

companion: {
name: "Multi-Surface Primer",
price: 26.98,
aisle: "14",
bay: "05",
image: ""
},

budget: 260

},

good: {

primary: {
name: "Cabinet Paint",
price: 44.98,
aisle: "14",
bay: "04",
image: ""
},

companion: {
name: "Basic Bonding Primer",
price: 19.98,
aisle: "14",
bay: "05",
image: ""
},

budget: 210

}

},

deckStain: {

best: {

primary: {
name: "Cabot Deck Stain",
price: 59.98,
aisle: "18",
bay: "02",
image: ""
},

companion: {
name: "Cabot Deck Cleaner",
price: 22.98,
aisle: "18",
bay: "03",
image: ""
},

budget: 345

},

better: {

primary: {
name: "Olympic Elite Stain",
price: 49.98,
aisle: "18",
bay: "02",
image: ""
},

companion: {
name: "Deck Cleaner",
price: 19.98,
aisle: "18",
bay: "03",
image: ""
},

budget: 285

},

good: {

primary: {
name: "Deck Stain",
price: 39.98,
aisle: "18",
bay: "02",
image: ""
},

companion: {
name: "Deck Wash",
price: 15.98,
aisle: "18",
bay: "03",
image: ""
},

budget: 225

}

},

fenceStain: {

best: {

primary: {
name: "Premium Fence Stain",
price: 54.98,
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

budget: 265

},

better: {

primary: {
name: "Fence Stain",
price: 44.98,
aisle: "18",
bay: "06",
image: ""
},

companion: {
name: "Wood Cleaner",
price: 16.98,
aisle: "18",
bay: "07",
image: ""
},

budget: 225

},

good: {

primary: {
name: "Basic Fence Stain",
price: 34.98,
aisle: "18",
bay: "06",
image: ""
},

companion: {
name: "Fence Wash",
price: 12.98,
aisle: "18",
bay: "07",
image: ""
},

budget: 185

}

}

};

/* =====================================================
   PROJECT SYSTEM RENDERING
===================================================== */

function renderProjectSystem() {

const projectType =
MyLowState.projectType;

const tier =
MyLowState.recommendationTier;

const system =
ProjectSystems[
projectType
];

if (!system) {
return;
}

const selectedSystem =
system[tier];

if (!selectedSystem) {
return;
}

MyLowState.primaryProduct =
selectedSystem.primary;

MyLowState.companionProduct =
selectedSystem.companion;

MyLowState.budget =
selectedSystem.budget;

/* PRIMARY */

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

/* COMPANION */

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

/* DIFFICULTY */

document.getElementById(
"projectDifficulty"
).textContent =
MyLowState.project.difficulty;

/* PROJECT CHECKLIST */

renderChecklist();

}

/* =====================================================
   GOOD BETTER BEST
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
   WEATHER
===================================================== */

function renderWeatherWindow() {

if (
!MyLowState.project
||
!MyLowState.project.weatherRequired
) {
return;
}

const weather =
document.getElementById(
"weatherWindowContent"
);

if (!weather) {
return;
}

weather.innerHTML = `

Thursday
72°F

5% Rain Chance

⭐⭐⭐⭐⭐ Recommended Start Day

`;

}

/* =====================================================
   PROJECT UPDATE
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
"Recommendations updated."
);

}
);

}

/* =====================================================
   TOOLTIPS
===================================================== */

document.addEventListener(
"click",
function(event) {

if (
event.target.classList.contains(
"tooltip-trigger"
)
) {

const tooltipId =
event.target.dataset.tooltip;

const tooltip =
document.getElementById(
tooltipId
);

if (!tooltip) {
return;
}

tooltip.classList.toggle(
"hidden"
);

}

}
);

/* =====================================================
   EXPANDED PROJECT CHECKLISTS
===================================================== */

const ChecklistTemplates = {

bathroomPaint: [

{
id:"paint",
name:"HGTV HOME Infinity Paint",
price:68.98,
qty:2,
aisle:"12",
bay:"04",
reason:"Primary finish coat",
status:"missing"
},

{
id:"primer",
name:"KILZ Mold & Mildew Primer",
price:29.98,
qty:1,
aisle:"12",
bay:"06",
reason:"Improves adhesion",
status:"missing"
},

{
id:"roller",
name:"Purdy White Dove Roller",
price:16.98,
qty:1,
aisle:"13",
bay:"02",
reason:"Recommended application tool",
status:"missing"
},

{
id:"brush",
name:"Purdy XL Glide Brush",
price:12.98,
qty:1,
aisle:"13",
bay:"03",
reason:"Cut in corners and trim",
status:"missing"
},

{
id:"tape",
name:"ScotchBlue Painter's Tape",
price:7.98,
qty:2,
aisle:"13",
bay:"05",
reason:"Protects trim",
status:"missing"
},

{
id:"dropcloth",
name:"Canvas Drop Cloth",
price:14.98,
qty:1,
aisle:"14",
bay:"01",
reason:"Protects floors",
status:"missing"
},

{
id:"spackle",
name:"DAP Spackling Paste",
price:6.98,
qty:1,
aisle:"15",
bay:"08",
reason:"Repairs holes",
status:"missing"
},

{
id:"sponge",
name:"3M Sanding Sponge",
price:4.98,
qty:1,
aisle:"15",
bay:"09",
reason:"Smooth repairs",
status:"missing"
},

{
id:"caulk",
name:"Kitchen & Bath Caulk",
price:8.98,
qty:1,
aisle:"16",
bay:"03",
reason:"Seal gaps before painting",
status:"missing"
}

],

deckStain: [

{
id:"stain",
name:"Cabot Deck Stain",
price:59.98,
qty:2,
aisle:"18",
bay:"02",
reason:"Primary coating",
status:"missing"
},

{
id:"cleaner",
name:"Deck Cleaner",
price:22.98,
qty:1,
aisle:"18",
bay:"03",
reason:"Surface prep",
status:"missing"
},

{
id:"applicator",
name:"Stain Applicator",
price:18.98,
qty:1,
aisle:"18",
bay:"04",
reason:"Apply stain evenly",
status:"missing"
},

{
id:"sprayer",
name:"Pump Sprayer",
price:24.98,
qty:1,
aisle:"18",
bay:"05",
reason:"Cleaner application",
status:"missing"
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

const sourceItems =
ChecklistTemplates[
projectType
];

if (!sourceItems) {
return;
}

MyLowState.checklist =
JSON.parse(
JSON.stringify(sourceItems)
);

MyLowState.cart = [];
MyLowState.ownedItems = [];

sourceItems.forEach(item => {

const row =
document.createElement("div");

row.className =
"checklist-item state-missing";

row.dataset.itemId =
item.id;

row.innerHTML = `

<div class="checklist-item-left">

<div class="checklist-product-image">

<img
class="checklist-image"
src=""
alt="${item.name}">

</div>

<div class="checklist-product-info">

<div class="checklist-item-top">

<h3>

${item.name}

</h3>

<div
class="tooltip-trigger"
data-tooltip="tip-${item.id}">

?

</div>

</div>

<div
id="tip-${item.id}"
class="tooltip-content hidden">

${item.reason}

</div>

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
class="secondary-btn already-have-btn"
data-id="${item.id}">

Already Have

</button>

<button
class="secondary-btn change-item-btn"
data-id="${item.id}">

Change

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

generateShoppingRoute();

}

/* =====================================================
   QUANTITY CONTROLS
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

if (
item.qty < 1
) {
item.qty = 1;
}

const qty =
document.getElementById(
"qty-" + itemId
);

if (qty) {

qty.textContent =
item.qty;

}

updateChecklistStats();

}

/* =====================================================
   ADD TO CART
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

item.status = "cart";

const row =
document.querySelector(
`[data-item-id="${itemId}"]`
);

if (row) {

row.classList.remove(
"state-missing",
"state-owned"
);

row.classList.add(
"state-cart"
);

}

if (
!MyLowState.cart.find(
i => i.id === item.id
)
) {

MyLowState.cart.push(item);

}

MyLowState.ownedItems =
MyLowState.ownedItems.filter(
i => i.id !== item.id
);

updateCart();

updateReadiness();

showToast(
item.name +
" added to cart."
);

}

/* =====================================================
   ALREADY HAVE
===================================================== */

function markItemOwned(
itemId
) {

const item =
MyLowState.checklist.find(
i => i.id === itemId
);

if (!item) {
return;
}

item.status = "owned";

const row =
document.querySelector(
`[data-item-id="${itemId}"]`
);

if (row) {

row.classList.remove(
"state-missing",
"state-cart"
);

row.classList.add(
"state-owned"
);

}

MyLowState.cart =
MyLowState.cart.filter(
i => i.id !== item.id
);

if (
!MyLowState.ownedItems.find(
i => i.id === item.id
)
) {

MyLowState.ownedItems.push(
item
);

}

updateCart();

updateReadiness();

showToast(
item.name +
" marked as already owned."
);

}

/* =====================================================
   CHECKLIST EVENTS
===================================================== */

function attachChecklistEvents() {

document
.querySelectorAll(
".increase-btn"
)
.forEach(btn => {

btn.addEventListener(
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
.forEach(btn => {

btn.addEventListener(
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
.forEach(btn => {

btn.addEventListener(
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
".already-have-btn"
)
.forEach(btn => {

btn.addEventListener(
"click",
function() {

markItemOwned(
this.dataset.id
);

}
);

});

}

/* =====================================================
   READINESS ENGINE
===================================================== */

function updateReadiness() {

const total =
MyLowState.checklist.length;

const complete =
MyLowState.cart.length +
MyLowState.ownedItems.length;

let percent = 0;

if (total > 0) {

const percent =
Math.round(
(complete / total) * 100
);

}

MyLowState.readiness =
percent;

document.getElementById(
"stickyReadinessPercent"
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
complete;

document.getElementById(
"checklistCompletionCount"
).textContent =
complete +
" / " +
total;

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
"alreadyOwnedCount"
).textContent =
MyLowState.ownedItems.length;

document.getElementById(
"cartTotal"
).textContent =
"$" +
total.toFixed(2);

}

/* =====================================================
   CHECKLIST TOTALS
===================================================== */

function updateChecklistStats() {

let total = 0;

MyLowState.checklist.forEach(
item => {

total +=
item.price *
item.qty;

}
);

document.getElementById(
"checklistEstimatedTotal"
).textContent =
"$" +
total.toFixed(2);

}

/* =====================================================
   SHOPPING ROUTE
===================================================== */

function generateShoppingRoute() {

const route =
document.getElementById(
"shoppingRouteList"
);

if (!route) {
return;
}

const groupedAisles =
[...new Set(
MyLowState.checklist.map(
item => item.aisle
)
)];

route.innerHTML = "";

groupedAisles.forEach(
(aisle,index) => {

const stop =
document.createElement(
"div"
);

stop.className =
"route-stop";

stop.textContent =
(index + 1) +
". Aisle " +
aisle;

route.appendChild(
stop
);

}
);

}

/* =====================================================
   DEMO STORE DATA
   FUTURE: storeData.js
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
   STORE BAR
===================================================== */

const storeSelectorPanel =
document.getElementById(
"storeSelectorPanel"
);

const selectStoreBtn =
document.getElementById(
"selectStoreBtn"
);

const changeStoreBtn =
document.getElementById(
"changeStoreBtn"
);

const findStoresBtn =
document.getElementById(
"findStoresBtn"
);

const zipCodeInput =
document.getElementById(
"zipCodeInput"
);

/* OPEN STORE SELECTOR */

if (selectStoreBtn) {

selectStoreBtn.addEventListener(
"click",
function() {

storeSelectorPanel.classList.remove(
"hidden"
);

}
);

}

/* CHANGE STORE */

if (changeStoreBtn) {

changeStoreBtn.addEventListener(
"click",
function() {

storeSelectorPanel.classList.remove(
"hidden"
);

}
);

}

/* =====================================================
   FIND STORES
===================================================== */

function findStores() {

const zip =
zipCodeInput.value.trim();

if (!zip) {

showToast(
"Enter a ZIP code."
);

return;

}

const results =
document.getElementById(
"storeOptionsContainer"
);

const resultPanel =
document.getElementById(
"storeSearchResults"
);

resultPanel.classList.remove(
"hidden"
);

results.innerHTML = "";

DemoStores.forEach(store => {

const row =
document.createElement(
"div"
);

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

results.appendChild(
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
"Select a store."
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
"selectedStoreDisplay"
).textContent =
store.name;

document.getElementById(
"cartStoreName"
).textContent =
store.name;

document.getElementById(
"accountStore"
).textContent =
store.name;

storeSelectorPanel.classList.add(
"hidden"
);

changeStoreBtn.classList.remove(
"hidden"
);

selectStoreBtn.classList.add(
"hidden"
);

showToast(
store.name +
" selected."
);

}

/* STORE SELECT BUTTON INSIDE PANEL */

document.addEventListener(
"change",
function(event) {

if (
event.target.name ===
"storeSelection"
) {

selectStore();

}

}
);

/* =====================================================
   COLLAPSIBLE PANELS
===================================================== */

function setupCollapse(
buttonId,
contentId
) {

const button =
document.getElementById(
buttonId
);

const content =
document.getElementById(
contentId
);

if (
!button
||
!content
) {
return;
}

button.addEventListener(
"click",
function() {

content.classList.toggle(
"hidden"
);

if (
content.classList.contains(
"hidden"
)
) {

this.textContent =
this.textContent.replace(
"▲",
"▼"
);

}
else {

this.textContent =
this.textContent.replace(
"▼",
"▲"
);

}

}
);

}

setupCollapse(
"projectDetailsToggle",
"projectDetailsContent"
);

setupCollapse(
"shoppingRouteToggle",
"shoppingRouteContent"
);

setupCollapse(
"additionalShoppingToggle",
"additionalShoppingContent"
);

/* =====================================================
   STORE MAP
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

/* MAP BUTTONS */

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
   MODAL CLOSES
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
   ITEM REPLACEMENT
===================================================== */

const itemReplacementModal =
document.getElementById(
"itemReplacementModal"
);

document.addEventListener(
"click",
function(event) {

if (
event.target.classList.contains(
"change-item-btn"
)
) {

itemReplacementModal.classList.remove(
"hidden"
);

document.getElementById(
"itemReplacementContent"
).innerHTML = `

<h3>

Replacement Options

</h3>

<p>

Best Option

</p>

<button
class="primary-btn replacement-option">

Select

</button>

<br><br>

<p>

Better Option

</p>

<button
class="primary-btn replacement-option">

Select

</button>

<br><br>

<p>

Budget Option

</p>

<button
class="primary-btn replacement-option">

Select

</button>

`;

}

}
);

/* =====================================================
   SYSTEM REPLACEMENT
===================================================== */

const changeSystemBtn =
document.getElementById(
"changeSystemBtn"
);

const productSystemModal =
document.getElementById(
"productSystemModal"
);

if (
changeSystemBtn
&&
productSystemModal
) {

changeSystemBtn.addEventListener(
"click",
function() {

productSystemModal.classList.remove(
"hidden"
);

}
);

}

/* =====================================================
   SYSTEM MODAL SELECTION
===================================================== */

document
.querySelectorAll(
".system-select-btn"
)
.forEach(button => {

button.addEventListener(
"click",
function() {

MyLowState.recommendationTier =
this.dataset.system;

renderProjectSystem();

productSystemModal.classList.add(
"hidden"
);

showToast(
"Project system updated."
);

}
);

});

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

<div class="route-stop">

${query}

<br>

Prototype search result.
Future catalog integration will
display real products.

</div>

`;

showToast(
"Search complete."
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
&&
MyLowState.ownedItems.length === 0
) {

showToast(
"Complete part of your checklist first."
);

return;

}

MyLowState.preparedOrder = {

id:
"PO-" + Date.now(),

status:
"Prepared",

store:
MyLowState.store
? MyLowState.store.name
: "No Store Selected"

};

document.getElementById(
"preparedOrderId"
).textContent =
MyLowState.preparedOrder.id;

document.getElementById(
"preparedOrderStatus"
).textContent =
"Prepared";

document.getElementById(
"accountPreparedOrders"
).textContent =
"1";

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
(width * height * 2)
+
(length * height * 2);

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

<br><br>

<strong>
${gallons} Gallons
</strong>

<br><br>

Coverage Area

<br>

<strong>
${Math.round(wallArea)} sq ft
</strong>

`;

showToast(
"Coverage updated."
);

}
);

}

/* =====================================================
   PROJECT WALKTHROUGH
===================================================== */

const projectWalkthroughBtn =
document.getElementById(
"projectWalkthroughBtn"
);

const projectWalkthroughModal =
document.getElementById(
"projectWalkthroughModal"
);

if (
projectWalkthroughBtn
&&
projectWalkthroughModal
) {

projectWalkthroughBtn.addEventListener(
"click",
function() {

projectWalkthroughModal.classList.remove(
"hidden"
);

const content =
document.getElementById(
"walkthroughContent"
);

content.innerHTML = `

<ol>

<li>Gather project materials</li>

<li>Prepare work area</li>

<li>Repair damaged surfaces</li>

<li>Apply recommended products</li>

<li>Inspect completed work</li>

<li>Clean work area</li>

</ol>

`;

}
);

}

/* =====================================================
   SAVE PROJECT
===================================================== */

let savedProjectCount = 0;

const saveProjectBtn =
document.getElementById(
"saveProjectBtn"
);

const saveProjectModal =
document.getElementById(
"saveProjectModal"
);

if (
saveProjectBtn
&&
saveProjectModal
) {

saveProjectBtn.addEventListener(
"click",
function() {

saveProjectModal.classList.remove(
"hidden"
);

}
);

}

const confirmSaveProjectBtn =
document.getElementById(
"confirmSaveProjectBtn"
);

if (confirmSaveProjectBtn) {

confirmSaveProjectBtn.addEventListener(
"click",
function() {

const projectName =
document.getElementById(
"saveProjectName"
).value.trim();

if (!projectName) {

showToast(
"Enter a project name."
);

return;

}

savedProjectCount++;

document.getElementById(
"accountSavedProjects"
).textContent =
savedProjectCount;

showToast(
"Project saved."
);

saveProjectModal.classList.add(
"hidden"
);

}
);

}

/* =====================================================
   CHECKOUT
===================================================== */

const checkoutBtn =
document.getElementById(
"checkoutBtn"
);

const checkoutPage =
document.getElementById(
"checkoutPage"
);

if (
checkoutBtn
&&
checkoutPage
) {

checkoutBtn.addEventListener(
"click",
function() {

if (
MyLowState.cart.length === 0
) {

showToast(
"Add items to cart before checkout."
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

<br>

<p>

Store:
${MyLowState.store
? MyLowState.store.name
: "No Store Selected"}

</p>

<br>

<p>

Cart Items:
${MyLowState.cart.length}

</p>

<br>

<p>

Estimated Total:
${document.getElementById(
"cartTotal"
).textContent}

</p>

<br><br>

<button
class="primary-btn">

Continue

</button>

`;

}

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

const input =
document.getElementById(
"assistantQuestion"
);

const question =
input.value.trim();

if (!question) {
return;
}

const messages =
document.getElementById(
"assistantMessages"
);

const message =
document.createElement(
"div"
);

message.className =
"assistant-message";

message.innerHTML = `

<strong>You:</strong>

${question}

<br><br>

<strong>MyLow:</strong>

Review the recommended project
system and checklist for the
best project outcome.

`;

messages.appendChild(
message);

input.value = "";

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
   INITIALIZATION
===================================================== */

function initializeMyLow() {

hideLoading();

updateReadiness();

console.log(
"MyLow V4.1 Initialized"
);

showToast(
"MyLow Ready"
);

}

document.addEventListener(
"DOMContentLoaded",
initializeMyLow
);

/* =====================================================
   END OF FILE
===================================================== */
