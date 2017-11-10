import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios";
import './SignUp.css'

class signUp extends Component {
  // Setting the component's initial state
  constructor() {
    super()
    this.state = {
      userName: "",
      passWord: "",
      nickName: "",
      redirectTo: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
   handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    if (this.state.userName !== "" && this.state.passWord !== ""){
      if (this.state.passWord.length > 6 && this.state.passWord.length <15){
    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
        const user = this.state.userName;
        const password = this.state.passWord;
        const nickname = this.state.nickName;
        axios
          .post('/signup', {
            user: user,
            password: password,
            nickname: nickname
          })
          .then(response => {
            console.log(response)
            if (!response.data.error) {
              alert('Sign Up Successful!')
              this.setState({
                redirectTo: '/login'
              })
            } else {
              alert('That email is being used')
            }
          })
      } else if (this.state.passWord.length <= 6){
        alert("You password is too short!")
      } else if (this.state.passWord.length >=15){
        alert("Your password is too long!")
      }
    } else {
      alert("Please input e-mail AND password")
    }

  };
  
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <div className="container">
        <form className="form">
          <h3>Sign up!</h3>
          <div className="row">
            <div className="input-field col s6">
              <input
                value={this.state.userName}
                name="userName"
                onChange={this.handleInputChange}
                type="text"
                placeholder="E-mail here"
              />
            </div>
            <div className="input-field col s6">
              <input
                value={this.state.passWord}
                name="passWord"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                value={this.state.nickName}
                name="nickName"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Nickname"
              />
            </div>
          </div>
          <button className="btn #ab47bc purple lighten-1 waves-effect waves-light" type="submit" name="action" onClick={this.handleFormSubmit}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default signUp;
