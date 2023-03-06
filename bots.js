function createBotUrl(colors, seed) {
    return `https://api.dicebear.com/5.x/bottts/svg?baseColor=${colors[0]},${colors[1]},${colors[2]}&seed=${seed}`
}

function createBotElement(colorname, colors, seed) {
    const offset = Math.floor(Math.random() * 50) + 25;
    const bot = document.createElement('img');
    bot.classList.add('bot');
    bot.src = createBotUrl(colors, seed);
    console.log(`The bot's offset is ${offset}`);
    bot.style.left = `${offset}vw`;
    bot.setAttribute('color', colorname);
    return bot;
}

function createBoxElement(colorname, colors) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundColor = `#${colors[2]}`;
    box.setAttribute('color', colorname);
    return box;
}