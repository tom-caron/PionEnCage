"use strict";

//réglage jeu
let dimension = 8
let temps = 1000      //temps en miliseconde (1000 = 1s)

//créer le pion
let logoJS = document.createElement('img');
logoJS.src = 'images/logoJS.png';

//créer le bonus
let bonus = document.createElement('img');
bonus.src = 'images/bonus.png';

//créer le pion bravo
let bravo = document.createElement('img');
bravo.src = 'images/bravo.png';

//créer un tableau
let table = document.createElement('table');

//création du damier
let d = dimension;

for (let x = 0; x < d; x++){

    let tr = table.insertRow();

    for ( let y = 0; y < d; y++){

        let td = tr.insertCell();
    }
}
    //afficher tableau
out.appendChild(table);

    //on positionne le pion
positionner(logoJS)

var i;
var j;
//méthode setInterval() compte à rebours
let itv = setInterval(() => {
    let x = Math.floor(Math.random() * d);
    let y = Math.floor(Math.random() * d);
    table.rows[x].cells[y].appendChild(bonus);
    

    i = x;
    j = y;
    

}, temps);

console.log(i, j);

let x = Math.floor(d/2);
let y = Math.floor(d/2);
//Ecouter les saisies clavier
window.addEventListener('keydown', evt => {
    console.log(evt.key);

    if (evt.key === 'ArrowUp' && x > 0){
        x--;
    }
    else if ( evt.key === 'ArrowRight' && y < d-1){
        y++;
    }
    else if (evt.key === 'ArrowDown' && x < d-1){
        x++;
    }
    else if (evt.key === 'ArrowLeft' && y > 0){
        y--;
    }

    if (x === i && y === j){
        clearInterval(itv);
        bonus.remove();
        logoJS.remove();
        table.rows[x].cells[y].appendChild(bravo);

    }
    else{
        table.rows[x].cells[y].appendChild(logoJS);
    }

    
}, false);





//fonction pour vérifier si le pion JS à atteint le bonus
function verification(a, b, c, d){
    if (a === c && b === d){
        positionner(bravo);
    }
}

//fonction positionner pion
function positionner(pion){
    let x = Math.floor(d/2);
    let y = Math.floor(d/2);
    table.rows[x].cells[y].appendChild(pion);
}


/*
let logo = 'logoJS';
let img = out.querySelector('img');

//fonction évènement clic 
function clic(evt) {
    logo = logo == 'logoJS' ? 'bonus' : 'logoJS';
    evt.target.src = `images/${logo}.png`;
}
img.addEventListener('click', clic, false);
*/
