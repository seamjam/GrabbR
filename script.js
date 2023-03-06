// Color pairs as hex
const colors = {
    purple: ["00acc1", "1e88e5", "5e35b1"],
    blue: ["00acc1", "1e88e5", "039be5"],
    red: ["00acc1", "1e88e5", "d32f2f"],
    green: ["00acc1", "1e88e5", "00c853"],
    yellow: ["00acc1", "1e88e5", "ffd600"],
}

let botOffsets = [];
function getOffsets() {
    let offset = Math.round(Math.random() * 7, 1);
    if (botOffsets.includes(offset)) {
        return getOffset();
    } else {
        botOffsets.push(offset);
        return offset;
    }
}

let score = 0;
let scoreText = document.createElement("p", );
scoreText.innerText=('Score: '+score);
document.querySelector('#score').appendChild(scoreText);
function addScore(){
    score++;
    scoreText.innerText=('Score: '+score);
}

function createBotUrl(colors, seed) {
    return `https://api.dicebear.com/5.x/bottts/svg?baseColor=${colors[0]},${colors[1]},${colors[2]}&seed=${seed}`
}

function createBotElement(colors, seed, offset) {
    const bot = document.createElement('img')
    bot.classList.add('bot')
    bot.src = createBotUrl(colors, seed)
    bot.style.left = `${offset}vw`
    return bot
}

function createBoxElement(colors) {
    const box = document.createElement('div')
    box.classList.add('box')
    box.style.backgroundColor = `#${colors[2]}`
    box.addEventListener("mouseenter", addScore);
    return box
}

for (let colorsKey in colors) {
    let bot = createBotElement(colors[colorsKey], 1, Math.round(Math.random() * 90));
    document.querySelector("#bots").appendChild(bot);
}

for (let colorsKey in colors) {
    document.querySelector("#boxes").appendChild(createBoxElement(colors[colorsKey]));
}