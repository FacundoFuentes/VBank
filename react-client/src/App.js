import React from "react";

import { BrowserRouter, Route} from "react-router-dom"
import Home from "./pages/Home/Home";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>

        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/user/signUp" component={SignupPage} />
        {/* <Route exact path="/user/signIn" component={} /> */}
    </BrowserRouter>    

  );
}

export default App;
