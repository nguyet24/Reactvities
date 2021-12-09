import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';

//React.strictmode will enforce anything that is our of date from react 17
ReactDOM.render(
  //This provides the StoreContext from stores.ts file to our application
  <StoreContext.Provider value={store}>
    <BrowserRouter> {/* This allows us to use routing from react-router in our app */}
      <App />
    </BrowserRouter> 
  </StoreContext.Provider>,
   
  document.getElementById('root')//This tells react to get the info from the DIV 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
