let betAmount = 0;
let cashCounter = 0;
let squares = [];
let numberOfMatches = 0;
const divSquares = document.querySelectorAll(".img");
const minBetBtn = document.querySelector("#min-bet");
const maxBetBtn = document.querySelector("#max-bet");
const cashOutput = document.querySelector("#cash-output");
const betOutput = document.querySelector("#bet-output");
const winOutput = document.querySelector("#win-output");
const spinBtn = document.querySelector("#spin-btn");
const retryBtn = document.querySelector("#retry-btn");
const imgContainer = document.querySelector("#img-container");
const spanResult = document.querySelector("#span-result");

const getRandomColor = () => {
    const colors = [
        "blue",
        "yellow",
        "red",
        "green",
        "blueviolet"
    ]
    let randomIndex = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomIndex];
    return randomColor;
}

const sortColors = () => {
    if (squares.length === 0) {
        divSquares.forEach((element, i) => {
            let square = document.createElement('div');
            square.setAttribute("class", "img");
            square.setAttribute("id", "img-" + (i + 1));
            let randomColor = getRandomColor();
            square.style.backgroundColor = randomColor;
            element.appendChild(square);
            squares.push(square);
        })
    } else {
        squares.forEach((square) => {
            let randomColor = getRandomColor();
            square.style.backgroundColor = randomColor;
        })
    }
}

const addMinBet = () => {
    betAmount += 10;
    cashCounter += 10;
    cashOutput.innerText = cashCounter + "$";
    betOutput.innerText = betAmount + "$";
}
const addMaxBet = () => {
    betAmount += 100;
    cashCounter += 100;
    cashOutput.innerText = cashCounter + "$";
    betOutput.innerText = betAmount + "$";
}

const checkMatches = (numberOfMatches) => {
    if (numberOfMatches > 0) {
        spanResult.innerText = `Congratulations! You won with a total of ${numberOfMatches} matches.`
    } else {
        spanResult.innerText = "Sorry! You haven't won. You can spin again using Retry button.";
    }
}

const updateWinDisplay = (numberOfMatches) => {
    let winAmount = numberOfMatches * 100;
    winOutput.innerText = winAmount.toString() + "$";
}

const spin = () => {
    if(cashCounter <= 0) {
        alert('Out of cash, please deposit funds.');
        return
    }
    spinBtn.setAttribute("disabled", "");
    betOutput.innerText = betAmount + "$";
    sortColors();
    cashCounter -= 10;
    cashOutput.innerText = cashCounter + '$';
    
    // Checks for a match in row axis.
    for (let i = 0; i < squares.length; i++) {
        if (i === (squares.length - 12) || i === (squares.length - 7)) {
            i += 1;
            continue;
        } else if (i === (squares.length - 2)) {
            break;
        } else if (squares[i].style.backgroundColor === squares[(i+1)].style.backgroundColor && squares[i].style.backgroundColor === squares[(i+2)].style.backgroundColor){
            numberOfMatches++;
        } else {
            continue;
        }
    }
    // Checks for a match in the column axis.
    for (let i = 0; i < 5; i++) {
        if (squares[i].style.backgroundColor === squares[(i+5)].style.backgroundColor && squares[i].style.backgroundColor === squares[((i+5) + 5)].style.backgroundColor) {
            numberOfMatches++;
        }
    }
    checkMatches(numberOfMatches);
    updateWinDisplay(numberOfMatches);
}

const retry = () => {
    if(cashCounter <= 0) {
        alert('Out of cash, please deposit funds.');
        return
    }

    sortColors();
    cashCounter -= 10;
    cashOutput.innerText = cashCounter + '$';

    // Checks for a match in row axis.
    for (let i = 0; i < squares.length; i++) {
        if (i === (squares.length - 12) || i === (squares.length - 7)) {
            i += 1;
            continue;
        } else if (i === (squares.length - 2)) {
            break;
        } else if (squares[i].style.backgroundColor === squares[(i+1)].style.backgroundColor && squares[i].style.backgroundColor === squares[(i+2)].style.backgroundColor){
            numberOfMatches++;
        } else {
            continue;
        }
    }
    // Checks for a match in the column axis.
    for (let i = 0; i < 5; i++) {
        if (squares[i].style.backgroundColor === squares[(i+5)].style.backgroundColor && squares[i].style.backgroundColor === squares[((i+5) + 5)].style.backgroundColor) {
            numberOfMatches++;
        }
    }
    checkMatches(numberOfMatches);
    updateWinDisplay(numberOfMatches);
}

minBetBtn.addEventListener("click", addMinBet);
maxBetBtn.addEventListener("click", addMaxBet);
spinBtn.addEventListener("click", spin);
retryBtn.addEventListener("click", retry);
