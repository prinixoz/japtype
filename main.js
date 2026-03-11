const wordsEl = document.getElementById("words")
const input = document.getElementById("input")
const preview = document.getElementById("preview")

function resetKanji() {
    loadedKanji = {}
}

let DATA = HIRAGANA
let currentMode = HIRAGANA
let queue = []
let chars = []
let index = 0



/* ---------- MODE STORAGE ---------- */

function getModeKey(mode = currentMode) {

    if (mode === HIRAGANA) return "hiragana"
    if (mode === KATAKANA) return "katakana"
    if (mode === MIXED_KANA) return "mixed"
    if (mode === "KANJI") return "kanji"

    return "hiragana"
}


function saveMode(mode) {
    localStorage.setItem("kana_mode", getModeKey(mode))
}

function loadMode() {

    const saved = localStorage.getItem("kana_mode")

    if (saved === "katakana") return KATAKANA
    if (saved === "mixed") return MIXED_KANA
    if (saved === "kanji") return "KANJI"

    return HIRAGANA
}


/* ---------- START MODE ---------- */

async function startMode(mode) {

    const result = document.getElementById("results")
    if (result) result.classList.remove("show")

    input.value = ""
    preview.textContent = ""
    input.focus()

    currentMode = mode
    DATA = mode

    saveMode(mode)
    updateQueueFromSelection()

    startTestStats()



    if (mode === HIRAGANA) {
        queue = Object.keys(HIRAGANA)
        renderKanaBar(HIRA_GROUPS)
    }

    if (mode === KATAKANA) {
        queue = Object.keys(KATAKANA)
        renderKanaBar(KATA_GROUPS)
    }

    if (mode === MIXED_KANA) {
        queue = Object.keys(MIXED_KANA)
        renderKanaBar(MIX_GROUPS)
    }

    if (mode === "KANJI") {

        resetKanji()

        DATA = {}
        queue = []

        renderKanaBar(KANJI_GROUPS)

        const settings = getSettings()
        const levels = settings.levels || ["n5"]

        for (const level of levels) {
            await loadKanjiLevel(level)
        }

    }

    else {

        shuffle(queue)

    }

    generate()
}


/* ---------- SHUFFLE ---------- */

function shuffle(a) {

    for (let i = a.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1))

        let t = a[i]
        a[i] = a[j]
        a[j] = t

    }

}


/* ---------- CREATE CHAR ---------- */

function createChar(kana) {

    let char = document.createElement("div")
    char.className = "char"

    let romaji = document.createElement("div")
    romaji.className = "romaji"

    let value = DATA[kana]

    romaji.textContent = Array.isArray(value) ? value[0] : value

    let kanaEl = document.createElement("div")
    kanaEl.className = "kana"
    kanaEl.textContent = kana

    char.appendChild(romaji)
    char.appendChild(kanaEl)

    wordsEl.appendChild(char)

    return char
}


/* ---------- GENERATE ---------- */

function generate() {

    wordsEl.style.transform = "translateX(0px)"
    wordsEl.innerHTML = ""

    chars = queue.map(kana => createChar(kana))

    index = 0

    requestAnimationFrame(() => {
        setCursor()
    })

}


/* ---------- CURSOR ---------- */

function setCursor() {

    chars.forEach(c => c.classList.remove("current"))

    if (chars[index]) {

        chars[index].classList.add("current")

        center()

    }

}


function center() {

    const current = chars[index]
    if (!current) return

    const wrap = wordsEl.parentElement
    const wrapWidth = wrap.offsetWidth

    const charLeft = current.offsetLeft
    const charWidth = current.offsetWidth

    const target = wrapWidth / 2 - (charLeft + charWidth / 2)

    requestAnimationFrame(() => {
        wordsEl.style.transform = `translateX(${target}px)`
    })

}


/* ---------- INPUT ---------- */

input.addEventListener("input", () => {

    let typed = input.value.trim().toLowerCase()
    preview.textContent = typed

    let kana = queue[index]
    let value = DATA[kana]

    let answers = Array.isArray(value) ? value : [value]

    const script = detectScript(typed)

    let validAnswers = answers.filter(a => {

        if (script === "romaji") return /^[a-zA-Z]+$/.test(a)
        if (script === "hiragana") return /^[\u3040-\u309F]+$/.test(a)
        if (script === "katakana") return /^[\u30A0-\u30FF]+$/.test(a)

        return true

    })

    if (validAnswers.length === 0) return

    const maxLen = Math.max(...validAnswers.map(a => a.length))

    let char = chars[index]

    /* ---------- CORRECT ---------- */

    if (validAnswers.includes(typed)) {

        char.classList.add("show")
        char.classList.add("correct")

        recordCorrect()   // result stat

        index++

        if (index >= queue.length) {
            showResults()
            return
        }

        input.value = ""
        preview.textContent = ""

        setCursor()

        return
    }

    /* ---------- WRONG ---------- */

    if (typed.length >= maxLen) {

        char.classList.add("show")
        char.classList.add("wrong")

        recordWrong(kana)   // result stat

        queue.push(kana)

        let newChar = createChar(kana)
        chars.push(newChar)

        index++

        input.value = ""
        preview.textContent = ""

        setCursor()
    }

})


/* ---------- KEYBOARD ---------- */

document.addEventListener("keydown", e => {

    if (e.key === "Tab") {

        e.preventDefault()

        startMode(currentMode)

    }

})

document.body.onclick = () => input.focus()


/* ---------- LOAD LAST MODE ---------- */

const lastMode = loadMode()

startMode(lastMode)


/* ---------- GROUP HELPER ---------- */

function activateKanaGroup(set) {

    queue = []

    set.forEach(k => {
        queue.push(k)
    })

    generate()

}


/* ---------- SCRIPT DETECTION ---------- */

function detectScript(text) {

    if (/^[a-zA-Z]+$/.test(text)) return "romaji"

    if (/^[\u3040-\u309F]+$/.test(text)) return "hiragana"

    if (/^[\u30A0-\u30FF]+$/.test(text)) return "katakana"

    return "unknown"

}
