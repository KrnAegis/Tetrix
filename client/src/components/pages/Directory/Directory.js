// import { responseGoogle } from "./Google.js"
import React, { Component } from "react";
import "./Directory.css";



class Directory extends Component {  

  render() {
    return(
      <div className="container">
            <div className="fill">
              <div className="card">
                <div className="card-image">
                  <img alt={"tetrix"} src={require("./tetris.jpg")}/>
                  <span className="card-title">Welcome to Tetrix! Login or Sign Up to play!</span>
                </div>
              </div>
            </div>
      </div>
    )
  }
}
export default Directory;
