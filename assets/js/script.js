

var timeLeft = 60;
var timerId;
var temerEl = document.getElementById("timer");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var shuffledQuestions, currentQuestionIndex;



startButton.addEventListener("click", startgame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex  ++
    setNextQuestion()
});

function timeTick(){
    timeLeft--;
    timerEl.textContent = "Time:  " + timeLeft;
    if(timeLeft <= 0){
        saveScore();
    }
}


function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");

    timeTick();
    setNextQuestion();

};