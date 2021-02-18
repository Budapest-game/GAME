import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';

ReactDOM.render(<ErrorBoundary><App/></ErrorBoundary>, document.getElementById('root'));
