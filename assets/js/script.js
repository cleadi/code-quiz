/*
  Pseudocode:
    - Create a code quiz with at least five multiple choice questions
    - Click a start button a the beginning to start a timer -- 60 seconds total for the five questions
    - Each correct answer earns a point and user moves on to next question
    - When a question is answered incorrectly, 3 seconds is removed from the clock
    - When all questions are answered correctly OR the timer hits 0, the quiz is over
    - When the game is over I can save my initals and my score
*/

// var count = localStorage.getItem("count");
// count.textCounter = count;
// localStorage.setItem("count", count);

var answersArea = document.getElementById("answer-buttons");

var secondsLeft = 60; // leave until the end
var questionsIndex = 0;

var timeInterval;

var quizQuestions = [
  {
    questionText: "What is JavaScript?",
    choices: ["Coffee text", "Programming language", "Markup syntax", "Idk?? You tell me!"],
    correctAnswer: "Programming language"
  },
  {
    questionText: "What is the capitol of MN?",
    choices: ["Saint Paul", "Minneapolis", "Green Bay", "Saint Cloud"],
    correctAnswer: "Saint Paul"
  },
  {
    questionText: "What is the capitol of MN?",
    choices: ["Saint Paul", "Minneapolis", "Green Bay", "Saint Cloud"],
    correctAnswer: "Saint Paul"
  },
  {
    questionText: "What is the capitol of MN?",
    choices: ["Saint Paul", "Minneapolis", "Green Bay", "Saint Cloud"],
    correctAnswer: "Saint Paul"
  },
  {
    questionText: "What is the capitol of MN?",
    choices: ["Saint Paul", "Minneapolis", "Green Bay", "Saint Cloud"],
    correctAnswer: "Saint Paul"
  },
];

var clickBtn = document.getElementById("starting-click");
var headerDiv = document.getElementById("header");
var questionsDiv = document.getElementById("questionsDiv");

clickBtn.addEventListener("click", function(event){
  headerDiv.style.display = "none";
  questionsDiv.style.display = "block"; // look into other displays
  startTimer();
});

function showQuestion() {
  if( questionsIndex <= quizQuestions.length ){
    document.getElementById("askQuestion").textContent = quizQuestions[questionsIndex].questionText; // stopped HERE with Lilo
    answersArea.innerHTML = "";
    for (var i = 0; i < quizQuestions[questionsIndex].choices.length; i++) {
      var currAnswer = quizQuestions[questionsIndex].choices[i];
      var btn = document.createElement("button");
      btn.textContent = currAnswer;
      answersArea.appendChild(btn);
      // Kathy helped to here <-- need to find a way to check the whole array (loop through the array?)
    }
  }
}

// this fires off every time a question is answered
answersArea.addEventListener("click", function(event){
  if( event.target.matches("button") ){
    var correct = quizQuestions[questionsIndex].correctAnswer;
    var buttonClicked = event.target.textContent;
    if( buttonClicked === correct ){
      // the user guessed right, add 1 point to total
      // create global variable - DC
    } else {
      // the user guessed wrong
      secondsLeft = secondsLeft - 10;  // subtract more seconds from time remaining
    }
    // are all the questioned answered
    questionsIndex++;

    if( questionsIndex === quizQuestions.length ){
      // end the game and calculate final score
    } else {
      showQuestion();
    }
  }
})

function startTimer() {
  timeInterval = setInterval(function () {
    if (secondsLeft > 1) {
      clickBtn.textContent = secondsLeft + " seconds remaining";
      secondsLeft--;
    } else if (secondsLeft === 1) {
      clickBtn.textContent = " second remaining";
      secondsLeft--;
    } else {
      timerEl.textContent = "";
      clearInterval(timeInterval);

      // end game message, show final score?? - DC

      // displayMessage();
    }
  }, 1000);
  showQuestion();
}
