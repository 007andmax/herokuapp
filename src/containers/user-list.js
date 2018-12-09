import React, { Component } from "react";
import { ADD_USER } from "../constants/action-user";
import { connect } from "react-redux";
import {EditUser} from "../actions/user";
import "../assets/css/user-list.css";
let axios = require("axios");
class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.RemoveUser = this.RemoveUser.bind(this);
    this.EditUser = this.EditUser.bind(this);
  }
  componentWillMount() {
    axios
      .get(
        `https://frontend-test-job.herokuapp.com/api/v1/users?api_key=${
          this.props.apikey
        }`
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ users: response.data.users });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userState.action && nextProps.userState.action === ADD_USER) {
      let users = this.state.users;
      users.push(nextProps.userState.data);
      this.setState({ users: users });
    }
    // return true;
  }
  EditUser (e) {
    let index = Number(e.target.getAttribute("index"));
this.props.onInitEditUser(this.state.users[index]);
  }
  RemoveUser(e) {
    let id_user = Number(e.target.getAttribute("id-user"));
    let index = Number(e.target.getAttribute("index"));
    axios
      .delete(
        `https://frontend-test-job.herokuapp.com/api/v1/users/${id_user}`,
        { params: { api_key: this.props.apikey } }
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          let users = this.state.users;
          users.splice(index, 1);
          this.setState({ users: users });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="her-container user-list">
        <div className="her-head">
          <h3>User List</h3>
        </div>
        <div className="her-body user-list-body">
          {this.state.users.map((item, index) => {
            return (
              <div key={item.id} className="user-item">
                <h6>
                  {item.first_name} {item.last_name}
                </h6>
                <p>Email: {item.email}</p>
                <p>Phone: {item.phone}</p>
                <p style={{ display: item.about === "" ? "none" : "block" }}>
                  Description: {item.about}
                </p>
                <div className="edit" index={index} onClick={this.EditUser} />
                <div
                  id-user={item.id}
                  index={index}
                  className="remove"
                  onClick={this.RemoveUser}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  console.log("state", state);
  return { userState: state.userState };
};

let mapDispatchToProps = dispatch => {
  return {
    onInitEditUser: data => {
        dispatch(EditUser(data));
      }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUser);
