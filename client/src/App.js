import './App.css';
import React,{Fragment} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import SubmitFile from './components/SubmitFile/SubmitFile'

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path = '/'><Home/></Route>
          <Route exact path = '/submitDetails'><SubmitFile/></Route>
        </Switch>
      </Router>
         
    </Fragment>
  );
}

export default App;
