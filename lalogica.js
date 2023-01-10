// SETTINGS INICIALS
const qN = 2;  //quantitat de números a preguntar
const rMin = 1; // Rang mínim
const rMax = 50; // Rang màxim

// DECLARACIÓ DE VARIABLES PER COL·LOCAR L'SCOPE
let x, numeros, suma;

// MISSATGES
let msg1 = "Introdueix un número entre " + rMin + " i " + rMax;
let msg1b = "Ara introdueix un altre número entre  " + rMin + " i " + rMax;
let msg2 = "";
let error = "Valor introduït incorrecte. Has d'introduïr un número entre 1 i 50.";

// MATRIUS
const M = [];  // Matriu de números introduïts
const Pa = []; // Matriu booleana de parells (amb 1 i 0)
const Pr = []; // Matriu booleana de primers (amb 1 i 0)

// COMPTADORS i ÍNDEX
let countN = 0; // Comptador de Números introduits
let countD = 0; // Comptador de divisors
let iM = 0;    // Índex de la matriu de números
let iPa = 0;   // Índex de lamatriu de parells
let iPr = 0;   // Índex de la matriu de primers

function reset() { //Funció resetejadora
    //VALORS INICIALS
    countN = 0;
    countD = 0;
    iM = 0;    // Índex de la matriu de números
    iPr = 0;   // Índex de la matriu de primers
    iPa = 0;   // Índex de lamatriu de parells
    msg2 = "";

    // ELIMINACIÓ DE VALORS DE VARIABLES
    suma, numeros = null;

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
        }  // ... i en aquest cas no avancem el comptador de números introduïts que controla el bucle

    }
    // return M;
    // retorna la matriu de números introduïts
}

function sumar() { //Funció sumatòria
    numeros = M.join("+");
    suma = eval(numeros);
    msg2 = "La suma de " + M.join(" + ") + " és: " + suma + ".";
    return suma;
}

function is1(n) {
    return n == 1 ? true : false;
}

function is2(n) {
    return n == 2 ? true : false;
}

function is3(n) {
    return n == 3 ? true : false;
}

function isPa(n) { // Funcionalitat si és parell superior a 2
    return n > 2 && n % 2 == 0 ? true : false;
}

function isPm(n) {

    if (is2(n) || is3(n)) { //Si és exactament 2 és primer
        return true;
    } else if (is1(n) || isPa(n)) { //Si és parell o 1 no és primer
        Pa.push(n);
        return false;
    } else {
        for (i = 3; i < n; i = i + 2) {
            /* Comprovo només els imparells des del 3 fins arribar a un número anterior al nostre.
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

function test() {
    M.forEach(element => {
        /* Comprova si és parell o no */
        if (isPa(element)) {
            Pa.push(1);
        } else {
            Pa.push(0);
        }

        /* Comprova si és primer o no */
        if (isPm(element)) {
            console.log(element + " és primer");
            Pr.push(1);
        } else {
            console.log(element + " no és primer");
            Pr.push(0);
        }
        countD = 0; //resetejo el comptador de divisors pel següent número
    });
}

// Funció directriu
function start() {
    r();
    sumar();
    // console.log(M, suma, numeros, msg2);
    test();
    console.log(Pr);
    console.log(Pa);
    // isPm();
    reset();
}

// Javascript no obstructiu
window.onload = function () {
    document.getElementById("start").onclick = start;
}
