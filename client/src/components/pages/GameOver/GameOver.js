
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GameOver.css";



class GameOver extends Component {

handleRedirect() {
  window.location = "file:///C:/Users/Hyung/Desktop/New%20folder/Tetris/index.html#kzr8b1"
}


  render() {
    return(
      <div className="container">
        <h1>GAME OVER</h1>
        <h3>You Win! {this.props.user}</h3>
          <div className="row">
            <div className="col s6 offset-s3">
              <span className="flow-text">
                <Link to="/menu" className="yellow-text accent-2">
                  <button type="button" className="waves-effect waves-light #b71c1c red darken-4 btn-large z-depth-2" onClick={this.handleRedirect}>
                  To Menu
                  </button>
                </Link>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <span className="flow-text">
                <Link to="/form" className="yellow-text accent-2">
                  <button type="button" className="waves-effect waves-light #b71c1c red darken-4 btn-large z-depth-2">
                  Play again?
                  </button>
                </Link>
              </span>
            </div>
          </div>
      </div>
    )
  }

}
export default GameOver;
