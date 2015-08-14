import 'babel/polyfill';
import React from 'react';
import Router from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './routes';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import 'isomorphic-fetch';

const history = new BrowserHistory();
const dest = document.getElementById('content');
const store = createStore(window.__data);

const component = (
    <Provider {...{store}}>
        {() => <Router history={history} children={routes}/> }
    </Provider>);

if (__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    console.info('You will see a "Warning: React attempted to reuse markup in a container but the checksum was' +
        ' invalid." message. That\'s because the redux-devtools are enabled.');
    React.render(<div>
        {component}
        <DebugPanel top right bottom key="debugPanel">
            <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
    </div>, dest);
} else {
    React.render(component, dest);
}

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger
    const reactRoot = window.document.getElementById('content');

    if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}
