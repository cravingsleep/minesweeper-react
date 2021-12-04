import { State } from 'context';
import sampleSize from 'lodash.samplesize';
import { calculateMinesAround } from './generation';

type MinefieldClickAction = {
    type: 'click',
    x: number,
    y: number
}

type SetFlagModeAction = {
    type: 'setFlagMode',
    on: boolean
}

type Action = MinefieldClickAction | SetFlagModeAction;

function setFlagModeAction(action: SetFlagModeAction): Partial<State> {
    return {
        flagModeOn: action.on
    };
}

function dugAction(state: State, action: MinefieldClickAction): Partial<State> {
    const { minefield } = state;
    const { x, y } = action;

    minefield[x][y].dug = true;

    // game over
    if (minefield[x][y].haveMine) {
        return { exploded: true };
    }

    const visited = new Set<string>();

    // dig all number neighbours and do again on 0s
    function recursivelyDig(x: number, y: number): void {
        if (visited.has(`x:${x} y:${y}`)) {
            return;
        }

        visited.add(`x:${x} y:${y}`);

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

function firstDugAction(state: State, action: MinefieldClickAction): Partial<State> {
    const { minefield } = state;
    const { x, y } = action;

    // all the squares that cannot have mines on the first go
    const surroundingSquares = [
        minefield[x][y],
        minefield[x]?.[y + 1],
        minefield[x]?.[y - 1],
        minefield[x + 1]?.[y],
        minefield[x - 1]?.[y],
        minefield[x + 1]?.[y + 1],
        minefield[x - 1]?.[y + 1],
        minefield[x + 1]?.[y - 1],
        minefield[x - 1]?.[y - 1]
    ].filter(Boolean);

    const minesToRelocate = surroundingSquares
        .filter(tile => tile.haveMine)
        .length;

    // get rid of the mines in these
    surroundingSquares.forEach(tile => {
        tile.haveMine = false;
    });

    const everyOtherPossiblePlace = minefield.flat()
        .filter(tile => !tile.haveMine && !surroundingSquares.includes(tile));

    const chosen = sampleSize(everyOtherPossiblePlace, minesToRelocate);

    chosen.forEach(tile => {
        tile.haveMine = true;
    });

    calculateMinesAround(minefield);

    return Object.assign({}, dugAction(state, action), { firstMoveMade: true });
}

function flagAction(state: State, action: MinefieldClickAction): Partial<State> {
    const { minefield } = state;
    const { x, y } = action;

    const tile = minefield[x][y];

    if (!tile.dug) {
        tile.flagged = !tile.flagged;
    }

    return { minefield };
}

export type { Action };
export { dugAction, firstDugAction, flagAction, setFlagModeAction };
