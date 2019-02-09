import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEuroSign, faPercent, faClock } from '@fortawesome/free-solid-svg-icons';

import { App } from './App';

library.add(faEuroSign, faPercent, faClock);

ReactDOM.render(<App />, document.getElementById('root'));
