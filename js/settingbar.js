const bar = document.querySelector(".settings-bar")


document.querySelector(".close-btn").onclick = () => {
    bar.classList.add("collapsed")
}

document.querySelector(".expand-btn").onclick = () => {
    bar.classList.remove("collapsed")
}

function renderKanaBar(groups) {

    const container = document.getElementById("kana-options")
    container.innerHTML = ""

    groups.forEach(g => {

        const el = document.createElement("div")
        el.className = "kana-group active"

        el.innerHTML = `
        <div class="kana">${g.kana}</div>
        <div class="label">${g.label}</div>
        `

        el.dataset.set = JSON.stringify(g.set)

        el.onclick = () => toggleKanaGroup(el)

        container.appendChild(el)

    })

    renderExtraOptions()

    updateQueueFromSelection()

}


function toggleKanaGroup(el) {

    if (!document.querySelector(".kana-group.active")) {
        el.classList.add("active")
        return
    }
    el.classList.toggle("active")

    updateQueueFromSelection()


}

function updateQueueFromSelection() {

    queue = []

    const groups = document.querySelectorAll(".kana-group.active")

    groups.forEach(g => {

        if (!g.dataset.set) return

        const set = JSON.parse(g.dataset.set)

        set.forEach(k => {

            // add base kana
            queue.push(k)

            // dakuten
            if (dakutenEnabled && DAKUTEN[k]) {
                DAKUTEN[k].forEach(x => queue.push(x))
            }

            // combo
            if (comboEnabled && COMBO[k]) {
                COMBO[k].forEach(x => queue.push(x))
            }

        })

    })

    shuffle(queue)
    generate()
}


let dakutenEnabled = false
let comboEnabled = false

function renderExtraOptions() {

    // only show for kana modes
    if (DATA !== HIRAGANA && DATA !== KATAKANA && DATA !== MIXED_KANA) {
        return
    }

    const container = document.getElementById("kana-options")

    const dakuten = document.createElement("div")
    dakuten.className = "kana-group"

    dakuten.innerHTML = `
        <div class="kana">゛</div>
        <div class="label">dakuten</div>
    `

    dakuten.onclick = () => {
        dakutenEnabled = !dakutenEnabled
        dakuten.classList.toggle("active")
        updateQueueFromSelection()
    }

    const combo = document.createElement("div")
    combo.className = "kana-group"

    combo.innerHTML = `
        <div class="kana">ゃ</div>
        <div class="label">combo</div>
    `

    combo.onclick = () => {
        comboEnabled = !comboEnabled
        combo.classList.toggle("active")
        updateQueueFromSelection()
    }

    container.appendChild(dakuten)
    container.appendChild(combo)

}
