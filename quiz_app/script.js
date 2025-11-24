
let questions = [];
let index = 0;
let score = 0;
let selectedAnswer = "";

const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", startQuiz);

async function startQuiz() {
  startBtn.classList.add("hidden");

  const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
  const data = await res.json();
  questions = data.results;

  quizBox.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  selectedAnswer = "";

  const current = questions[index];
  questionText.innerHTML = current.question;

  let allOptions = [...current.incorrect_answers, current.correct_answer];
  allOptions.sort(() => Math.random() - 0.5);

  optionsBox.innerHTML = "";

  allOptions.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = opt;

    div.addEventListener("click", () => {
      selectedAnswer = opt;

      document.querySelectorAll(".option").forEach(o => {
        o.style.background = "#e0e7ff"; // reset color
      });

      div.style.background = "#a5b4fc"; // selected option
    });

    optionsBox.appendChild(div);
  });
}

nextBtn.addEventListener("click", () => {
  if (!selectedAnswer) {
    alert("Please select an answer!");
    return;
  }

  const correct = questions[index].correct_answer;
  if (selectedAnswer === correct) score++;

  index++;

  if (index < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  scoreText.innerText = `${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  index = 0;
  score = 0;
  selectedAnswer = "";

  resultBox.classList.add("hidden");
  startBtn.classList.remove("hidden");
});
