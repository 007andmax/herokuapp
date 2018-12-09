import React, { Component } from "react";
import "../assets/css/add-user.css";
let axios = require("axios");
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      formErrors: { email: "", first_name: "", last_name: "", phone: "" },
      emailValid: false,
      first_nameValid: false,
      last_nameValid: false,
      phoneValid: false,
      formValid: false
    };
   
    this.addUser = this.addUser.bind(this);
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState( { [name]: value  }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let phonedValid = this.state.phoneValid;
    let first_nameValid = this.state.first_nameValid;
    let last_nameValid = this.state.last_nameValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "phone":
        phonedValid = value.length >= 6;
        fieldValidationErrors.phone = phonedValid ? "" : " is too short";
        break;
      case "first_name":
        first_nameValid = value.length >= 1;
        fieldValidationErrors.first_name = first_nameValid ? "" : " is invalid";
        break;
      case "last_name":
        last_nameValid = value.length >= 1;
        fieldValidationErrors.last_name = last_nameValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        phonedValid: phonedValid,
        first_nameValid: first_nameValid,
        last_nameValid: last_nameValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.phonedValid &&
        this.state.first_nameValid &&
        this.state.last_nameValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  addUser() {
    axios
    .post(
      'https://frontend-test-job.herokuapp.com/api/v1/users', {
        api_key: this.props.apikey,
        first_name: this.state.first_name.value,
        last_name: this.state.last_name.value,
        email: this.state.email.value,
        phone: this.state.phone.value,

      }
    )
    .then(response => {
      console.log(response);
     
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="add-user">
        <div className="add-user-head">
          <h3>Add user</h3>
        </div>
        <div className="add-user-body">
          <form>
            <div className="row">
              <div
                className={`col-6 item-edit-data-user form-group ${this.errorClass(
                  this.state.formErrors.first_name
                )}`}
              >
                <label htmlFor="first_name">First name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  required
                  value={this.state.first_name}
                  onChange={this.handleUserInput}
                />
              </div>
              <div
                className={`col-6 item-edit-data-user form-group ${this.errorClass(
                  this.state.formErrors.last_name
                )}`}
              >
                <label htmlFor="last_name">Last name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  required
                  value={this.state.last_name}
                  onChange={this.handleUserInput}
                />
              </div>
              <div
                className={`col-6 item-edit-data-user form-group ${this.errorClass(
                  this.state.formErrors.email
                )}`}
              >
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Email"
                  name="email"
                  required
                  value={this.state.email}
                  onChange={this.handleUserInput}
                />
              </div>
              <div
                className={`col-6 item-edit-data-user form-group ${this.errorClass(
                  this.state.formErrors.phone
                )}`}
              >
                <label htmlFor="phone">Phone</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  required
                  value={this.state.phone}
                  onChange={this.handleUserInput}
                />
              </div>
              <div
                className="col-12 item-edit-data-user form-group"
              >
                <label htmlFor="about">About user</label>
                <textarea
                name="about"
                  className="form-control"
                  placeholder="Description user"
                 ></textarea>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  onClick={this.addUser}
                  disabled={!this.state.formValid}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AddUser;
