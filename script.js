const questions = [
  {
    question: "เวลาเราเครียดหรือไม่โอเค เรามักจะทำอะไร?",
    options: [
      "เงียบและอยู่คนเดียว",
      "หาอะไรทำให้ลืมเรื่องนั้น",
      "ทักไปคุยกับคนสนิท",
      "ทำเหมือนไม่มีอะไรเกิดขึ้น"
    ],
    correct: 0
  },
  {
    question: "อะไรทำให้เราหงุดหงิดได้ง่ายที่สุด?",
    options: [
      "โดนเมิน",
      "โดนเร่ง",
      "คนพูดไม่ตรงกับที่ทำ",
      "ของหาย"
    ],
    correct: 2
  },
  {
    question: "ถ้ามีวันหยุด 1 วัน เราอยากทำอะไรมากที่สุด?",
    options: [
      "นอนอยู่บ้าน",
      "ออกไปเที่ยว",
      "เล่นเกม / ดูหนัง",
      "ออกไปหาอะไรกิน"
    ],
    correct: 2
  },
  {
    question: "เรื่องอะไรที่เราพูดหรือบ่นบ่อยที่สุด?",
    options: [
      "เรื่องเรียน",
      "เรื่องเงิน",
      "เรื่องคน",
      "เรื่องชีวิตประจำวัน"
    ],
    correct: 3
  },
  {
    question: "ถ้าได้เงินก้อนหนึ่ง เรามีแนวโน้มจะเอาไปทำอะไร?",
    options: [
      "ซื้อของที่อยากได้",
      "เก็บเงิน",
      "เอาไปเที่ยว",
      "ซื้อ/อัปเกรดของที่อยากได้มานาน"
    ],
    correct: 0
  },
  {
    question: "ถ้าเราไม่ตอบแชต มีโอกาสมากที่สุดว่าเพราะอะไร?",
    options: [
      "หลับ",
      "เล่นเกม / ดูอะไรอยู่",
      "ไม่รู้จะตอบอะไร",
      "กำลังยุ่ง"
    ],
    correct: 0
  },
  {
    question: "ถ้าให้เลือกของกิน เรามักจะเลือกแบบไหน?",
    options: [
      "ของหวาน",
      "ของทอด",
      "ของเผ็ด",
      "เครื่องดื่ม"
    ],
    correct: 3
  },
  {
    question: "ถ้าเลือกที่เที่ยวได้ 1 ที่ เราจะเลือกอะไร?",
    options: [
      "ทะเล",
      "ภูเขา",
      "เมือง / ห้าง",
      "สถานที่แปลกใหม่"
    ],
    correct: 2
  },
  {
    question: "อะไรสำคัญที่สุดสำหรับเราเวลาคุยกับใครสักคน?",
    options: [
      "ความจริงใจ",
      "ความสม่ำเสมอ",
      "การเอาใจใส่",
      "คุยกันรู้เรื่อง"
    ],
    correct: 2
  },
  {
    question: "คำไหนอธิบายตัวเราได้ใกล้เคียงที่สุด?",
    options: [
      "ขี้เล่น",
      "คิดเยอะ",
      "ชิล ๆ",
      "จริงจัง"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");

const questionNumber = document.getElementById("questionNumber");
const scoreText = document.getElementById("scoreText");
const progressBar = document.getElementById("progressBar");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");

function startGame() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  answered = false;

  const data = questions[currentQuestion];

  questionNumber.textContent =
    `ข้อ ${currentQuestion + 1} / ${questions.length}`;

  scoreText.textContent = `💗 ${score} คะแนน`;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionEl.textContent = data.question;
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  optionsEl.innerHTML = "";

  data.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener("click", () => selectAnswer(index));

    optionsEl.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const data = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll(".option");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === data.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== data.correct) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === data.correct) {
    score++;
    feedbackEl.textContent = "🌟 ถูกต้อง! รู้จักเราดีจังเลย!";
  } else {
    const correctLetter =
      String.fromCharCode(65 + data.correct);

    feedbackEl.textContent =
      `🌷 ยังไม่ใช่น้า คำตอบคือ ${correctLetter}. ${data.options[data.correct]}`;
  }

  scoreText.textContent = `💗 ${score} คะแนน`;

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "ดูผลคะแนน 🎀"
      : "ข้อต่อไป →";

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  document.getElementById("finalScore").textContent =
    `${score}/${questions.length}`;

  const resultTitle = document.getElementById("resultTitle");
  const resultDetail = document.getElementById("resultDetail");

  if (score <= 3) {
    resultTitle.textContent =
      "ยังต้องทำความรู้จักกันอีกนิดนะ 🥺";

    resultDetail.textContent =
      "มีหลายมุมของเราที่คนคุยยังไม่รู้จัก ลองคุยกันมากขึ้นดูนะ 💕";
  } else if (score <= 6) {
    resultTitle.textContent =
      "รู้จักเราพอสมควรเลย 🌷";

    resultDetail.textContent =
      "รู้จักกันอยู่ไม่น้อย แต่ยังมีบางเรื่องให้ค้นพบกันอีก";
  } else if (score <= 8) {
    resultTitle.textContent =
      "รู้จักเราดีมาก! ✨";

    resultDetail.textContent =
      "เกือบรู้ทุกอย่างเกี่ยวกับเราแล้ว เก่งมาก!";
  } else {
    resultTitle.textContent =
      "รู้จักเราดีสุด ๆ! 💗";

    resultDetail.textContent =
      "ตอบถูกแทบทุกข้อเลย แบบนี้ต้องสนิทกันมากแน่ ๆ";
  }

  resultDetail.textContent +=
    ` ตอบถูก ${score * 10}%`;
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
