// endscreen.js

const endscreen = document.getElementById("endscreen")
const accuracyEl = document.getElementById("result-accuracy")
const speedEl = document.getElementById("result-speed")
const correctEl = document.getElementById("result-correct")
const wrongEl = document.getElementById("result-wrong")
const reasonEl = document.getElementById("result-reason")

export function showEndScreen(stats) {

    if (!endscreen) return

    const {
        accuracy = 0,
        speed = 0,
        correct = 0,
        wrong = 0,
        reason = "finished"
    } = stats

    accuracyEl.textContent = accuracy + "%"
    speedEl.textContent = speed
    correctEl.textContent = correct
    wrongEl.textContent = wrong

    if (reasonEl) {

        if (reason === "time_up") reasonEl.textContent = "Time Up"
        else if (reason === "word_limit") reasonEl.textContent = "Word Limit Reached"
        else if (reason === "queue_finished") reasonEl.textContent = "Test Complete"
        else reasonEl.textContent = "Test Complete"

    }

    endscreen.style.display = "flex"
}



export function hideEndScreen() {

    if (!endscreen) return

    endscreen.style.display = "none"
}
