import { generateMinefield } from './generation';
import React, { useReducer } from 'react';
import type { TileModel } from './generation';
import { Action, dugAction, firstDugAction } from './actions';

export type State = {
    minefield: TileModel[][],
    exploded: boolean,
    firstMoveMade: boolean
}

export const MineFieldContext = React.createContext({
    state: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch: (() => { }) as React.Dispatch<Action>
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const MineFieldDispatchContext = React.createContext((() => { }) as React.Dispatch<Action>);

function mineFieldReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'dug':
            return Object.assign(
                {},
                state,
                state.firstMoveMade ? dugAction(state, action) : firstDugAction(state, action)
            );
        default:
            return state;
    }
}

type Props = {
    width: number,
    height: number,
    mines: number,
    children: JSX.Element[] | JSX.Element
}

export function MineFieldContextProvider(props: Props) {
    const [state, dispatch] = useReducer(mineFieldReducer, {
        minefield: generateMinefield(
            props.width,
            props.height,
            props.mines
        ),
        exploded: false,
        firstMoveMade: false
    });

    return <MineFieldContext.Provider value={{ state, dispatch }}>
        <MineFieldDispatchContext.Provider value={dispatch}>
            {props.children}
        </MineFieldDispatchContext.Provider>
    </MineFieldContext.Provider>;
}
