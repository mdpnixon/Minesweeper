/*----- constants -----*/
const board1 = [
    [1,9,9,1,8,8,1,1,1,8],
    [1,2,2,1,8,8,1,9,1,8],
    [8,1,2,2,1,1,2,2,1,8],
    [1,2,9,9,2,2,9,1,8,8],
    [1,9,4,3,2,9,2,1,8,8],
    [1,2,9,1,1,1,2,1,1,8],
    [8,1,1,1,8,8,1,9,1,8],
    [8,8,1,1,1,8,1,1,2,1],
    [8,8,1,9,1,8,8,8,1,9],
    [8,8,1,1,1,8,8,8,1,1],
];

const board2 = [
    [9,1,8,1,1,1,8,8,1,9],
    [1,1,8,1,9,1,8,1,2,2],
    [8,8,8,1,1,1,8,1,9,1],
    [1,1,2,1,1,8,8,1,1,1],
    [1,9,2,9,2,1,1,8,8,8],
    [1,1,2,1,2,9,1,8,8,8],
    [8,8,1,1,2,1,1,8,8,8],
    [8,8,1,9,2,1,8,1,1,1],
    [1,1,1,2,9,1,8,1,9,2],
    [9,1,8,1,1,1,8,1,2,9],
];

const board3 = [
    [1,9,2,1,1,8,8,1,1,1],
    [1,1,2,9,2,1,8,1,9,1],
    [8,8,1,1,2,9,1,1,1,1],
    [8,8,8,8,1,1,1,8,8,8],
    [1,1,1,8,1,1,1,8,8,8],
    [1,9,2,1,1,9,2,1,1,8],
    [1,2,9,2,2,1,2,9,1,8],
    [1,3,4,9,1,8,1,1,1,8],
    [1,9,9,2,1,8,1,1,1,8],
    [1,2,2,1,8,8,1,9,1,8],
];

let boardArray = [board1, board2, board3];

getBoard = () => {
    let gameBoard = boardArray[Math.floor(Math.random() * boardArray.length)];
    return gameBoard;
}

let board = getBoard();

/*----- app's state (variables) -----*/
let lose = false;
let remainingBombs = 12;
let revealedSquares = 0;

/*----- cached element references -----*/
const squares = document.querySelector('.board');
const resetBtn = document.querySelector('.reset');
const player = new Audio();
const bgPlayer = document.getElementById('bg-player');
const bgCheckbox = document.querySelector('input[type="checkbox"]');
bgPlayer.volume = .1;
const bombSound = new Audio('assets/bomb.wav');
bombSound.volume = .1;
// document.getElementById('bomb-count').innerHTML = remainingBombs;

/*----- event listeners -----*/
resetBtn.addEventListener('click', reset);
squares.addEventListener('click', handleClick);
squares.addEventListener('contextmenu', handleRightClick, false);
bgCheckbox.addEventListener('change', handleBgChanged);

/*----- functions -----*/
render();

function reset(e) {
    location.reload();
}

function handleClick(e) {
    if (lose === true) return;
    const box = e.target.id;
    let x = parseInt(box[1]);
    let y = parseInt(box[2]);
    reveal(x,y);
    if (board[x][y] === -8) {
        cascadeReveal(x,y);
    }
};

function handleRightClick(e) {
    e.preventDefault();
    if (lose === true) return;
    let flag = e.target.id;
    let x = parseInt(flag[1])
    let y = parseInt(flag[2])
    if (board[x][y] < 0) {
        return;
    } else if (board[x][y] > 9) {
        board[x][y] -= 10;
        remainingBombs++;
    } else {
        board[x][y] += 10;
        remainingBombs--;
    } 
    return false;
    
};

function reveal(x,y) {
    if (board[x][y] === 1) {
        board[x][y] = -1;
        revealedSquares++;
    } else if (board[x][y] === 2) {
        board[x][y] = -2;
        revealedSquares++;
    } else if (board[x][y] === 3) {
        board[x][y] = -3;
        revealedSquares++;
    } else if (board[x][y] === 4) {
        board[x][y] = -4;
        revealedSquares++;
    } else if (board[x][y] === 5) {
        board[x][y] = -5;
        revealedSquares++;
    } else if (board[x][y] === 6) {
        board[x][y] = -6;
        revealedSquares++;
    } else if (board[x][y] === 7) {
        board[x][y] = -7;
        revealedSquares++;
    } else if (board[x][y] === 8) {
        board[x][y] = -8;
        revealedSquares++;
    } else if (board[x][y] === 9) {
        board[x][y] = -9;
        lose = true;
        bombSound.play();
    };
}

function cascadeReveal(x,y) {
    for (let i = x-1; i <= x+1; i++) {
        for (let j = y-1; j <= y+1; j++){
            if (i < 0 || j < 0 || i >= board.length || j >= board[i].length) {
                continue;
            }
            if (board[i][j] === -8) {
                continue;
            }
            if (board[i][j] !== 9) {
                reveal(i,j);
                if (board[i][j] === -8) {
                    cascadeReveal(i,j);
                }
            }
        }
    } 
};

function checkWin() {
    if (revealedSquares > 87) {
        board.forEach((row, x) => {
            row.forEach((cell, y) => {
                document.getElementById(`b${x}${y}`)
                if (cell === 9) {
                    board[x][y] = 19;
                    remainingBombs--;
                }
            });
        });
        reset.src="assets/sun-glasses.png";
    } else if (lose === true) {
        board.forEach((row, x) => {
            row.forEach((cell, y) => {
                document.getElementById(`b${x}${y}`)
                if (cell === 9) {
                    board[x][y] = -9;
                }
            });
        });
        reset.src="assets/sun-sad.png";
    }
}

function handleBgChanged() {
    bgCheckbox.checked ? bgPlayer.play() : bgPlayer.pause();
}

function render() {
    checkWin();
    board.forEach((row, x) => {
        row.forEach((cell, y) => {
            document.getElementById(`b${x}${y}`)
            if (cell === -1) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('one');
            } else if (cell === -2) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('two');
            } else if (cell === -3) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('three');
            } else if (cell === -4) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('four');
            } else if (cell === -5) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('five');
            } else if (cell === -6) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('six');
            } else if (cell === -7) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('seven');
            } else if (cell === -8) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('empty');
            } else if (cell === -9) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('bombed');
            } else if (cell > 10) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.add('flagged');
            } else if (cell < 10) {
                let myDiv = document.getElementById(`b${x}${y}`);
                myDiv.classList.remove('flagged');
            }
        });
    });
    setTimeout(render, 100);
    document.getElementById('bomb-count').innerHTML = remainingBombs;
}