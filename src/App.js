
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import homeComponent from "./component/homeComponent"

function App() {
  return (<Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={homeComponent} />
            <Route path="*" component={()=> "404 Not Found"}/>
          </Switch>
    </div></Router>
  );
}
export default App;