import sampleSize from 'lodash.samplesize';

export type TileModel = {
    haveMine: boolean,
    minesNearby: number,
    flagged: boolean,
    dug: boolean
}

function calculateMinesAround(model: TileModel[][]): void {
    model.forEach((row, x) => row.forEach((tile, y) => {
        tile.minesNearby = countMinesAround(model, x, y);
    }));
}

function generateMinefield(width: number, height: number, mines: number): TileModel[][] {
    const model = <TileModel[][]>[];

    // init
    for (let x = 0; x < width; x++) {
        model.push([]);

        for (let y = 0; y < height; y++) {
            model[x][y] = {
                haveMine: false,
                minesNearby: 0,
                dug: false,
                flagged: false
            };
        }
    }

    const mineLocations = sampleSize(model.flat(), mines);

    mineLocations.forEach(tile => {
        tile.haveMine = true;
    });

    calculateMinesAround(model);

    return model;
}

function normal(x: boolean | undefined): 0 | 1 {
    return x ? 1 : 0;
}

function countMinesAround(minefield: TileModel[][], x: number, y: number): number {
    const top = normal(minefield[x]?.[y + 1]?.haveMine);
    const bottom = normal(minefield[x]?.[y - 1]?.haveMine);
    const left = normal(minefield[x + 1]?.[y]?.haveMine);
    const right = normal(minefield[x - 1]?.[y]?.haveMine);
    const topright = normal(minefield[x + 1]?.[y + 1]?.haveMine);
    const topleft = normal(minefield[x - 1]?.[y + 1]?.haveMine);
    const bottomright = normal(minefield[x + 1]?.[y - 1]?.haveMine);
    const bottomleft = normal(minefield[x - 1]?.[y - 1]?.haveMine);

    return top + bottom + left + right + topright + topleft + bottomright + bottomleft;
}

export { generateMinefield, calculateMinesAround };
