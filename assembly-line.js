function goAssemblyLine()
{
    // HTML canvas element selecteren
// HTML canvas element maken
    let canvas = document.createElement('canvas');

// Canvas klasse toevoegen en breedte/hoogte instellen
//     canvas.classList.add('row');
    canvas.width = document.getElementById('esembly-line').offsetWidth;
    canvas.height = document.getElementById('esembly-line').offsetHeight;

// Canvas toevoegen aan de lopende band div
    document.getElementById('esembly-line').appendChild(canvas);


// const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

// Een array van kleuren voor de lopende band
    const colors = ['#000000'];

// De hoogte van de lopende band
    const bandHeight = 1000 * 4;

// De hoogte en breedte van de doos
    const boxWidth = 200;
    const boxHeight = 100;

// De x-coördinaat van de linker rand van de doos
    let boxX = canvas.width / 2 - boxWidth / 2;

// De snelheid van de doos
    const boxSpeed = 3;
    function drawBox() {

        ctx.fillStyle ='#e81c4f';
        ctx.fillRect(boxX, canvas.height - boxHeight, boxWidth, boxHeight);

        // Lint tekenuug
        ctx.fillStyle = 'white';
        ctx.fillRect(boxX + 10, canvas.height - boxHeight - 20, boxWidth - 20, 10);
        ctx.fillRect(boxX + 5, canvas.height - boxHeight - 25, boxWidth - 10, 5);
        ctx.fillRect(boxX + 20, canvas.height - boxHeight - 30, boxWidth - 40, 5);
        ctx.fillRect(boxX + boxWidth - 5, canvas.height - boxHeight, 5, -boxHeight);

        // Cadeaupapier textuur tekenen
        ctx.fillStyle = '#e81c4f';
        ctx.beginPath();
        ctx.moveTo(boxX, canvas.height - boxHeight);
        ctx.lineTo(boxX, canvas.height - boxHeight - 20);
        ctx.lineTo(boxX + 10, canvas.height - boxHeight - 25);
        ctx.lineTo(boxX + boxWidth - 10, canvas.height - boxHeight - 25);
        ctx.lineTo(boxX + boxWidth, canvas.height - boxHeight - 20);
        ctx.lineTo(boxX + boxWidth, canvas.height - boxHeight);
        ctx.closePath();
        ctx.fill();

        // Strikje tekenen
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(boxX + boxWidth/2 - 20, canvas.height - boxHeight - 35);
        ctx.lineTo(boxX + boxWidth/2, canvas.height - boxHeight - 60);
        ctx.lineTo(boxX + boxWidth/2 + 20, canvas.height - boxHeight - 35);
        ctx.lineTo(boxX + boxWidth/2, canvas.height - boxHeight - 45);
        ctx.fill();
        ctx.fillRect(boxX + boxWidth/2 - 2, canvas.height - boxHeight - 45, 4, 30);
    }



// Een functie om de doos en de achtergrond te updaten
    function update() {
        // De vorige doos wissen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // De nieuwe doos en achtergrond tekenen
        drawBand();
        drawBox();

        // De positie van de doos updaten
        boxX += boxSpeed;

        // Als de doos buiten de canvas komt, terug naar beginpositie
        if (boxX + boxWidth > canvas.width) {
            boxX = 0;
        }
    }

// De update functie elke 10 milliseconden uitvoeren
    setInterval(update, 10);

// Een functie om de lopende band te tekenen
    function drawBand() {
        // De band tekenen als een rechthoek met een breedte gelijk aan de breedte van de canvas en een hoogte van `bandHeight`
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(0, canvas.height - bandHeight, canvas.width, bandHeight);
    }
}
