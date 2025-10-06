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

function rollDice(numDice) {
    diceContainer.replaceChildren();
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1
        const newDice = document.createElement("div");
        newDice.id = `dice-${i}`;
        newDice.classList.add("dice", "roll");
        newDice.style.background = `linear-gradient(to top right, ${diceColors[1]}, ${diceColors[0]}, ${diceColors[1]})`
        createDiceDots(roll, newDice);
        diceContainer.appendChild(newDice);
    }
    setTimeout(() => newDice.classList.remove("roll"), 300);
} 

// Function that creates dots on the dice depending on its value
function createDiceDots(num, dice) {
    const dotPositions = {
        1: [5],
        2: [1, 9],
        3: [1, 5, 9],
        4: [1, 3, 7, 9],
        5: [1, 3, 5, 7, 9],
        6: [1, 3, 4, 6, 7, 9],
    };

    dotPositions[num].forEach((pos) => {
        const dot = document.createElement("div");
        dot.classList.add("dot")
        dot.style.gridArea = getGridArea(pos);
        dice.appendChild(dot);
    });
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