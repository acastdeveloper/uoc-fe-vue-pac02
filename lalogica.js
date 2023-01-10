const qN = 2; //quantitat de números a preguntar
const M = []; // Matriu de números introduïts
const Pr = []; // Matriu booleana de primers
const Pa = []; // Matriu booleana de parells
let a, b, x, m, numeros, suma;
let countN = 0;
let countD = 0;

// missatges
let msg1 = "Introdueix un número entre 1 i 50";
let msg1b = "Ara introdueix un altre número entre 1 i 50";
let msg2 = "";
let error = "Valor introduït incorrecte. Has d'introduïr un número entre 1 i 50.";

function reset() { //Funció resetejadora
    countN = 0;
    countD = 0;
    suma, m, numeros = null;
    msg2 = "";
    while (M.length > 0) { //buidar les matrius d'igual longitud
        M.pop();
        Pa.pop();
        Pr.pop();
    }
}

function v(n) { //Funció de validació
    if (isNaN(n) || n < 1 || n > 50) {
        return false;
    } else {
        return true;
    }
}

function r(m) { //Funció de lectura
    while (countN <= (qN - 1)) {
        if (m !== null) {
            m = countN == 0 ? msg1 : msg1b; // per no posar-me a anidar condicionals i per canviar el missatge si ja porta més d'un
        } else {
            m = msg1;
        }
        x = Number(prompt(m));
        if (v(x)) {
            M.push(x);
            countN++;
        } else {
            m = null;
            alert(error);
        }
    }
    return M;
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

function isPa(n) {
    return n > 2 && n % 2 == 0 ? true : false;
}

function isPm(n) {
    /* M'inspiro una mica en la criba d'Eratostenes, però no la faig del tot.  */

    if (is2(n)) { //Si és exactament 2 és primer
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
        if (isPm(element)) {
            console.log(element + " és primer");
            Pr.push(true);
        } else {
            console.log(element + " no és primer");
            Pr.push(false);
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
    // isPm();
    reset();
}

// Javascript no obstructiu
window.onload = function () {
    document.getElementById("start").onclick = start;
}
