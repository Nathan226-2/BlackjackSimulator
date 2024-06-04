const startKnop = document.querySelector("#startKnop")
// Dit is een constante die ervoor zorgt dat de startknop geactiveerd kan worden. de queryselector zorgt ervoor dat de code in het html bestand zoekt naar een element met dat Id.//

const nieuweKaartKnop = document.querySelector("#nieuweKaartKnop")
// Net als bij de startknop is dit een constante die ervoor zorgt dat er een nieuwe kaart getrokken kan worden in het spel. de queryselector zorgt ervoor dat er in het html bestand gezocht wordt naar een element met de id nieuweKaartKnop.//

const speler = {
    naam: "Nathan", 
    chips: 145
};
// Object waar de speler zijn naam kan zien en de hoeveelheid chips die hij/zij heeft. een object bestaat uit een key en value paar. hier is de key bijvoorbeeld naam en de value Nathan.//

let kaarten = []
// Lege Array voor de kaarten die ervoor zorgt dat de kaarten van de speler worden bijgehouden.//

let aantal = 0
// Variabele die de waarde van de getrokken kaarten bij houdt.//

let heeftBlackjack = false
let spelerLeeft = false
// Boolleans die ervoor zorgen dat de code weet wanneer er blackjack is gertrokken en wanneer de speler nog in het spel zit.//

let bericht =""
// Een variabele die ervoor zorgt dat berichten worden weer gegeven aan de speler tijdens het spel.//

const berichtEl = document.querySelector("#bericht-el")
const aantalEl = document.querySelector("#aantal-el")
const kaartenEl = document.querySelector("#kaarten-el")
const spelerEl = document.querySelector("#speler-el") 
// Constante die ervoor zorgen dat de DOM wordt gemanipuleerd.// 

spelerEl.textContent = speler.naam + ":" + " €" + speler.chips
// textcontent die de tekstinhoud van de speler insteld. naam: en chips://

const geluidWinnen = new Audio("./audio/winnen.mp3") 
const geluidVerliezen = new Audio("./audio/verliezen.mp3")
// constante die audio bevatten die afgespeeld worden wanneer de speler wint of verliest. Student Berend Janssen heeft mij geholpen met het toevoegen van deze sounds.//

function pakRandomKaart() {
    let randomKaart = Math.floor(Math.random()*13) + 1
    if (randomKaart > 10) {
        return 10
    } else if (randomKaart === 1) {
        return 11
    } else {
        return randomKaart
    }
}
// Functie die een random kaart selecteerd en aan de speler geeft. Met if else statements die ervoor zorgen dat de een aas 1 is en de boer, vrouw en koning 10 zijn zoals in blackjack. Math.floor zorgt dat er geen decimalen komen en math.random zorgt ervoor dat er een random getal wordt gekozen. bronnen: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else en https://forum.freecodecamp.org/t/basic-javascript-return-statement/451433 

function startSpel(){
    spelerLeeft = true 
    heeftBlackjack = false
    let eerstekaart = pakRandomKaart()
    let tweedekaart = pakRandomKaart()
    kaarten = [eerstekaart, tweedekaart]
    aantal = eerstekaart + tweedekaart
    renderSpel()
}
// Fucntie die het spel start. Door deze functie krijgt de speler twee random kaarten en wordt het spel gerenderd. Ook geef ik de kaarten array een waarde namelijk de eerste en tweede kaart.//

function renderSpel(){
    if(aantal <= 20) {
        bericht = "Wil je nog een kaart trekken?"
    } else if(aantal === 21) {
        bericht = "wauw! je hebt Blackjack!"
        geluidWinnen.play();
        heeftBlackjack = true
        plusChips();
    } else {
        bericht = "bust! helaas je hebt verloren"
        spelerLeeft = false
        geluidVerliezen.play();
        minChips();
    }
    for (let i = 0; i < kaarten.length; i++) {
        kaartenEl.textContent += kaarten[i] + " "
    }
    aantalEl.textContent = "Aantal: " + aantal 
    berichtEl.textContent = bericht
    kaartenEl.textContent = "Kaarten: "
    spelerEl.textContent = speler.naam + ": €" + speler.chips
}
// Functie die de huidige staat van het spel weergeeft. En een For loop die ervoor zorgt de code weet hoe de kaarten werken bron for loop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration// 

function nieuweKaart(){
    if (spelerLeeft === true && heeftBlackjack === false) {
        let kaart = pakRandomKaart()
        aantal += kaart
        kaarten.push(kaart)
        renderSpel()
    }
}
// Deze functie checkt of er een nieuwe kaart gegeven kan worden door te kijken of de speler nog leeft of of er geen blackjack is. zo niet kan de speler nog een random kaart laten pushen tot de array. de push zorgt ervoor dat er een kaart wordt toegevoegd aan het einde van de array.//

startKnop.addEventListener('click', startSpel)
nieuweKaartKnop.addEventListener('click', nieuweKaart)
// eventlisteners die ervoor zorgen dat als je op de knop drukt de startspel functie wordt uitgevoerd een eventlistener luisterd naar een event zoals bijvoorbeeld op een knop drukken bron: https://dlo.mijnhva.nl/d2l/le/content/536465/viewContent/2045350/View//

function plusChips() {
    speler.chips += 50;
}
function minChips() {
    speler.chips -= 1;
}
// functies die ervoor zorgen dat de chips bij winnen +50 krijgen en bij verliezen -1//


