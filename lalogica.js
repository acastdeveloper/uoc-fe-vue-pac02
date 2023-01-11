/* * * *  V A R I A B L E S * * * */
/* Declarades o inicialitzades aquí per ser accedides des de qualsevol lloc de l'arxiu. (Scope global) */
let x, stringSum, stringM, suma, startM, endM;

// Settings inicials
const qN = 2; //quantitat de números a preguntar
const rMin = 1; // Rang mínim
const rMax = 50; // Rang màxim

// Matrius
const M = []; // Matriu de números introduïts
const Pa = []; // Matriu booleana de parells (amb 1 i 0)
const Pr = []; // Matriu booleana de primers (amb 1 i 0)

// Comptadors i cursors
let countN = 0; // Comptador de Números introduits
let countD = 0; // Comptador de divisors
let iM = 0; // Índex de la matriu de números
let iPa = 0; // Índex de lamatriu de parells
let iPr = 0; // Índex de la matriu de primers

// Missatges d'Interfície
let msg1 = "Introdueix un número entre " + rMin + " i " + rMax;
let msg1b = "Ara introdueix un altre número entre  " + rMin + " i " + rMax;
let error = "Valor introduït incorrecte. Has d'introduïr un número entre 1 i 50.";

// Missatges de Sortida
let msg2 = ""; // Per a la suma: Exercici 1
let msg3a, msg3b = ""; // Per a la "primorositat: Exercici 2"
let msg3 = ""; // Per la "primorositat": Exercici 2
let msg4a, msg4b = ""; // Per a la "primorositat: Exercici 2"
let msg4 = ""; // Per la "paritat": Exercici 3
let msg5 = ""; // Per als Exercicis 4, 5 I 6
/* * * * * FI VARIABLES * * *  */


/* * * * F U N C I O N S * * * */
function reset() { //Funció resetejadora
    //VALORS INICIALS
    countN = 0;
    countD = 0;
    iM = 0; // Índex de la matriu de números
    iPa = 0; // Índex de lamatriu de parells
    iPr = 0; // Índex de la matriu de primers
    msg2 = "";
    // ELIMINACIÓ DE VALORS DE VARIABLES
    suma, stringSum = null;
    // BUIDATGE DE MATRIUS M, Pa i Pr
    while (M.length > 0) { //buidar les matrius d'ús, que a més són d'igual longitud
        M.pop();
        Pa.pop();
        Pr.pop();
    }
}

// VALIDACIÓ DE VALORS INTRODUÏTS
function v(n) { //Ha de ser numèric i estar en el rang de rMin a rMax.
    if (isNaN(n) || n < rMin || n > rMax) {
        return false;
    } else {
        return true;
    }
}

// INTRODUCCIÓ DE VALORS
function r(m) { //Funció de lectura
    while (countN <= (qN - 1)) { // Mentre no introdueixi més números dels establerts amb qN

        if (m !== null) { // Si li passo un missatge d'argument
            m = countN == 0 ? msg1 : msg1b; // escollirà el missatge msg1 la primera vegada i el missatge msg1b les següents
        } else {
            m = msg1; // Si NO li passo un missatge com a argument llavors escollirà msg1
        }

        x = Number(prompt(m));
        /* És la variable on emmagatzemem el valor introduït amb el prompt.
        Li posso number per passar-ho a número ja que prompt fabrica una variable de tipus string */


        if (v(x)) { // Si el valor introduït és validat
            M.push(x); // ... s'afegirà al final de la matriu
            countN++; // ... i afegim una unitat al comptador de valors introduïts
        } else { // Però si el valor introduït no és validat
            m = null; // ... llavors esborrem el missatge
            alert(error); // ... i mostrem amb un alert l'error amb el missatge de la variable error
        } // ... i en aquest cas no avancem el comptador de números introduïts que controla el bucle
        /* Exercici 7 */

    }
}

// QUASI-CRIBA D'ERATOSTENES PER COMPROVAR SI UN NÚMERO ÉS PRIMER
// Funcions preliminars
function is1(n) { // Comprova si el número és 1
    return n == 1 ? true : false;
}

function is2o3(n) { // Comprova si el número és 2 o 3
    return (n == 2 || n == 3) ? true : false;
}

function isPa(n) { // Comprova si el número és parell per números superiors o iguals a 2
    if (n >= 2 && n % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

function isPr(n) { // Comprova si el número és primer

    if (is2o3(n)) { //Si és 2, o bé 3 ...
        return true; // llavors segur que és primer, per tant fem un return true. En retornar valor s'atura la funció i no segueix avaluant.
    } else if (is1(n) || isPa(n)) { // Si és 1 o és parell, sense ser 2, ...
        return false; // ... llavors NO és primer, i li fem return false. En retornar un valor s'atura la funció i no segueix avaluant
    } else { // Si no és 1, 2, 3 o parell ...
        for (i = 3; i <= n; i = i + 2) {
            /* Avalua els números imparells entre 3 i el nostre número.
            D'aquesta manera faig un bucle el més curt possible
            */
            if (n % i == 0) {
                countD = 1;
                return false;
                /* Només que trobi un divisor (en aquest rang de 3 fins un número abans del nostre) ja no és primer.
                No cal seguir ja amb el bucle i l'aturem amb return false */
            }
            return countD == 0 ? true : false;
        }
    }
}

function investigar() {
    M.forEach(element => {
        /* Comprova si és parell o no */
        if (isPa(element)) {
            console.log(element + " és parell");
            Pa[iPa] = 1;
        } else {
            console.log(element + " és senar");
            Pa[iPa] = 0;
        }
        iPa++;

        /* Comprova si és primer o no */
        if (isPr(element)) {
            console.log(element + " és primer");
            Pr[iPr] = 1;
        } else {
            console.log(element + " no és primer");
            Pr[iPr] = 0;
        }
        iPr++;
        countD = 0; //resetejo el comptador de divisors pel següent número
    });
}
/* * * * * * * * * * * * * * * * */


/* * * * * O U T P U T * * * *  */
// Funcions per el·laborar missatges de sortida

function sumar() {
    /* Exercici 1 */
    stringSum = M.join("+"); // En forma d'string emmagatzemo la operació matemàtica + dels números emmagatzemats a M
    suma = eval(stringSum); // Amb la funció eval realitzo la operació matemàtica definida com a string a stringSum
    msg2 = "La suma de " + M.join(" + ") + " és: " + suma + "."; // Defineixo el missatge msg2
    return suma;
}

function outPrimorositat() {
    /* Exercici 2 */
    const subPr = M.filter(element => (isPr(element))); // Primers
    const subPrUniq = [...new Set(subPr)]; // Primers únics

    const subPrN = M.filter(element => (!isPr(element))); // No Primers
    const subPrUniqN = [...new Set(subPrN)]; // No Primers Unics

    let totalitat = subPrUniq.length == M.length ? true : false;
    let totalitatN = subPrUniqN.length == M.length ? true : false;
    let plural = subPrUniq.length > 1 ? true : false;
    let pluralN = subPrUniqN.length > 1 ? true : false;
    let cap = subPrUniq.length == 0 ? true : false;
    msg3a = cap == true ? `Cap dels números que has introduït (${M.join(' i ')}) és primer.` : totalitat == true ? `Tots els números que has introduït (${subPrUniq.join(" i ")}) són primers.` : plural == false ? `Només ${subPrUniq.toString()} és primer.` : `Els números que has introduït (${subPrUniq.join(" i ")}) són primers.`;
    msg3b = pluralN == false ? ` El número que has introduït (${subPrUniqN.toString()}) no és primer.` : totalitatN == false ? ` I dels números següents que has introduït (${subPrUniqN.join(" i ")}) cap és primer.` : ``;
    msg3 = msg3a + msg3b;
}

function outParitat() {
    /* Exercici 2 */
    const subPa = M.filter(element => (isPa(element))); // Primers
    const subPaUniq = [...new Set(subPa)]; // Primers únics

    const subPaN = M.filter(element => (!isPa(element))); // No Primers
    const subPaUniqN = [...new Set(subPaN)]; // No Primers Unics

    let totalitat = subPaUniq.length == M.length ? true : false;
    let totalitatN = subPaUniqN.length == M.length ? true : false;
    let plural = subPaUniq.length > 1 ? true : false;
    let pluralN = subPaUniqN.length > 1 ? true : false;
    let cap = subPaUniq.length == 0 ? true : false;
    msg4a = cap == true ? `Cap dels números que has introduït (${M.join(' i ')}) és parell.` : totalitat == true ? `Tots els números que has introduït (${subPaUniq.join(" i ")}) són parells.` : plural == false ? `Només ${subPaUniq.toString()} és parell.` : `Els números que has introduït (${subPaUniq.join(" i ")}) són parells.`;
    msg4b = pluralN == false ? ` El número que has introduït (${subPaUniqN.toString()}) és senar.` : totalitatN == false ? ` I dels números següents que has introduït (${subPaUniqN.join(" i ")}) són senars.` : ``;
    msg4 = msg4a + msg4b;
}

function ascensParell(m, n) {

}

function descensSenar(m, n) { }

function equs(m) { }

function outUpDown() {
    startM = M[0];
    endM = M[(M.length - 1)];
    console.log(startM, endM);
    if (startM < endM) {
        ascensParell(startM, endM)
    } else if (startM > endM) {
        descensSenar(startM, endM)
    } else {
        equs(startM)
    }
}


// Funció directriu
function start() {
    reset();
    r();
    investigar();
    sumar();
    outPrimorositat();
    outParitat();
    outUpDown()

    // Primer Exercici
    console.log("Exercici 1: " + msg2);
    console.log("Exercici 2: " + msg3);
    console.log("Exercici 3: " + msg4);
    // console.log("Matriu Parells: " + Pa);
    // console.log("Matriu Primers: " + Pr);
}

// Javascript no obstructiu
window.onload = function () {
    document.getElementById("start").onclick = start;
}
