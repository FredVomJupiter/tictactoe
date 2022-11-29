let matrix = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

let idList = [
    "topLeft", "topMiddle", "topRight",
    "midLeft", "midMiddle", "midRight",
    "lowLeft", "lowMiddle", "lowRight"
]

let playerTurn = true;

// counts the number of turns the player has finished
let counter = 0;

// Sounds
const sensor = new Audio("sounds/sensor.mp3");
const alerti = new Audio("sounds/alert.mp3");
const click = new Audio("sounds/click.mp3");
const computer = new Audio("sounds/computer.mp3");
const transmission = new Audio("sounds/transmission.mp3");
const borg = new Audio("sounds/borg.mp3");


function start() {
    message('player turn');
}


function action(id, field) {
    counter++;
    if (playerTurn) {
        click.play();
        if (matrix[field] == 0) {
            updateField(id, field);
            if (checkWinner()) {
                removeOnclick();
            } else {
                computersTurn();
            }
        } else {
            createSpecialEffects(id);
        }
    }
}


function updateField(id, field) {
    let element = document.getElementById(id);
    matrix[field] = "X";
    element.innerHTML = "X";
}


function checkWinner() {
    if (playerWins()) {
        message('player wins');
        return true;
    }
    else if (computerWins()) {
        message('computer wins');
        transmission.play();
        setTimeout(function() {borg.play()}, 2000);
        return true;
    }
    else if (!matrix.includes(0)) {
        message('draw');
        return true;
    } else {
        return false;
    }
}


function playerWins() {
    if (matrix[0] == "X" & matrix[1] == "X" & matrix[2] == "X") {
        return true;
    } else if (matrix[3] == "X" & matrix[4] == "X" & matrix[5] == "X") {
        return true;
    } else if (matrix[6] == "X" & matrix[7] == "X" & matrix[8] == "X") {
        return true;
    } else if (matrix[0] == "X" & matrix[3] == "X" & matrix[6] == "X") {
        return true;
    } else if (matrix[1] == "X" & matrix[4] == "X" & matrix[7] == "X") {
        return true;
    } else if (matrix[2] == "X" & matrix[5] == "X" & matrix[8] == "X") {
        return true;
    } else if (matrix[0] == "X" & matrix[4] == "X" & matrix[8] == "X") {
        return true;
    } else if (matrix[2] == "X" & matrix[4] == "X" & matrix[6] == "X") {
        return true;
    } else {
        return false;
    }
}


function computerWins() {
    if (matrix[0] == "O" & matrix[1] == "O" & matrix[2] == "O") {
        return true;
    } else if (matrix[3] == "O" & matrix[4] == "O" & matrix[5] == "O") {
        return true;
    } else if (matrix[6] == "O" & matrix[7] == "O" & matrix[8] == "O") {
        return true;
    } else if (matrix[0] == "O" & matrix[3] == "O" & matrix[6] == "O") {
        return true;
    } else if (matrix[1] == "O" & matrix[4] == "O" & matrix[7] == "O") {
        return true;
    } else if (matrix[2] == "O" & matrix[5] == "O" & matrix[8] == "O") {
        return true;
    } else if (matrix[0] == "O" & matrix[4] == "O" & matrix[8] == "O") {
        return true;
    } else if (matrix[2] == "O" & matrix[4] == "O" & matrix[6] == "O") {
        return true;
    } else {
        return false;
    }
}


function computersTurn() {
    playerTurn = false;
    message('computer turn');
    setTimeout(function () {sensor.play()}, 500);
    setTimeout(function () {
        computer.play();
        initiateQuantumKI();
        if (checkWinner()) {
            removeOnclick();
        } else {
            message('player turn');
            playerTurn = true;
        }
    }, 2000);
}


function message(option) {
    let message = document.getElementById('message');
    message.innerHTML = '';
    if (option == 'computer turn') {
        message.innerHTML = 'Initalisiere Quantum K.I.';
    }
    if (option == 'player turn') {
        message.innerHTML = 'Du bist am Zug!';
    }
    if (option == 'player wins') {
        message.innerHTML = 'DU HAST GEWONNEN!!!';
    }
    if (option == 'computer wins') {
        message.innerHTML = 'Widerstand ist zwecklos...';
    }
    if (option == 'draw') {
        message.innerHTML = 'Unentschieden';
    }
}


function createSpecialEffects(id) {
    element = document.getElementById(id);
    element.classList.add('effect');
    setTimeout(function () {
        element.classList.remove('effect');
    }, 500);
}


function restart() {
    counter = 0;
    location.reload(); 
}


function removeOnclick() {
    for (let index = 0; index < idList.length; index++) {
        let element = document.getElementById(idList[index]);
        element.onmousedown = null;
    }
}