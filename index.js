function plateau () {
    let board = document.querySelector("#board");
    let table = document.createElement("table");
    board.appendChild(table);
    for(let l = 1; l < 7; l++ ) {
        let row = document.createElement("tr");
        table.appendChild(row);
        for(let c = 1; c < 8; c++ ) {
            let col = document.createElement("td");
            row.appendChild(col);
        }
    }
}

function plateauPos (pos) {
    //console.log(pos);
    let grille =
    [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    for (let r = 5; r > 0; r--) {
        for(let c = 0; c < 7; c++) {
            //console.log(r+" "+c);
            if(c === pos) { //meme colonne que la position
                if(grille[r][c] === 0) {
                    grille[r][c] = 1;
                    
                    //console.log(r+" "+c);
                    let val = "#board table tr:nth-child("+r+") td:nth-child("+pos+")";
                    console.log(val);
                    let board = document.querySelector(val).classList.add('player1');
                    //let board = val.add('player1');
                } 
            }
        }
    }
}
plateau();

//document.querySelector('#game td').addEventListener('click', function(event));

document.addEventListener('click', function(event) {
    let col = 0;
    event.target.classList.add('player1');
    let board = document.querySelector("#board table");
    for (let i = 0; i < board.children.length; i++) {
        for(let j = 0; j < board.children[i].children.length; j++) {
            console.log(board.children[i].children[j].className);
            if(board.children[i].children[j].className === "player1") {
                col = j;
                plateauPos(col);
            }
        }
    }
});