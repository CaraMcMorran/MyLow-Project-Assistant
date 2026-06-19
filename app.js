// ======================
// MYLOW PROJECT ASSISTANT
// V2.1 FOUNDATION
// ======================

const workspace =
document.getElementById("workspace");

const searchInput =
document.getElementById("projectSearch");

const searchBtn =
document.getElementById("searchBtn");

const projectName =
document.getElementById("projectName");

// ----------------------
// PROJECT DETECTION
// ----------------------

function startProject() {

    const query =
    searchInput.value
    .trim()
    .toLowerCase();

    if(query === ""){
        alert("Please describe your project.");
        return;
    }

    workspace.classList.remove("hidden");

    // Interior Paint

    if(
        query.includes("paint")
        &&
        query.includes("bathroom")
    ){

        projectName.value =
        "Bathroom Paint Project";

        updateCoach(
            "2 Gallons",
            "$112.97",
            "Purdy White Dove 3/8\" Nap"
        );

        return;
    }

    // Kitchen

    if(
        query.includes("paint")
        &&
        query.includes("kitchen")
    ){

        projectName.value =
        "Kitchen Paint Project";

        updateCoach(
            "2 Gallons",
            "$118.97",
            "Purdy White Dove 3/8\" Nap"
        );

        return;
    }

    // Deck

    if(
        query.includes("deck")
        ||
        query.includes("stain")
    ){

        projectName.value =
        "Deck Stain Project";

        updateCoach(
            "3 Gallons",
            "$189.97",
            "Deck Stain Pad"
        );

        return;
    }

    // Fence

    if(
        query.includes("fence")
    ){

        projectName.value =
        "Fence Stain Project";

        updateCoach(
            "2 Gallons",
            "$154.97",
            "Deck Stain Pad"
        );

        return;
    }

    // Cabinets

    if(
        query.includes("cabinet")
    ){

        projectName.value =
        "Cabinet Paint Project";

        updateCoach(
            "1 Gallon",
            "$139.97",
            "Purdy XL Glide Brush"
        );

        return;
    }

    // Default

    projectName.value =
    "Custom Project";

}

// ----------------------
// COACH UPDATES
// ----------------------

function updateCoach(
    gallons,
    budget,
    applicator
){

    const coachCards =
    document.querySelectorAll(".coach-card");

    if(coachCards.length < 5){
        return;
    }

    coachCards[2].innerHTML = `
        <h3>Recommended Applicator</h3>
        <p>${applicator}</p>
    `;

    coachCards[3].innerHTML = `
        <h3>Estimated Product Needed</h3>
        <p>${gallons}</p>
    `;

    coachCards[4].innerHTML = `
        <h3>Estimated Budget</h3>
        <div class="budget">${budget}</div>
    `;
}

// ----------------------
// FILTER CHIPS
// ----------------------

document.addEventListener(
"click",
function(event){

    if(
        event.target.classList.contains("chip")
    ){

        const parent =
        event.target.parentElement;

        const chips =
        parent.querySelectorAll(".chip");

        chips.forEach(chip=>{
            chip.classList.remove("active");
        });

        event.target.classList.add("active");

    }

});

// ----------------------
// CHECKLIST
// ----------------------

document.querySelectorAll(".add-btn")
.forEach(button=>{

    button.addEventListener(
    "click",
    function(){

        if(
            this.innerText === "Add"
        ){

            this.innerText =
            "Added ✓";

            this.style.background =
            "#1f7a3f";

        }
        else{

            this.innerText =
            "Add";

            this.style.background =
            "#004990";

        }

    });

});

// ----------------------
// SAVE PROJECT
// ----------------------

document
.getElementById("saveProjectBtn")
.addEventListener(
"click",
function(){

    alert(
        projectName.value +
        " saved successfully."
    );

});

// ----------------------
// SEARCH EVENTS
// ----------------------

searchBtn.addEventListener(
"click",
startProject
);

searchInput.addEventListener(
"keypress",
function(event){

    if(
        event.key === "Enter"
    ){
        startProject();
    }

});
