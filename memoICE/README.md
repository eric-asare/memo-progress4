MemoICE
----------------------

### DESCRIPTION
MemoICE is a memory game designed to train the brain , increase once's vocabulary and build friendship. Users (two players each) play against time to memorize words shown them. Then write all the words they remember to earn points and a place as a fire breather on the leaderboard. 

MemoICE has easy, medium, difficult and pro levels. Users can select the level and enter the room designed purposely for such level of gaming. 

### WORKING LINK
The working link to working page [WebPage-Progress](https://twilight-fringe-casquette.glitch.me)


### WIREFRAME

  ![Layout Sketch](https://eric-asare.github.io/ConnectionsLab/week10/memoICE/design/wireframe.png)

### STEPS COMPLETED
This is the game flow

* Two users  enter their name and join the same room from the lobby or landing page ( There are 4 rooms based on game difficulty : easy, medium, hard, pro levels)

* When a third User Join, he or she is prompted to join another room

* Only one user has to click the start button. Once, the start button is clicked, the client side sends a signal to the server to load the game data ( ideally , words to test users and the timelimit to memorize). 

* Client upon receiving this game data displays to the users and starts the timer. 

* Once the timer is done, the clients sends to server memorization time is over, the server sends to the client to start writing. a text box appears to the users telling them to enter the words they remember. A timer for this stage of the game begins to cause the users to feel a sense of urgency and to make the leader board competitives

* When users submit a word, the data is sent from the client side to the server side 

* The server upon receiving the wordInput data prepares a progress report to send to client by 1. keeping track of the name of the user who submitted the word, 2. where the word is correct or wrong 3. Score increment and deduction

* The client upon receiving the progress report back displays to the user

* When the remembering phase timer is over, the users are shown their score and position on the leader board and with a button to go back to the lobby. 

### CHALLENGES AND LESSONS
* Keeping Score Board - adding to array in OBJECTS 
* Lots of bugs, solved by running little of the client -server communication as I write
* Even though implementing alert to inform the user whether the room is full or not clears confusion when users are using the application, It felt annoying to always close the alert popups. So I look around for an alternative. 
It appears that you can control [in built alert](https://stackoverflow.com/questions/15466802/how-can-i-auto-hide-alert-box-after-it-showing-it).My best option was to use  a custom popup shown in the link above. 

* The window was changing as soon as timer stops, used setTimeout to delay the change by 2 seconds. Change it to 1second so that user don't feel the wait

* Need to generate random color in javascript : used this site https://css-tricks.com/snippets/javascript/random-hex-color/


* In creating buble words, I found this really helpful library. 
Animated text sphere in JavaScript using TagCloud.js (https://dev.to/asmit2952/animated-text-sphere-in-javascript-using-tagcloud-js-1p72)


### NEXT STEPS
* Detailed Wireframe
* Improve UI( Needs a color pallete)
  * Increment padding on Intro Words

* Top 5 players on landing page
* Add Words Shuffler or Generator (API)
* Timer for writing remembered words
* neDB for Score Board
* Functions to clean up code
* Remove unused code
* Ticking Timer Sound

### USER TEST OUTCOMES

#### QUESTIONS AND USER ANSWERS 
**Disclaimer:** Names of participants omitted for privacy. Users responses are weaved into a single answer. 

* What is your first impression of the product?
**Ans:** It is an interesting game. The easy level is going to be easy. The words will be straigtforward.

* What is going in your mind as you interact with this product?
**Ans:** This is interesting. The game play seems straight forward. Are all these words? Where did you get these words? Wait the easy level is not as easy as it seems. I am too dumb. I should type fast,time ticking. 

* What did you expect to happen?
**Ans:** Thought it was a competition game but turns out to be a collaboration game? Thought it would be easy. 

* What would you change? What should be added or removed to enhance your experience. 

**Ans:**
1. Could you clearly tell players whether they are collaborating or competing against each other.
2. Could you clear the input so that I don't have to clean it when typing a new word
3. Can you show whether I am alone in the room or the room is full?
4. Can we have a link to go back to the LOBBY/ level selection
5. What are we playing the against if it is not against each other? Can you add a Time pressure? 
6. Is there a way to know the number of words left to type
7.  Can you colour code based on player
8. Could you add an element of competition among the Users
9. Could you separate clearly the words each player typed
10. What happens if I type the same "correct" word. Is the score incremented or stays the same?
11. Could you randomize the words? If I play for a long time. I would want to see new words
12.You could use [pantone colors](https://www.pantone.com/uk/en/color-of-the-year-2022-palette-exploration) for the UI 
13. Could you add round bubles containing the words typed


* Does this feel like it was designed for you?
**Ans:** Oh yes!,  No I am too dumb, my memory not so good for this game lol. Could be easier. 


* Since this is still a project in development what would you like to see in the newer version?
1. Maybe a communication system so that users can talk to each other as they play the game
2. Hints for the words if we fail guess


#### UPDATES FROM USER TESTING
User testing allowed me to discover what was important to my users rather than what I wanted to build.

I implemented the following from the user testing to enhance the overall game experience. 

1. Cleared the input area so that users may simply type new words without having to delete previous ones.

2. I added bolded text **COLLABORATE** to tell users this game is about collaboration

3. I added alert messages to inform users if they should wait for a game partner to join or play the game as room is full. 

4. Removed the send button because users were confused whether they could submit by presssing enter. Since the game is time pressured, any little time lost in the process is nerve wracking.

5. Added a go back button so that users can go back to choose different levels or look at the scoreboard

6. Made Sure that user can enter room only after entering name

7. Added a timer to heat up the recall stage. Users feel a sense of urgency to type all the words they can remember as fast as they can

8. Added a `div` just below the timer to allow the user know the the number of words left to recall

9. Color coded users using random colors generated upon opening browser
//
10. Adding bubles color coded according to user and the correct words typed.

11. Added sanity checks to not increment score if the word is already typed

12. Clean UI

13. Upload on github

14. Host on glitch

15. Paste into class link

// later
13. Randomized words using an API 

14. Confetti upon game over









