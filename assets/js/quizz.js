// ═══════════════════════════════════════════════════
//  QUESTION BANK — loaded from questions_en.json (same folder)
// ═══════════════════════════════════════════════════
let QUESTIONS = [];
const LANGUAGE_STORAGE_KEY = 'quizLanguage';

async function loadQuestions() {
    const language =
        localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

    const file = language === 'fr'
        ? 'assets/data/questions_fr.json'
        : 'assets/data/questions_en.json';

    try {
        const res = await fetch(file);
        QUESTIONS = await res.json();

        document.getElementById('questionBankCount').textContent = `${QUESTIONS.length}`;

    } catch (err) {
        console.error('Could not load questions', err);
        alert(`Error loading ${file}`);
    }
}

// ═══════════════════════════════════════════════════
//  LANGUAGE SELECTOR
// ═══════════════════════════════════════════════════
function initializeLanguageSelector() {
    const selector =
        document.getElementById('languageSelector');

    if (!selector) return;

    const savedLanguage =
        localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

    selector.value = savedLanguage;

    updateLanguageDisplay();
    applyTranslations();

    selector.addEventListener('change', async (e) => {
        localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            e.target.value
        );
        updateLanguageDisplay();
        applyTranslations();

        await loadQuestions();
    });
}


function updateLanguageDisplay() {
    const language =
        localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

    document.getElementById('languageDisplay').textContent =
        language === 'fr' ? 'Français' : 'English';
}

function applyTranslations() {

    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

    const t = UI_TEXT[language];
    document.getElementById('homeTitle').textContent = t.homeTitle;
    document.getElementById('homeSubtitle').textContent = t.homeSubtitle;
    document.getElementById('examRulesTitle').textContent = t.examRules;
    document.getElementById('questionsLabel').textContent = t.questions;
    document.getElementById('timeLimitLabel').textContent = t.timeLimit;
    document.getElementById('toPassLabel').textContent = t.toPass;
    document.getElementById('questionBankLabel').textContent = t.questionBank;
    document.getElementById('weakAreasLabel').textContent = t.weakAreas;
    document.getElementById('languageLabel').textContent = t.language;
    document.getElementById('startTestButton').textContent = t.startTest;
    document.getElementById('viewStatisticsButton').textContent = t.viewStatistics;
    document.getElementById('questionsValue').textContent = t.randomQuestions;
    document.getElementById('timeLimitValue').textContent = t.thirtyMinutes;
    document.getElementById('quizTitle').textContent = t.quizTitle;
    document.getElementById('correctStatLabel').textContent = t.correct;
    document.getElementById('wrongStatLabel').textContent = t.wrong;
    document.getElementById('resultScoreLabel').textContent = t.resultScore;
    document.getElementById('resultCorrectLabel').textContent = t.resultCorrect;
    document.getElementById('resultWrongLabel').textContent = t.resultWrong;
    document.getElementById('resultTimeUsedLabel').textContent = t.resultTimeUsed;
    document.getElementById('tryAgainButton').textContent = `🔄 ${t.tryAgain}`;
    document.getElementById('resultViewStatisticsButton').textContent = `📊 ${t.viewStatistics}`;
    document.getElementById('resultHomeButton').textContent = `🏠 ${t.resultHome}`;
    document.getElementById('statisticsTitle').textContent = t.statistics;
    document.getElementById('backButton').textContent = `← ${t.back}`;
    document.getElementById('clearStatisticsButton').textContent = `🗑️ ${t.clearStatistics}`;
    document.getElementById('normalModeBtn').textContent = `📚 ${t.normalModeBtn}`;
    document.getElementById('weakModeBtn').textContent = `🎯 ${t.weakAreasBtn}`;

    updateFooter();

}

function updateFooter() {
    const language =
        localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

    const t = UI_TEXT[language];

    document.querySelectorAll('.footer').forEach(el => {
        el.innerHTML =
            `${t.developedBy}: ChavaZystem Tech ® ${new Date().getFullYear()} · v${APP_VERSION}`;
    });
}


function toggleLanguage() {
    const current =
        localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

    const newLanguage =
        current === 'en' ? 'fr' : 'en';

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        newLanguage
    );

    updateLanguageDisplay();
    applyTranslations();
    loadQuestions();
}

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
const QUIZ_SIZE = 4;
const PASS_SCORE = 3;
const TIME_LIMIT = 30 * 60; // seconds

let quizQuestions = [];
let selectedMode = 'normal';
let currentIndex = 0;
let correct = 0;
let wrong = 0;
let answered = false;
let selectedOpt = null;
let results = [];
let currentQuestion = null;
let timerInterval = null;
let secondsLeft = TIME_LIMIT;
let startTime = null;

// Quiz Mode
function setQuizMode(mode) {
    selectedMode = mode;
    document
        .getElementById('normalModeBtn')
        .classList.toggle('active', mode === 'normal');
    document
        .getElementById('weakModeBtn')
        .classList.toggle('active', mode === 'weak');
}

// ── localStorage stats ──
function loadStats() {
    try { return JSON.parse(localStorage.getItem('czStats') || '{}'); } catch (e) { return {}; }
}

function saveStats(s) { localStorage.setItem('czStats', JSON.stringify(s)); }

function recordWrong(no) {
    const s = loadStats();
    s[no] = (s[no] || 0) + 1;
    saveStats(s);
}

function removeWrong(questionNo) {
    const s = loadStats();
    delete s[questionNo];
    saveStats(s);
    applyConfiguration();
}

// ═══════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function shuffleQuestion(question) {
    const options = question.options.map((text, index) => ({
        text,
        originalAnswer: index + 1
    }));
    const shuffled = shuffle(options);
    return {
        ...question,
        options: shuffled.map(o => o.text),
        answer: shuffled.findIndex(o => o.originalAnswer === question.answer) + 1
    };
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'home') {
        applyConfiguration();
    }
}

function fmtTime(s) {
    const m = Math.floor(s / 60), sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ═══════════════════════════════════════════════════
//  QUIZ LOGIC
// ═══════════════════════════════════════════════════
async function startQuiz() {

    if (QUESTIONS.length === 0) await loadQuestions();
    if (QUESTIONS.length === 0) return; // failed to load, alert already shown

    if (selectedMode === 'normal') {
        quizQuestions = shuffle(QUESTIONS)
            .slice(0, QUIZ_SIZE)
            .map(shuffleQuestion);
    } else {
        const weakQuestionIds = Object.keys(loadStats()).map(Number);
        const weakQuestions = QUESTIONS.filter(q =>
            weakQuestionIds.includes(q.no)
        );

        quizQuestions = shuffle(weakQuestions)
            .slice(0, QUIZ_SIZE)
            .map(shuffleQuestion);
    }
    currentIndex = 0;
    correct = 0;
    wrong = 0;
    results = [];
    secondsLeft = TIME_LIMIT;
    startTime = Date.now();

    clearInterval(timerInterval);
    timerInterval = setInterval(tickTimer, 1000);

    showScreen('quiz');
    renderQuestion();
}

function tickTimer() {
    secondsLeft--;
    const pill = document.getElementById('timer');
    pill.textContent = fmtTime(secondsLeft);

    if (secondsLeft <= 300 && secondsLeft > 60) {
        pill.className = 'timer-pill warn';
    } else if (secondsLeft <= 60) {
        pill.className = 'timer-pill critical';
    }

    if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        forceFinish();
    }
}

function forceFinish() {
    // Mark unanswered questions as wrong
    const remaining = QUIZ_SIZE - currentIndex - (answered ? 0 : 0);
    // If current question not answered yet, skip it as wrong
    if (!answered) {
        currentQuestion = structuredClone(quizQuestions[currentIndex]);
        const q = currentQuestion;
        q.options = q.options
            .map((text, index) => ({
                text,
                answer: index + 1
            }));
        q.options = shuffle(q.options);
        q.answer =
            q.options.findIndex(o => o.answer === quizQuestions[currentIndex].answer) + 1;
        results.push({
            question: q.question,
            options: q.options.map(o => typeof o === 'string' ? o : o.text),
            answer: q.answer,
            selected: null,
            wasCorrect: false
        });
        recordWrong(q.no);
        wrong++;
    }
    // Remaining questions after current
    for (let i = currentIndex + 1; i < quizQuestions.length; i++) {
        const q = quizQuestions[i];
        results.push({
            question: q.question,
            options: q.options.map(o => typeof o === 'string' ? o : o.text),
            answer: q.answer,
            selected: null,
            wasCorrect: false
        });
        recordWrong(q.no);
        wrong++;
    }
    showResults();
}

function renderQuestion() {
    answered = false;
    selectedOpt = null;
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
    const t = UI_TEXT[language];

    const q = quizQuestions[currentIndex];
    const letters = ['A', 'B', 'C', 'D'];
    const pct = currentIndex > 0 ? Math.round((correct / currentIndex) * 100) : null;

    // Stats
    document.getElementById('statQ').textContent = `${currentIndex + 1}/${quizQuestions.length}`;
    document.getElementById('statOk').textContent = correct;
    document.getElementById('statBad').textContent = wrong;
    document.getElementById('statPct').textContent = pct !== null ? pct + '%' : '—';
    document.getElementById('progressFill').style.width = (((currentIndex + 1) / quizQuestions.length) * 100) + '%';

    // Question
    document.getElementById('qNum').textContent = `Question ${currentIndex + 1} ${t.of} ${quizQuestions.length}`;
    document.getElementById('qText').textContent = q.question;

    // Options
    const optDiv = document.getElementById('options');
    optDiv.innerHTML = '';
    q.options.forEach((opt, i) => {
        const el = document.createElement('div');
        el.className = 'opt';
        el.innerHTML = `<div class="opt-letter">${letters[i]}</div><div class="opt-text">${opt}</div>`;
        el.addEventListener('click', () => selectOption(i + 1, el));
        optDiv.appendChild(el);
    });

    // Feedback
    const fb = document.getElementById('feedback');
    fb.className = 'feedback';
    fb.textContent = '';

    // Next btn
    const btn = document.getElementById('btnNext');
    btn.className = 'btn-next';
    btn.textContent =
        currentIndex === quizQuestions.length - 1
            ? t.finish
            : t.next;

    // Scroll top
    document.getElementById('qScroll').scrollTop = 0;
}

function selectOption(optionNum, el) {
    if (answered) return;
    answered = true;
    selectedOpt = optionNum;

    const q = quizQuestions[currentIndex];
    const isCorrect = optionNum === q.answer;
    const opts = document.querySelectorAll('.opt');

    opts.forEach(o => o.classList.add('disabled'));
    el.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');

    const fb = document.getElementById('feedback');
    if (isCorrect) {
        correct++;
        removeWrong(q.no);
        fb.className = 'feedback correct show';
        const language =
            localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

        const t = UI_TEXT[language];

        fb.textContent = t.correctFeedback;
    } else {
        wrong++;
        recordWrong(q.no);
        fb.className = 'feedback wrong show';
        const language =
            localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

        const t = UI_TEXT[language];

        fb.textContent = t.incorrectFeedback;
    }

    results.push({
        question: q.question,
        options: q.options,
        answer: q.answer,
        selected: optionNum,
        wasCorrect: isCorrect
    });

    // Update live stats
    const total = currentIndex + 1;
    const pct = Math.round((correct / total) * 100);
    document.getElementById('statOk').textContent = correct;
    document.getElementById('statBad').textContent = wrong;
    document.getElementById('statPct').textContent = pct + '%';

    document.getElementById('btnNext').classList.add('enabled');
}

function nextQuestion() {
    if (!answered) return;

    currentIndex++;
    if (currentIndex >= quizQuestions.length) {
        clearInterval(timerInterval);
        showResults();
    } else {
        renderQuestion();
    }
}

// ═══════════════════════════════════════════════════
//  RESULTS
// ═══════════════════════════════════════════════════
function showResults() {
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
    const t = UI_TEXT[language];

    clearInterval(timerInterval);
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const pct = Math.round((correct / quizQuestions.length) * 100);
    const pass = correct >= PASS_SCORE;
    const isWeakMode = selectedMode === 'weak';
    const letters = ['A', 'B', 'C', 'D'];

    document.getElementById('scorePct').textContent = pct + '%';
    const ring = document.getElementById('scoreRing');
    ring.className = 'score-ring ' + (pass ? 'pass' : 'fail');

    const verdict = document.getElementById('verdict');
    verdict.className = 'verdict ' + (pass ? 'pass' : 'fail');
    if (isWeakMode) {
        verdict.textContent = '🎯 WEAK AREAS';
    } else {
        verdict.textContent = pass ? t.pass : t.fail;
    }

    if (isWeakMode) {
        document.getElementById('resultsSub').textContent = `${correct}/${quizQuestions.length}`;
    } else {
        document.getElementById('resultsSub').textContent = pass
            ? `${t.passedMessage} ${correct}/${quizQuestions.length} ${t.passedMessageEnd}`
            : `${t.failedMessage} ${PASS_SCORE}/${QUIZ_SIZE} ${t.failedMessageMiddle} ${correct}/${quizQuestions.length}. ${t.failedMessageEnd}`;
    }

    document.getElementById('rOk').textContent = correct;
    document.getElementById('rBad').textContent = wrong;
    const m = Math.floor(elapsed / 60), s = elapsed % 60;
    document.getElementById('rTime').textContent = `${m}m ${s}s`;

    // Wrong answers
    const ws = document.getElementById('wrongSection');
    const wrongList = results.filter(r => !r.wasCorrect);
    if (wrongList.length === 0) {
        ws.innerHTML = `<div style="padding:1rem;text-align:center;color:var(--green);font-size:14px;">${t.perfectScore}</div>`;
    } else {
        const answerLabel =
            wrongList.length > 1
                ? t.incorrectAnswers
                : t.incorrectAnswer;

        ws.innerHTML =
            `<div class="wrong-title">✗ ${wrongList.length} ${answerLabel}</div>`;
        wrongList.forEach(r => {
            const yourText = r.selected
                ? r.options[r.selected - 1]
                : t.notAnswered;
            const correctText = r.options[r.answer - 1];
            const card = document.createElement('div');
            card.className = 'wrong-card';
            card.innerHTML = `
        <div class="wrong-q">${r.question}</div>
        <div class="wrong-row">
          <span class="wrong-badge badge-yours">${t.yourAnswer}</span>
          <span class="wrong-ans-text">${r.selected ? letters[r.selected - 1] + '. ' : ''}${yourText}</span>
        </div>
        <div class="wrong-row">
          <span class="wrong-badge badge-correct">${t.correctBadge}</span>
          <span class="wrong-ans-text">${letters[r.answer - 1]}. ${correctText}</span>
        </div>`;
            ws.appendChild(card);
        });
    }

    showScreen('results');
}

// ═══════════════════════════════════════════════════
//  STATISTICS SCREEN
// ═══════════════════════════════════════════════════
async function showStats() {
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
    const t = UI_TEXT[language];
    clearInterval(timerInterval);
    if (QUESTIONS.length === 0) await loadQuestions();
    const s = loadStats();

    const entries = Object.entries(s).map(([no, count]) => ({ no: parseInt(no), count })).sort((a, b) => b.count - a.count);
    const totalWrong = entries.reduce((acc, e) => acc + e.count, 0);
    const maxCount = entries.length > 0 ? entries[0].count : 1;

    // Summary
    const summary = document.getElementById('statsSummary');
    summary.innerHTML = `
        <div class="stats-sum-card"><div class="stats-sum-val">${entries.length}</div><div class="stats-sum-lbl">${t.questionsMissed}</div></div>
        <div class="stats-sum-card"><div class="stats-sum-val">${totalWrong}</div><div class="stats-sum-lbl">${t.totalMistakes}</div></div>
        <div class="stats-sum-card"><div class="stats-sum-val">${entries.length > 0 ? entries[0].count : 0}</div><div class="stats-sum-lbl">${t.mostMissed}</div></div>
    `;

    const titleEl = document.getElementById('statsListTitle');
    const listEl = document.getElementById('statsList');

    if (entries.length === 0) {
        titleEl.textContent = '';
        listEl.innerHTML = `<div class="stats-empty">${t.noStatistics}</div>`;
    } else {
        titleEl.textContent = `${t.mostMissedQuestions} (Top ${Math.min(entries.length, 30)})`;
        listEl.innerHTML = '';
        entries.slice(0, 30).forEach(e => {
            const q = QUESTIONS.find(q => q.no === e.no);
            if (!q) return;
            const barW = Math.round((e.count / maxCount) * 100);
            const correctAnswer = q.options[q.answer - 1];
            const item = document.createElement('div');
            item.className = 'stats-q-item';
            item.innerHTML = `
                <div class="stats-q-bar-wrap">
                    <div class="stats-q-text">
                        Q${q.no}: ${q.question}
                    </div>

                    <div class="stats-correct-answer">
                        ✓ ${correctAnswer}
                    </div>

                    <div class="stats-q-bar-track">
                        <div class="stats-q-bar-fill" style="width:${barW}%"></div>
                    </div>
                </div>

                <div class="stats-q-count">${e.count}×</div>`;
            listEl.appendChild(item);
        });
    }

    showScreen('stats');
}

function clearStats() {
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
    const t = UI_TEXT[language];

    if (confirm(t.clearStatsConfirmation)) {
        localStorage.removeItem('czStats');
        showStats();
    }
}

function applyConfiguration() {
    const weakCount = Object.keys(loadStats()).length;
    document.getElementById('passScoreValue').textContent = `${PASS_SCORE} / ${QUIZ_SIZE}`;
    document.getElementById('weakAreasCount').textContent = weakCount;
    document.getElementById('weakModeBtn').disabled = weakCount === 0;
    if (weakCount === 0 && selectedMode === 'weak') {
        setQuizMode('normal');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initializeLanguageSelector();
    applyConfiguration();
    loadQuestions();
});