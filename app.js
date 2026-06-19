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

    document.getElementById(
        "projectTitle"
    ).innerText =
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

    document.getElementById(
        "projectTitle"
    ).innerText =
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

    document.getElementById(
        "projectTitle"
    ).innerText =
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

    document.getElementById(
        "projectTitle"
    ).innerText =
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

    document.getElementById(
        "projectTitle"
    ).innerText =
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

        updateCompletion();

    });

});
document
.querySelectorAll(
"input[type='checkbox']"
)
.forEach(box=>{

    box.addEventListener(
    "change",
    function(){

        const item =
        this.closest(
            ".checklist-item"
        );

        if(this.checked){

            item.classList.add(
                "completed-item"
            );

        }
        else{

            item.classList.remove(
                "completed-item"
            );

        }

        updateCompletion();

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
function showWhy(){

alert(
`Recommended because:

• Matches your project type

• Available in store

• Appropriate for selected surface

• Strong customer value

• Compatible with recommended applicators`
);

}
document
.querySelectorAll(".chip")
.forEach(chip=>{

chip.addEventListener(
"click",
function(){

const text =
this.innerText;

const coachCards =
document.querySelectorAll(".coach-card");

if(coachCards.length < 5){
return;
}

if(text==="Smooth"){

coachCards[2].innerHTML = `
<h3>Recommended Applicator</h3>
<p>Purdy White Dove 3/8" Nap</p>
`;

}

if(text==="Light Texture"){

coachCards[2].innerHTML = `
<h3>Recommended Applicator</h3>
<p>Purdy White Dove 1/2" Nap</p>
`;

}

if(text==="Heavy Texture"){

coachCards[2].innerHTML = `
<h3>Recommended Applicator</h3>
<p>Purdy White Dove 3/4" Nap</p>
`;

}

});

});
// ======================
// PROJECT COMPLETION
// ======================

function updateCompletion(){

    const totalItems =
    document.querySelectorAll(
        ".checklist-item"
    ).length;

    let completed = 0;

    document
    .querySelectorAll(
        ".checklist-item"
    )
    .forEach(item=>{

        const addButton =
        item.querySelector(
            ".add-btn"
        );

        const checkbox =
        item.querySelector(
            "input[type='checkbox']"
        );

        if(
            addButton &&
            addButton.innerText.includes("✓")
        ){
            completed++;
        }

        else if(
            checkbox &&
            checkbox.checked
        ){
            completed++;
        }

    });

    const percent =
    Math.round(
        (completed/totalItems)*100
    );

    document
    .getElementById(
        "completionPercent"
    )
    .innerText =
    percent + "%";

    document
    .getElementById(
        "completionText"
    )
    .innerText =
    `${completed} / ${totalItems} Items Complete`;

    if(percent===100){

        alert(
        "🎉 Project Ready!\n\nYou now have everything needed to complete this project."
        );

    }

}
