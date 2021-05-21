console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle=document.getElementById("addTitle");
  let notes = localStorage.getItem("notes"); //will get a string here
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //will get it in an array form
  }
  let myObj={
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj)); //will convert the whole array into a string
  addTxt.value = "";
  addTitle.value="";
  showNotes();
});

//Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
//   console.log(notes);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
         <div class="card-body">
           <h5 class="card-title">${element.title}</h5>
           <p class="card-text">${element.text}</p>
           <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
         </div>
       </div>
                `;
  });

  //Here we will insert the cards in the div of notes to be displayed. Without this the cards won't be displayed.
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//Function to delete a note
function deleteNote(index) {
  console.log("I am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj)); //We are updating the local storage.
  showNotes();
}


// To search
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
//   console.log("Input event fired!", inputVal);

  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
















 
