/* kanji.js */

/* kanji.js */

let loadedKanji = {}

/* load kanji level */

async function loadKanjiLevel(level) {

    if (loadedKanji[level]) return

    const module = await import(`./kanji/${level}.js`)

    const data = module.default

    loadedKanji[level] = data

    Object.assign(DATA, data)

    rebuildKanjiQueue()

}


/* remove kanji level */

function removeKanjiLevel(level) {

    const set = loadedKanji[level]

    if (!set) return

    Object.keys(set).forEach(k => delete DATA[k])

    delete loadedKanji[level]

    rebuildKanjiQueue()

}


/* rebuild queue */

function rebuildKanjiQueue() {

    queue = Object.keys(DATA)

    shuffle(queue)

    generate()

}

/* kanji levels */

const KANJI_GROUPS = [

    { kana: "漢", label: "N5", set: [] },
    { kana: "漢", label: "N4", set: [] },
    { kana: "漢", label: "N3", set: [] },
    { kana: "漢", label: "N2", set: [] },
    { kana: "漢", label: "N1", set: [] }

]

