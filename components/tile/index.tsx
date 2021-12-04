import { MineFieldDispatchContext } from 'context';
import React, { useCallback, useContext } from 'react';
import classnames from 'Utils/classnames';
import styles from './index.module.scss';

type TileProps = {
    dug: boolean,
    haveMine: boolean,
    minesNearby: number,
    flagged: boolean,
    x: number,
    y: number
}

function getTileContent(
    minesNearby: number,
    dug: boolean,
    flagged: boolean,
    haveMine: boolean
): string | JSX.Element {
    if (dug) {
        if (haveMine) {
            return 'M';
        } else if (minesNearby !== 0) {
            return String(minesNearby);
        }
    } else {
        if (flagged) {
            return 'F';
        }
    }

    return <br />;
}

const Tile = React.memo(function Tile(props: TileProps) {
    const { dug, minesNearby, x, y, haveMine, flagged } = props;

    const dispatch = useContext(MineFieldDispatchContext);

    const onClick = useCallback(() => {
        dispatch({
            type: 'click',
            x,
            y
        });
    }, []);

    return <td
        onClick={onClick}
        className={classnames([styles.tile], {
            [styles[`mines-nearby-${minesNearby}`]]: dug && !flagged,
            [styles.dug]: dug,
            [styles.mine]: haveMine && dug
        })}>
        {getTileContent(minesNearby, dug, flagged, haveMine)}
    </td>;
    /**
     * the `x` and `y` coords do not actually alter the
     * rendering here so we can preclude them from the memo
     * to speed up rendering
     */
}, (prevProps, nextProps) =>
    prevProps.dug === nextProps.dug &&
    prevProps.haveMine === nextProps.haveMine &&
    prevProps.minesNearby === nextProps.minesNearby &&
    prevProps.flagged === nextProps.flagged
);

export default Tile;
