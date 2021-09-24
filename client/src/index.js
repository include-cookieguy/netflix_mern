import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import DataProvider from './redux/store.js';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
