// Color pairs as hex
const colors = {
    purple: ["00acc1", "1e88e5", "5e35b1"],
    blue: ["00acc1", "1e88e5", "039be5"],
    red: ["00acc1", "1e88e5", "d32f2f"],
    green: ["00acc1", "1e88e5", "00c853"],
    yellow: ["00acc1", "1e88e5", "ffd600"],
}

let score = 0;
let scoreText = document.createElement("p", );
scoreText.innerText=('Score: '+score);
document.querySelector('#score').appendChild(scoreText);
function addScore(){
    score++;
    scoreText.innerText=('Score: '+score);
}

for (let colorsKey in colors) {
    let bot = createBotElement(colorsKey, colors[colorsKey], 1, Math.round(Math.random() * 90));
    document.querySelector("#bots").appendChild(bot);
}

for (let colorsKey in colors) {
    document.querySelector("#boxes").appendChild(createBoxElement(colorsKey, colors[colorsKey]));
}