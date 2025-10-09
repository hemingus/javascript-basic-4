// Main js file

const diceThemes = [
    { primary: "black", secondary: "grey" },
    { primary: "darkred", secondary: "red" },
    { primary: "darkblue", secondary: "blue" },
    { primary: "darkgreen", secondary: "limegreen" },
    { primary: "indigo", secondary: "darkviolet" },
];

const diceSound = new Audio("./assets/diceroll.mp3");

let diceColors = [diceThemes[0].primary, diceThemes[0].secondary];

function setDiceColors(primary, secondary) {
    diceColors = [primary, secondary];
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const diceContainer = document.getElementById("dice-container");
const rollDiceButton = document.getElementById("roll-dice-button");
const statsContainer = document.getElementById("stats-container");
const diceCount = document.querySelector("#dice-count");
let totalDiceValue = 0;
let rollStats = [0, 0, 0, 0, 0, 0];

function resetStats() {
    totalDiceValue = 0;
    rollStats = [0, 0, 0, 0, 0, 0]
}

function rollDice(numDice) {
    diceSound.currentTime = 0;
    diceSound.play()
    statsContainer.replaceChildren();
    diceContainer.replaceChildren();
    resetStats();
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1
        totalDiceValue += roll;
        rollStats[roll-1] += 1;
        const newDie = createDie(`die-${i}`, roll, ...diceColors);
        diceContainer.appendChild(newDie);
    }
    generateStats();
}

function generateStats() {
    const totalValue = document.createElement("h3");
    totalValue.textContent = `${totalDiceValue}`;
    for (let [i, stat] of rollStats.entries()) {
        if (stat > 0) {
            const rowContainer = document.createElement("div");
            rowContainer.classList.add("stat-row");
            const Die = createDie(`stat-${stat}`, i+1, ...diceColors);
            const statParagraph = document.createElement("p");
            rowContainer.append(Die, statParagraph);
            statParagraph.textContent = `${stat}`
            statsContainer.appendChild(rowContainer);
        }
    }
    statsContainer.appendChild(totalValue);
}

function createDie(id, numDots, primaryColor, secondaryColor) {
    const Die = document.createElement("div");
    Die.id = id;
    Die.classList.add("dice", "roll");
    Die.style.background = `linear-gradient(to top right, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`

    const dotPositions = {
        1: [5],
        2: [1, 9],
        3: [1, 5, 9],
        4: [1, 3, 7, 9],
        5: [1, 3, 5, 7, 9],
        6: [1, 3, 4, 6, 7, 9],
    };

    dotPositions[numDots].forEach((pos) => {
        const dot = document.createElement("div");
        dot.classList.add("dot")
        dot.style.gridArea = getGridArea(pos);
        Die.appendChild(dot);
    });

    return Die
}

// Function that maps each dot position to grid area
function getGridArea(pos) {
    const row = Math.ceil(pos / 3);
    const col = pos % 3 === 0 ? 3 : pos % 3;
    return `${row} / ${col} / ${row + 1} / ${col + 1}`;
}

const diceThemesContainer = document.getElementById("dice-theme-container");
let activeThemeButton = null;

for (let theme of diceThemes) {
    const themeButton = document.createElement("button");
    themeButton.id = `${theme.primary}${theme.secondary}`;
    themeButton.classList.add("theme-button");
    themeButton.style.background = `linear-gradient(to top right, ${theme.secondary}, ${theme.primary}, ${theme.secondary})`;
    themeButton.addEventListener("click", () => {
        setDiceColors(theme.primary, theme.secondary);
        if (activeThemeButton) {
        activeThemeButton.classList.remove("active");
        }
        themeButton.classList.add("active");
        activeThemeButton = themeButton;
    })
    diceThemesContainer.appendChild(themeButton);
}

diceThemesContainer.firstElementChild.classList.add("active");
activeThemeButton = diceThemesContainer.firstElementChild;

function handleRollDice() {

    let diceCount = parseInt(document.getElementById("dice-count").value, 10);
    if (isNaN(diceCount) || diceCount < 1 || diceCount > 200) {
        alert("Dice count must be a number between 1 and 200.");
    } else {
        rollDice(diceCount);
    }  
}

rollDiceButton.addEventListener("click", () => handleRollDice());


diceCount.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.repeat) {
            handleRollDice();
        }
    })