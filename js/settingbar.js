const bar = document.querySelector(".settings-bar")

/* ---------- STORAGE ---------- */

let SETTINGS = JSON.parse(localStorage.getItem("kanaSettings") || "{}")

function getModeKey() {

    if (DATA === HIRAGANA) return "hiragana"
    if (DATA === KATAKANA) return "katakana"
    if (DATA === MIXED_KANA) return "mixed"
    return "kanji"

}

function getSettings() {

    const key = getModeKey()

    if (!SETTINGS[key]) {
        SETTINGS[key] = {}
    }

    const s = SETTINGS[key]

    if (key === "kanji") {

        if (!Array.isArray(s.levels)) {
            s.levels = ["n5"]
        }

    } else {

        if (!Array.isArray(s.disabled)) {
            s.disabled = []
        }

        if (typeof s.dakuten !== "boolean") {
            s.dakuten = false
        }

        if (typeof s.combo !== "boolean") {
            s.combo = false
        }

    }

    return s
}

function saveSettings() {
    localStorage.setItem("kanaSettings", JSON.stringify(SETTINGS))
}

/* ---------- BAR ---------- */

document.querySelector(".close-btn").onclick = () => {
    bar.classList.add("collapsed")
}

document.querySelector(".expand-btn").onclick = () => {
    bar.classList.remove("collapsed")
}

/* ---------- RENDER ---------- */

function renderKanaBar(groups) {

    const container = document.getElementById("kana-options")
    container.innerHTML = ""

    const isKanji = groups === KANJI_GROUPS
    const settings = getSettings()

    if (isKanji && !Array.isArray(settings.levels)) {
        settings.levels = ["n5"]
    }

    groups.forEach((g, i) => {

        const el = document.createElement("div")
        el.className = "kana-group"

        if (isKanji) {

            const level = g.label.toLowerCase()

            if (settings.levels.includes(level)) {
                el.classList.add("active")
            }

        } else {

            if (!settings.disabled.includes(g.label)) {
                el.classList.add("active")
            }

        }

        el.innerHTML = `
<div class="kana">${g.kana}</div>
<div class="label">${g.label}</div>
`

        el.dataset.set = JSON.stringify(g.set)
        el.dataset.level = g.label

        el.onclick = () => toggleKanaGroup(el, isKanji)

        container.appendChild(el)

    })

    renderExtraOptions()

    if (!isKanji) updateQueueFromSelection()
}

/* ---------- TOGGLE ---------- */

function toggleKanaGroup(el, isKanji) {

    const settings = getSettings()

    if (isKanji) {

        const level = el.dataset.level.toLowerCase()

        if (settings.levels && settings.levels.includes(level)) {

            if (settings.levels.length === 1) return

            settings.levels = settings.levels.filter(l => l !== level)

            el.classList.remove("active")
            removeKanjiLevel(level)

        } else {

            if (!Array.isArray(settings.levels)) {
                settings.levels = []
            }

            settings.levels.push(level)

            el.classList.add("active")
            loadKanjiLevel(level)

        }

        saveSettings()
        return
    }

    /* kana mode */

    if (!document.querySelector(".kana-group.active")) {
        el.classList.add("active")
        return
    }

    el.classList.toggle("active")

    const level = el.dataset.level

    if (el.classList.contains("active")) {

        settings.disabled =
            settings.disabled.filter(x => x !== level)

    } else {

        settings.disabled.push(level)

    }

    saveSettings()

    updateQueueFromSelection()
}

/* ---------- QUEUE ---------- */

function updateQueueFromSelection() {

    const settings = getSettings()

    dakutenEnabled = settings.dakuten
    comboEnabled = settings.combo

    queue = []

    const groups = document.querySelectorAll(".kana-group.active")

    groups.forEach(g => {

        if (!g.dataset.set) return

        const set = JSON.parse(g.dataset.set)

        set.forEach(k => {

            queue.push(k)

            if (dakutenEnabled && DAKUTEN[k]) {
                DAKUTEN[k].forEach(x => queue.push(x))
            }

            if (comboEnabled && COMBO[k]) {
                COMBO[k].forEach(x => queue.push(x))
            }

        })

    })

    shuffle(queue)
    generate()
}

/* ---------- EXTRA OPTIONS ---------- */

let dakutenEnabled = false
let comboEnabled = false

function renderExtraOptions() {

    if (DATA !== HIRAGANA && DATA !== KATAKANA && DATA !== MIXED_KANA) return

    const container = document.getElementById("kana-options")
    const settings = getSettings()

    dakutenEnabled = settings.dakuten
    comboEnabled = settings.combo

    const dakuten = document.createElement("div")
    dakuten.className = "kana-group"

    if (dakutenEnabled) dakuten.classList.add("active")

    dakuten.innerHTML = `
<div class="kana">゛</div>
<div class="label">dakuten</div>
`

    dakuten.onclick = () => {

        dakutenEnabled = !dakutenEnabled
        settings.dakuten = dakutenEnabled

        dakuten.classList.toggle("active")

        saveSettings()
        updateQueueFromSelection()

    }

    const combo = document.createElement("div")
    combo.className = "kana-group"

    if (comboEnabled) combo.classList.add("active")

    combo.innerHTML = `
<div class="kana">ゃ</div>
<div class="label">combo</div>
`

    combo.onclick = () => {

        comboEnabled = !comboEnabled
        settings.combo = comboEnabled

        combo.classList.toggle("active")

        saveSettings()
        updateQueueFromSelection()

    }

    container.appendChild(dakuten)
    container.appendChild(combo)
}
