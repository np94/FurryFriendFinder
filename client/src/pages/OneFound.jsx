import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import '../styles/found.css';

class OneFound extends Component {
    state = {
        announce: [],
    };

    componentDidMount() {
        
        const announceId = this.props.match.params.id;
        apiHandler
        .getOneAnnounce(announceId)
        .then((apiResponse) => {
            console.log(apiResponse);
              this.setState({
                announce: apiResponse
              });
        });
    }
  
    render() {
      if (!this.state.announce) {
        return <div>Looking for your announcement..</div>;
      }
  
      return (
        <div className="missing">
          <h2>Found details</h2>
          <div>
            
            <img src={this.state.announce.image} alt="bob"/>
            <h2>{this.state.announce.title}</h2>
            <h3>{this.state.announce.name}</h3>
            <h4>{this.state.announce.formattedAddress}</h4>
            <p>{this.state.announce.email}</p>
            <p>{this.state.announce.description}</p>
            <p>{this.state.announce.pet_type}</p>
            <p>{this.state.announce.comments}</p>
          </div>
      
        </div>
      );
    }
    
}

export default OneFound;

