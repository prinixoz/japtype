/* menu.js */

const menu = document.getElementById("commandMenu")
const commandInput = document.getElementById("commandInput")
const commands = [...document.querySelectorAll(".cmd")]

let activeIndex = 0

function getCommandName(el) {
    return el.textContent.replace(/^[^\w]+/, "").trim().toLowerCase()
}

function score(text, query) {

    text = text.toLowerCase()
    query = query.toLowerCase()

    if (query.length === 0) return 1

    if (text.startsWith(query)) return 100 + query.length

    let idx = text.indexOf(query)
    if (idx !== -1) return 50 - idx

    let ti = 0
    let qi = 0
    let s = 0

    while (ti < text.length && qi < query.length) {
        if (text[ti] === query[qi]) {
            s++
            qi++
        }
        ti++
    }

    return qi === query.length ? s : 0
}

function updateHighlight() {

    commands.forEach(c => c.classList.remove("active"))

    if (commands[activeIndex]) {
        commands[activeIndex].classList.add("active")
        commands[activeIndex].scrollIntoView({ block: "nearest" })
    }

}

function openMenu() {

    menu.classList.add("open")
    commandInput.value = ""
    activeIndex = 0
    updateHighlight()

    setTimeout(() => commandInput.focus(), 0)

}

function closeMenu() {

    menu.classList.remove("open")
    commandInput.blur()
    input.focus()

}

function executeCommand() {

    let cmd = getCommandName(commands[activeIndex])

    if (cmd === "hiragana") {
        startMode(HIRAGANA)
    }

    if (cmd === "katakana") {
        startMode(KATAKANA)
    }

    if (cmd === "mixed kana") {
        startMode(MIXED_KANA)
    }

    if (cmd === "kanji") {
        startMode(KANJI_N5)
        renderKanaBar(KANJI_GROUPS)
    }

    if (cmd === "restart") {
        startMode(DATA)   // same as pressing Tab
    }

    if (cmd === "quiz") {
        alert("quiz mode coming soon")
    }

    if (cmd === "grammar") {
        alert("grammar mode coming soon")
    }

    closeMenu()
}

commandInput.addEventListener("input", () => {

    let q = commandInput.value.trim().toLowerCase()

    let bestIndex = 0
    let bestScore = -1

    commands.forEach((c, i) => {

        let text = getCommandName(c)
        let s = score(text, q)

        if (s > bestScore) {
            bestScore = s
            bestIndex = i
        }

    })

    activeIndex = bestIndex
    updateHighlight()

})

document.addEventListener("keydown", e => {

    if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault()

        if (menu.classList.contains("open")) {
            closeMenu()
        } else {
            openMenu()
        }

        return
    }

    if (e.key === "Escape" && menu.classList.contains("open")) {
        e.preventDefault()
        closeMenu()
        return
    }

    if (menu.classList.contains("open")) {

        if (e.key === "ArrowDown") {
            e.preventDefault()
            activeIndex = (activeIndex + 1) % commands.length
            updateHighlight()
        }

        if (e.key === "ArrowUp") {
            e.preventDefault()
            activeIndex = (activeIndex - 1 + commands.length) % commands.length
            updateHighlight()
        }

        if (e.key === "Enter") {
            e.preventDefault()
            executeCommand()
        }

    }

})

/* mouse support */

commands.forEach((cmd, i) => {

    cmd.addEventListener("click", () => {
        activeIndex = i
        updateHighlight()
        executeCommand()
    })

    cmd.addEventListener("mouseenter", () => {
        activeIndex = i
        updateHighlight()
    })

})

const hamburger = document.querySelector(".menu-btn")

hamburger.onclick = () => {
    openMenu()
}

document.addEventListener("click", (e) => {

    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu()
    }

})
