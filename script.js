document.addEventListener('DOMContentLoaded', function() {
    const tick = document.getElementById('tick');
    const list = document.getElementById('list');
    const container = document.getElementById('list-container');


    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(note => {
            const newNote = createNoteElement(note.text);
            container.appendChild(newNote);
        });
    }

   
    function saveNotes() {
        const notes = Array.from(container.children).map(noteElement => ({
            text: noteElement.querySelector('.note-text').textContent.trim()
        }));
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function createNoteElement(text) {
        const newNote = document.createElement('div');
        newNote.innerHTML = `
            <div class="list-section">
                <p class="note-text">${text}</p>
                <div class="todolist-btn-trash">
                    <h3><i class="fa-solid fa-trash"></i></h3>
                </div>
                <div class="todolist-btn-pencil">
                    <h3><i class="fa-solid fa-pencil"></i></h3>
                </div> 
            </div>
        `;

       
        const trashButton = newNote.querySelector('.todolist-btn-trash');
        trashButton.addEventListener('click', function() {
            newNote.remove();
            saveNotes(); 
        });

     
        const noteText = newNote.querySelector('.note-text');
        const updatePencil = newNote.querySelector('.todolist-btn-pencil');
        updatePencil.addEventListener('click', () => {
            const input = document.createElement('textarea');
            input.classList.add('msg-box');
            input.type = 'text';
            input.value = noteText.textContent;
            noteText.replaceWith(input);
            input.focus();

            const saveNote = () => {
                if (input.value.trim() !== '') {
                    noteText.textContent = input.value.trim();
                }
                input.replaceWith(noteText);
                saveNotes(); 
            };

            input.addEventListener('blur', saveNote);
            input.addEventListener('keypress', e => {
                if (e.key === 'Enter') saveNote();
            });
        });

        return newNote;
    }


    function makeNote() {
        const listValue = list.value.trim();
        if (listValue === '') return;

        const newNote = createNoteElement(listValue);
        container.appendChild(newNote);
        list.value = '';
        saveNotes(); 
    }


    tick.addEventListener('click', makeNote);

   
    list.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            makeNote();
        }
    });

   
    loadNotes();


    const customColor = document.querySelectorAll('.custom-color');
const containerColor = document.querySelector('.container');


function setColorInLocalStorage(colorId) {
    localStorage.setItem('selectedColor', colorId);
}

customColor.forEach((div, index) => {
    div.addEventListener('click', function() {
        const newid = `custom${index + 1}`;
        containerColor.id = newid;
        setColorInLocalStorage(newid); 
    });
});


function loadColorFromLocalStorage() {
    const selectedColor = localStorage.getItem('selectedColor');
    if (selectedColor) {
        containerColor.id = selectedColor;
    }
}


loadColorFromLocalStorage();

    const menuBtn = document.getElementById('menu-color');
    const colorMenu = document.querySelector('.custon-section');

    function customMenu() {
        if (colorMenu.classList.contains('show')) {
            colorMenu.classList.remove('show');
            colorMenu.classList.add('hide');
        } else {
            colorMenu.classList.add('show');
            colorMenu.classList.remove('hide');
        }
    }

    menuBtn.addEventListener('click', customMenu);

    document.addEventListener('click', function(event) {
        if (!colorMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            colorMenu.classList.add('hide');
            colorMenu.classList.remove('show');
        }
    });

    const inputColor = document.getElementById('custon-input-color');

    inputColor.addEventListener('input', e => {
        const solidColor = e.target.value;
        containerColor.style.background = solidColor;
    });
});


function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}


window.onscroll = function() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
};