/* ****** S E T T I N G S ****** */
const qN = 2; //quantitat de números a preguntar
const rMin = 1; // Rang mínim
const rMax = 50; // Rang màxim



/* ****** V A R I A B L E S ****** */
// global scope
let x; // variable de recollida prompt
let suma; // suma de valors introduïts
let lM; // longitud d'M
let sM; // primer element d'M
let eM; // darrer element d'M
let inf; // element més petit d'M
let sup; // element més gran d'M
let direcc; // direcció per representar resultats d'exercici 4, 5 i 6

//arrays
const M = []; // matriu on s'emmagatzemen els valors introduïts per prompt
let subPriM = []; // submatriu amb els primers d'M
let subNoPriM = []; // submatriu de no primers d'M
let subParM = []; //submatriu amb els elements parells d'M
let subNoParM = []; // submatriu de no parells d'M
// arrays de rangs
const rangM = []; // matriu rang
let invRangM = []; // matriu de rang inversa
let rangMPar = []; // Submatriu ascendent de parells de rangMar
let invRangMSen = []; // Submatriu descendent de senars d'invRangMar

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
let msgTotal = ""; // Missatge complert



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

    while (rangM.length > 0) {
        rangM.pop();
        invRangM.pop();
        rangMPar.pop();
        invRangMSen.pop();
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

function analitzar(n) { // Analitza la matriu M i els seus elements
    lM = M.length;

    // N'extreu submatrius
    subPriM = M.filter(element => isPri(element)); // submatriu de primers
    subNoPriM = M.filter(element => !isPri(element)); // submatriu de no primers
    subParM = M.filter(element => isPar(element)); // submatriu de parells
    subNoParM = M.filter(element => !isPar(element)); // submatriu de senars

    // Troba cotes
    sM = M[0]; // Primer número introduït
    eM = M[(lM - 1)]; // Darrer número intruduït
    direcc = (sM == eM) ? "equal" : (sM < eM) ? "up" : "down";
    inf = Math.min(...M);
    sup = Math.max(...M);

    // Matrius rangM i invRangM
    for (a = inf; a <= sup; a++) { rangM.push(a); }
    invRangM = [...rangM].reverse();

    rangMPar = rangM.filter(element => (element % 2 == 0));
    invRangMSen = invRangM.filter(element => (element % 2 != 0));
}

function p() { // Funció directriu de processos
    sumar(M);
    analitzar(M);
}

/* -   - O U T P U T -   - */
function oError(e) { // Mostra l'error que li passem per paràmetre
    //Exercici 7
    alert(e);
}

function compMsgs() { // Composició de missatges d'Output
    // Exercici 1
    msg1 = `La suma és: ${suma}.`;

    // Exercici 2
    let msg2a = " ";
    let msg2b = " ";
    if (subPriM.length == lM) { msg2a = `Tots els nombres introduïts [${subPriM}] són primers.`; }
    else if (subPriM.length == 0) { msg2a = `Cap dels nombres introduïts és primer`; }
    else if (subPriM.length == 1) { msg2a = `El nombre [${subPriM}] és primer`; }
    else { msg2a = `Els nombres [${subPriM}] són primers`; }

    if (subNoPriM.length == 1) { msg2b = ` i el nombre [${subNoPriM}] no és primer.`; }
    else if (subNoPriM.length > 1 && subPriM.length !== 0) { msg2b = ` i els nombres [${subNoPriM}] no són primers.`; }
    msg2 = msg2a + msg2b;

    // Exercici 3
    let msg3a = " ";
    let msg3b = " ";
    if (subParM.length == lM) { msg3a = `Tots els nombres introduïts [${subParM}] són parells.`; }
    else if (subParM.length == 0) { msg3a = `Cap dels nombres introduïts és parell`; }
    else if (subParM.length == 1) { msg3a = `El nombre [${subParM}] és parell`; }
    else { msg3a = `Els nombres [${subParM}] són parells`; }

    if (subNoParM.length == 1) { msg3b = ` i el nombre [${subNoParM}] és senar.`; }
    else if (subNoParM.length > 1 && subParM.length !== 0) { msg3b = ` i els nombres [${subNoParM}] són senars.`; }
    msg3 = msg3a + msg3b;

    // Exercicis 4, 5 i 6
    msg4 = direcc == "equal" ? inf : direcc == "up" ? rangMPar : invRangMSen;

    msgTotal = `Has introduït: ${M}
    [Exercici 1] ${msg1}
    [Exercici 2] ${msg2}
    [Exercici 3] ${msg3}
    [Exercici 4, 5 i 6] ${msg4}
    `;
}

function oAlert() {
    alert(msgTotal);
}

/* -   - M A I N -   - */
function main() { //Funció d'entrada
    reset();
    r();
    p();
    compMsgs();
    oAlert();
    visorDEV();
}

/* -   - D E V - T E S T S -   - */
function visorDEV() {
    //    Sortida per consola
    console.log(`Has introduït: ${M}`);
    console.log("[Exercici 1]: " + msg1);
    console.log("[Exercici 2]: " + msg2);
    console.log("[Exercici 3]: " + msg3);


    console.log("[Exercicis 4, 5 i 6]: " + msg4);
    console.log("x: " + x);
    console.log("Matriu: " + M);
    console.log("Suma: " + suma);
    console.log("Matriu Primers: ", subPriM);
    console.log("Matriu No Primers: ", subNoPriM);
    console.log(sM, eM, inf, sup);

    // Per comprovar que es resetegen
    console.log("Matriu números introduïts: ", M);
    console.log("Matriu rang: ", rangM);
    console.log("Matriu rang inversa: ", invRangM);
    console.log("Matriu rang inversa: ", invRangM);
    console.log("Matriu rang parells", rangMPar);
    console.log("Matriu rang inversa senars", invRangMSen);
}



/* ***** I N T E R A C T I V I T A T ***** */
// window.onload = function () {
//     document.getElementById("start").onclick = main;
// }

const button = document.querySelector("#start");
button.addEventListener("click", main, true);
