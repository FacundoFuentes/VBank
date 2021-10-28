import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignupPage from "./pages/SignupPage";

import Sidebar from './components/Sidebars/Sidebar.jsx';

function App() {
  return (
        <Router>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path='/'>
        <Route  path="/home" component={Sidebar} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/user/signUp" component={SignupPage} />
        {/* <Route exact path="/user/signIn" component={} /> */}
        </Route>
        </Switch>
        </Router>
  );
}

export default App;
