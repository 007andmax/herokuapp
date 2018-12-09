import React, { Component } from "react";
import { UpdateUser } from "./class/update-user";
import { addUser } from "../actions/user";
import { EDIT_USER } from "../constants/action-user";
import { connect } from "react-redux";
import "../assets/css/edit-user.css";
let axios = require("axios");
const initialState = {
    id:0,
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  description: "",
  formErrors: {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    description: ""
  },
  emailValid: false,
  first_nameValid: false,
  last_nameValid: false,
  phoneValid: false,
  formValid: false,
  descriptionValid: true,
  addDescription: false
};
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.UpdateUser = this.UpdateUser.bind(this);
    this.checkAddDescription = this.checkAddDescription.bind(this);
  }
  componentWillReceiveProps(nextProps) {
   
    if (nextProps.userState.action && nextProps.userState.action === EDIT_USER) {
        document.body.querySelector(".edit-user").style.display = "block";
     this.resetData(nextProps.userState.data);
    }
    // return true;
  }
  resetData(user) {
    this.setState(initialState,() => {
        this.setState({id:user.id, email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        description: user.about})
    });
    document.body.querySelector(".body-description").style.display = (user.about === "") ? "none" : "block";
    document.body.querySelector("#add-about").checked = (user.about === "") ? false : true;
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let first_nameValid = this.state.first_nameValid;
    let last_nameValid = this.state.last_nameValid;
    let descriptionValid = this.state.descriptionValid;
    console.log('descriptionValid',descriptionValid)
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "phone":
        phoneValid = value.length >= 6;
        fieldValidationErrors.phone = phoneValid ? "" : " is too short";
        break;
      case "first_name":
        first_nameValid = value.length >= 1;
        fieldValidationErrors.first_name = first_nameValid ? "" : " is invalid";
        break;
      case "last_name":
        last_nameValid = value.length >= 1;
        fieldValidationErrors.last_name = last_nameValid ? "" : " is invalid";
        break;
      case "description":
        descriptionValid =
          this.state.addDescription && value.length >= 1
            ? true
            : this.state.addDescription && value.length < 1
            ? false
            : true;
        fieldValidationErrors.description = descriptionValid
          ? ""
          : " is invalid";
          console.log('descriptionValid',descriptionValid)
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        phoneValid: phoneValid,
        first_nameValid: first_nameValid,
        last_nameValid: last_nameValid,
        descriptionValid: descriptionValid
      },
      this.validateForm
    );
  }

  validateForm() {
  /*  console.log("this.state.emailValid", this.state.emailValid);
    console.log("this.state.phoneValid", this.state.phoneValid);
    console.log("this.state.first_nameValid", this.state.first_nameValid);
    console.log("this.state.last_nameValid", this.state.last_nameValid);
    console.log("this.state.descriptionValid", this.state.descriptionValid);*/
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.phoneValid &&
        this.state.first_nameValid &&
        this.state.last_nameValid &&
        this.state.descriptionValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  UpdateUser(e) {
    e.preventDefault();
    let updateUser = new UpdateUser(
      this.props.apikey,
      this.state.email,
      this.state.first_name,
      this.state.last_name,
      this.state.phone,
      this.state.addDescription ? this.state.description : undefined
    );
    console.log("updateUser", updateUser);
    axios
      .put(`https://frontend-test-job.herokuapp.com/api/v1/users/${this.state.id}`, {params:updateUser})
      .then(response => {
        console.log(response);
        if (response.status === 200) {
      /*    this.resetData();
          this.props.addUserComplite(response.data);*/
        } 
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  checkAddDescription(e) {
    document.body.querySelector(".body-description").style.display = e.target
      .checked
      ? "block"
      : "none";
    this.setState({
      addDescription: e.target.checked,
      description: "",
      descriptionValid: !e.target.checked
    }, this.validateForm);
  }
  render() {
    return (
      <div className="her-container edit-user">
        <div className="her-head">
          <h3>Edit user</h3>
        </div>
        <div className="her-body add-user-body">
          <form>
            <div className="row">
              <div
                className={`col-6 item-edit-data-user form-group ${this.errorClass(
                  this.state.formErrors.first_name
                )}`}
              >
                <label htmlFor="first_name">First name</label>
                <span>{this.state.formErrors.first_name}</span>
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
                <span>{this.state.formErrors.last_name}</span>
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
                <span>{this.state.formErrors.email}</span>
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
                <span>{this.state.formErrors.phone}</span>
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
              <div className="col-12 item-edit-data-user form-group">
                <div className="add-description">
                  <input
                    type="checkbox"
                    id="add-about"
                    name="add-about"
                    onChange={this.checkAddDescription}
                  />
                  <label htmlFor="add-about">Add description user</label>
                </div>
                <div
                  className={`body-description form-group ${this.errorClass(
                    this.state.formErrors.description
                  )}`}
                >
                  <label htmlFor="description">Description user</label>
                  <span>{this.state.formErrors.description}</span>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Description user"
                    value={this.state.description}
                    onChange={this.handleUserInput}
                  />
                </div>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  onClick={this.UpdateUser}
                  disabled={!this.state.formValid}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
    return { userState: state.userState };
};

let mapDispatchToProps = dispatch => {
  return {
    addUserComplite: data => {
      dispatch(addUser(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);