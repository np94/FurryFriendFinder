import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import apiHandler from '../../api/apiHandler';
import UploadWidget from "../UploadWidget";
import UserContext from "../Auth/UserContext"

class FormAnnouncement extends Component {
    static contextType = UserContext;
    state = {
        title: "",
        name: "",
        location: "",
        email: "",
        image: "",
        description: "",
        pet_type: "",
        missing: true,
        comments: "",
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value,
        });
    };
    
    handleSubmit = (event) => {
        event.preventDefault();

        const { ...data } = this.state;

        apiHandler
          .addAnnounce(data, {
            title: this.state.title,
            name: this.state.name,
            location: this.state.location,
            email: this.state.email,
            image: this.state.image,
            description: this.state.description,
            pet_type:this.state.pet_type,
            missing:this.state.missing,
            comments:this.state.comments,
          })
          .then((data) => {
            this.props.history.push("/missing");
            // console.log("Created !");
            // console.log(apiResponse);
          });
      };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                <label htmlFor="title">Title</label>
            <input
              onChange={this.handleChange}
              value={this.state.title}
              id="title"
              name="title"
              type="text"
            />
                </div>
          <div>
          <label htmlFor="name">Name</label>
            <input
              onChange={this.handleChange}
              value={this.state.name}
              id="name"
              name="name"
              type="text"
            />
          </div>
            <div>
            <label htmlFor="location">Location</label>
            <input
              onChange={this.handleChange}
              value={this.state.location}
              id="location"
              name="location"
              type="text"
            />
            </div>
            <div>
            <label htmlFor="email">E-mail</label>
            <input
              onChange={this.handleChange}
              value={this.state.first_brewed}
              id="email"
              name="email"
              type="text"
            />
            </div>
            <div>
            <label htmlFor="description">Description</label>
            <input
              onChange={this.handleChange}
              value={this.state.description}
              id="description"
              name="description"
              type="text"
            />
            </div>
         
           <div>
            <UploadWidget ref={this.state.image} name="image">
              Upload image
            </UploadWidget>
          </div>
           
         
            <div>
            <label htmlFor="pet_type">Pet type</label>
            <input
              onChange={this.handleChange}
              value={this.state.pet_type}
              id="pet_type"
              name="pet_type"
              type="text"
            />
            </div>
           
           <div>
           <label htmlFor="comments">Comments</label>
            <input
              onChange={this.handleChange}
              value={this.state.comments}
              id="comments"
              name="comments"
              type="text"
            />
           </div>
           
            <button>Submit !</button>
          </form>
        );
    }
}

export default withRouter(FormAnnouncement);