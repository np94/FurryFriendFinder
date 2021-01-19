import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Redirect } from "react-router-dom";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    username: "",
    email: "",
    password: "",
    phone_number: 0,
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/profile" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
        <label htmlFor="username">Username</label>
        <input
          onChange={this.handleChange}
          value={this.state.username}
          type="username"
          id="username"
          name="username"
        />
        </div>
      <div>
      <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
          />
      </div>
       <div>
       <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
       </div>
        
        <div>
        <label htmlFor="phone_number">Phone number</label>
        <input
          onChange={this.handleChange}
          value={this.state.phone_number}
          type="phone_number"
          id="phone_number"
          name="phone_number"
        />
        </div> 
        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(FormSignup);
