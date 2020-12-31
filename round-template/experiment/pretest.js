
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "The majority of Bitumen used commercially is obtained from",
    answers: {
      a: "Tar",
      b: "Asphalt",
      c: "Petroleum",
      d: "All of the above"
    },
    correctAnswer: "c"
  },

  {
    question: "__can be used as paint in cold weather conditions.",
    answers: {
      a: "Cutback bitumen",
      b: "Bitumen emulsion",
      c: "Plastic bitumen",
      d: "Blown bitumen"
    },
    correctAnswer: "a"
  },
  {
    question: "The minimum ductility value of S90 grade bitumen is",
    answers: {
      a: "30cm",
      b: "55cm",
      c: "75cm",
      d: "60cm"
    },
    correctAnswer: "c"
  },
  {
    question: "The advantages of using modified bitumen are:",
    answers: {
      a: "Lower susceptibility to daily and seasonal temperature variations",
      b: "Higher resistance to deformation at high pavement temperature",
      c: "Better adhesion between aggregates and binder",
      d: "All of the above"
    },
    correctAnswer: "d"
  },
  {
    question: "Good bitumen should have<br>1. Temperature susceptibility<br>2. Adequate viscosity<br>3. Affinity and Adhesion",
    answers: {
      a: "Only 1 is correct",
      b: "Only 2 and 3 are correct",
      c: "Only 3 is correct",
      d: "All are correct"
    },
    correctAnswer: "d"
  }
];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
