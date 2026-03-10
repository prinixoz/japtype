const wordsEl = document.getElementById("words")
const input = document.getElementById("input")
const preview = document.getElementById("preview")

let DATA = HIRAGANA
let queue = []
let chars = []
let index = 0

function startMode(mode) {

    DATA = mode
    currentMode = mode

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

    if (mode === KANJI_N5) {
        queue = Object.keys(KANJI_N5)
        renderKanaBar(KANJI_GROUPS)
    }

    shuffle(queue)
    generate()

}




function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let t = a[i]; a[i] = a[j]; a[j] = t
    }
}

function createChar(kana) {

    let char = document.createElement("div")
    char.className = "char"

    let romaji = document.createElement("div")
    romaji.className = "romaji"
    romaji.textContent = DATA[kana]

    let kanaEl = document.createElement("div")
    kanaEl.className = "kana"
    kanaEl.textContent = kana

    char.appendChild(romaji)
    char.appendChild(kanaEl)

    wordsEl.appendChild(char)

    return char
}

function generate() {

    wordsEl.style.transform = "translateX(0px)"

    wordsEl.innerHTML = ""

    chars = queue.map(kana => createChar(kana))

    index = 0

    requestAnimationFrame(() => {
        setCursor()
    })

}



function setCursor() {

    chars.forEach(c => c.classList.remove("current"))

    if (chars[index]) {
        chars[index].classList.add("current")
        center()
    }

}

function center() {

    let current = chars[index]
    if (!current) return

    let wrap = wordsEl.parentElement
    let wrapWidth = wrap.offsetWidth

    let charLeft = current.offsetLeft
    let charWidth = current.offsetWidth

    let target = wrapWidth / 2 - (charLeft + charWidth / 2)

    wordsEl.style.transform = `translateX(${target}px)`

}

input.addEventListener("input", () => {

    let typed = input.value
    preview.textContent = typed

    let kana = queue[index]
    let correct = DATA[kana]

    if (typed.length === correct.length) {

        let char = chars[index]

        char.classList.add("show")

        if (typed === correct) {
            char.classList.add("correct")
        } else {

            char.classList.add("wrong")

            queue.push(kana)

            let newChar = createChar(kana)
            chars.push(newChar)

        }

        index++

        input.value = ""
        preview.textContent = ""

        setCursor()

    }

})

document.addEventListener("keydown", e => {

    if (e.key === "Tab") {
        e.preventDefault()
        startMode(DATA)
    }

})

document.body.onclick = () => input.focus()

function saveMode(mode) {
    localStorage.setItem("kana_mode", mode)
}

function loadMode() {
    return localStorage.getItem("kana_mode")
}

let lastMode = loadMode()

if (lastMode === "katakana") {
    startMode(KATAKANA)
} else {
    startMode(HIRAGANA)
}



function activateKanaGroup(set) {

    queue = []

    set.forEach(k => {
        queue.push(k)
    })

    generate()

}
