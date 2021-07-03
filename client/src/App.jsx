import React, { Profiler } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Routes from './routes/Routes';
import './styles/antd.less';
import './App.scss';

const App = () => {

  return (
      <Router>
        <Routes />
      </Router>
  );
};

export default App;
