

var timeLeft = 60;
var timerId;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var answerButtonEl = document.getElementById("answer-btn");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var checkAnswerEl = document.getElementById("check-answer");
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

function setNextQuestion(){
    resetstate();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};


function showQuestion(question){
questionContainerEl.innerText = question.question;
question.answers.forEach(answer =>{
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonEl.appendChild(button);
})
};

function resetstate(){
    nextButton.classList.add("hide");
    checkAnswerEl.classList.add("hide");
    while(answerButtonEl.firstChild){
        answerButtonEl.removeChild;
        (answerButtonEl.firstChild);
    }
};

function selectAnswer(e){
    var selectButton = e.target;
    var correct = selectButton.dataset.correct;
    checkAnswerEl.classList.remove("hide");
    
    if(correct){
        checkAnswerEl.innerHTML = "You are correct";
    }else {
        checkAnswerEl.innerHTML = "That was incorrect";}

        if (timeLeft <= 10){
            timeLeft = 0;
        }else{
            timeLeft -=10;
        }   
}