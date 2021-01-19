import React from "react";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page </h1>
        
        <button><NavLink to="/profile">Missing</NavLink></button>
        
      </div>
    );
  }
}

export default Home;
