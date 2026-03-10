/* menu.js */

const menu = document.getElementById("commandMenu")
const commandInput = document.getElementById("commandInput")
const commandList = document.getElementById("commandList")

let commands = []
let activeIndex = 0
let currentMenu = "main"


/* ---------- DATA ---------- */

const FONTS = [

    { name: "Monospace", css: "monospace" },
    { name: "Noto Sans JP", css: "'Noto Sans JP', sans-serif" },
    { name: "Noto Serif JP", css: "'Noto Serif JP', serif" },
    { name: "M PLUS 1p", css: "'M PLUS 1p', sans-serif" },
    { name: "M PLUS Rounded", css: "'M PLUS Rounded 1c', sans-serif" },
    { name: "Kosugi", css: "'Kosugi', sans-serif" },
    { name: "Kosugi Maru", css: "'Kosugi Maru', sans-serif" },
    { name: "Zen Kaku Gothic", css: "'Zen Kaku Gothic New', sans-serif" },
    { name: "Zen Old Mincho", css: "'Zen Old Mincho', serif" }

]

const MENUS = {

    main: [
        { icon: "あ", name: "Hiragana", action: () => startMode(HIRAGANA) },
        { icon: "ア", name: "Katakana", action: () => startMode(KATAKANA) },
        { icon: "〄", name: "Mixed Kana", action: () => startMode(MIXED_KANA) },
        { icon: "漢", name: "Kanji", action: () => startMode(KANJI_N5) },
        { icon: "↻", name: "Restart", action: () => startMode(DATA) },
        { icon: "🔤", name: "Font", submenu: "fonts" },
        { icon: "🎨", name: "Theme", submenu: "themes" }
    ],

    fonts: [
        { icon: "←", name: "Back", submenu: "main" },

        ...FONTS.map(f => ({
            name: f.name,
            font: f.css,
            action: () => {

                const words = document.getElementById("words")

                words.style.fontFamily = f.css

                localStorage.setItem("font", f.css)

                closeMenu()

            }
        }))
    ],
    themes: [
        { icon: "←", name: "Back", submenu: "main" },
        { icon: "🎨", name: "Nord", action: () => setTheme?.("nord") },
        { icon: "🎨", name: "Dark", action: () => setTheme?.("dark") },
        { icon: "🎨", name: "Light", action: () => setTheme?.("light") }
    ]

}


/* ---------- RENDER MENU ---------- */

function renderMenu(name) {

    commandInput.value = ""
    currentMenu = name
    commandList.innerHTML = ""

    MENUS[name].forEach((cmd, i) => {

        const el = document.createElement("div")
        el.className = "cmd"

        if (cmd.font) {

            el.innerHTML = `
  <span class="icon" style="font-family:${cmd.font}">あ</span>
  ${cmd.name}
  `

        } else {

            el.innerHTML = `
  <span class="icon">${cmd.icon ?? ""}</span>
  ${cmd.name}
  `

        }
        el.addEventListener("click", () => runCommand(i))

        el.addEventListener("mouseenter", () => {
            activeIndex = i
            updateHighlight()
        })

        commandList.appendChild(el)

    })

    commands = [...document.querySelectorAll(".cmd")]

    activeIndex = 0
    updateHighlight()

}


/* ---------- EXECUTE COMMAND ---------- */

function runCommand(i) {

    const cmd = MENUS[currentMenu][i]

    if (cmd.submenu) {
        renderMenu(cmd.submenu)
        return
    }

    if (cmd.action) {
        cmd.action()
    }

    closeMenu()

}

/* ---------- UI ---------- */

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

    renderMenu("main")

    setTimeout(() => commandInput.focus(), 0)

}


function closeMenu() {

    menu.classList.remove("open")
    commandInput.blur()
    input.focus()

}


/* ---------- SEARCH ---------- */

commandInput.addEventListener("input", () => {

    const q = commandInput.value.trim().toLowerCase()

    if (!q) {
        activeIndex = 0
        updateHighlight()
        return
    }

    let bestIndex = 0
    let bestScore = -Infinity

    commands.forEach((c, i) => {

        const text = c.textContent.toLowerCase()

        let score = 0

        if (text === q) score = 1000
        else if (text.startsWith(q)) score = 500 - text.length
        else if (text.includes(q)) score = 100 - text.indexOf(q)

        if (score > bestScore) {
            bestScore = score
            bestIndex = i
        }

    })

    activeIndex = bestIndex
    updateHighlight()

})

/* ---------- KEYBOARD ---------- */

document.addEventListener("keydown", e => {

    if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault()

        if (menu.classList.contains("open")) closeMenu()
        else openMenu()

        return
    }

    if (!menu.classList.contains("open")) return


    if (e.key === "Escape") {
        closeMenu()
    }

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
        runCommand(activeIndex)
    }

})


/* ---------- MENU BUTTON ---------- */

const hamburger = document.querySelector(".menu-btn")

hamburger.onclick = () => openMenu()


document.addEventListener("click", e => {

    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu()
    }

})



/*-------------- Loading font after page load*/
window.addEventListener("load", () => {

    const link = document.createElement("link")

    link.rel = "stylesheet"

    link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Noto+Serif+JP&family=M+PLUS+1p&family=M+PLUS+Rounded+1c&family=Kosugi&family=Kosugi+Maru&family=Zen+Kaku+Gothic+New&family=Zen+Old+Mincho&family=Shippori+Mincho&family=Sawarabi+Gothic&family=Sawarabi+Mincho&family=Kiwi+Maru&family=Dela+Gothic+One&family=Reggae+One&family=DotGothic16&display=swap"

    document.head.appendChild(link)

})
