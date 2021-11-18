import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";

import LandingPage from "./pages/LandingPage/LandingPage";
import Transfer from "./pages/Transfer/Transfer";
import SignupPage from "./pages/SignupPage/SignupPage";
import FixedTerm from "./pages/FixedTerm/FixedTerm";

import Profile from "./pages/Profile/Profile";
import Charge from "./pages/Charge/Charge";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebars/Sidebar";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import RecoverPass from "./pages/RecoverPassPage/RecoverPass"
import VerifyAccount from "./pages/VerifyAccountPage/VerifyAccount"

function App() {
  return (
        <Router>
          <ToastContainer/>
        <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path={["/home","/user"]} render={()=>( <> <Sidebar/> <Home/> </> )} />
        <Route exact path="/home/changePassword" render={()=> (<> <Sidebar/> <ChangePassword/> </>)}/>
        <Route exact path="/home/transfer" render={()=> (<> <Sidebar/> <Transfer/> </>)}/>
        <Route exact path="/home/charge" render={()=> (<> <Sidebar/> <Charge/> </>)}/>
        <Route exact path="/user/signUp"  render={()=> (<> <SignupPage/> </>)}/>  
        <Route exact path="/fixedTerm" render={()=> (<> <Sidebar/> <FixedTerm/> </>)}/>
        <Route exact path="/user/profile"  render={()=> (<> <Sidebar/> <Profile/> </>)}/>
        <Route exact path="/Charge" render={()=> (<> <Sidebar/> <Charge/> </>)}/> 
        <Route exact path="/user/recover" render={()=> (<> <RecoverPass/> </>)}/> 
         <Route exact path="/user/verify" render={()=> (<> <VerifyAccount/> </>)}/> 
       </Switch>
    </Router>    

  );
}

export default App;
