// global variable declaration
let sessionCounter = 1;
let userScore = 0;
const quizSets = quizList;

// event listener to initiate the quiz
const initiateButton = document.getElementById("initiate-button");
const initiateAction = initiateButton.addEventListener("click", function () {
    initiateQuiz();
    enableSubmitButton();
    initiateEventListener();
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
        '<p class="fs-5 text-md-center mb-0 fw-bold">Soalan ' + sessionCounter + ':</p>' +
        '<p class="fs-5 text-md-center">' + quizSet.question + '</p>' +
        '<fieldset id="answer-option" class="mb-4">' +
        '<div class="d-flex flex-column gap-1 fs-5 col-md-6 mx-md-auto">' +
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

        '<div class="container">' +
        '<div class="row g-2 g-md-4">' +
        '<div class="col-6 col-md-4 d-grid">' +
        '<button id="submit-button" class="btn btn-primary btn-md disabled">Hantar</button>' +
        '</div>' +
        '<div class="col-6 col-md-4 d-grid">' +
        '<button id="next-button" class="btn btn-secondary btn-md">Seterusnya</button>' +
        '</div>' +
        '<div class="col-12 col-md-4 d-grid">' +
        '<button id="restart-button" class="btn btn-secondary btn-md">Mula Semula</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// function to get question and answers option from array
function getQuizSet(sessionCounter, quizSets) {
    const quizSet = quizSets[sessionCounter];
    const question = quizSet.question;;
    const answersOption = quizSet.answerOption;
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

// function to enable submit button after answer is chosen
function enableSubmitButton() {
    const input = document.getElementsByName("user-answer");
    input.forEach((input) => {
        input.addEventListener("change", function () {
            const submitButton = document.getElementById("submit-button");
            submitButton.setAttribute("class", "btn btn-primary btn-md");
        })
    })
}

// function to initiate quiz session button event listener
function initiateEventListener() {
    // event listener to submit answer
    const submitButton = document.getElementById("submit-button");
    const submitAlert = submitButton.addEventListener("click", function () {
        submitAnswer();
    })

    // event listener to next question
    const nextButton = document.getElementById("next-button");
    const nextAlert = nextButton.addEventListener("click", function () {
        alert("butang seterusnya sudah ditekan")
    })

    // event listener to restart quiz
    const restartButton = document.getElementById("restart-button");
    const restartAlert = restartButton.addEventListener("click", function () {
        alert("butang mula semula sudah ditekan");
    })
}

// function to submit answer <======================================================= continue here
function submitAnswer() {
    const answerInput = document.querySelector('input[name = "user-answer"]:checked');

    if (answerInput != null) {          // test if something was checked
        checkAnswer(answerInput);        // test if answer is correct or wrong
    } else {
        alert('Nothing checked');       // alert, nothing was checked.
    }
}

// function to check answer is correct or wrong
function checkAnswer(userAnswer) {
    const correctAnswer = quizSets[sessionCounter];

    if (userAnswer.value == correctAnswer.answerIndex) {
        alert("Jawapan anda betul");
    } else {
        alert("Jawapan anda salah")
    }
}




