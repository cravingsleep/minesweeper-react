import { State } from 'context';

export type Action = {
    x: number,
    y: number,
    type: 'dug'
}

function dugAction(state: State, action: Action): State {
    const { minefield } = state;
    const { x, y } = action;

    minefield[x][y].dug = true;

    // game over
    if (minefield[x][y].haveMine) {
        return { minefield: state.minefield, exploded: true };
    }

    const visited: { [key: string]: boolean } = {};

    // dig all number neighbours and do again on 0s
    function recursivelyDig(x: number, y: number): void {
        if (visited[`x:${x} y:${y}`]) {
            return;
        }

        visited[`x:${x} y:${y}`] = true;

        const tile = minefield[x]?.[y];

        if (!tile) {
            return;
        }

        tile.dug = true;

        if (tile.minesNearby === 0) {
            recursivelyDig(x, y + 1);
            recursivelyDig(x, y - 1);
            recursivelyDig(x + 1, y);
            recursivelyDig(x - 1, y);
            recursivelyDig(x + 1, y + 1);
            recursivelyDig(x - 1, y + 1);
            recursivelyDig(x + 1, y - 1);
            recursivelyDig(x - 1, y - 1);
        }
    }

    recursivelyDig(x, y);

    return { minefield, exploded: false };
}

export { dugAction };
