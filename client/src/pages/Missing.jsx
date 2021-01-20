import React, { Component } from 'react'
import apiHandler from "../api/apiHandler"
import { Link } from "react-router-dom";


class Missing extends Component {
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
            <h2 className="missing_title">Missing page</h2>
             {this.state.announces  && this.state.announces.map((announce) => {
                if (announce.status[0] === "Missing"){
                    return (
                        <div className="missing_info" key={announce._id}>
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
                        <h3>{announce.location.coordinates}</h3>
                        <h3>{announce.pet_type}</h3>
                        <h3>{announce.description}</h3>
        
                      </div>
                    )
                  }
               
            
            })}
        </div>
        )
    }
}

export default Missing

