import Minefield from 'Components/minefield';
import React, { Fragment } from 'react';
import { MineFieldContextProvider } from '../context';

function Home() {
    return <Fragment>
        <h1>MineSweeper</h1>
        <h5 className="i">(but the mines move...)</h5>
        <MineFieldContextProvider width={40} height={20} mines={100}>
            <Minefield />
        </MineFieldContextProvider>
    </Fragment>;
}

export default Home;
