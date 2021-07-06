import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth0Provider from './features/auth/Auth0Provider';
import reportWebVitals from './reportWebVitals';
import ReduxProvider from './store/ReduxProvider';
import Theme from './features/theme/Theme';

ReactDOM.render(
  <Theme>
    <ReduxProvider>
      <Auth0Provider>
        <App />
      </Auth0Provider>
    </ReduxProvider>
  </Theme>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


