import { questions } from "./questions.js";

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

export const sendAnswer = (n) => {
  if (index >= 0) countPoints(questions[index].answers[n].mercenary);

  index++;

  quizBar.style.width = `${(index * 100) / questions.length}%`;

  if (index >= questions.length) return showResult();

  console.log(n, index);

  nextQuestion();
};

const nextQuestion = () => {
  questionContainer.innerHTML = `
  <h2 class="question" id="question">
      ${questions[index].text}
  </h2>
  <div class="answer-container" id="answer-container">
    ${questions[index].answers
      .map((answer, i) => {
        return `
      <button type="button" class="btn answer">
        ${answer.text}
      </button>
      `;
      })
      .join("")}
  </div>
`;

  const btnList = [...document.getElementsByClassName("answer")];

  btnList.forEach((btn, i) => {
    btn.addEventListener("click", () => sendAnswer(i));
  });
};

const showResult = () => {
  let yourMerc = "scout";

  for (let key in mercCount) {
    if (mercCount[yourMerc] < mercCount[key]) {
      yourMerc = key;
    }
  }

  questionContainer.innerHTML = "te toco este pj: " + yourMerc;
};

const countPoints = (mercs) => {
  mercs.forEach((merc) => {
    mercCount[merc] += 1;
  });

  console.log(mercCount);
};

sendAnswer([]);
