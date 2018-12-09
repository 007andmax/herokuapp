import React, { Component } from "react";
import AddUser from "./add-user";
import UserList from "./user-list";
import EditUser from "./edit-user";
import "../assets/css/update.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
class App extends Component {
  API_KEY = "xcHJVJla3ltd5z5j";
  constructor(props) {
    super(props);
  
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 mr-auto ml-auto">
           <AddUser apikey={this.API_KEY} />
           <EditUser apikey={this.API_KEY} />
           <UserList apikey={this.API_KEY} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
