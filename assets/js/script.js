/*
  Pseudocode:
    - Create a code quiz with at least five multiple choice questions
    - Click a start button a the beginning to start a timer -- 60 seconds total for the five questions
    - Each correct answer earns a point and user moves on to next question
    - When a question is answered incorrectly, 3 seconds is removed from the clock
    - When all questions are answered correctly OR the timer hits 0, the quiz is over
    - When the game is over I can save my initals and my score <-- only this left to do
*/

var answersArea = document.getElementById("answer-buttons"); // calls the "answer-buttons" div tag in HTML
var secondsLeft = 60;
var questionsIndex = 0;
var userPointsTotal = 0;
var timeInterval;
var clickBtn = document.getElementById("starting-click"); // starts the quiz 1/2
var headerDiv = document.getElementById("header");
var questionsDiv = document.getElementById("questionsDiv");
var quizQuestions = [
  {
    questionText: "What is JavaScript?",
    choices: ["Coffee text", "Programming language", "Markup syntax", "Idk?? You tell me!"],
    correctAnswer: "Programming language"
  },
  {
    questionText: "What does DOM stand for?",
    choices: ["Document Object Model", "Donuts On Mouths", "Don't Only Moan", "Digital Only Mode"],
    correctAnswer: "Document Object Model"
  },
  {
    questionText: "What are the two other primary web development languages?",
    choices: ["Markdown & RTF", "BLT & PBJ", "RTL & CNN", "HTML & CSS"],
    correctAnswer: "HTML & CSS"
  },
  {
    questionText: "Is JavaScript the same language as Java?",
    choices: ["Yes, obviously", "No 🤬", "Of course, obviously", "Duhh, obviously"],
    correctAnswer: "No 🤬"
  },
  {
    questionText: "What is the capitol of MN?",
    choices: ["Saint Paul", "This isn't a JavaScript question!", "Green Bay", "New York City"],
    correctAnswer: "Saint Paul"
  },
];

function displayScore() {
  var newHeadline = document.createElement("h1");
  newHeadline.textContent = "Game over! Your final score is " + userPointsTotal + "points!";
  document.body.appendChild(newHeadline);
}

function startTimer() {
  timeInterval = setInterval(function () {
    if (secondsLeft > 1) {
      secondsLeft.textContent = secondsLeft + " seconds remaining.";
      secondsLeft--;
    } else if (secondsLeft === 1) {
      secondsLeft.textContent = " second remaining.";
      secondsLeft--;
    } else {
      secondsLeft.textContent = " seconds remaining.";
      clearInterval(timeInterval);
      if (clearInterval) {
        displayScore();
      }
    }
  }, 1000);
  showQuestion();
}

clickBtn.addEventListener("click", function(event){
  headerDiv.style.display = "none";
  questionsDiv.style.display = "block"; // look into other displays?? (Gary's note)
  startTimer();
});

function showQuestion() {
  if( questionsIndex <= quizQuestions.length ){
    document.getElementById("askQuestion").textContent = quizQuestions[questionsIndex].questionText;
    answersArea.innerHTML = "";
    for (var i = 0; i < quizQuestions[questionsIndex].choices.length; i++) { // math to calculate how many questions left
      var currAnswer = quizQuestions[questionsIndex].choices[i];
      var btn = document.createElement("button");
      btn.textContent = currAnswer;
      answersArea.appendChild(btn);
    }
  }
}

// this fires off every time a question is answered
answersArea.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    var correct = quizQuestions[questionsIndex].correctAnswer;
    var buttonClicked = event.target.textContent;
    if (buttonClicked === correct) {
      userPointsTotal++;
    } else {
      userPointsTotal--;
      secondsLeft = secondsLeft - 10;
    }
    questionsIndex++;
    if (questionsIndex === quizQuestions.length) {
      // end the game and calculate final score
      displayScore();
    } else {
      showQuestion();
    }
  }
})
