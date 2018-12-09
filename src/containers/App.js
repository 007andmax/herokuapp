import React, { Component } from "react";
import AddUser from "./add-user";
import UserList from "./user-list";
import EditUser from "./edit-user";
import Alert from "./alert";
import { ERROR } from "../constants/event";
import { connect } from "react-redux";
import "../assets/css/update.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
class App extends Component {
  API_KEY = "xcHJVJla3ltd5z5j";
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.event.action && nextProps.event.action === ERROR) {
      console.log("nextProps", nextProps);
      this.setState({
        showAlert: true,
        alertMessage: nextProps.event.data.error
      });
    }
    // return true;
  }
  render() {
    return (
      <div className="her-fon">
        <div className="container">
          <div className="row">
            <div className="col-4 mr-auto ml-auto">
              <AddUser apikey={this.API_KEY} />
              <EditUser apikey={this.API_KEY} />
              <UserList apikey={this.API_KEY} />
            </div>
          </div>
        </div>
        <Alert
          showAlert={this.state.showAlert}
          message={this.state.alertMessage}
        />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { event: state.eventState };
};

let mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
