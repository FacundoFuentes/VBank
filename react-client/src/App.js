import React from "react";
import { BrowserRouter, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";




function App() {
  return (
    <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        
    </BrowserRouter>    
  );
}

export default App;
