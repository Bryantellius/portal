import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReduxProvider from './store/ReduxProvider';
import AuthProvider from './features/auth/AuthProvider';
import Theme from './features/theme/Theme';

ReactDOM.render(
  <Theme>
    <AuthProvider>
      <ReduxProvider>
        <Router>
          <App />
        </Router>
      </ReduxProvider>
    </AuthProvider>
  </Theme>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


