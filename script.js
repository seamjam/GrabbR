// Color pairs as hex
const colors = {
    purple: ["00acc1", "1e88e5", "5e35b1"],
    blue: ["00acc1", "1e88e5", "039be5"],
    red: ["00acc1", "1e88e5", "d32f2f"],
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

for (let colorsKey in colors) {
    console.log(`Creating bots for ${colorsKey}...`);
    document.querySelector("#bots").appendChild(createBotElement(colors[colorsKey], 1));
}
