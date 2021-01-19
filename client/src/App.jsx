import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Missing from "./pages/Missing";
import Found from "./pages/Found";
import NavBottom from "./components/NavBottom";
import OneMissing from "./pages/OneMissing";
import OneFound from "./pages/OneFound";
import NewReport from "./pages/NewReport";
import FormEditAnnounce from "./components/Forms/FormEditAnnounce"
import FormProfile from "./components/Forms/FormProfile";


function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/missing" component={Missing} />
        <Route exact path="/create" component={NewReport} />
        <Route exact path="/missing/:id" component={OneMissing} />
        <Route exact path="/found/:id" component={OneFound} />
        <Route exact path="/found" component={Found} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" 
        component={Profile}
         />
        <ProtectedRoute exact path="/profile/:id/edit" 
        component={FormEditAnnounce}
         />
        <ProtectedRoute exact path="/profile/settings" 
        component={FormProfile}
         />
      </Switch>
      <NavBottom/>
    </div>
  );
}

export default App;
