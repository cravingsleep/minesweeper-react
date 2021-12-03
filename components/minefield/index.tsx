import Tile from 'Components/tile';
import { MineFieldContext } from 'context';
import React, { useContext } from 'react';
import styles from './index.module.scss';

function Minefield() {
    const { state } = useContext(MineFieldContext);

    return <table className={styles.minefield}>
        <tbody>
            {state.minefield.map((row, x) => <tr key={x}>
                {row.map((tile, y) => <Tile
                    haveMine={tile.haveMine}
                    dug={tile.dug}
                    minesNearby={tile.minesNearby}
                    flagged={tile.flagged}
                    key={y}
                    x={x}
                    y={y}
                />)}
            </tr>)}
        </tbody>
    </table>;
}

export default Minefield;
