function createBotUrl(colors, seed) {
    return `https://api.dicebear.com/5.x/bottts/svg?baseColor=${colors[0]},${colors[1]},${colors[2]}&seed=${seed}`
}

function createBotElement(colorname, colors, seed, offset) {
    const bot = document.createElement('img');
    bot.classList.add('bot');
    bot.src = createBotUrl(colors, seed);
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

let botOffsets = [];
function getOffsets() {
    let offset = Math.round(Math.random() * 7, 1);
    if (botOffsets.includes(offset)) {
        return getOffset();
    }
    else {
        botOffsets.push(offset);
        return offset;
    }
}