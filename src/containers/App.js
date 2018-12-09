import React, { Component } from "react";
import AddUser from "./add-user";
import "../assets/css/update.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
let axios = require("axios");
class App extends Component {
  API_KEY = "xcHJVJla3ltd5z5j";
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
   
  }

  componentWillMount() {
    axios
      .get(
        `https://frontend-test-job.herokuapp.com/api/v1/users?api_key=${
          this.API_KEY
        }`
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ users: response.data.users });
        } else {
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
 
 
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 mr-auto ml-auto">
           <AddUser apikey={this.API_KEY} />
            {this.state.users.map((item, index) => {
              return (
                <div key={index} className="user-item">
                  {{ item }}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
