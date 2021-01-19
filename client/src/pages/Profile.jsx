import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import withUser from "../components/Auth/withUser"


class Profile extends Component {
  static contextType = UserContext;
  
  state = {
    userAnnounces:[],
    selectedAnnounce: null,
  };

  componentDidMount() {
    apiHandler
    .getUserAnnounce()
    .then((data) => {
      this.setState({ userAnnounces: data });
    });
  }

  deleteAnnounce = (announceId) => {
    apiHandler.removeAnnounce(announceId).then(() => {
      const userAnnounces = [...this.state.userAnnounces].filter(
        (announce) =>  announce._id !== announceId
      );
      this.setState({ userAnnounces });
    });
  };

  onAnnounceSelect = (announceId) => {
    const selectedAnnounce = this.state.userAnnounces.find(
      (announce) => announce._id === announceId
    );
    this.setState({ selectedAnnounce: selectedAnnounce });
  };

  onEditFormClose = () => {
    this.setState({ selectedAnnounce: null });
  };

  handleAnnounceUpdate = (updatedAnnounce) => {
    const userAnnounces = [...this.state.userAnnounces].map((announce) =>
    announce._id === updatedAnnounce._id ? updatedAnnounce : announce
    );
    this.setState({ userAnnounces });
  };
  
  addAnnounce = (announce) => {
    this.setState({ userAnnounces: [...this.state.userAnnounces] });
  };

  render() {
    const { user } = this.context;
    const { userAnnounces } = this.state;
    if (!user) return null;
    return (
      <section className="Profile">

        
        <div className="user-presentation">
          <h2 className="title">
            {user.username}
          </h2>
          <button><NavLink to="/create">Report Missing</NavLink></button>

          <button><Link className="link" to="/profile/settings">Edit profile</Link></button>
        </div>

          
          <div className="FormAnnouncement">
            <h3>Your announcements</h3>
            {this.state.userAnnounces  && this.state.userAnnounces.map((announce) => {
                if (announce.missing){
                    return (
                        <div className="missing_info" 
                        key={announce._id}   
                       >
                            <img
                          style={{
                            width: "100vw",
                            height: "",
                          }}
                          src={announce.image}
                          alt={announce.name}
                            />
                        <Link to={`/missing/${announce._id}`}>
                          <h2>{announce.title}</h2>
                        </Link>
                        <h3>{announce.name}</h3>
                        <h3>{announce.location}</h3>
                        <h3>{announce.pet_type}</h3>
                        <h3>{announce.description}</h3>
                        <Link to={`/profile/${announce._id}/edit`}>
                    <button>Edit</button>
                      </Link>
                      <button onClick={() => this.deleteAnnounce(announce._id)}>
                    Delete
                  </button>
                        
                      </div>
                    )}
               
            
            })}
          </div>
        

          <React.Fragment>
            <div className="">
              <img src="" alt="" />
            </div>
            <p>You don't have anything to report</p>
          </React.Fragment>
        
        
        
      </section>
    );
  
     
      
  }
}



export default withUser(Profile);

