import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import "./Login.css"

class Login extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      redirectTo: null
    }
    // this.googleSignin = this.googleSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')
    this.props._login(this.state.user, this.state.password)
    this.setState({
      redirectTo: '/menu'
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className="container">
          <div className="form">
            <h3>Login form</h3>
            <form>
              <label htmlFor="email">Email</label>
              <div className="input-field col s6">
                <input type="text" className="validate"
                  type="text"
                  name="user"
                  value={this.state.user}
                  onChange={this.handleChange}
                  placeholder="Email"
                />                
              </div>
              <label htmlFor="password">Password</label>
              <div className="input-field col s6">               
                <input type="text" className="validate"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
              </div>
              <button className="btn waves-effect waves-light #ab47bc purple lighten-1" type="submit" name="action" onClick={this.handleSubmit}>Login</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default Login;


 // // Setting the component's initial state
 //  state = {
 //    user: "",
 //    passWord: ""
 //  };

 //   handleInputChange = event => {
 //    // Getting the value and name of the input which triggered the change
 //    const value = event.target.value;
 //    const name = event.target.name;

 //    // Updating the input's state
 //    this.setState({
 //      [name]: value
 //    });
 //  };

 //  handleFormSubmit = event => {
 //    // Preventing the default behavior of the form submit (which is to refresh the page)
 //    event.preventDefault();
 //    var user = this.state.user;
 //    var password = this.state.passWord
 //    calls.logUser(user, password).then(function(result){
 //      console.log("this is result htmlFor loguser", result)
 //      calls.logSuccess();
 //    });
 //  };
  
 //  render() {
 //    // Notice how each input has a `value`, `name`, and `onChange` prop
 //    return (
 //      <div className="container">
 //      <h1>teTri-X</h1>
 //        <p>
 //          Hello {this.state.user} {this.state.passWord}
 //        </p>
 //        <form className="form">
 //          <div className="row">
 //            <div className="input-field col s6">
 //              <input
 //                value={this.state.user}
 //                name="user"
 //                onChange={this.handleInputChange}
 //                type="text"
 //                placeholder="E-mail here"
 //              />
 //            </div>
 //            <div className="input-field col s6">
 //              <input
 //                value={this.state.passWord}
 //                name="passWord"
 //                onChange={this.handleInputChange}
 //                type="text"
 //                placeholder="Password"
 //              />
 //            </div>
 //          </div>
 //          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleFormSubmit}>Submit</button>
 //        </form>
 //      </div>
 //    );
 //  }