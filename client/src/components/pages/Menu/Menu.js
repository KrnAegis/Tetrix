
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";



class Menu extends Component {

handleRedirect() {
  window.location.href = "http://www.google.com"
}


  render() {
    return(
      <div className="container">
        <h1>Welcome {this.props.user}</h1>
          <div className="row">
            <div className="col s6 offset-s3">
              <span className="flow-text">
                <Link to="/singleplayer" className="yellow-text accent-2">
                  <button type="button" className="waves-effect waves-light light-blue darken-1 btn-large z-depth-2" onClick={this.handleRedirect}>
                  1 player
                  </button>
                </Link>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <span className="flow-text">
                <Link to="/form" className="yellow-text accent-2">
                  <button type="button" className="waves-effect waves-light light-blue darken-1 btn-large z-depth-2">
                  2 player
                  </button>
                </Link>
              </span>
            </div>
          </div>
      </div>
    )
  }

}
export default Menu;
