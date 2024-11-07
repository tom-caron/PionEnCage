"use strict";

let selectedDifficulty = null;

document.getElementById("easy").addEventListener("click", function() {
    selectDifficulty("Facile", this);
});
document.getElementById("medium").addEventListener("click", function() {
    selectDifficulty("Moyen", this);
});
document.getElementById("hard").addEventListener("click", function() {
    selectDifficulty("Difficile", this);
});

// Ajouter un écouteur d'événement pour le bouton "Jouer"
document.getElementById("startGame").addEventListener("click", startGame);

function selectDifficulty(difficulty, button) {
    selectedDifficulty = difficulty;

    // Supprimer la classe 'selected' de tous les boutons de difficulté
    document.getElementById("easy").classList.remove("selected");
    document.getElementById("medium").classList.remove("selected");
    document.getElementById("hard").classList.remove("selected");

    // Ajouter la classe 'selected' au bouton cliqué
    button.classList.add("selected");
}

// Fonction pour démarrer le jeu
function startGame() {
    let gridSize = document.getElementById("gridSize").value;

    if (gridSize < 1 || gridSize > 12) {
        alert("Veuillez choisir une taille de grille entre 1 et 12.");
        return;
    }

    if (!selectedDifficulty) {
        alert("Veuillez sélectionner une difficulté.");
        return;
    }

    // Définir le temps en fonction de la difficulté sélectionnée
    let time;
    if (selectedDifficulty === "Facile") {
        time = 1000;
    } else if (selectedDifficulty === "Moyen") {
        time = 500;
    } else if (selectedDifficulty === "Difficile") {
        time = 300;
    }

    console.log("Grille : " + gridSize, "Difficulté : " + selectedDifficulty);
    const out = document.getElementById("out");
    out.innerHTML = '';  // Effacer l'ancien tableau

    // Créer le pion
    let logoJS = document.createElement('img');
    logoJS.src = 'images/logoJS.png';

    // Créer le bonus
    let bonus = document.createElement('img');
    bonus.src = 'images/bonus.png';

    // Créer le pion bravo
    let bravo = document.createElement('img');
    bravo.src = 'images/bravo.png';

    // Créer un tableau
    let table = document.createElement('table');

    // Création du damier
    let d = gridSize;

    for (let x = 0; x < d; x++) {
        let tr = table.insertRow();
        for (let y = 0; y < d; y++) {
            tr.insertCell();
        }
    }

    // Afficher le tableau
    out.appendChild(table);

    // Fonction pour positionner le pion
    function positionner(pion) {
        let x = Math.floor(d / 2);
        let y = Math.floor(d / 2);
        table.rows[x].cells[y].appendChild(pion);
    }

    // Positionner le pion initialement
    positionner(logoJS);

    var i, j;
    // Méthode setInterval() pour le compte à rebours
    let itv = setInterval(() => {
        // Générer des coordonnées aléatoires pour le bonus
        let x = Math.floor(Math.random() * d);
        let y = Math.floor(Math.random() * d);

        // Vérifier si la cellule est déjà occupée par le logoJS
        if (!table.rows[x].cells[y].hasChildNodes()) {
            table.rows[x].cells[y].appendChild(bonus);
        }

        i = x;
        j = y;
    }, time);

    let x = Math.floor(d / 2);
    let y = Math.floor(d / 2);
    // Écouter les saisies clavier
    window.addEventListener('keydown', evt => {
        console.log(evt.key);

        // Déplacer le pion en fonction des touches
        if (evt.key === 'ArrowUp') {
            x = x <= 0 ? d - 1 : x - 1;
        } else if (evt.key === 'ArrowRight') {
            y = y >= d - 1 ? 0 : y + 1;
        } else if (evt.key === 'ArrowDown') {
            x = x >= d - 1 ? 0 : x + 1;
        } else if (evt.key === 'ArrowLeft') {
            y = y <= 0 ? d - 1 : y - 1;
        }

        // Vérifier si le pion JS a atteint le bonus
        if (x === i && y === j) {
            clearInterval(itv);
            bonus.remove();
            logoJS.remove();
            table.rows[x].cells[y].appendChild(bravo);
        } else {
            table.rows[x].cells[y].appendChild(logoJS);
        }
    }, false);
}