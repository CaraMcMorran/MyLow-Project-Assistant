alert("app.js loaded");
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
searchBtn.onclick = function(){

alert("Search button clicked");

};
