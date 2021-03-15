import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './components/app/app';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import './index.css';

function Index() {
  return <App/>;
}
export default Index;
