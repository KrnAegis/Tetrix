import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import Directory from "./components/pages/Directory/index";
import Login from "./components/pages/Login/Login";
import Menu from "./components/pages/Menu/Menu";
import SignUp from "./components/pages/SignUp/SignUp";
import Footer from "./components/pages/Footer/Footer";
import GameOver from "./components/pages/GameOver/GameOver";

const DisplayOptions = props => {
	if (props.loggedIn) {
		return (
		<div className="container">
			<nav>
			    <div className="nav-wrapper">
			      <a href="/" className="brand-logo center">TetriX</a>
				      <ul id="nav-mobile" className="left hide-on-med-and-down">
				        <li>
				        	<Link to="/menu">
				        		Menu
				        	</Link>
				        </li>
				        <li>
				        	<Link to="/home" onClick={props._logout}>
				        		Logout
				        	</Link>
				        </li>
			      </ul>
			    </div>
			</nav>
		</div>
			)
	} else {
		return (
		<div className="container">
		    <nav>
			    <div className="nav-wrapper">
			      <a href="/" className="brand-logo center">TetriX</a>
				      <ul id="nav-mobile" className="left hide-on-med-and-down">
				        <li>
				        	<Link to="/login">
				        		Login
				        	</Link>
				        </li>
				        <li>
				        	<Link to="/signup">
				        		Sign Up
				        	</Link>
				        </li>
			      </ul>
			    </div>
		    </nav>
		</div>
		)
	}
}

// const DisplayDirectory = props => {
// 	if (props.loggedIn){
// 		return (
// 			<div></div>
// 			)
// 	}
// 		else {
// 			return (
// 			<Directory />
// 			)
// 		}
// }

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			nickname: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user.user,
					nickname: response.data.user.nickname
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
				
			}
			console.log("getting to logout");
			window.location = "http://localhost:3000/"
		})
	}

	_login(user, password) {
		axios
			.post('/login', {
				user,
				password
			})
			.then(response => {
				console.log("this is login response", response)
				console.log("and this is login response user", response.data.user.user)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user.user,
						nickname: response.data.user.nickname
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				{/* LINKS to our different 'pages' */}
				<DisplayOptions _logout={this._logout} loggedIn={this.state.loggedIn} />


				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path="/menu" render={() => <Menu user={this.state.nickname} />} />
				<Route exact path="/login" render={() => <Login _login={this._login}/>}/>
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/"  component={Directory}/>
				<Route exact path="/home" render={() => <Directory />}/>
				<Route exact path="/gameover" component={GameOver} />
				{/* <Login _login={this._login} /> */}
				<Footer />
			</div>
		)
	}
}

export default App;

// const App = () =>
//   <Router>
//     <div>
//       <Route exact path="/" component={Directory} />
//       <Route exact path="/login" component={Login} />
//       <Route exact path="/signup" component={SignUp} />
//       <Route exact path="/menu" component={Menu} />
//       <Route path="/search" component={Search} />
//     </div>
//   </Router>;