import { MineFieldDispatchContext } from 'context';
import React, { useCallback, useContext } from 'react';
import classnames from 'Utils/classnames';
import styles from './index.module.scss';

type TileProps = {
    dug: boolean,
    haveMine: boolean,
    minesNearby: number,
    x: number,
    y: number
}

const Tile = React.memo(function Tile(props: TileProps) {
    const { dug, minesNearby, x, y, haveMine } = props;

    const dispatch = useContext(MineFieldDispatchContext);

    const onClick = useCallback(() => {
        dispatch({
            type: 'dug',
            x,
            y
        });
    }, []);

    return <td
        onClick={onClick}
        className={classnames([styles.tile], {
            [styles.dug]: dug,
            [styles.mine]: haveMine && dug
        })}>
        {minesNearby === 0 || !dug ? <br /> : minesNearby}
    </td>;
});

export default Tile;
