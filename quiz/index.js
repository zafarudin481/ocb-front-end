// global variable declaration
let sessionCounter = 1;
let userScore = 0;
const quizSets = quizList;

// event listener to initiate the quiz
const initiateButton = document.getElementById("initiate-button");
const initiateAction = initiateButton.addEventListener("click", function () {
    initiateQuiz();
    initiateButtonEventListener();
    listenToInputChange();
})

// function to initiate the quiz
function initiateQuiz() {
    // declare the extracted question for the session
    const quizSet = getQuizSet(sessionCounter, quizSets);

    // get element container to place the question and answer options
    const quizContainer = document.getElementById("quiz-container");

    // replace the element container with new html code
    quizContainer.innerHTML = "";
    quizContainer.innerHTML =
        '<div id="quiz-header" class="p-4">' +
        '<h4 class="m-0">Markah anda: <span id="user-score">' + userScore + '</span>/10</h4>' +
        '</div>' +
        '<div id="quiz-content" class="p-4 text-start">' +

        '<div class="container">' +
        '<div class="row">' +
        '<div class="col-12 col-md-7 mx-md-auto">' +
        '<p class="fs-5 text-md-center mb-0 fw-bold">Soalan <span id="question-number-display">' + sessionCounter + '</span>:</p>' +
        '<p class="fs-5 text-md-center" id="question-display">' + quizSet.question + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-12 col-md-4 mx-md-auto">' +
        '<fieldset id="answer-option" class="mb-4">' +
        '<div class="d-flex flex-column gap-1 fs-5">' +
        '<div>' +
        '<input id="option-1" name="user-answer" value="0" type="radio">' +
        '<label for="option-1" class="ms-1">' + quizSet.answerOpt1 + '</label>' +
        '</div>' +
        '<div>' +
        '<input id="option-2" name="user-answer" value="1" type="radio">' +
        '<label for="option-2" class="ms-1">' + quizSet.answerOpt2 + '</label>' +
        '</div>' +
        '<div>' +
        '<input id="option-3" name="user-answer" value="2" type="radio">' +
        '<label for="option-3" class="ms-1">' + quizSet.answerOpt3 + '</label>' +
        '</div>' +
        '</div>' +
        '</fieldset>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="container">' +
        '<div class="row text-center justify-content-center">' +
        '<div id="alert-display" class="col-12 col-md-6">' +
        '</div>' +
        '</div>' +
        '<div class="row g-2 g-md-4">' +
        '<div class="col-6 col-md-4 d-grid">' +
        '<button id="submit-button" class="btn btn-primary btn-md disabled">Hantar</button>' +
        '</div>' +
        '<div class="col-6 col-md-4 d-grid">' +
        '<button id="next-button" class="btn btn-primary btn-md disabled">Seterusnya</button>' +
        '</div>' +
        '<div class="col-12 col-md-4 d-grid">' +
        '<button id="restart-button" class="btn btn-secondary btn-md">Mula Semula</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// function to go to next question
function nextQuestion() {
    // update sessionCounter variable
    const updatedSessionCounter = sessionCounter + 1;
    sessionCounter = updatedSessionCounter;

    // reset for next question
    disableNextButton();
    resetAlertDisplay();

    // get element which display will be updated for next question
    const questionNoDisplay = document.getElementById("question-number-display");
    const questionDisplay = document.getElementById("question-display");
    const answerOptionDisplay1 = document.querySelector('label[for="option-1"]');
    const answerOptionDisplay2 = document.querySelector('label[for="option-2"]');
    const answerOptionDisplay3 = document.querySelector('label[for="option-3"]');

    // update new quiz set
    const nextQuizSet = getQuizSet(sessionCounter, quizSets);
    questionNoDisplay.innerHTML = sessionCounter;
    questionDisplay.innerHTML = nextQuizSet.question;
    answerOptionDisplay1.innerHTML = nextQuizSet.answerOpt1;
    answerOptionDisplay2.innerHTML = nextQuizSet.answerOpt2;
    answerOptionDisplay3.innerHTML = nextQuizSet.answerOpt3;

    enableInput();
}

// function to get question and answers option from array
function getQuizSet(sessionCounter, quizSets) {
    const quizSet = quizSets[sessionCounter - 1];
    const question = quizSet.question;;
    const answerOpt1 = quizSet.answerOption[0];
    const answerOpt2 = quizSet.answerOption[1];
    const answerOpt3 = quizSet.answerOption[2];

    return {
        question: question,
        answerOpt1: answerOpt1,
        answerOpt2: answerOpt2,
        answerOpt3: answerOpt3
    }
}

// function to initiate quiz session button event listener
function initiateButtonEventListener() {
    // event listener to submit answer
    const submitButton = document.getElementById("submit-button");
    const submitAlert = submitButton.addEventListener("click", function () {
        submitAnswer();
    })

    // event listener to next question
    const nextButton = document.getElementById("next-button");
    const nextAlert = nextButton.addEventListener("click", function () {
        sessionCounter != 10 ? nextQuestion() : finishQuiz();
    })

    // event listener to restart quiz
    listenToRestartButton();
}

// function to enable submit button after answer is chosen
function listenToInputChange() {
    const input = document.getElementsByName("user-answer");
    input.forEach((input) => {
        input.addEventListener("change", enableSubmitButton);
    })
}

// function to enable submit button
function enableSubmitButton() {
    const submitButton = document.getElementById("submit-button");
    submitButton.setAttribute("class", "btn btn-primary btn-md");
}

// function to submit answer
function submitAnswer() {
    const answerInput = document.querySelector('input[name = "user-answer"]:checked');

    if (answerInput != null) {
        disableSubmitButton();
        checkAnswer(answerInput) == true ? updateUserScore() : alertWrongAnswer();
        disableInput();
        enableNextButton();
        if (sessionCounter == 10) {
            changeNextButton();
        }
    } else {
        alert("Sila pilih jawapan sebelum hantar");
    }
}

// function to disable submit button
function disableSubmitButton() {
    const submitButton = document.getElementById("submit-button");
    submitButton.setAttribute("class", "btn btn-primary btn-md disabled");
}

// function to check answer is correct or wrong
function checkAnswer(userAnswer) {
    const correctAnswer = quizSets[sessionCounter - 1];

    if (userAnswer.value == correctAnswer.answerIndex) {
        return true;
    } else {
        return false;
    }
}

// function to update score
function updateUserScore() {
    // update userScore variable
    let updatedScore = userScore + 1;
    userScore = updatedScore;

    // update score at the quiz header
    const scoreDisplay = document.getElementById("user-score");
    scoreDisplay.innerHTML = userScore;

    // diplay an alert to user informing right answer
    const alertDisplay = document.getElementById("alert-display");
    alertDisplay.innerHTML =
        '<div class="alert alert-success" role="alert">' +
        'Jawapan anda betul!' +
        '</div>';
}

// function to diplay an alert to user informing wrong answer
function alertWrongAnswer() {
    const alertDisplay = document.getElementById("alert-display");
    alertDisplay.innerHTML =
        '<div class="alert alert-danger" role="alert">' +
        'Jawapan anda salah!' +
        '</div>';
}

// function to disable input
function disableInput() {
    const input = document.getElementsByName("user-answer");
    input.forEach((input) => {
        input.setAttribute("disabled", "");
    })
}

// function to enable next button
function enableNextButton() {
    const nextButton = document.getElementById("next-button");
    nextButton.setAttribute("class", "btn btn-primary btn-md");
}

// function to disable next button
function disableNextButton() {
    const nextButton = document.getElementById("next-button");
    nextButton.setAttribute("class", "btn btn-primary btn-md disabled");
}

// function to remove displayed right or wrong answer
function resetAlertDisplay() {
    const alertDisplay = document.getElementById("alert-display");
    alertDisplay.innerHTML = "";
}

// function to enable input
function enableInput() {
    const input = document.getElementsByName("user-answer");
    input.forEach((input) => {
        input.removeAttribute("disabled");
        input.checked = false;
    })
}

// function to change next button to finish button when quiz is finish
function changeNextButton() {
    const nextButton = document.getElementById("next-button");
    nextButton.innerHTML = "Selesai";
}

// function to initiate restart button listener
function listenToRestartButton() {
    const restartButton = document.getElementById("restart-button");
    const restartAlert = restartButton.addEventListener("click", function () {
        if (sessionCounter != 10) {
            if (confirm("Jika anda mula semula, markah anda akan hilang!\nAdakah anda pasti untuk mula semula?") == true) {
                location.reload();
            }
        } else {
            location.reload();
        }
    })
}

// function to finish the quiz
function finishQuiz() {
    // get element container to place the finish card
    const quizContainer = document.getElementById("quiz-container");

    // replace the element container with new html code
    quizContainer.innerHTML = "";
    quizContainer.innerHTML =
        '<div class="container p-4">' +
        '<div class="row">' +
        '<div class="col">' +
        '<h4 class="m-0">Markah anda adalah ' + userScore + '/10.</h4>' +
        '</div>' +
        '</div>' +
        '<div class="row mt-3" >' +
        '<div class="col-6 col-md-4 d-grid mx-auto" >' +
        '<button id="restart-button" class="btn btn-primary btn-md">Mula Semula</button >' +
        '</div >' +
        '</div >' +
        '</div >';

    listenToRestartButton();
}