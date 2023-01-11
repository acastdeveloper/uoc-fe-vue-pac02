/* ****** S E T T I N G S ****** */
const qN = 2; //quantitat de números a preguntar
const rMin = 1; // Rang mínim
const rMax = 50; // Rang màxim
/* ****** E N D - S E T T I N G S ****** */

/* ****** V A R I A B L E S ****** */
// global scope
let x; // variable de recollida prompt
let suma; // suma de valors introduïts
let lM; // longitud de M

//arrays
const M = []; // matriu on s'emmagatzemen els valors introduïts per prompt
let subPriM = []; // submatriu amb els primers d'M
let subNoPriM = []; // submatriu de no primers d'M
let subParM = []; //submatriu amb els elements parells d'M
let subNoParM = []; // submatriu de no parells d'M

// counters
let countP; // comptador de prompts i cursor d'M
let countD; // comptador de divisors imparells superiors a 3 fins arribar a n

// prompt messages
let pMsg1 = `Si us plau. Introdueix un nombre sencer entre ${rMin} i ${rMax}.`;
let pMsg2 = `Molt bé. I ara un altre nombre sencer entre ${rMin} i ${rMax}.`;

// alert error messages
let error1 = `No has escrit un nombre sencer entre ${rMin} i ${rMax}.\n`;

// output messages
let msg1 = ""; // Exercici 1
let msg2 = ""; // Exercici 2
let msg3 = ""; // Exercici 3
let msg4 = ""; // Exercici 4
let msg5 = ""; // Exercici 5
let msg6 = ""; // Exercici 6

/* ****** E N D - V A R I A B L E S ****** */

/* ****** F U N C T I O N S ****** */
/* -   - R E S E T -   - */
function reset() {
    console.clear();
    countP = 0;
    countD = 0;
    while (M.length > 0) {
        M.pop();
        // Aprofitem per buidar les següents encara que tinguin length inferior
        subPriM.pop();
        subNoPriM.pop();
        subParM.pop();
        subNoParM.pop();
    }
}

/* -   - I N P U T -   - */
function r(m = pMsg1) { // obté valor, "read"
    while (countP < qN) {
        m = countP < 1 ? pMsg1 : pMsg2
        x = Number(prompt(m));
        if (v(x)) {
            iM(x);
            countP++; //Si valida avença
        } else {
            m = pMsg1; // Si no valida mostra el primer missatge
        }
    }
}

function v(n) { // verifica valor
    let isInt = (n == parseInt(n)) ? true : false;
    let isMenor = n < rMin;
    let isMajor = n > rMax;
    if (isNaN(n) || !isInt || isMenor || isMajor) {
        oError(error1);
        return false;
    } else {
        return true;
    }
}

function iM(n) { // introdueix valor a M
    M[countP] = n;
}

/* -   - P R O C E S S -   - */
function isPar(n) { // verifica si n és parell
    return (n % 2 == 0) ? true : false;
}

function isPri(n) { // verifica si és primer
    if (n == 1 || (n != 2 && isPar(n))) {
        return false;
    } // no
    else if (n == 2) {
        return true;
    } // sí
    else {
        for (i = 3; i < n; i = i + 2) { // verifica si troba algun divisor senar des de 3 fins arribar a ell només (els superiors no podrien ser divisors)
            if (n % i == 0) {
                countD++;
            }
        }
        return countD == 0 ? true : false; // Si no troba divisors serà primer, si en troba llavors no
    }
}

function sumar(n) { // suma
    suma = eval(M.join("+"));
}

function analitzar(n) { // Analitza la matriu
    lM = M.length;
    subPriM = M.filter(element => isPri(element)); // submatriu de primers
    subNoPriM = M.filter(element => !isPri(element)); // submatriu de no primers
    subParM = M.filter(element => isPar(element)); // submatriu de parells
    subNoParM = M.filter(element => !isPar(element)); // submatriu de senars
}

function p() { // Funció directriu de processos
    sumar(M);
    analitzar(M);
}

/* -   - O U T P U T -   - */
function oError(e) { // Mostra l'error que li passem per paràmetre
    alert(e);
}

function compMsgs() { // Composició de missatges d'Output
    // Exercici 1
    msg1 = `La suma és: ${suma}. \n`;

    // Exercici 2
    if (subPriM.length == lM) { msg2 = ``; }



    // Sortida per consola
    console.log(msg1);
}

/* ***** E N D - F U N C T I O N S ***** */




/* ****** M A I N ****** */
function main() {
    reset();
    r();
    p();
    // visorDEV();
    compMsgs();
}
/* ****** E N D - M A I N ***** */

/* ***** I N T E R A C T I V I T A T ***** */
window.onload = function () {
    document.getElementById("start").onclick = main;
}
















/* -   - D E V - T E S T S -   - */
function visorDEV() {
    console.log("x: " + x);
    console.log("Matriu: " + M);
    console.log("Suma: " + suma);
    console.log("Matriu Primers: ", subPriM);
    console.log("Matriu No Primers: ", subNoPriM);
}
