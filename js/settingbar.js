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

        const set = JSON.parse(g.dataset.set)

        set.forEach(k => queue.push(k))

    })

    shuffle(queue)
    generate()

}
