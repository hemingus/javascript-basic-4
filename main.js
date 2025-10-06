// Main js file

const diceThemes = [
    { primary: "black", secondary: "grey" },
    { primary: "darkred", secondary: "red" },
    { primary: "darkblue", secondary: "blue" },
    { primary: "darkgreen", secondary: "limegreen" },
    { primary: "indigo", secondary: "darkviolet" },
];

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
let rollStats = {
    six: 0,
    five: 0,
    four: 0,
    three: 0,
    two: 0,
    one: 0
}

function resetRollStats() {
    rollStats = {
        six: 0,
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0
    }
}

function incrementRollStats(roll) {
    switch (roll) {
        case 1: {
            rollStats.one++;
            break;
        }
        case 2: {
            rollStats.two++;
            break;
        }
        case 3: {
            rollStats.three++;
            break;
        }
        case 4: {
            rollStats.four++;
            break;
        }
        case 5: {
            rollStats.five++;
            break;
        }
        case 6: {
            rollStats.six++;
            break;
        }
        default: {
            console.log("No such dice value...");
        }
    }
}

function rollDice(numDice) {
    statsContainer.replaceChildren();
    diceContainer.replaceChildren();
    resetRollStats();
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1
        incrementRollStats(roll);
        const newDie = createDie(`die-${i}`, roll, ...diceColors);
        diceContainer.appendChild(newDie);
    }
    generateStats();
}

function generateStats() {
    for (let stat in rollStats) {
        const statParagraph = document.createElement("p");
        statParagraph.textContent = `${stat}: ${rollStats[stat]}`
        statsContainer.appendChild(statParagraph);
    }
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

rollDiceButton.addEventListener("click", () => {
    let diceCount = parseInt(document.getElementById("dice-count").value, 10);
    if (isNaN(diceCount)) diceCount = 1;
    rollDice(diceCount);
    })