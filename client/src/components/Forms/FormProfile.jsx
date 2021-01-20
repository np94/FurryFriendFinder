import React, { Component } from "react";
import { buildFormData } from "../../utils";
import apiHandler from "../../api/apiHandler";
import UserContext from "../Auth/UserContext";


class FormProfile extends Component {
  static contextType = UserContext;
  state = {
      user: {
        username: "",
        password:"",
        profilImg: "",
        phone_number: 0,
      }
  };

  imageRef = React.createRef();

  componentDidMount() {
    const userId = this.props.match.params.id;
    apiHandler
      .getUserInfos(userId)
      .then((data) => {
        this.setState({ user: data});
      })
      .catch((error) => {
        console.log(error);
      });
    }

  handleChange = (event) => {
    const key = event.target.name; 
    const value = event.target.value;
    this.setState({ user: { ...this.state.user, [key]: value } });
  };

  isValidInput = (key) => {
    if (this.state.user[key] === "") {
      return false;
    } else return true;
  };

  checkError = () => {
    for (const key in this.state.user) {
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const {...data} = this.state;
    buildFormData(fd, data)

    fd.append("profileImg", this.imageRef.current.files[0]);
    

    apiHandler
      .updateUser(fd)
      .then((data) => {
        this.props.history.push("/profile");
        this.setState({
          httpResponse: {
            status: "success",
            message: "Profile successfully updated.",
          },
        });
        this.context.setUser(data);
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Something bad happened while updating your profile, try again later",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };

  render() {
    return (
        <div className="missing">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1 className="header">Edit profile</h1>
          <img style={{width: 100, height: 100}} src={this.state.user.profileImg} alt="animal"/>
          <label className="label" htmlFor="image">
            </label>
            <input
              ref={this.imageRef}
              onChange={this.handleChange}
              id="profilImg"
              name="profilImg"
              type="file"
            />
            
          <div className="form-group">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              className="input"
              id="username"
              type="text"
              name="username"
              onChange={this.handleChange}
              value={this.state.user.username}
            />
            {!this.isValidInput("username") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="text"
              name="password"
              onChange={this.handleChange}
              value={this.state.user.password || ""}
              
            />
            {!this.isValidInput("password") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              onChange={this.handleChange}
              value={this.state.user.phoneNumber}
            />
            {!this.isValidInput("phoneNumber") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>
          <button>Save</button>
        </form>
      
      </div>
    );
  }
}

export default FormProfile;
