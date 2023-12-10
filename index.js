//on initialise la grille de jeu
let grille = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

function plateau () { //création du tableau de jeu, des lignes et des colonnes
    let board = document.querySelector("#board");
    let table = document.createElement("table");
    board.appendChild(table);
    for(let l = 5; l >= 0; l-- ) {
        let row = document.createElement("tr");
        table.appendChild(row);
        for(let c = 0; c < 7; c++ ) {
            let col = document.createElement("td");
            col.dataset.id = l+"-"+c;
            row.appendChild(col);
        }
    }
}

function gameBot(valBot, bot) { //pour faire jouer le bot
    let col = Math.round(Math.random() * (6 - 0) + 0);
    let row = Math.round(Math.random() * (5 - 0) + 0);
    let pos = row+"-"+col;
    majGrille(pos, grille, bot, valBot);
}

function testGagnant (valUser, grille, user) { //conditions de victoire
    //horizontal
    let nb = 0;
    for(let i= 0; i<6; i++) {
        for(let j= 0; j<7; j++) {
            if(grille[i][j] === valUser) {
                nb += 1;
                if(nb >= 4) {
                    alert("Le joueur "+user+" a gagné horizontalement");
                    break;
                }
            } else {
                nb = 0;
            }
        }    
    }
    //vertical
    let nb1 = 0;
    for(let i= 0; i<7; i++) {
        for(let j= 0; j<6; j++) {     
            if(grille[j][i] === valUser) {
                nb1 += 1;
                if(nb1 >= 4) {
                    alert("Le joueur "+user+" a gagné verticalement");
                    break;
                }
            } else {
                nb1 = 0;
            }
        }    
    }
}

function testColonne (caseClique) { //function pour tester si une colonne est pleine ou pas
    let split = caseClique.split("-");
    let positionY = Number(split[1]);
    let nb = 0;
    for (let r = 5; r >= 0; r--) {
        for(let c = 0; c < 7; c++) {
            if(c === positionY) {
                if(grille[r][c] === 0) {
                    nb += 1;
                } 
            }
        }
    }
    return nb;
}

function testNul (grille) { //pour regarder si le plateau est plein
    let nb = 0;
    for(let i= 0; i<6; i++) {
        for(let j= 0; j<6; j++) {
            if(grille[i][j] === 0) {
                nb += 1;
            } 
        }    
    }
    if(nb === 0) {
        alert("La partie se finie sur un match nul");
    }
}

function majGrille (caseClique, grille, user, valUser) { //pour gérer la gravité et mettre les couleurs
    let split = caseClique.split("-");
    let positionY = Number(split[1]);
    /******* On vérifie si la colonne est pleine *******/
    let nbCaseCol = testColonne(caseClique);
    /***************************************************/
    if(nbCaseCol >= 1) { //il reste au moins 1 case libre
        let ligne = 0;
        //ajouter verif si colonne pleine 
        for (let r = 5; r >= 0; r--) {
            for(let c = 0; c < 7; c++) {
                if(c === positionY) { //meme colonne que la position
                    if(grille[r][c] === 0) {
                        if(r >= ligne) {
                            ligne = r;
                        }
                        break;
                    } 
                }
            }
        }
        grille[ligne][positionY] = valUser;  
        ligne += 1;
        let colonne  = positionY + 1;
        let val = "#board table tr:nth-child("+ligne+") td:nth-child("+colonne+")";
        let board = document.querySelector(val).classList.add(user);
        testGagnant(valUser, grille, user);
        testNul(grille);
        return true;
    } else {
        return false;
    }
}

/********************************* Programme *********************************************************/

plateau();

let botChoise = prompt("Voulez vous jouer contre un bot ?");
let couleurUser = "";
/************************ Si on choisit de jouer vs un bot *******************************/
if(botChoise === "oui") {
    couleurUser = prompt("Jetons jaune ou rouge ?");
}
let user = "";
let bot = "";
let valUser = 0;
let valBot = 0;
if(couleurUser === "jaune") {
    user = 'player2';
    bot = "player1";
    valUser = 2;
    valBot = 1;
} else {
    user = 'player1';
    bot = "player2";
    valUser = 1;
    valBot = 2;
}
/***************************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event) {      
        test = majGrille(event.target.dataset.id, grille, user, valUser);
        /*while(!test) {
            alert('Veuillez rejouter, la colonne est pleine!!');
            continue;
        }*/
        if(botChoise === "oui") {
            gameBot(valBot, bot);
        }
    });
});
//A ajouter
//control si colonne pleine boucle infinie //do,while//while
//jeu vs joueur
//victoire diago
//victoire autre diago