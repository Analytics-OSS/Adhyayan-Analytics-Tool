import './App.css';
import React,{Fragment} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path = '/'><Home/></Route>
          <Route exact path = '/submitDetails'><Dashboard/></Route>
        </Switch>
      </Router>
         
    </Fragment>
  );
}

export default App;
