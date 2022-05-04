console.log("Welcome to app.js");

shownotes();

let button = document.getElementById("addBtn");

//Clicking the add button will store the value in local storage

button.addEventListener("click", function () {
    let textarea = document.getElementById("addTxt");
    let noteTitle = document.getElementById("noteTitle");
    if (textarea.textLength == 0) {
        alert("Cannot add empty note");
    }
    else {
        let notes = localStorage.getItem("notes");
        let titles = localStorage.getItem("titles");
        if (notes == null) {
            notesObject = [];
            titleObject = [];
        }
        else {
            notesObject = JSON.parse(notes);
            titleObject = JSON.parse(titles)
        }
        notesObject.push(textarea.value);
        titleObject.push(noteTitle.value);
        localStorage.setItem("notes", JSON.stringify(notesObject));
        localStorage.setItem("titles", JSON.stringify(titleObject));
        textarea.value = "";
        noteTitle.value = "";
        shownotes();
    }
});

//Function to fetch the values from local storage and show as notes

function shownotes() {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");
    
    if (notes == null) {
        notesObj = [];
        titleObject = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titleObject = JSON.parse(titles);
    }
    let html = "";
    // let titleArray = Array.from(titleObject);
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title noteCardTitle">${titleObject[index]}</h5>
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
    let titles = localStorage.getItem("titles");
    if (notes == null) {
        notesObj = [];
        titleObject = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titleObject = JSON.parse(titles);
    }
    notesObj.splice(index, 1);
    titleObject.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titleObject));
    shownotes();

}

let search = document.getElementById("searchbar");

//Search bar event to show the notes matching the searched value

search.addEventListener("input", function () {
    let noteCard = document.getElementsByClassName("noteCard");
    let noteCardTitle = Array.from(document.getElementsByClassName("noteCardTitle"));

    Array.from(noteCard).forEach(function (element, index) {
        let noteCardText = element.querySelector("p").innerText.toLowerCase();
        if (noteCardText.includes(search.value) || noteCardTitle[index].innerText.toLowerCase().includes(search.value)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});