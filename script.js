const firebaseConfig = {
  apiKey: "AIzaSyAtj5rZMScMrgAqdLpCPYG8a3ujg40Cywk",
  authDomain: "kikkake-7d8a7.firebaseapp.com",
  databaseURL: "https://kikkake-7d8a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kikkake-7d8a7",
  storageBucket: "kikkake-7d8a7.firebasestorage.app",
  messagingSenderId: "20803241306",
  appId: "1:20803241306:web:c16adeb9e5cdca12e85f63",
  measurementId: "G-04009PSWJB"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

let currentUser = null;
let deviceId = localStorage.getItem("toki_device_id");

if (!deviceId) {
  deviceId = (window.crypto && crypto.randomUUID)
    ? crypto.randomUUID()
    : `device_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  localStorage.setItem("toki_device_id", deviceId);
}

const vocabularyB2 = [
 [
  {
    word: "cause",
    options: ["Следствие", "Причина", "Результат", "Решение"],
    correct: 1
  },
  {
    word: "collapsed mine",
    options: ["Горная вершина", "Глубокий карьер", "Обрушившийся рудник", "Заброшенная шахта"],
    correct: 2
  },
  {
    word: "erupt",
    options: ["Затухать", "Извергаться", "Взрываться", "Трескаться"],
    correct: 1
  },
  {
    word: "evacuate",
    options: ["Охранять", "Эвакуировать", "Захватывать", "Проникать"],
    correct: 1
  },
  {
    word: "flooding",
    options: ["Засуха", "Шторм", "Наводнение", "Оползень"],
    correct: 2
  },
  {
    word: "forest fire",
    options: ["Вырубка леса", "Лесной пожар", "Засушливая зона", "Вулканический пепел"],
    correct: 1
  },
  {
    word: "hit",
    options: ["Промахнуться", "Предотвратить", "Обойти", "Ударить / Поразить"],
    correct: 3
  },
  {
    word: "huge tropical storm",
    options: ["Мощный тропический шторм", "Легкий бриз", "Песчаная буря", "Горный ураган"],
    correct: 0
  },
  {
    word: "loss of life",
    options: ["Рост населения", "Человеческие жертвы", "Медицинская помощь", "Спасение людей"],
    correct: 1
  },
  {
    word: "massive",
    options: ["Микроскопический", "Хрупкий", "Масштабный", "Временный"],
    correct: 2
  },
  {
    word: "mine collapse",
    options: ["Добыча угля", "Открытие рудника", "Укрепление породы", "Обвал шахты"],
    correct: 3
  },
  {
    word: "rescue",
    options: ["Опасность", "Спасение", "Бегство", "Нападение"],
    correct: 1
  },
  {
    word: "volcanic eruption",
    options: ["Лавиной сход", "Землетрясение", "Извержение вулкана", "Торнадо"],
    correct: 2
  },
  {
    word: "aftershock",
    options: ["Главный удар", "Эпицентр бури", "Внезапный штиль", "Подземный толчок (афтершок)"],
    correct: 3
  },
  {
    word: "authorities",
    options: ["Власти / Официальные лица", "Очевидцы", "Пострадавшие", "Добровольцы"],
    correct: 0
  },
  {
    word: "axis",
    options: ["Граница", "Ось", "Центр", "Радиус"],
    correct: 1
  },
  {
    word: "blaze",
    options: ["Густой дым", "Вспышка пламени / Пожар", "Ледяной дождь", "Сильный ветер"],
    correct: 1
  },
  {
    word: "collapse",
    options: ["Укрепить", "Рухнуть / Обрушение", "Построить", "Удержать"],
    correct: 1
  },
  {
    word: "courageous",
    options: ["Отважный", "Трусливый", "Безразличный", "Осторожный"],
    correct: 0
  },
  {
    word: "crash into",
    options: ["Обойти стороной", "Врезаться в", "Пройти мимо", "Затормозить перед"],
    correct: 1
  },
  {
    word: "debris",
    options: ["Цельные блоки", "Обломки / Мусор", "Новые постройки", "Чистый грунт"],
    correct: 1
  },
  {
    word: "devastating",
    options: ["Разрушительный", "Созидательный", "Безобидный", "Восстанавливающий"],
    correct: 0
  },
  {
    word: "epicentre",
    options: ["Безопасная зона", "Эпицентр", "Окраина", "Глубина"],
    correct: 1
  },
  {
    word: "evacuation",
    options: ["Заселение", "Блокировка", "Осада", "Эвакуация"],
    correct: 3
  },
  {
    word: "exceed",
    options: ["Уступать", "Превышать", "Соответствовать", "Задерживать"],
    correct: 1
  },
  {
    word: "explosion",
    options: ["Взрыв", "Хлопок", "Затухание", "Угасание"],
    correct: 0
  },
  {
    word: "head for",
    options: ["Убегать от", "Останавливаться у", "Направляться к", "Поворачивать назад"],
    correct: 2
  },
  {
    word: "landslide",
    options: ["Сход лавины", "Оползень", "Наводнение", "Песчаная буря"],
    correct: 1
  },
  {
    word: "loaded (with)",
    options: ["Освобожденный от", "Загруженный (чем-то)", "Лишенный", "Пустой"],
    correct: 1
  },
  {
    word: "mud",
    options: ["Чистая вода", "Сухой песок", "Грязь / Слякоть", "Твердый камень"],
    correct: 2
  },
  {
    word: "nuclear meltdown",
    options: ["Отключение электричества", "Ядерная катастрофа (плавление реактора)", "Запуск турбины", "Охлаждение системы"],
    correct: 1
  },
  {
    word: "pylon",
    options: ["Громоотвод", "Опора ЛЭП / Пилон", "Антенна связи", "Водонапорная башня"],
    correct: 1
  },
  {
    word: "relief worker",
    options: ["Местный житель", "Пострадавший", "Спасатель / Работник гуманитарной помощи", "Пожарный инспектор"],
    correct: 2
  },
  {
    word: "rip apart",
    options: ["Разорвать на части", "Склеить", "Связать", "Собрать воедино"],
    correct: 0
  },
  {
    word: "roll across",
    options: ["Остановиться", "Прокатиться / Прокатываться (о волне, буре)", "Замереть", "Утихнуть"],
    correct: 1
  },
  {
    word: "shake",
    options: ["Застыть", "Успокоиться", "Трястись / Сотрясение", "Выровнять"],
    correct: 2
  },
  {
    word: "slam into",
    options: ["Аккуратно коснуться", "Сокрушительно врезаться", "Обогнуть", "Скользить мимо"],
    correct: 1
  },
  {
    word: "strike",
    options: ["Защитить", "Ударить / Напасть (о стихии)", "Пощадить", "Обойти"],
    correct: 1
  },
  {
    word: "struggle",
    options: ["Сдаваться", "Отдыхать", "Плыть по течению", "Борьба / Сражаться"],
    correct: 3
  },
  {
    word: "sweep away",
    options: ["Оставить на месте", "Смыть / Смести (потоком)", "Защитить стеной", "Засыпать грунтом"],
    correct: 1
  },
  {
    word: "technician",
    options: ["Техник / Специалист", "Очевидец", "Спасатель", "Менеджер"],
    correct: 0
  },
  {
    word: "warning",
    options: ["Награда", "Предупреждение", "Угроза", "Разрешение"],
    correct: 1
  }
]
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let secondsElapsed = 0;

function getElement(id) {
  return document.getElementById(id);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createSakuraPetals() {
  const container = getElement("sakura-container");
  if (!container) return;

  for (let i = 0; i < 25; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.width = Math.random() * 10 + 10 + "px";
    petal.style.height = petal.style.width;
    petal.style.animationDuration = Math.random() * 5 + 5 + "s";
    petal.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(petal);
  }
}

function startTimer() {
  secondsElapsed = 0;
  const timerText = getElement("timer-text");
  if (!timerText) return;

  timerText.textContent = "00:00";

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    secondsElapsed++;
    const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
    const secs = String(secondsElapsed % 60).padStart(2, "0");
    timerText.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function showQuestion() {
  const wordEl = getElement("word");
  const optionsContainer = getElement("options-container");
  const progressText = getElement("progress-text");
  const progressBar = getElement("progress-bar");

  if (!wordEl || !optionsContainer || !progressText || !progressBar) return;

  const q = vocabularyB2[currentQuestionIndex];
  const correctText = q.options[q.correct];
  const shuffledOptions = shuffleArray([...q.options]);
  const correctIndex = shuffledOptions.indexOf(correctText);

  wordEl.textContent = q.word;
  progressText.textContent = `Вопрос ${currentQuestionIndex + 1} / ${vocabularyB2.length}`;
  progressBar.style.width = `${((currentQuestionIndex + 1) / vocabularyB2.length) * 100}%`;

  optionsContainer.innerHTML = "";

  shuffledOptions.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(idx, correctIndex));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, correctIndex) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((b) => {
    b.style.pointerEvents = "none";
  });

  if (selectedIndex === correctIndex) {
    buttons[selectedIndex].classList.add("correct");
    score++;
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < vocabularyB2.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}

function saveResultToLocal(scoreValue, total, timeValue) {
  const history = JSON.parse(localStorage.getItem("toki_history") || "[]");
  const newEntry = {
    date:
      new Date().toLocaleDateString("ru-RU") +
      " " +
      new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    score: `${scoreValue}/${total}`,
    time: timeValue
  };
  history.unshift(newEntry);
  localStorage.setItem("toki_history", JSON.stringify(history.slice(0, 10)));
}

function saveResultToFirestore(userName, scoreValue, total, timeValue, percentValue) {
  if (!userName) return;

  db.collection("results").add({
    user: userName,
    score: `${scoreValue}/${total}`,
    time: timeValue,
    percent: `${percentValue}%`,
    completedAt: new Date().toISOString()
  }).catch((err) => {
    console.error("Firestore save error:", err);
  });
}

function showHistory() {
  const startScreen = getElement("start-screen");
  const quizScreen = getElement("quiz-screen");
  const resultScreen = getElement("result-screen");
  const historyScreen = getElement("history-screen");
  const historyList = getElement("history-list");

  if (!startScreen || !quizScreen || !resultScreen || !historyScreen || !historyList) return;

  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  historyScreen.classList.remove("hidden");

  db.collection("results")
    .orderBy("completedAt", "desc")
    .limit(20)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        historyList.innerHTML = "<p>Пока нет результатов.</p>";
        return;
      }

      historyList.innerHTML = snapshot.docs.map((doc) => {
        const item = doc.data();
        return `
          <div class="history-item">
            <span>👤 ${item.user}</span>
            <span>⭐ ${item.score}</span>
            <span>⏱️ ${item.time}</span>
            <span>📊 ${item.percent}</span>
          </div>
        `;
      }).join("");
    })
    .catch((err) => {
      console.error("History fetch error:", err);
      historyList.innerHTML = "<p>Ошибка загрузки истории.</p>";
    });
}

function endQuiz() {
  stopTimer();

  const quizScreen = getElement("quiz-screen");
  const resultScreen = getElement("result-screen");
  const finalScore = getElement("final-score");
  const finalTime = getElement("final-time");
  const finalPercent = getElement("final-percent");

  if (quizScreen) quizScreen.classList.add("hidden");
  if (resultScreen) resultScreen.classList.remove("hidden");

  const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
  const secs = String(secondsElapsed % 60).padStart(2, "0");
  const timeFormatted = `${mins}:${secs}`;
  const percent = Math.round((score / vocabularyB2.length) * 100);

  if (finalScore) finalScore.textContent = `${score} / ${vocabularyB2.length}`;
  if (finalTime) finalTime.textContent = timeFormatted;
  if (finalPercent) finalPercent.textContent = `${percent}%`;

  saveResultToLocal(score, vocabularyB2.length, timeFormatted);
  saveResultToFirestore(currentUser, score, vocabularyB2.length, timeFormatted, percent);

  if (currentUser && typeof score !== "undefined") {
    db.collection("users").doc(currentUser).update({
      completed: true,
      score: `${score}/${vocabularyB2.length}`,
      time: timeFormatted,
      percent: `${percent}%`
    }).catch(async () => {
      await db.collection("users").doc(currentUser).set({
        completed: true,
        score: `${score}/${vocabularyB2.length}`,
        time: timeFormatted,
        percent: `${percent}%`
      }, { merge: true });
    });

    if (deviceId) {
      db.collection("completed_devices").doc(deviceId).set({
        user: currentUser,
        completedAt: new Date().toISOString()
      }, { merge: true });
    }
  }
}

function startQuiz() {
  const startScreen = getElement("start-screen");
  const resultScreen = getElement("result-screen");
  const historyScreen = getElement("history-screen");
  const quizScreen = getElement("quiz-screen");

  if (startScreen) startScreen.classList.add("hidden");
  if (resultScreen) resultScreen.classList.add("hidden");
  if (historyScreen) historyScreen.classList.add("hidden");
  if (quizScreen) quizScreen.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;
  startTimer();
  showQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  createSakuraPetals();

  const authForm = getElement("auth-form");
  const authScreen = getElement("auth-screen");
  const startScreen = getElement("start-screen");
  const quizScreen = getElement("quiz-screen");
  const startBtn = getElement("start-btn");
  const restartBtn = getElement("restart-btn");
  const historyBtn = getElement("history-btn");
  const backBtn = getElement("back-btn");

  if (authForm) {
    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = getElement("user-name")?.value.trim();
      const pass = getElement("user-pass")?.value.trim();
      const errorEl = getElement("auth-error");

      if (!name || !pass) return;

      try {
        const userDoc = await db.collection("users").doc(name).get();
        const deviceCheck = deviceId
          ? await db.collection("completed_devices").doc(deviceId).get()
          : { exists: false };

        if (deviceCheck.exists || (userDoc.exists && userDoc.data().completed)) {
          if (errorEl) {
            errorEl.textContent = "❌ Попытка пересдачи заблокирована!";
            errorEl.style.display = "block";
          }
          return;
        }

        if (!userDoc.exists) {
          await db.collection("users").doc(name).set({
            password: pass,
            deviceId: deviceId,
            completed: false
          });
        } else if (userDoc.data().password !== pass) {
          if (errorEl) {
            errorEl.textContent = "❌ Неверный пароль!";
            errorEl.style.display = "block";
          }
          return;
        }

        currentUser = name;

        if (authScreen) authScreen.classList.add("hidden");
        if (startScreen) startScreen.classList.remove("hidden");
      } catch (err) {
        console.error(err);
        if (errorEl) {
          errorEl.textContent = "Ошибка подключения к базе данных.";
          errorEl.style.display = "block";
        }
      }
    });
  }

  if (startBtn) {
    startBtn.addEventListener("click", startQuiz);
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", startQuiz);
  }

  if (historyBtn) {
    historyBtn.addEventListener("click", showHistory);
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const historyScreen = getElement("history-screen");
      if (historyScreen) historyScreen.classList.add("hidden");
      if (startScreen) startScreen.classList.remove("hidden");
    });
  }

  if (authScreen) authScreen.classList.remove("hidden");
  if (startScreen) startScreen.classList.add("hidden");
  if (quizScreen) quizScreen.classList.add("hidden");
});
