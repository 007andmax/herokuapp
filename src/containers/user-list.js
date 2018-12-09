import React, { Component } from "react";
import { ADD_USER, UPDATE_USER } from "../constants/action-user";
import { connect } from "react-redux";
import { EditUser, removeUser } from "../actions/user";
import { showAlert } from "../actions/alert";
import Pagination from "react-js-pagination";
import "../assets/css/user-list.css";
let axios = require("axios");
class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      offset: 0,
      name: "",
      total_count: 0,
      activePage: 1
    };
    this.RemoveUser = this.RemoveUser.bind(this);
    this.EditUser = this.EditUser.bind(this);
    this.onInitSearch = this.onInitSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }
  componentWillMount() {
    this.getUsers();
  }
  getUsers() {
    axios
      .get(
        `https://frontend-test-job.herokuapp.com/api/v1/users?api_key=${
          this.props.apikey
        }&offset=${this.state.offset * 10}&name=${this.state.name}`
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            users: response.data.users,
            total_count: (response.data.total_count) ? response.data.total_count : response.data.users.length
          });
        }
      })
      .catch(error => {
        this.props.showErrorAlert(error.response.data);
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userState.action && nextProps.userState.action === ADD_USER) {
      if (this.state.users.length < 10) {
        let users = this.state.users;
        users.push(nextProps.userState.data);
        this.setState({ users: users });
      }
    }
    if (
      nextProps.userState.action &&
      nextProps.userState.action === UPDATE_USER
    ) {
      let users = this.state.users;
      let index = users.findIndex(
        item => item.id === nextProps.userState.data.id
      );
      users[index] = nextProps.userState.data;
      this.setState({ users: users });
    }
    // return true;
  }

  EditUser(e) {
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
          this.props.onInitRemoveUser({ id: users[index].id });
          users.splice(index, 1);

          if (this.state.activePage > 1 && users.length === 0) {
            let currentPage = this.state.activePage;
            let offset = this.state.offset;
            currentPage--;
            offset--;
            this.setState(
              { activePage: currentPage, offset: offset },
              this.getUsers
            );
          } else {
            this.setState({ users: users });
          }
        }
      })
      .catch(error => {
        this.props.showErrorAlert(error.response.data);
      });
  }
  onInitSearch() {
    if (this.search.value.length > 0) {
      this.setState(
        { name: this.search.value, offset: 0, activePage: 1 },
        this.getUsers
      );
    }
  }
  resetSearch() {
    this.setState({ name: "", offset: 0, activePage: 1 }, this.getUsers);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    let currentPage = this.state.activePage;
    let offset = this.state.offset;
    if (currentPage < pageNumber) {
      offset++;
    }
    if (currentPage > pageNumber) {
      offset--;
    }
    this.setState({ activePage: pageNumber, offset: offset }, this.getUsers);
  }
  render() {
    return (
      <div className="her-container user-list">
        <div className="her-head">
          <h3>User List</h3>
        </div>
        <div className="her-body user-list-body">
          <div className="user-search">
            <h4>Search user</h4>
            <div className="search-body">
              <input
                className="form-control"
                type="text"
                ref={item => (this.search = item)}
                placeholder="Enter user name"
              />{" "}
              <button onClick={this.onInitSearch}>Seach</button>
              <button onClick={this.resetSearch}>Reset</button>
            </div>
          </div>

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
          <nav aria-label="Page navigation example">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={this.state.total_count}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </nav>
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
    },
    showErrorAlert: data => {
      dispatch(showAlert(data));
    },
    onInitRemoveUser: data => {
      dispatch(removeUser(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUser);
