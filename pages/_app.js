import React from 'react';
import './app.scss';

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
    return <div className="container">
        <Component {...pageProps} />
    </div>;
}

export default App;
