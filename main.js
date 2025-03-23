import { questions } from "./questions.js";

// Objeto con los puntos por pj
const mercCount = {
  scout: 0,
  soldier: 0,
  pyro: 0,
  demoman: 0,
  heavy: 0,
  engineer: 0,
  medic: 0,
  sniper: 0,
  spy: 0,
};

const quizBar = document.getElementById("quiz-bar");
const questionContainer = document.getElementById("question-container");

let index = -1;

// Metodo que ejecuta los botones de respuesta que direcciona al resto de metodos principalmente.
export const sendAnswer = (n) => {
  if (index >= 0) countPoints(questions[index].answers[n].mercenary); // cuenta los puntos antes de ir a la sig pregunta

  index++;

  quizBar.style.width = `${(index * 100) / questions.length}%`;

  if (index >= questions.length) return showResult(); //si no hay mas preguntas, no se ejecuta nextQuestion y se ejecuta showResult

  nextQuestion();
};

// Se inyecta en el HTML (questionContainer) la pregunta y los botones de respuesta
const nextQuestion = () => {
  questionContainer.innerHTML = `
  <h2 class="question" id="question">
      ${questions[index].text}
  </h2>
  <div class="answer-container" id="answer-container">
    ${questions[index].answers //.map loop para introducir los botones 1 por respuesta
      .map((answer, i) => {
        return `
      <button type="button" class="btn answer">
        ${answer.text}
      </button>
      `;
      })
      .join("")} 
  </div>
`; // .join("") sirve porque .map hacia el return de los botones con comas

  // AddEventListener de todos los botones a sendAnswer cuando se hace click
  const btnList = [...document.getElementsByClassName("answer")];

  btnList.forEach((btn, i) => {
    btn.addEventListener("click", () => sendAnswer(i));
  });
};

// Metodo para cuando no hayan mas preguntas, calcula el mercenario con mas puntos y inyecta en questionContainer el html del resultado
const showResult = () => {
  let yourMerc = "scout";

  for (let key in mercCount) {
    if (mercCount[yourMerc] < mercCount[key]) {
      yourMerc = key;
    }
  }

  questionContainer.innerHTML = `
  <img class="result-class" src="img/${yourMerc}.png" />
  <h2>You got ${yourMerc}!</h2>
  `;
};

const countPoints = (mercs) => {
  mercs.forEach((merc) => {
    mercCount[merc] += 1;
  });
};

// Para la primera insercion de la primera pregunta
sendAnswer([]);
