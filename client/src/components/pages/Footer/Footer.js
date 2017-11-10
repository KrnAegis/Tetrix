// import { responseGoogle } from "./Google.js"
import React, { Component } from "react";
import "./Footer.css";



class Footer extends Component {  

  render() {
    return(
      <div className="container">
        <footer className="page-footer #8e24aa purple darken-1">
          <div className="footer-copyright #6a1b9a purple darken-3">
            <div className="container">
            <h6>© 2017 Copyright TetriX</h6>
            </div>
          </div>
        </footer>
      </div>
    )
  }

}
export default Footer;
