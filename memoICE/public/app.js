let colorCodes = {}

function informUser(msg, duration) {
    let gameWindow = document.getElementById('game-box-msgs');

    let word = document.createElement('div');
    word.style.marginTop = '50px';
    word.style.textAlign = 'center';
    word.innerText = msg;

    gameWindow.appendChild(word);
    setTimeout(function() {
        gameWindow.removeChild(word);
    }, duration);
}




// client connects to the server
let socket = io();




//confirm that the client is connected
socket.on('connect', () => {
    console.log('connected to the server');
    // now that client has connected to server, emit name and room information
    let data = {
        'name': sessionStorage.getItem('name'),
        'room': sessionStorage.getItem('room'),
        'colorCode': sessionStorage.getItem('colorCode')
    }
    socket.emit('userData', data);
})


socket.on('showBoard', (highScoreData) => {
    window.location = './rank.html'
    let highScores = document.querySelector('.high-scores');
    let score = document.createElement('p');
    word.innerText = highScoreData.teamNames + ": " + highScoreData.scores;
    highScores.appendChild(word);
});




// limiting number of people in room to 2
socket.on('maxUsersReached', () => {
    alert('This room is full. Please go back and try to join another room');

    document.getElementById("game-form").innerHTML = ""

})




// telling first user to join room to wait for game partner
socket.on('firstUserJoined', () => {
    informUser('Hey! Be patient as your game partner joins', 200);
})


// telling the team to begin playing the game
socket.on('secondUserJoined', (data) => {
    let welcomeMessage = data.msg;

    for (userName in data.colorCodes) {
        colorCodes[userName] = data.colorCodes[userName];
    }

    informUser(welcomeMessage, 3000);
})



// receive game data from server
socket.on('gameBegins', (gameData) => {
    gameData = gameData.roomName;

    let gameWindow = document.getElementById('game-box-msgs');

    for (let i = 0; i < gameData.length; i++) {
        console.log(gameData[i]);

        let word = document.createElement('p');
        word.classList.add("tag");
        word.innerText = gameData[i];
        gameWindow.appendChild(word);
    }

    // side the start button
    document.getElementById('start-button').style.visibility = 'hidden';

    // timeSeconds needed for each level to be included in gameData 
    let timeSecond = 30;
    let timeH = document.getElementById("game-timer");

    playTime(timeSecond);

    let countDown = setInterval(() => {
        timeSecond--;
        playTime(timeSecond);
        if (timeSecond == 0 || timeSecond < 1) {
            end();
            clearInterval(countDown);
        }
    }, 1000);

    // Timer Function
    function playTime(second) {
        let min = Math.floor(second / 60);
        let sec = Math.floor(second % 60);
        timeH.innerHTML = `
${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
`;
    }

    function end() {
        timeH.innerHTML = `Time Out: Enter Words Below `;
        // wait two seconds before calling memorization over

        setTimeout(function() {
            socket.emit('memorizationOver');
        }, 1000);
    }




})

socket.on('startWriting', () => {
    //Show Words Input Button
    let msgInput = document.getElementById('word-input');
    msgInput.style.visibility = 'visible';


    //clear game Window
    document.getElementById('game-box-msgs').innerHTML = " "

    // timeSeconds needed for each level to be included in gameData 
    let timeSecond = 30;
    let timeH = document.getElementById("game-timer");

    displayTime(timeSecond);

    let countDown = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond == 0 || timeSecond < 1) {
            endCount();
            clearInterval(countDown);
        }
    }, 1000);

    // Timer Function
    function displayTime(second) {
        let min = Math.floor(second / 60);
        let sec = Math.floor(second % 60);
        timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
    }

    function endCount() {
        timeH.innerHTML = `Game Over `;

        setTimeout(function() {
            socket.emit('gameOver');
        }, 5000);



    }


})


// get progress data and show on game window
socket.on('currentScore', (progressData) => {
    console.log(progressData);

    let gameWindow = document.getElementById('game-box-msgs');
    let word = document.createElement('p');
    word.classList.add("tag");
    word.style.color = progressData.color;
    word.innerText = progressData.data;
    gameWindow.appendChild(word);

    // add data to window screen and score to total score
    let gameScore = document.getElementById('game-score');
    gameScore.innerHTML = progressData.score;
    // update words left


    let wordsDisplay = document.getElementById('game-words');
    wordsDisplay.style.visibility = 'visible';

    let wordsLeft = document.getElementById('words-left');
    wordsLeft.innerHTML = progressData.wordsLeft;

})



// get progress data and show on game window


//receive old messages
socket.on('pastMessages', (data) => {
    console.log(data);
})




//2) get the input from the user, on click event we get the information (c)

window.addEventListener('load', () => {

    let userName = document.getElementById('user-name');
    userName.innerHTML = sessionStorage.getItem('name');

    userName.style.color = "#" + sessionStorage.getItem('colorCode');

    let gameLevel = document.getElementById('game-header-msg')
    gameLevel.innerHTML = "Level: " + sessionStorage.getItem('room').toUpperCase();


    let gameForm = document.getElementById('game-form');

    // Hide Words Input and Send Button
    let msgInput = document.getElementById('word-input');
    msgInput.style.visibility = 'hidden';

    let wordsLeft = document.getElementById('game-words');
    wordsLeft.style.visibility = 'hidden';


    let sendButton = document.getElementById('send-button');
    sendButton.style.visibility = 'hidden';

    // listen for start button and emit data
    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        socket.emit('gameStart');
    })

    // listen for go back button and go back
    let goHomeButton = document.getElementById('go-home');
    goHomeButton.addEventListener('click', () => {
        window.location = './index.html'
    })


    // send words that you remember

    gameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = sessionStorage.getItem('name');
        let word = document.getElementById('word-input').value;
        // console.log(name, word);

        //emit the information to the server
        wordObject = {
            'name': name,
            'word': word
        }

        console.log(wordObject);
        socket.emit('wordInput', wordObject);

        // clear input after sending
        document.getElementById('word-input').value = " ";
    })


})