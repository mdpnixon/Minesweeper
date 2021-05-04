/*----- constants -----*/


/*----- app's state (variables) -----*/
let board = [9x9 array];
let bomb;
let numberBox;
let emptyBox;
let timer;

/*----- cached element references -----*/
const squares = document.querySelectorAll('div');
const remainingBombs = number of flagged boxes


/*----- event listeners -----*/
click - reset button
click on grid to reveal box
right click on grid to flag box

/*----- functions -----*/
handleClick() {
    if (box === bomb) {
        trigger lose (show all bomb locations)
    } else if (box === number) {
        reveal number
        cascadeReveal()
    } else if (box === flag) {
        remove flag status
        +1 to remainingBombscounter
    } else {
        reveal empty box
        cascadeReveal()
    }
}

handleRightClick() {
    change box status to flag
    -1 from remainingBombs counter
}

cascadeReveal() {
    reveal empty/numbered boxes around closest bombs
    if (neighbourSquare === emptyBox) {
        reveal and move to next
    } else if (neighbourSquare === numberBox) {
        reveal and move to next
    } else
}

checkWin() {
    if (all squares reveal === true) {
        return win;
        sunglasses
        flag all bombs
    } else
}


render {
    update board state on each click
}

initialize() {
    on first click:
    generate bomb location randomly
    generate number squares
    set rest of squares to be empty
    start timer
}