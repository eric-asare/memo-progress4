window.addEventListener('load', () => {

    document.body.style.backgroundImage = "url('https://eric-asare.github.io/ConnectionsLab/week10/memoICE/design/brain.png')";
    document.body.style.color = 'pink';



    // let submitButton = document.getElementById('send-button');
    let joinForm = document.getElementById('join-form');

    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let name = document.getElementById('name-input').value;
        let room = document.getElementById('level-select').value;
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);

        //save the name and the room in session storage
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('room', room);
        sessionStorage.setItem('colorCode', randomColor);

        //redirect the user to chat.html
        window.location = './game.html'
    })
})