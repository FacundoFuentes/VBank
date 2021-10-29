import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";

import LandingPage from "./pages/LandingPage/LandingPage";

import Transfer from "./pages/Transfer/Transfer";

import Sidebar from './components/Sidebars/Sidebar.jsx';
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  return (
        <Router>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path='/'>
        <Route exact path="/home/transfer" component={Transfer}/>
        <Route path ="/home" component={Sidebar}/>
      {/*   <Route  path="/home" component={Sidebar} /> */}
        <Route exact path="/user/signUp"  component={SignupPage}/>
        <Route exact path="/home" component={Home} />
        </Route>
            
       
     
        
       </Switch>
    </Router>    

  );
}

export default App;
