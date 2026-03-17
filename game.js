'use strict';

// const board = (rows, cols) => new Array(rows).fill(new Array(cols).fill(0));

function board(rows, cols) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        let r = [];
        for (let j = 0; j < cols; j++) r.push(0);
        arr.push(r);
    }
    return arr;
}

// get neighbors for cell at some position
function getNeighbors(x, y, rows, cols) {
    return [
        [-1,0], [1,0], [0,1], [0,-1],
        [1,-1], [1,1], [-1,-1], [-1,1]
    ].map((pos) => [x + pos[0], y + pos[1]])
        .filter((pos) => (pos[0] >= 0 && pos[0] < rows) && (pos[1] >= 0 && pos[1] < cols));
}

function updateCell(grid, i, j) {
    const neighbors = getNeighbors(i, j, grid.length, grid[i].length);
    let aliveNeighbors= neighbors.map((n) => grid[n[0]][n[1]]).filter((i) => i).length;

    if (grid[i][j] === 1) {
        if (aliveNeighbors < 2) return 0;
        if (aliveNeighbors > 3) return 0;
        return 1;
    }
    if (aliveNeighbors === 3) return 1;
    return 0;
}

function setPopulation(grid, neighbors) {
    let n = neighbors.map((n) => grid[n[0]][n[1]]).filter((i) => i).length;
    return n >= 2 && n <= 3;
}

function underPopulated(grid, neighbors) {
    return neighbors.map((n) => grid[n[0]][n[1]]).filter((i) => i).length < 2;
}

function overPopulated(grid, neighbors) {
    return neighbors.map((n) => grid[n[0]][n[1]]).filter((i) => i).length > 3;
}

class UI {
    static #container = () => document.querySelector('#container');
    static #cells = () => document.querySelectorAll('.grid');

    static #createBoard(rows, cols) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.dataset.id = `${i}-${j}`;
                cell.classList.add('grid');
                this.#container().appendChild(cell);
            }
        }
    }

    static async init(rows, cols) {
        this.#createBoard(rows, cols);
        let grid = board(rows, cols);

        // Starting position in the centre of the grid, not needed
        const x = Math.floor(grid.length / 2) - 1;
        const y = Math.floor(grid.length / 2) - 1;

        // ======================== Initial positions ================================
        grid[5][50] = 1;
        grid[6][50] = 1;
        grid[5][51] = 1;
        grid[6][51] = 1;

        grid[15][50] = 1;
        grid[15][51] = 1;
        grid[15][52] = 1;

        grid[16][49] = 1;
        grid[16][53] = 1;

        grid[17][48] = 1;
        grid[17][54] = 1;

        grid[18][48] = 1;
        grid[18][54] = 1;

        grid[19][51] = 1;

        grid[20][49] = 1;
        grid[20][53] = 1;

        grid[21][50] = 1;
        grid[21][51] = 1;
        grid[21][52] = 1;

        grid[22][51] = 1;

        grid[25][48] = 1;
        grid[25][49] = 1;
        grid[25][50] = 1;

        grid[26][48] = 1;
        grid[26][49] = 1;
        grid[26][50] = 1;

        grid[27][47] = 1;
        grid[27][51] = 1;

        grid[29][46] = 1;
        grid[29][47] = 1;
        grid[29][51] = 1;
        grid[29][52] = 1;

        grid[39][48] = 1;
        grid[39][49] = 1;
        grid[40][48] = 1;
        grid[40][49] = 1;
        // ===========================================================================

        let epochs = 0;
        while (true) {
            let nextGrid = board(rows, cols);
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    const cell = document.querySelector(`[data-id="${i}-${j}"]`);

                    document.querySelector('h1').textContent = `Epochs: ${epochs}`;

                    if (grid[i][j] === 0) cell.style.backgroundColor = `#ffffff`;
                    else if (grid[i][j] === 1) cell.style.backgroundColor = `#000000`;
                    nextGrid[i][j] = updateCell(grid, i, j);
                }
            }
            grid = nextGrid;
            await sleep(70);
            epochs++;
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

UI.init(100, 100);
