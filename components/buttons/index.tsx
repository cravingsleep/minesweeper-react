import { MineFieldContext } from 'context';
import React, { useCallback, useContext } from 'react';
import classnames from 'Utils/classnames';
import styles from './index.module.scss';

type ButtonProps = {
    text: string,
    on: boolean,
    onClick: () => void
}

const Button = React.memo(function Button(props: ButtonProps) {
    return <input
        type="button"
        onClick={props.onClick}
        className={classnames([styles.button], {
            [styles.on]: props.on,
            [styles.off]: !props.on
        })}
        value={props.text}
    />;
});

function FlagControls() {
    const { state, dispatch } = useContext(MineFieldContext);

    const setFlagOn = useCallback(() => {
        dispatch({
            type: 'setFlagMode',
            on: true
        });
    }, []);

    const setFlagOff = useCallback(() => {
        dispatch({
            type: 'setFlagMode',
            on: false
        });
    }, []);

    return <section>
        <Button text="Flag" on={state.flagModeOn} onClick={setFlagOn} />
        <Button text="Dig" on={!state.flagModeOn} onClick={setFlagOff} />
    </section>;
}

export default FlagControls;
