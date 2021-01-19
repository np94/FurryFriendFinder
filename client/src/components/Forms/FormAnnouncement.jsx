import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import apiHandler from '../../api/apiHandler';

import UserContext from "../Auth/UserContext";


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
    
    imageRef = React.createRef();
   
  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)

        const fd = new FormData();

        for (let key in this.state) {
            fd.append(key, this.state[key]);
        }

        fd.append("image", this.imageRef.current.files[0]);

        apiHandler
          .addAnnounce(fd, {
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
            this.props.history.push("/profile");

          });
      };

    render() {
        return (
            <form onSubmit={this.handleSubmit}
            ref={this.formRef}>
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
              value={this.state.email}
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
            <label htmlFor="image">Image</label>
            <input
              ref={this.imageRef}
              onChange={this.handleChange}
              value={this.state.image}
              id="image"
              name="image"
              type="file"
            />
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