import React from "react";
import { NavLink } from "react-router-dom";
import AppMap from "../components/AppMap";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  static contextType = UserContext;
  state = {
    selectedItem: null,
    announces: [],
  };

  componentDidMount() {
    apiHandler.getAnnounce().then((data) => {
      this.setState({ announces: data });
    });
  }

  onSelectAnnounce = (selectedAnnounce) => {
    this.setState({ selectedAnnounce: selectedAnnounce });
  };

  render() {
    const { user } = this.context;

    return (
      
      <React.Fragment>
      
      <AppMap announces={this.state.announces} handleSelectAnnounce={this.onSelectAnnounce} />
      <button><NavLink to="/profile">Missing</NavLink></button>
    </React.Fragment>
       
    );
  }
}

export default Home;
