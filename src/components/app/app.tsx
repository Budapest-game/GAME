import React, { PureComponent } from 'react';
import './app.css';
import { Navigation } from '../navigation/navigation';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <Navigation />
      </div>
    );
  }
}
