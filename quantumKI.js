// Index empty field with 2x"O" in a row
let urgentIndex;


function initiateQuantumKI() {
    if (matrixHasEmptyField()) {
        makeMove();
    } else {
        message('draw');
    }
}


function matrixHasEmptyField() {
    if (matrix.includes(0)) {
        return true;
    } else {
        return false;
    }
}


function makeMove() {
    if ((matrix[0] == "X" || matrix[2] == "X" || matrix[6] == "X" || matrix[8] == "X")& counter == 1) {
        urgentIndex = 4;
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    } else if (matrix[4] == "X" & counter == 1) {
        urgentIndex = 2;
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    } else if (matrix[4] == 0 & counter == 1) {
        urgentIndex = 4;
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    } else if (twoFriendlyInRow()) {
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    } else if (twoThreatsInRow()) {
        alerti.play();
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    } else if (matrix[6] == "X" & counter == 2) {
        urgentIndex = 8;
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    }
    else {
        let randomField = Math.floor(Math.random() * 9);
        if (matrix[randomField] != 0) {
            makeMove();
        } else {
            let move = document.getElementById(idList[randomField]);
            matrix[randomField] = "O";
            move.innerHTML = "O";
        }   
    }
}

/**
 * Checking if a winning field for computer exists: 9 horizontal, 9 vertical and 6 diagonal = 24 total combinations.
 * @returns true if two neigbouring fields in a straight line contain "O" else false
 */
function twoFriendlyInRow() {
    // 9 horizontal combinations:
    if (matrix[0] == "O" & matrix[1] == "O" & matrix[2] == 0) {
        urgentIndex = 2;
        return true;
    }
    if (matrix[3] == "O" & matrix[4] == "O" & matrix[5] == 0) {
        urgentIndex = 5;
        return true;
    }
    if (matrix[6] == "O" & matrix[7] == "O" & matrix[8] == 0) {
        urgentIndex = 8;
        return true;
    }
    if (matrix[1] == "O" & matrix[2] == "O" & matrix[0] == 0) {
        urgentIndex = 0;
        return true;
    }
    if (matrix[4] == "O" & matrix[5] == "O" & matrix[3] == 0) {
        urgentIndex = 3;
        return true;
    }
    if (matrix[7] == "O" & matrix[8] == "O" & matrix[6] == 0) {
        urgentIndex = 6;
        return true;
    }
    if (matrix[0] == "O" & matrix[2] == "O" & matrix[1] == 0) {
        urgentIndex = 1;
        return true;
    }
    if (matrix[3] == "O" & matrix[5] == "O" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
    if (matrix[6] == "O" & matrix[8] == "O" & matrix[7] == 0) {
        urgentIndex = 7;
        return true;
    }
    // 9 vertical combinations
    if (matrix[0] == "O" & matrix[3] == "O" & matrix[6] == 0) {
        urgentIndex = 6;
        return true;
    }
    if (matrix[1] == "O" & matrix[4] == "O" & matrix[7] == 0) {
        urgentIndex = 7;
        return true;
    }
    if (matrix[2] == "O" & matrix[5] == "O" & matrix[8] == 0) {
        urgentIndex = 8;
        return true;
    }
    if (matrix[6] == "O" & matrix[3] == "O" & matrix[0] == 0) {
        urgentIndex = 0;
        return true;
    }
    if (matrix[7] == "O" & matrix[4] == "O" & matrix[1] == 0) {
        urgentIndex = 1;
        return true;
    }
    if (matrix[8] == "O" & matrix[5] == "O" & matrix[2] == 0) {
        urgentIndex = 2;
        return true;
    }
    if (matrix[0] == "O" & matrix[6] == "O" & matrix[3] == 0) {
        urgentIndex = 3;
        return true;
    }
    if (matrix[1] == "O" & matrix[7] == "O" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
    if (matrix[2] == "O" & matrix[8] == "O" & matrix[5] == 0) {
        urgentIndex = 5;
        return true;
    }
    // 6 diagonal combinations
    if (matrix[0] == "O" & matrix[4] == "O" & matrix[8] == 0) {
        urgentIndex = 8;
        return true;
    }
    if (matrix[8] == "O" & matrix[4] == "O" & matrix[0] == 0) {
        urgentIndex = 0;
        return true;
    }
    if (matrix[6] == "O" & matrix[4] == "O" & matrix[2] == 0) {
        urgentIndex = 2;
        return true;
    }
    if (matrix[2] == "O" & matrix[4] == "O" & matrix[6] == 0) {
        urgentIndex = 6;
        return true;
    }
    if (matrix[6] == "O" & matrix[2] == "O" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
    if (matrix[0] == "O" & matrix[8] == "O" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
}


/**
 * Checking if a loosing field for computer exists: 9 horizontal, 9 vertical and 6 diagonal = 24 total combinations.
 * @returns true if two neigbouring fields in a straight line contain "X" else false
 */
 function twoThreatsInRow() {
    // 9 horizontal combinations:
    if (matrix[0] == "X" & matrix[1] == "X" & matrix[2] == 0) {
        urgentIndex = 2;
        return true;
    }
    if (matrix[3] == "X" & matrix[4] == "X" & matrix[5] == 0) {
        urgentIndex = 5;
        return true;
    }
    if (matrix[6] == "X" & matrix[7] == "X" & matrix[8] == 0) {
        urgentIndex = 8;
        return true;
    }
    if (matrix[1] == "X" & matrix[2] == "X" & matrix[0] == 0) {
        urgentIndex = 0;
        return true;
    }
    if (matrix[4] == "X" & matrix[5] == "X" & matrix[3] == 0) {
        urgentIndex = 3;
        return true;
    }
    if (matrix[7] == "X" & matrix[8] == "X" & matrix[6] == 0) {
        urgentIndex = 6;
        return true;
    }
    if (matrix[0] == "X" & matrix[2] == "X" & matrix[1] == 0) {
        urgentIndex = 1;
        return true;
    }
    if (matrix[3] == "X" & matrix[5] == "X" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
    if (matrix[6] == "X" & matrix[8] == "X" & matrix[7] == 0) {
        urgentIndex = 7;
        return true;
    }
    // 9 vertical combinations
    if (matrix[0] == "X" & matrix[3] == "X" & matrix[6] == 0) {
        urgentIndex = 6;
        return true;
    }
    if (matrix[1] == "X" & matrix[4] == "X" & matrix[7] == 0) {
        urgentIndex = 7;
        return true;
    }
    if (matrix[2] == "X" & matrix[5] == "X" & matrix[8] == 0) {
        urgentIndex = 8;
        return true;
    }
    if (matrix[6] == "X" & matrix[3] == "X" & matrix[0] == 0) {
        urgentIndex = 0;
        return true;
    }
    if (matrix[7] == "X" & matrix[4] == "X" & matrix[1] == 0) {
        urgentIndex = 1;
        return true;
    }
    if (matrix[8] == "X" & matrix[5] == "X" & matrix[2] == 0) {
        urgentIndex = 2;
        return true;
    }
    if (matrix[0] == "X" & matrix[6] == "X" & matrix[3] == 0) {
        urgentIndex = 3;
        return true;
    }
    if (matrix[1] == "X" & matrix[7] == "X" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
    if (matrix[2] == "X" & matrix[8] == "X" & matrix[5] == 0) {
        urgentIndex = 5;
        return true;
    }
    // 6 diagonal combinations
    if (matrix[0] == "X" & matrix[4] == "X" & matrix[8] == 0) {
        urgentIndex = 8;
        return true;
    }
    if (matrix[8] == "X" & matrix[4] == "X" & matrix[0] == 0) {
        urgentIndex = 0;
        return true;
    }
    if (matrix[6] == "X" & matrix[4] == "X" & matrix[2] == 0) {
        urgentIndex = 2;
        return true;
    }
    if (matrix[2] == "X" & matrix[4] == "X" & matrix[6] == 0) {
        urgentIndex = 6;
        return true;
    }
    if (matrix[6] == "X" & matrix[2] == "X" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
    if (matrix[0] == "X" & matrix[8] == "X" & matrix[4] == 0) {
        urgentIndex = 4;
        return true;
    }
}