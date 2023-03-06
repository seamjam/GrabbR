let score = 0;
let scoreText = document.createElement("p", );
scoreText.innerText=('Score: '+score);
document.querySelector('#score').appendChild(scoreText);
function addScore(){
    score++;
    scoreText.innerText=('Score: '+score);
}

for (let colorsKey in colors) {
    let bot = createBotElement(colorsKey, colors[colorsKey], 1);
    document.querySelector("#bots").appendChild(bot);
}

for (let colorsKey in colors) {
    document.querySelector("#boxes").appendChild(createBoxElement(colorsKey, colors[colorsKey]));
}