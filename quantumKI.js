// Threat Fields collecting player's moves
let threatFields = [];

// Opportunity Fields collecting friendly moves
let opportunityFields = [];

// Calculated Map
let calculatedMap = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

// Index empty field with 2x"O" in a row
let urgentIndex;


function initiateQuantumKI() {
    if (matrixHasEmptyField()) {
        analyzeThreatFields();
        analyzeOpportunityFields();
        drawCalculatedMap();
        calculateNextMove();
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


function analyzeThreatFields() {
    for (let index = 0; index < matrix.length; index++) {
        if (matrix[index] == "X") {
            if (!threatFields.includes(index)) {
                let threat = index;
                threatFields.push(threat);
            }
        }
    }
}


function analyzeOpportunityFields() {
    for (let index = 0; index < matrix.length; index++) {
        if (matrix[index] == "O") {
            if (!opportunityFields.includes(index)) {
                let opportunity = index;
                opportunityFields.push(opportunity);
            }
        }
    }
}


function drawCalculatedMap() {
    for (let index = 0; index < threatFields.length; index++) {
        calculatedMap[threatFields[index]] = "X";
    }
    for (let index = 0; index < opportunityFields.length; index++) {
        calculatedMap[opportunityFields[index]] = "O";
    }
}


function calculateNextMove() {
    for (let index = 0; index < threatFields.length; index++) {
        if (threatFields[index] == 0) {
            calculateThreat([1, 3, 4]);
        }
        if (threatFields[index] == 1) {
            calculateThreat([0, 4, 2]);
        }
        if (threatFields[index] == 2) {
            calculateThreat([1, 4, 5]);
        }
        if (threatFields[index] == 3) {
            calculateThreat([0, 4, 6]);
        }
        if (threatFields[index] == 4) {
            calculateThreat([0, 1, 2, 3, 5, 6, 7, 8]);
        }
        if (threatFields[index] == 5) {
            calculateThreat([2, 4, 8]);
        }
        if (threatFields[index] == 6) {
            calculateThreat([3, 4, 7]);
        }
        if (threatFields[index] == 7) {
            calculateThreat([6, 4, 8]);
        }
        if (threatFields[index] == 8) {
            calculateThreat([7, 4, 5]);
        }
    }
    for (let index = 0; index < opportunityFields.length; index++) {
        if (opportunityFields[index] == 0) {
            calculateOpportunity([1, 3, 4]);
        }
        if (opportunityFields[index] == 1) {
            calculateOpportunity([0, 4, 2]);
        }
        if (opportunityFields[index] == 2) {
            calculateOpportunity([1, 4, 5]);
        }
        if (opportunityFields[index] == 3) {
            calculateOpportunity([0, 4, 6]);
        }
        if (opportunityFields[index] == 4) {
            calculateOpportunity([0, 1, 2, 3, 5, 6, 7, 8]);
        }
        if (opportunityFields[index] == 5) {
            calculateOpportunity([2, 4, 8]);
        }
        if (opportunityFields[index] == 6) {
            calculateOpportunity([3, 4, 7]);
        }
        if (opportunityFields[index] == 7) {
            calculateOpportunity([6, 4, 8]);
        }
        if (opportunityFields[index] == 8) {
            calculateOpportunity([7, 4, 5]);
        }
    }
}


function calculateThreat(fields) {
    for (let index = 0; index < fields.length; index++) {
        if (calculatedMap[fields[index]] != "X" & calculatedMap[fields[index]] != "O") {
            calculatedMap[fields[index]]++;
        }
    }
}


function calculateOpportunity(fields) {
    for (let index = 0; index < fields.length; index++) {
        if (calculatedMap[fields[index]] != "X" & calculatedMap[fields[index]] != "O") {
            calculatedMap[fields[index]] += 2;
        }
    }
}


function makeMove() {
    let max = 0;
    let field;
    if (matrix[4] == 0) {
        let higherGround = document.getElementById(idList[4]);
        matrix[4] = "O";
        higherGround.innerHTML = "O";
    } else if (twoFriendlyInRow()) {
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    } else if (twoThreatsInRow()) {
        alerti.play();
        let bestField = document.getElementById(idList[urgentIndex]);
        matrix[urgentIndex] = "O";
        bestField.innerHTML = "O";
    }
    else {
        for (let index = 0; index < calculatedMap.length; index++) {
            if (calculatedMap[index] > max) {
                max = calculatedMap[index];
                field = index;
            }
        }
        let bestField = document.getElementById(idList[field]);
        matrix[field] = "O";
        bestField.innerHTML = "O";
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