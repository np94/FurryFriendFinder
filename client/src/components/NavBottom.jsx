import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/NavBottom.css";

const NavBottom = () => {
    return (
    <nav className="NavBottom" style={{ width: '100vw', height: '60px', backgroundColor: '#386665' }}>
   
    <ul className="nav-list">
      
        <React.Fragment>
          <li>
            <NavLink to="/missing">Missing</NavLink>
          </li>
        </React.Fragment>
      
        <React.Fragment>
          <li>
            <NavLink to="/found">Found</NavLink>
          </li>
        </React.Fragment>
      
    </ul>
  </nav>
);
};
export default NavBottom;