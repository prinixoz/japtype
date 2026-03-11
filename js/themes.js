const THEMES = {

    "nord": { bg: "#2e3440", text: "#d8dee9", accent: "#88c0d0", panel: "#3b4252", border: "#4c566a", muted: "#81a1c1", correct: "#a3be8c", wrong: "#bf616a" },

    "black": { bg: "#000000", text: "#e6e6e6", accent: "#00cfff", panel: "#050505", border: "#111111", muted: "#666666", correct: "#5cff9c", wrong: "#ff6b6b" },

    "9009": { bg: "#101216", text: "#e5e9f0", accent: "#ff6b6b", panel: "#161a22", border: "#2a2f3a", muted: "#7a8596", correct: "#50fa7b", wrong: "#ff5555" },

    "aether": { bg: "#0e1116", text: "#e2e8f0", accent: "#6bc5ff", panel: "#151a22", border: "#283142", muted: "#6e7b91", correct: "#50fa7b", wrong: "#ff5555" },

    "aurora": { bg: "#0f1418", text: "#e8edf2", accent: "#7fffd4", panel: "#162027", border: "#2b3a42", muted: "#7b8d98", correct: "#50fa7b", wrong: "#ff5555" },

    "beach": { bg: "#1c2228", text: "#f0f4f8", accent: "#ffd166", panel: "#252d35", border: "#394655", muted: "#8fa1b3", correct: "#50fa7b", wrong: "#ff5555" },

    "bingsu": { bg: "#17171f", text: "#f2f2ff", accent: "#ff9ad5", panel: "#212130", border: "#38384f", muted: "#9a9ac0", correct: "#50fa7b", wrong: "#ff5555" },

    "blueberry_dark": { bg: "#121421", text: "#dfe7ff", accent: "#6c8cff", panel: "#1a1d2b", border: "#2f3450", muted: "#8890b8", correct: "#50fa7b", wrong: "#ff5555" },

    "blueberry_light": { bg: "#f4f6ff", text: "#202336", accent: "#4c6fff", panel: "#e6eaff", border: "#cfd6ff", muted: "#6e78a8", correct: "#16c172", wrong: "#e74c3c" },

    "camping": { bg: "#1a1f1a", text: "#e9efe9", accent: "#8bc34a", panel: "#242b24", border: "#394239", muted: "#7e8c7e", correct: "#50fa7b", wrong: "#ff5555" },

    "catppuccin": { bg: "#1e1e2e", text: "#cdd6f4", accent: "#f5c2e7", panel: "#181825", border: "#313244", muted: "#7f849c", correct: "#a6e3a1", wrong: "#f38ba8" },

    "chaos_theory": { bg: "#0d0f12", text: "#e8e8e8", accent: "#ff4757", panel: "#15181d", border: "#2a3037", muted: "#7c858f", correct: "#50fa7b", wrong: "#ff5555" },

    "cheesecake": { bg: "#2a1d1d", text: "#fff1e6", accent: "#ffb3a7", panel: "#352424", border: "#4d3434", muted: "#b28a8a", correct: "#50fa7b", wrong: "#ff5555" },

    "dark_note": { bg: "#121212", text: "#e5e5e5", accent: "#ffcc66", panel: "#1c1c1c", border: "#303030", muted: "#8a8a8a", correct: "#50fa7b", wrong: "#ff5555" },

    "desert_oasis": { bg: "#1b1a16", text: "#f1e9d2", accent: "#e9c46a", panel: "#242219", border: "#3c3826", muted: "#a79c74", correct: "#50fa7b", wrong: "#ff5555" },

    "dmg": { bg: "#2a2f2a", text: "#e0f0d0", accent: "#8bac0f", panel: "#333833", border: "#4a524a", muted: "#9eb89e", correct: "#50fa7b", wrong: "#ff5555" },

    "dots": { bg: "#0f1012", text: "#e6e6e6", accent: "#ffffff", panel: "#181a1f", border: "#2d3038", muted: "#7b7f89", correct: "#50fa7b", wrong: "#ff5555" },

    "dracula": { bg: "#282a36", text: "#f8f8f2", accent: "#bd93f9", panel: "#1e1f29", border: "#44475a", muted: "#6272a4", correct: "#50fa7b", wrong: "#ff5555" },

    "dualshot": { bg: "#14161c", text: "#f1f3f7", accent: "#ff6ec7", panel: "#1d2028", border: "#313646", muted: "#858da3", correct: "#50fa7b", wrong: "#ff5555" },

    "ez_mode": { bg: "#161616", text: "#e6e6e6", accent: "#00d1b2", panel: "#1f1f1f", border: "#323232", muted: "#8a8a8a", correct: "#50fa7b", wrong: "#ff5555" },

    "fire": { bg: "#1a0f0f", text: "#ffe8e8", accent: "#ff4d4d", panel: "#241616", border: "#3c2626", muted: "#b88484", correct: "#50fa7b", wrong: "#ff5555" },

    "froyo": { bg: "#181a20", text: "#f0f2f8", accent: "#ffb3ff", panel: "#21242d", border: "#363b48", muted: "#9aa3b5", correct: "#50fa7b", wrong: "#ff5555" },

    "fruit_chew": { bg: "#1c1a1a", text: "#fff2f2", accent: "#ff8ba7", panel: "#262222", border: "#3e3434", muted: "#b79a9a", correct: "#50fa7b", wrong: "#ff5555" },

    "fundamentals": { bg: "#101114", text: "#e9edf1", accent: "#4dabf7", panel: "#171a20", border: "#2c313b", muted: "#808a98", correct: "#50fa7b", wrong: "#ff5555" },

    "future_funk": { bg: "#241b2f", text: "#f8f8ff", accent: "#ff00ff", panel: "#1a1323", border: "#3b2c54", muted: "#a599e9", correct: "#50fa7b", wrong: "#ff5555" },

    "graen": { bg: "#151a16", text: "#e6f0e8", accent: "#66bb6a", panel: "#1f2621", border: "#354037", muted: "#8aa08f", correct: "#50fa7b", wrong: "#ff5555" },

    "grape": { bg: "#201822", text: "#f3e8ff", accent: "#b084ff", panel: "#2b2030", border: "#44324c", muted: "#a090b8", correct: "#50fa7b", wrong: "#ff5555" },

    "horizon": { bg: "#1c1e26", text: "#e0e6f0", accent: "#ff7a90", panel: "#232530", border: "#3b3f51", muted: "#8e94a8", correct: "#50fa7b", wrong: "#ff5555" },

    "husqy": { bg: "#151515", text: "#f2f2f2", accent: "#ff9f43", panel: "#1f1f1f", border: "#353535", muted: "#8a8a8a", correct: "#50fa7b", wrong: "#ff5555" },

    "incognito": { bg: "#111111", text: "#eeeeee", accent: "#9c88ff", panel: "#1a1a1a", border: "#2e2e2e", muted: "#888888", correct: "#50fa7b", wrong: "#ff5555" },

    "ishtar": { bg: "#1a1326", text: "#f0eaff", accent: "#ff79c6", panel: "#241c33", border: "#3a2d52", muted: "#9f8cc0", correct: "#50fa7b", wrong: "#ff5555" },

    "lavender": { bg: "#1f1b24", text: "#f5f0ff", accent: "#caa9ff", panel: "#28222f", border: "#3f3448", muted: "#a79ab8", correct: "#50fa7b", wrong: "#ff5555" },

    "lil_dragon": { bg: "#151313", text: "#ffeaea", accent: "#ff6b81", panel: "#1f1a1a", border: "#352929", muted: "#a78b8b", correct: "#50fa7b", wrong: "#ff5555" },

    "matrix": { bg: "#000000", text: "#00ff9c", accent: "#00ff41", panel: "#001a12", border: "#003b28", muted: "#008f5b", correct: "#00ff9c", wrong: "#ff003c" },

    "metropolis": { bg: "#16181c", text: "#e8ebf0", accent: "#3da9fc", panel: "#1e2127", border: "#323744", muted: "#8a93a6", correct: "#50fa7b", wrong: "#ff5555" },

    "milkshake": { bg: "#2a1f24", text: "#fff0f5", accent: "#ff9ecb", panel: "#35272d", border: "#4f3942", muted: "#c2a0ac", correct: "#50fa7b", wrong: "#ff5555" },

    "modern_ink": { bg: "#111318", text: "#e9edf5", accent: "#6ea8fe", panel: "#1a1d24", border: "#303646", muted: "#8a93a5", correct: "#50fa7b", wrong: "#ff5555" },

    "moonlight": { bg: "#0f111a", text: "#e8e8ff", accent: "#82aaff", panel: "#16182a", border: "#2d3150", muted: "#8b90c8", correct: "#50fa7b", wrong: "#ff5555" },

    "mr_sleeves": { bg: "#181414", text: "#f6eaea", accent: "#ff7b72", panel: "#221c1c", border: "#3a2e2e", muted: "#a38b8b", correct: "#50fa7b", wrong: "#ff5555" },

    "oblivion": { bg: "#0e0e0e", text: "#f1f1f1", accent: "#ff5555", panel: "#161616", border: "#2b2b2b", muted: "#8c8c8c", correct: "#50fa7b", wrong: "#ff5555" },

    "phantom": { bg: "#12121a", text: "#ececff", accent: "#9d7cff", panel: "#1a1a26", border: "#323247", muted: "#8d8da8", correct: "#50fa7b", wrong: "#ff5555" },

    "rainbow_trail": { bg: "#141414", text: "#f2f2f2", accent: "#ff66ff", panel: "#1c1c1c", border: "#333333", muted: "#888888", correct: "#50fa7b", wrong: "#ff5555" },

    "retrocast": { bg: "#1b1b1b", text: "#ffd9b3", accent: "#ff8c42", panel: "#242424", border: "#3b3b3b", muted: "#b89a7a", correct: "#50fa7b", wrong: "#ff5555" },

    "rgb": { bg: "#101010", text: "#ffffff", accent: "#ff00ff", panel: "#1a1a1a", border: "#333333", muted: "#888888", correct: "#50fa7b", wrong: "#ff5555" },

    "sewing_tin": { bg: "#1d1d1d", text: "#e8e8e8", accent: "#d4af37", panel: "#262626", border: "#3d3d3d", muted: "#9a9a9a", correct: "#50fa7b", wrong: "#ff5555" },

    "sewing_tin_light": { bg: "#f3f3f3", text: "#222222", accent: "#c29b2b", panel: "#e4e4e4", border: "#cccccc", muted: "#777777", correct: "#16c172", wrong: "#e74c3c" },

    "shadow": { bg: "#0f0f12", text: "#f0f0f5", accent: "#7c7cff", panel: "#18181d", border: "#2f2f3a", muted: "#88889a", correct: "#50fa7b", wrong: "#ff5555" },

    "snes": { bg: "#2c2c44", text: "#f0f0ff", accent: "#ff4fa3", panel: "#36365a", border: "#4c4c7a", muted: "#9c9cc2", correct: "#50fa7b", wrong: "#ff5555" },

    "solarized_osaka": { bg: "#002b36", text: "#839496", accent: "#b58900", panel: "#073642", border: "#586e75", muted: "#657b83", correct: "#859900", wrong: "#dc322f" },

    "stealth": { bg: "#0b0f1a", text: "#6e7aa6", accent: "#8aa2ff", panel: "#0e1322", border: "#1a2035", muted: "#4a5378", correct: "#7bd88f", wrong: "#ff6b6b" },

    "suisei": { bg: "#141825", text: "#e8f0ff", accent: "#5fa8ff", panel: "#1d2233", border: "#323a55", muted: "#8c97b8", correct: "#50fa7b", wrong: "#ff5555" },

    "sunset": { bg: "#2a1c1c", text: "#ffe8e0", accent: "#ff7e5f", panel: "#352424", border: "#4d3434", muted: "#c29a90", correct: "#50fa7b", wrong: "#ff5555" },

    "taro": { bg: "#1e1a22", text: "#efe7ff", accent: "#b58cff", panel: "#292330", border: "#40334c", muted: "#a293b8", correct: "#50fa7b", wrong: "#ff5555" },

    "terrazzo": { bg: "#202020", text: "#f2f2f2", accent: "#00c2ff", panel: "#2a2a2a", border: "#3f3f3f", muted: "#8a8a8a", correct: "#50fa7b", wrong: "#ff5555" },

    "trackday": { bg: "#1a1a1a", text: "#f5f5f5", accent: "#ff3c38", panel: "#242424", border: "#3b3b3b", muted: "#8e8e8e", correct: "#50fa7b", wrong: "#ff5555" },

    "trance": { bg: "#14141a", text: "#f2f2ff", accent: "#e51376", panel: "#1d1d26", border: "#34344a", muted: "#8d8db5", correct: "#50fa7b", wrong: "#ff5555" }

}


function applyTheme(name) {

    const theme = THEMES[name]
    const root = document.documentElement

    for (const key in theme) {
        root.style.setProperty(`--${key}`, theme[key])
    }

    // derived variables for typing UI
    root.style.setProperty("--current-bg", theme.accent)
    root.style.setProperty("--current-text", theme.bg)

    localStorage.setItem("theme", name)
}

function loadTheme() {

    const saved = localStorage.getItem("theme") || "stealth"

    applyTheme(saved)

}



function getThemeList() {
    return Object.keys(THEMES)
}


loadTheme();
