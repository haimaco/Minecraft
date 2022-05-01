const game = {
    gameMatrix : [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],

    gameBoard : document.querySelector(".game-board"),
    startBtn : document.querySelector(".btn-start"),
    homePage : document.querySelector(".home"),
    resetBtn : document.querySelector(".reset-btn"),
    pickaxe : document.querySelector(".pickaxe"),
    shovel : document.querySelector(".shovel"),
    axe : document.querySelector(".axe"),
    inventory: document.querySelector(".inventory"),
    isPickaxe: false,
    isShovel: false,
    isAxe: false,
    isInventory: false,
    inventoryType: "",
    isError: false
}

function isSky(row) {
    
}


function drawTree(gameMatrix, index, rowNum) {
    let trunkDraw = 2;
    let leavesDraw = 3;
    const newTable = [];
    for(let i=gameMatrix.length-1; i>= 0; i--) {
        let row = [...gameMatrix[i]]
        if(i > rowNum || i < rowNum - 5) {
            newTable.unshift(row);
        } else {
            if(trunkDraw) {
                row[index] = 4;
                trunkDraw--;
            } else if(leavesDraw) {
                row[index] = 5;
                row[index+1] = 5;
                row[index-1] = 5;
                leavesDraw--;
            }
            newTable.unshift(row);
        }
    }
    return newTable;
}

function createTree(gameMatrix) {
    const newTable = [];
    let flag = false;
    let random;
    let rowStartDraw;
    for(let i=gameMatrix.length-1; i>=0; i--) {
        let row = [...gameMatrix[i]];
        if(gameMatrix[i][0] !== 1 && flag === false) {
            flag = true;
            do {
                random = Math.floor(Math.random() * row.length);
            } while( !(isEmpty(row ,random)) || random === 0 || random === row.length-1);
            row[random] = 4;
            rowStartDraw = i-1;
            newTable.unshift(row);
        } else {
            newTable.unshift(row);
        }
    }
    console.log(newTable);
    return drawTree(newTable, random, rowStartDraw);
}

// function createGrass(gameMatrix) {
//     const newTable = [];
//     let flag = 2;
//     let random;
//     for(let i=gameMatrix.length-1; i>=0; i--) {
//         let row = [...gameMatrix[i]];
//         if(gameMatrix[i][0] !== 1 && flag === 2) {
//             do {
//                 random = Math.floor(Math.random() * row.length);
//             } while( !(isEmpty(row ,random)) || !(isEmpty(row ,random+1)) || !(isEmpty(row ,random-1)));
//             row[random] = 2;
//             row[random+1] = 2;
//             row[random-1] = 2;
//             newTable.unshift(row);
//             flag--;
//         } else if(flag === 1) {
//             row[random] = 2;
//             newTable.unshift(row);
//             flag--;
//         } else {
//             newTable.unshift(row);
//         }
//     }
//     return newTable;
// }

// function createRock(gameMatrix, num, size) {
//     const newTable = [];
//     let flag = false;
//     for(let i=gameMatrix.length-1; i>=0; i--) {
//         if(gameMatrix[i][0] !== 1 && !flag) {
//             let row = [...gameMatrix[i]];
//             while(num > 0) {
//                 num--;
//                 let random;
//                 if(size) {
//                     do {
//                         random = Math.floor(Math.random() * row.length);
//                     } while(!(isEmpty(row ,random)) || (!(isEmpty(row ,random+1)) && !(isEmpty(row ,random-1))));
//                     row[random] = 3;
//                     if(isEmpty(row ,random+1)) {
//                         row[random+1] = 3;
//                     } else if(isEmpty(row ,random-1)) {
//                         row[random-1] = 3;
//                     }
//                     size = false;
//                 } else {
//                     do {
//                         random = Math.floor(Math.random() * row.length);
//                     } while(!(isEmpty(row ,random)));
//                     row[random] = 3;
//                 }
//             }
//             newTable.unshift(row);
//             flag = true;
//         } else {
//             newTable.unshift(gameMatrix[i]);
//         }
//     }
//     return newTable;
// }

// function isEmpty(row, num) {
//     return row[num] === 0;
// }

// function createTable(game) {
//     const tableWithTree = createTree(game.gameMatrix);
//     const tableWithGrass = createGrass(tableWithTree);
//     const newTable = createRock(tableWithGrass, 2, 2);
//     for(let i=0; i<newTable.length; i++) {
//         for(let j=0; j<newTable[i].length; j++) {
//             const cell = document.createElement("div");
//             cell.classList.add("cell", elementIndex(newTable[i][j]));
//             game.gameBoard.appendChild(cell);
//             cell.addEventListener("mousedown", cellEvent);
//             // cell.addEventListener("pointerup", cellEvent);
//             cell.addEventListener("touchstart", cellEvent);
//             cell.addEventListener("mouseup", cellMouseUpEvent);
//             cell.addEventListener("touchend", cellMouseUpEvent);
//             // cell.addEventListener("pointerdown", cellMouseUpEvent);
//         }   
//     }
// }

// function cellMouseUpEvent(event) {
//     if(game.isError) {
//         if(game.isInventory) {
//             game.inventory.classList.remove("error");
//             game.isError = false;
//         }
//         if(game.isPickaxe) {
//             game.pickaxe.classList.remove("error");
//             game.isError = false;
//         }
//         if(game.isShovel) {
//             game.shovel.classList.remove("error");
//             game.isError = false;
//         }
//         if(game.isAxe) {
//             game.axe.classList.remove("error");
//             game.isError = false;
//         }
//     }
// }

// function cellEvent(event) {
//     if(game.isInventory && game.inventoryType) {
//         if(!(this.classList.contains("grass") || this.classList.contains("trunk") || this.classList.contains("leaves") || this.classList.contains("rock") || this.classList.contains("dirt"))) {
//             this.classList.add(game.inventoryType);
//             game.inventory.classList.remove(game.inventoryType);
//             game.inventoryType = "";
//         } else {
//             game.isError = true;
//             game.inventory.classList.add("error");
//         }
//     } else {
//         if(game.isShovel) {
//             if(this.classList.contains("dirt")) {
//                 this.classList.remove("dirt");
//                 if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
//                 game.inventoryType = "dirt";
//                 game.inventory.classList.add("dirt")
//             } else {
//                 game.isError = true;
//                 game.shovel.classList.add("error");
//             }
//         }
//         if(game.isPickaxe) {
//             if(this.classList.contains("rock")) {
//                 this.classList.remove("rock");
//                 if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
//                 game.inventoryType = "rock";
//                 game.inventory.classList.add("rock") 
//             } else {
//                 game.isError = true;
//                 game.pickaxe.classList.add("error");
//             }
//         }
//         if(game.isAxe) {
//             if(this.classList.contains("grass") || this.classList.contains("trunk") || this.classList.contains("leaves")) {
//                 if(this.classList.contains("grass")) {
//                     this.classList.remove("grass");
//                     if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
//                     game.inventoryType = "grass";
//                     game.inventory.classList.add("grass")
//                 }
//                 if(this.classList.contains("leaves")) {
//                     this.classList.remove("leaves");
//                     if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
//                     game.inventoryType = "leaves";
//                     game.inventory.classList.add("leaves")
//                 }
//                 if(this.classList.contains("trunk")) {
//                     this.classList.remove("trunk");
//                     if(game.inventoryType) game.inventory.classList.remove(game.inventoryType);
//                     game.inventoryType = "trunk";
//                     game.inventory.classList.add("trunk")
//                 }
//             } else {
//                 game.isError = true;
//                 game.axe.classList.add("error");
//             }
//         }
//     }
// }

// function elementIndex(num) {
//     switch(num) {
//         case 1:
//             return "dirt";
//         case 2:
//             return "grass";
//         case 3:
//             return "rock";
//         case 4:
//             return "trunk";
//         case 5:
//             return "leaves";
//         case 6:
//             return "cloud";
//     }
// };

// game.inventory.addEventListener("click", function(event) {
//     if(game.inventoryType) {
//         game.isAxe = false;
//         game.isPickaxe = false;
//         game.isShovel = false;
//         game.shovel.style.borderColor = "";
//         game.axe.style.borderColor = "";
//         game.pickaxe.style.borderColor = "";
//         this.style.borderColor = "blue";
//         game.isInventory = true;
//     }
// })

// game.startBtn.addEventListener("click", function(event) {
//     game.homePage.style.display = "none";
// })

// game.pickaxe.addEventListener("click", function(event) {
//     game.isAxe = false;
//     game.isPickaxe = true;
//     game.isShovel = false;
//     game.isInventory = false;
//     this.style.borderColor = "blue";
//     game.shovel.style.borderColor = "";
//     game.axe.style.borderColor = "";
//     game.inventory.style.borderColor = "";
// });

// game.shovel.addEventListener("click", function(event) {
//     game.isAxe = false;
//     game.isPickaxe = false;
//     game.isShovel = true;
//     game.isInventory = false;
//     this.style.borderColor = "blue";
//     game.pickaxe.style.borderColor = "";
//     game.axe.style.borderColor = "";
//     game.inventory.style.borderColor = "";
// });

// game.axe.addEventListener("click", function(event) {
//     game.isAxe = true;
//     game.isPickaxe = false;
//     game.isShovel = false;
//     game.isInventory = false;
//     this.style.borderColor = "blue";
//     game.shovel.style.borderColor = "";
//     game.pickaxe.style.borderColor = "";
//     game.inventory.style.borderColor = "";
// });

// game.resetBtn.addEventListener("click", function(event) {
//     deleteTable();
//     createTable(game);
//     if(game.inventoryType) {
//         game.inventory.classList.remove(game.inventoryType);
//         game.inventoryType = "";
//         game.isInventory = false;
//         game.inventory.style.borderColor = "";
//     }
// })

// function deleteTable() {
//     const cells = document.querySelectorAll(".cell");
//     cells.forEach(cell => cell.remove());
// }

// createTable(game);