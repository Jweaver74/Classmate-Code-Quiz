

var timeLeft = 60;
var timerId;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var answerButtonsEl = document.getElementById("answer-btn");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var checkAnswerEl = document.getElementById("check-answer");
var initialsField = document.getElementById("player-name");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var shuffledQuestions, currentQuestionIndex;



startButton.addEventListener("click", startGame);
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
    timerId = setInterval(timeTick, 1000);
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

Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
})

if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove("hide");
}else{
    saveButton.classList.remove("hide");
    saveScore();
}

function setStatusClass(element, correct) {
clearStatusClass(element);
if (correct){
    element.classList.add("correct");
}else{
    element.classList.add("wrong")
}
};

function saveScore(){
    clearInterval(timerId);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function (){
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Final Score" + timeLeft;
    },2000)
};

var loadScores = function(){
    if (!savedScores){
        return false;
    }
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft, initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores);

    savedScores.forEach(score => {
        initialsField.innerText = score.initials;
        scoreField.innerText = score.score;
    })
};

function showHighScores(initials){
    document.getElementById("highscores").classList.remove("hide");
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if(typeof intitials == "string"){
        var score = {
            initials, timeLeft
        }
        score.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (index = 0; i < scores.length; i++) {
       var div1 = document.createElement("div");
       div1.setAttribute("class", "name-div");
       div1.innerText = scores[i].initials;
       var div2 = document.createElement("div");
       div2.setAttribute("class", "score-div");
       div2.innerText = scores[i].timeLeft;

       highScoreEl.appendChild(div1);
       highScoreEl.appendChild(div2);
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}: