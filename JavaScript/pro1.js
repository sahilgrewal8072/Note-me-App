showNotes();
let textArea = document.getElementById("noteText");
let addNote = document.getElementById("addBtn");
addNote.addEventListener('click', function (e) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }
    noteObj.push(textArea.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    textArea.value = "";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }
    let cards = document.getElementById("myNotes");
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`
    });
    if (noteObj.length != 0) {
        cards.innerHTML = html;
    } else {
        cards.innerHTML = `Nothing to show here`;
    }
}

// Deleting a Note

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        noteObj = [];
    }else{
        noteObj = JSON.parse(notes); 
    }
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNotes();
}

// Searching a Note

let searchText = document.getElementById("searchTxt");

searchText.addEventListener("input", function(){
    let searchResult = searchText.value.toLowerCase();
    let cards = document.getElementsByClassName("noteCard");
    Array.from(cards).forEach(function(ele){
        let cardTxt = ele.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(searchResult)){
            ele.style.display = "block";
        }else{
            ele.style.display = "none";
        }
    })
})