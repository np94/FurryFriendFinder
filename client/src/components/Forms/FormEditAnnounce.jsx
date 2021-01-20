import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import UserContext from "../Auth/UserContext";
import { buildFormData } from "../../utils";


class FormEditAnnounce extends Component {
    static contextType = UserContext;
    state = {
        title: "",
        name: "",
        location: "",
        email: "",
        description: "",
        image:"",
        location: {
          coordinates: [],
        },
        status:"",
        pet_type:"",
        comments:"",
    };

    imageRef = React.createRef();

    componentDidMount() {
        const announceId = this.props.match.params.id;
        apiHandler
          .getOneAnnounce(announceId)
          .then((apiResponse) => {
            console.log(apiResponse)
            this.setState({
               announce: apiResponse
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      handleChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;
        this.setState({ [key]: value });
      };


    handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData();
        const { httpResponse, ...data } = this.state;
        buildFormData(fd, data)

        fd.append("image", this.imageRef.current.files[0]);

        const announceId = this.props.match.params.id;

        apiHandler
          .updateAnnounce(announceId, fd)
          .then((data) => {
            this.props.history.push("/profile");
            this.setState({
                httpResponse: {
                  status: "success",
                  message: "Item successfully added.",
                },
              });
              this.timeoutId = setTimeout(() => {
                this.setState({ httpResponse: null });
              }, 1000);
            })
            .catch((error) => {
              this.setState({
                httpResponse: {
                  status: "failure",
                  message: "An error occured, try again later.",
                },
              });
              this.timeoutId = setTimeout(() => {
                this.setState({ httpResponse: null });
              }, 1000);
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
              value={this.state.location.coordinates}
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
            <div className="form-group">
            <label className="label" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              onChange={this.handleChange}
              value={this.state.status}
            >
              <option value="" disabled>
                Select a status
              </option>
              <option value="Missing">Missing</option>
              <option value="Found">Found</option>
            </select>
          </div>
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
    };
};

export default FormEditAnnounce;