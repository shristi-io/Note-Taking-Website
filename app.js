console.log("Welcome to app.js");

shownotes();

let button = document.getElementById("addBtn");

//Clicking the add button will store the value in local storage

button.addEventListener("click", function () {
    let textarea = document.getElementById("addTxt");
    if (textarea.textLength == 0) {
        alert("Cannot add empty note");
    }
    else {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObject = [];
        }
        else {
            notesObject = JSON.parse(notes);
        }
        notesObject.push(textarea.value);
        localStorage.setItem("notes", JSON.stringify(notesObject));
        textarea.value = "";
        shownotes();
    }
});

//Function to fetch the values from local storage and show as notes

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onClick=deleteNotes(this.id) class="btn btn-primary">Delete</button>
            </div>
            </div>
        </div>
`;

    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `No new notes!`;
    }
}

//Function to delete the notes and remove the value from local storage

function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();

}

let search = document.getElementById("searchbar");

//Search bar event to show the notes matching the searched value

search.addEventListener("input", function () {
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let noteCardText = element.querySelector("p").innerText.toLowerCase();
        if (noteCardText.includes(search.value)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});