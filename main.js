// Main js file
let dicePrimary = "black";
let diceSecondary = "grey"
const diceContainer = document.getElementById("dice-container");
const rollDiceButton = document.getElementById("roll-dice-button");

function rollDice(numDice) {
    diceContainer.replaceChildren();
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1

        const newDice = document.createElement("div");
        newDice.id = `dice-${i}`;
        newDice.classList.add("dice", "roll");
        newDice.style.background = `linear-gradient(to top right, ${diceSecondary}, ${dicePrimary} ,${diceSecondary})`
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

rollDiceButton.addEventListener("click", () => {
    let diceCount = parseInt(document.getElementById("dice-count").value, 10);
    if (isNaN(diceCount)) diceCount = 1;
    rollDice(diceCount);
    })