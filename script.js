// Color pairs as hex
const colors = {
    purple: ["00acc1", "1e88e5", "5e35b1"],
    blue: ["00acc1", "1e88e5", "039be5"],
    green: ["00acc1", "1e88e5", "00c853"],
    yellow: ["00acc1", "1e88e5", "ffd600"],
}

function createBotUrl(colors, seed) {
    return `https://api.dicebear.com/5.x/bottts/svg?baseColor=${colors[0]},${colors[1]},${colors[2]}&seed=${seed}`
}

function createBotElement(colors, seed) {
    const bot = document.createElement('img')
    bot.classList.add('bot')
    bot.src = createBotUrl(colors, seed)
    return bot
}

document.querySelector("body").appendChild(createBotElement(colors.purple, 1));