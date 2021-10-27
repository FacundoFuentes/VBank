import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginModal from "./components/Nav/Login/LoginModal";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/user/signUp" component={SignupPage} />
     <Route exact path="/user/signIn" component={LoginModal} /> 
    </BrowserRouter>
  );
}

export default App;
