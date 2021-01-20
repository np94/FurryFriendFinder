import React, { Component } from 'react'
import apiHandler from "../api/apiHandler"
import { Link } from "react-router-dom";

class Found extends Component {
    state = {
        announces: [],
    };

    componentDidMount() {
        apiHandler
        .getAnnounce()
        .then((responseFromApi) => {
          this.setState({
            announces: responseFromApi
          });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    

    render() {
        return (
            <div className="missing">
            <h2>Found page</h2>
             {this.state.announces.map((announce)=>{
                 if (announce.status[0] === "Found"){
                    return (
                        <div key={announce._id}>
                            <img
                          style={{
                            width: "100vw",
                            height: "50vh",
                          }}
                          src={announce.image}
                          alt={announce.name}
                            />
                        <Link to={`/found/${announce._id}`}>
                          <h2>{announce.title}</h2>
                        </Link>
                        <h3>{announce.name}</h3>
                        <h3>{announce.location.coordinates}</h3>
                        <h3>{announce.pet_type}</h3>
                        <h3>{announce.description}</h3>
        
                      </div>
                    )}
               
            
            })}
        </div>
        )
    }
}

export default Found;

