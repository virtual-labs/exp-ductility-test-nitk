
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
      question: "The brass plate and mould is placed in the water bath and it is kept at the specified temperature for about __ minutes",
      answers: {
        a: "5 to 7",
        b: "10 to 12",
        c: "20 to 25",
        d: "85 to 95"
      },
      correctAnswer: "d"
    },

    {
      question: "Water Bath Temperature should be maintained at",
      answers: {
        a: "25 &plusmn; 0.1&deg;C",
        b: "27 &plusmn; 0.1&deg;C",
        c: "33 &plusmn; 0.1&deg;C",
        d: "39 &plusmn; 0.1&deg;C"
      },
      correctAnswer: "b"
    },

    {
      question: "The Indian Standard for ductility test on bitumen is",
      answers: {
        a: "IS 1208-1978",
        b: "IS:1208-1985",
        c: "IS:1238-1978",
        d: "IS:1238-1985"
      },
      correctAnswer: "d"
    },
    {
      question: "CBR valueA minimum ductility value of __ has been specified by the BIS",
      answers: {
        a: "72.5 cm",
        b: "75.0 cm",
        c: "82.0cm",
        d: "85.0cm"
      },
      correctAnswer: "b"
    },
    {
      question: "Bitumen should be adequately ductile to resist the cracking of pavement due to temperature stresses. (Say True or False)",
      answers: {
        a: "True",
        b: "False"
      },
      correctAnswer: "a"
    }
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
