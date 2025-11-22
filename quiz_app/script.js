
let questions = [];
let index = 0;

const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");

startBtn.addEventListener("click", startQuiz);

async function startQuiz() {
  startBtn.classList.add("hidden");

  // Fetching 5 questions now
  const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
  const data = await res.json();
  questions = data.results;

  quizBox.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
   const current = questions[index];

  questionText.innerHTML = current.question;

  let allOptions = [...current.incorrect_answers, current.correct_answer];
  allOptions.sort(() => Math.random() - 0.5);

  optionsBox.innerHTML = "";

  allOptions.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = opt;
    optionsBox.appendChild(btn);
  });
}

