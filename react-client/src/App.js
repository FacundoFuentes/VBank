import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignupPage from "./pages/SignupPage";
import Transfer from "./pages/Transfer/Transfer";

import Sidebar from './components/Sidebars/Sidebar.jsx';

function App() {
  return (
        <Router>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path='/'>
        <Route  path="/home" component={Sidebar} />
        <Route exact path="/home" component={Home} />
        </Route>
        <Route exact path="/user/signUp" component={SignupPage} />
        {/* <Route exact path="/user/signIn" component={} /> */}
<<<<<<< Updated upstream
        </Switch>
        </Router>
=======
        <Route exact path="/home/transfer" component={Transfer}/>
    </BrowserRouter>    

>>>>>>> Stashed changes
  );
}

export default App;
