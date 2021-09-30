/*
  Pseudocode:
    - Create a code quiz with at least five multiple choice questions
    - Click a start button a the beginning to start a timer -- 60 seconds total for the five questions
    - Each correct answer earns a point and user moves on to next question
    - When a question is answered incorrectly, 3 seconds is removed from the clock
    - When all questions are answered correctly OR the timer hits 0, the quiz is over
    - When the game is over I can save my initals and my score
*/

var answersArea = document.getElementById("answer-buttons");
var clickBtn = document.getElementById("starting-click");
var headerDiv = document.getElementById("header");
var questionsDiv = document.getElementById("questions-div");
var score = localStorage.getItem("score");
var secondsLeft = 60;
var questionsIndex = 0;
var userPointsTotal = 0;
var timeInterval;

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
  newHeadline.textContent = "Game over! Your final score is " + userPointsTotal + " points!";
  localStorage.setItem("score", userPointsTotal);
  document.body.appendChild(newHeadline);
};

function startTimer() {
  var displayTimer = document.querySelector(".timer");
  timeInterval = setInterval(function () {
    console.log(secondsLeft);
    if (secondsLeft > 1) {
      secondsLeft--;
      displayTimer.textContent = secondsLeft + " seconds remaining.";
    } else if (secondsLeft === 1) {
      secondsLeft--;
      displayTimer.textContent = secondsLeft + " second remaining.";
    } else {
      displayTimer.textContent = 0 + " seconds remaining.";
      clearInterval(timeInterval);
      displayScore();
      questionsDiv.style.display = "none";
    }
  }, 1000);
  showQuestion();
};

clickBtn.addEventListener("click", function (event) {
  headerDiv.style.display = "none";
  questionsDiv.style.display = "block";
  startTimer();
});

function showQuestion() {
  if (questionsIndex <= quizQuestions.length) {
    document.getElementById("ask-question").textContent = quizQuestions[questionsIndex].questionText; // <-- what's happening here?
    answersArea.innerHTML = "";
    for (var i = 0; i < quizQuestions[questionsIndex].choices.length; i++) {
      var currAnswer = quizQuestions[questionsIndex].choices[i];
      var btn = document.createElement("button");
      btn.textContent = currAnswer;
      answersArea.appendChild(btn);
    }
  }
};

answersArea.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    var correct = quizQuestions[questionsIndex].correctAnswer; // <-- getting an error here: "Uncaught TypeError: Cannot read properties of undefined (reading 'correctAnswer') at HTMLDivElement.<anonymous>"" // ignore for now 
    var buttonClicked = event.target.textContent;
    if (buttonClicked === correct) {
      userPointsTotal++;
    } else {
      if(secondsLeft < 10) {
        secondsLeft = 0
      } else {
        secondsLeft = secondsLeft - 10;
      }
    }
    questionsIndex++;
    if (questionsIndex === quizQuestions.length) {
      questionsDiv.style.display = "none";
      displayScore();
    } else {
      showQuestion();
    }
  }
});
