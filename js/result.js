/* result.js */

/* ---------- STATS ---------- */

let startTime = 0
let correctCount = 0
let wrongCount = 0
let mistakes = {}

/* ---------- START TEST ---------- */

function startTestStats() {

    startTime = Date.now()
    correctCount = 0
    wrongCount = 0
    mistakes = {}

}

/* ---------- RECORD CORRECT ---------- */

function recordCorrect() {
    correctCount++
}

/* ---------- RECORD WRONG ---------- */

function recordWrong(kana) {

    wrongCount++

    if (!mistakes[kana]) {
        mistakes[kana] = 0
    }

    mistakes[kana]++

}

/* ---------- SHOW RESULTS ---------- */

function showResults() {

    const endTime = Date.now()
    const time = (endTime - startTime) / 1000

    const total = correctCount + wrongCount

    const accuracy = total
        ? Math.round((correctCount / total) * 100)
        : 0

    const speed = time
        ? Math.round((correctCount / time) * 60)
        : 0

    const result = document.getElementById("results")

    result.innerHTML = renderResults({
        accuracy,
        speed,
        correct: correctCount,
        wrong: wrongCount,
        time: Math.round(time),
        mistakes: getTopMistakes()
    })

    result.classList.add("show")

}

/* ---------- TOP MISTAKES ---------- */

function getTopMistakes() {

    return Object.entries(mistakes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)

}

/* ---------- RENDER ---------- */

function renderResults(data) {

    const mistakesHTML = data.mistakes.map(m =>
        `<div class="mistake">
            <span>${m[0]}</span>
            <span>${m[1]}</span>
        </div>`
    ).join("")



    return `
<div class="card">

<h2>RESULTS</h2>

<div class="stats">

<div>accuracy</div><div>${data.accuracy}%</div>
<div>speed</div><div>${data.speed} cpm</div>
<div>correct</div><div>${data.correct}</div>
<div>wrong</div><div>${data.wrong}</div>
<div>time</div><div>${data.time}s</div>

</div>

<hr>

<div class="mistakes-title">most mistakes</div>

<div class="mistakes">
        ${mistakesHTML || "<div>none 🎉</div>"}
</div>

<hr>

<div class="result-buttons">
<button onclick="restartTest()">restart</button>
<button onclick="openMenu()">new mode</button>
</div>

<div class="result-subtext">
press <kbd>tab</kbd> to restart
</div>

</div> `

}

/* ---------- RESTART ---------- */

function restartTest() {

    const result = document.getElementById("results")

    result.classList.remove("show")

    startMode(DATA)

}
