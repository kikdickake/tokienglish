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
  {
    word: "Ubiquitous",
    options: ["Редкий", "Вездесущий", "Опасный", "Древний"],
    correct: 1
  },
  {
    word: "Meticulous",
    options: ["Быстрый", "Нервный", "Тщательный", "Ленивый"],
    correct: 2
  },
  {
    word: "Pragmatic",
    options: ["Мечтательный", "Прагматичный", "Сложный", "Идеалистичный"],
    correct: 1
  },
  {
    word: "Ephemeral",
    options: ["Недолговечный", "Вечный", "Прочный", "Громкий"],
    correct: 0
  },
  {
    word: "Ameliorate",
    options: ["Ухудшать", "Замедлять", "Облагораживать", "Отменять"],
    correct: 2
  },
  {
    word: "Taciturn",
    options: ["Разговорчивый", "Неразговорчивый", "Громкий", "Веселый"],
    correct: 1
  },
  {
    word: "Circumvent",
    options: ["Перехитрить", "Поддержать", "Создать", "Завершить"],
    correct: 0
  },
  {
    word: "Superfluous",
    options: ["Необходимый", "Излишний", "Важный", "Маленький"],
    correct: 1
  },
  {
    word: "Conundrum",
    options: ["Решение", "Праздник", "Головоломка", "Соглашение"],
    correct: 2
  },
  {
    word: "Resilient",
    options: ["Уязвимый", "Жизнестойкий", "Медлительный", "Слабый"],
    correct: 1
  },
  {
    word: "Diligent",
    options: ["Ленивый", "Прилежный", "Спокойный", "Грубый"],
    correct: 1
  },
  {
    word: "Adept",
    options: ["Невежественный", "Умелый", "Слабый", "Легкомысленный"],
    correct: 1
  },
  {
    word: "Candid",
    options: ["Сдержанный", "Открытый", "Тревожный", "Сложный"],
    correct: 1
  },
  {
    word: "Eloquent",
    options: ["Молчаливый", "Красноречивый", "Скучный", "Хрупкий"],
    correct: 1
  },
  {
    word: "Abundant",
    options: ["Редкий", "Многочисленный", "Небольшой", "Тихий"],
    correct: 1
  },
  {
    word: "Acquire",
    options: ["Потерять", "Получать", "Сомневаться", "Отказываться"],
    correct: 1
  },
  {
    word: "Adverse",
    options: ["Позитивный", "Неблагоприятный, враждебный", "Древний", "Спокойный"],
    correct: 1
  },
  {
    word: "Allocate",
    options: ["Распределять", "Сравнивать", "Забывать", "Закрывать"],
    correct: 0
  },
  {
    word: "Alternative",
    options: ["Победа", "Альтернатива", "Граница", "Прошлое"],
    correct: 1
  },
  {
    word: "Anxious",
    options: ["Спокойный", "Тревожный", "Грубый", "Радостный"],
    correct: 1
  },
  {
    word: "Appraise",
    options: ["Оценивать", "Запрещать", "Игнорировать", "Рисковать"],
    correct: 0
  },
  {
    word: "Assess",
    options: ["Потерять", "Проверить", "Оценивать", "Промолчать"],
    correct: 2
  },
  {
    word: "Asset",
    options: ["Обязательство", "Достоинство", "Ошибка", "Проблема"],
    correct: 1
  },
  {
    word: "Attain",
    options: ["Достигать", "Откладывать", "Переезжать", "Разрушать"],
    correct: 0
  },
  {
    word: "Authority",
    options: ["Информация", "Авторитет", "Чувство", "Скорость"],
    correct: 1
  },
  {
    word: "Coherent",
    options: ["Случайный", "Согласованный", "Скрытый", "Слабый"],
    correct: 1
  },
  {
    word: "Compelling",
    options: ["Убеждающий", "Нудный", "Тихий", "Неудачный"],
    correct: 0
  },
  {
    word: "Competent",
    options: ["Неумелый", "Компетентный", "Тревожный", "Унылый"],
    correct: 1
  },
  {
    word: "Consequence",
    options: ["Письмо", "Следствие", "Профессия", "Семья"],
    correct: 1
  },
  {
    word: "Contribute",
    options: ["Вносить вклад", "Отвечать", "Скрывать", "Поглощать"],
    correct: 0
  },
  {
    word: "Convince",
    options: ["Убедить", "Победить", "Выяснить", "Разрушить"],
    correct: 0
  },
  {
    word: "Crucial",
    options: ["Неважный", "Критически важный", "Переходный", "Быстрый"],
    correct: 1
  },
  {
    word: "Decline",
    options: ["Поднимать", "Отказываться", "Покупать", "Не замечать"],
    correct: 1
  },
  {
    word: "Deficit",
    options: ["План", "Дефицит", "Подарок", "Свет"],
    correct: 1
  },
  {
    word: "Demolish",
    options: ["Сносить", "Поддерживать", "Прислушиваться", "Нарисовать"],
    correct: 0
  },
  {
    word: "Derive",
    options: ["Получать", "Формировать", "Вырезать", "Сравнить"],
    correct: 0
  },
  {
    word: "Diminish",
    options: ["Увеличивать", "Уменьшать", "Объединять", "Нарушать"],
    correct: 1
  },
  {
    word: "Distinct",
    options: ["Старый", "Отличительный, ясный", "Обычный", "Отрицательный"],
    correct: 1
  },
  {
    word: "Efficient",
    options: ["Эффективный", "Бессмысленный", "Случайный", "Сложный"],
    correct: 0
  },
  {
    word: "Emerge",
    options: ["Исчезать", "Появляться", "Сокращаться", "Путаться"],
    correct: 1
  },
  {
    word: "Emphasize",
    options: ["Подчеркнуть", "Прятать", "Скрывать", "Оспаривать"],
    correct: 0
  },
  {
    word: "Enormous",
    options: ["Огромный", "Крошечный", "Слабый", "Новый"],
    correct: 0
  },
  {
    word: "Ensure",
    options: ["Забывать", "Гарантировать", "Отрицать", "Гадать"],
    correct: 1
  },
  {
    word: "Establish",
    options: ["Устанавливать", "Разрушать", "Переезжать", "Ускорять"],
    correct: 0
  },
  {
    word: "Evaluate",
    options: ["Выбирать", "Проверять", "Оценивать", "Считать"],
    correct: 2
  },
  {
    word: "Evidence",
    options: ["Причина", "Доказательство", "Проблема", "Праздник"],
    correct: 1
  },
  {
    word: "Evolve",
    options: ["Развиваться", "Застыть", "Сократить", "Уйти"],
    correct: 0
  },
  {
    word: "Exceed",
    options: ["Превышать", "Сравнивать", "Отслеживать", "Скрывать"],
    correct: 0
  },
  {
    word: "Expand",
    options: ["Расширять", "Сжимать", "Сравнивать", "Забывать"],
    correct: 0
  },
  {
    word: "Fluctuate",
    options: ["Колебаться", "Служить", "Обсуждать", "Нанимать"],
    correct: 0
  },
  {
    word: "Generate",
    options: ["Создавать", "Поглощать", "Отталкивать", "Проверять"],
    correct: 0
  },
  {
    word: "Global",
    options: ["Локальный", "Глобальный", "Временный", "Одиночный"],
    correct: 1
  },
  {
    word: "Habitat",
    options: ["Среда обитания", "Оборудование", "Таблица", "Группа"],
    correct: 0
  },
  {
    word: "Highlight",
    options: ["Подчеркнуть", "Уменьшить", "Потерять", "Заблокировать"],
    correct: 0
  },
  {
    word: "Identify",
    options: ["Определять", "Отменять", "Путешествовать", "Отдыхать"],
    correct: 0
  },
  {
    word: "Inevitable",
    options: ["Неизбежный", "Временный", "Редкий", "Расслабленный"],
    correct: 0
  },
  {
    word: "Initiative",
    options: ["Инициатива", "Сомнение", "Победа", "Трудность"],
    correct: 0
  },
  {
    word: "Integrate",
    options: ["Разделять", "Интегрировать, объединять", "Удалять", "Падать"],
    correct: 1
  },
  {
    word: "Interpret",
    options: ["Истолковывать", "Покупать", "Подписывать", "Потерять"],
    correct: 0
  },
  {
    word: "Justify",
    options: ["Обосновывать", "Забывать", "Завершать", "Блокировать"],
    correct: 0
  },
  {
    word: "Major",
    options: ["Основной, крупный", "Тихий", "Малый", "Новый"],
    correct: 0
  },
  {
    word: "Maintain",
    options: ["Поддерживать", "Потерять", "Скрывать", "Нанимать"],
    correct: 0
  },
  {
    word: "Moderate",
    options: ["Бурный", "Умеренный", "Неизвестный", "Смелый"],
    correct: 1
  },
  {
    word: "Monitor",
    options: ["Пугать", "Контролировать, следить", "Записывать", "Печатать"],
    correct: 1
  },
  {
    word: "Potential",
    options: ["Проблема", "Потенциал, потенциальный", "Свет", "Случай"],
    correct: 1
  },
  {
    word: "Predict",
    options: ["Предсказывать", "Отклонять", "Покупать", "Прекращать"],
    correct: 0
  },
  {
    word: "Prefer",
    options: ["Предпочитать", "Избегать", "Подтверждать", "Покупать"],
    correct: 0
  },
  {
    word: "Preserve",
    options: ["Сохранять", "Тратить", "Портить", "Скрывать"],
    correct: 0
  },
  {
    word: "Prioritize",
    options: ["Расставлять приоритеты", "Проверять", "Обманывать", "Отдыхать"],
    correct: 0
  },
  {
    word: "Prohibit",
    options: ["Запрещать", "Разрешать", "Сравнивать", "Поддерживать"],
    correct: 0
  },
  {
    word: "Promote",
    options: ["Содействовать, продвигать", "Тормозить", "Гадать", "Нарушать"],
    correct: 0
  },
  {
    word: "Prosper",
    options: ["Процветать", "Трудиться", "Устареть", "Случиться"],
    correct: 0
  },
  {
    word: "Provide",
    options: ["Предоставлять", "Проверять", "Расстраиваться", "Переходить"],
    correct: 0
  },
  {
    word: "Range",
    options: ["Причина", "Диапазон", "Мечта", "Сбор"],
    correct: 1
  },
  {
    word: "Receive",
    options: ["Получать", "Отдавать", "Проверять", "Построить"],
    correct: 0
  },
  {
    word: "Recover",
    options: ["Восстанавливаться", "Погасить", "Сломать", "Разрушить"],
    correct: 0
  },
  {
    word: "Reduce",
    options: ["Уменьшать", "Увеличивать", "Провоцировать", "Поддерживать"],
    correct: 0
  },
  {
    word: "Refer",
    options: ["Ссылаться, упоминать", "Нанять", "Победить", "Скрыть"],
    correct: 0
  },
  {
    word: "Reflect",
    options: ["Отражать, размышлять", "Покупать", "Ложиться", "Плакать"],
    correct: 0
  },
  {
    word: "Regard",
    options: ["Относиться, считать", "Прятать", "Ужинать", "Плавать"],
    correct: 0
  },
  {
    word: "Reluctant",
    options: ["Властный", "Неохотный", "Быстрый", "Дружелюбный"],
    correct: 1
  },
  {
    word: "Remain",
    options: ["Оставаться", "Уйти", "Скрыться", "Проверить"],
    correct: 0
  },
  {
    word: "Replace",
    options: ["Заменять", "Понимать", "Скрывать", "Поглощать"],
    correct: 0
  },
  {
    word: "Require",
    options: ["Требовать", "Отказаться", "Потерять", "Думать"],
    correct: 0
  },
  {
    word: "Resolve",
    options: ["Решать", "Смутить", "Поспорить", "Ускользнуть"],
    correct: 0
  },
  {
    word: "Respond",
    options: ["Отвечать", "Потерять", "Плыть", "Витать"],
    correct: 0
  },
  {
    word: "Restore",
    options: ["Восстанавливать", "Уничтожать", "Скрывать", "Ускорять"],
    correct: 0
  },
  {
    word: "Retain",
    options: ["Сохранять", "Участвовать", "Покупать", "Прокладывать"],
    correct: 0
  },
  {
    word: "Revise",
    options: ["Пересматривать", "Подтверждать", "Игнорировать", "Сравнивать"],
    correct: 0
  },
  {
    word: "Secure",
    options: ["Снять", "Обеспечить, закрепить", "Уронить", "Потерять"],
    correct: 1
  },
  {
    word: "Signify",
    options: ["Путешествовать", "Означать", "Включать", "Покупать"],
    correct: 1
  }
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