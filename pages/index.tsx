import FlagControls from 'Components/buttons';
import Minefield from 'Components/minefield';
import { NoSSR } from 'Components/util/no-ssr';
import React, { Fragment } from 'react';
import { MineFieldContextProvider } from '../context';

function Home() {
    return <Fragment>
        <h1>MineSweeper</h1>
        <h5 className="i">(but the mines move...)</h5>
        <NoSSR>
            <MineFieldContextProvider width={24} height={16} mines={100}>
                <Minefield />
                <FlagControls />
            </MineFieldContextProvider>
        </NoSSR>
    </Fragment>;
}

export default Home;
