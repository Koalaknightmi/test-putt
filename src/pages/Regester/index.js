import React, { Component } from 'react'
import LS from '../../utils/LocalStorage'
import { addFirebase } from "../../services/Firebase"
import { Link, withRouter } from 'react-router-dom';
import ROUTES from '../../static/routes';

import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {stances,types} from '../../static/PuttingStancesAndTypes'

const default_presets = {
	username: "",
	email: "",
	password: "",
	password2: "",
	admin: false,
	savechecked: false,
	error: null,
  canSubmit:false
}

const putStats_presets = {
  made:0,
  drills:0,
  missed:0,
  username:"",
  longestputtmade:{time:0,dist:0,id:""},
  timeSpentPutting:0,
  lastTimePutting:0,
  beststreak:{time:0,streak:0,id:""},
  madebytype:{}
}

function erroro (t,v){
  return { type: t, value: v }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const RegesterPage = () => (
  <div>
    <RegesterForm/>
  </div>
)

class RegesterFormBase extends Component {
	constructor(props) {
		super(props)
		this.state = default_presets
	}

  checkPass = (p1,p2) => {
    if (p2 !== p1) {
				return erroro("password","Passwords Do Not Match!");
			} else if (this.state.error && this.state.error.value === "Passwords Do Not Match!") {
				return null;
			}
  }
  checkEmail = (e) =>{
    console.log(validateEmail(e))
    if (!validateEmail(e)) {
      return erroro("email","Invalid Email Address!");
    } else if (this.state.error && this.state.error.value === "Invalid Email Address!") {
      return null;
    }
  }

  componentDidMount (){
    stances.forEach((s) => {
      types.forEach((t) =>{
        putStats_presets.madebytype[s+"_"+t.name.replace(" ","_")] = {
          made:0,
          missed:0
        }
      })
    })
  }

	onChange = (e) => {
    let value = e.target.value
    if (e.target.name.includes("pass")) {
      let pass1 = (e.target.name.includes("1")) ? this.state.password2 : this.state.password;
      let pass2 = value;
      let passerror = this.checkPass(pass1,pass2)
      let emailerror = this.checkEmail(this.state.email)
      console.log(passerror)
      if(passerror){
        this.setState(state => ({
					error: passerror,
          [e.target.name]: pass2,
          canSubmit: false
				}));
      } else if(emailerror){
        this.setState(state => ({
					error: emailerror,
          [e.target.name]: pass2,
          canSubmit: false
				}));
      } else{
         this.setState(state => ({
					error: null,
          [e.target.name]: pass2,
          canSubmit: true
				}));
      }
		} else if (e.target.name.includes("email")){
        let passerror = this.checkPass(this.state.password,this.state.password2)
        let emailerror = this.checkEmail(value)
        if(emailerror){
          this.setState(state => ({
            error: emailerror,
            [e.target.name]: value,
            canSubmit: false
          }));
        } else if(passerror){
          this.setState(state => ({
            error: passerror,
            [e.target.name]: value,
            canSubmit: false
          }));
        } else{
         this.setState(state => ({
					error: null,
          [e.target.name]: value,
          canSubmit: true
				}));
      }
      }
		this.setState(state => ({
			[e.target.name]: e.target.value,
      canSubmit: state.error ? false : true
		}));
	}

	onChangeCheckbox = e => {
		this.setState({ [e.target.name]: e.target.checked });
	};

	onSubmit = (e) => {
    e.preventDefault()
    const firebase = this.props.firebase
    const state = this.state
    firebase.signUpWithPassword(this.state.email,this.state.password)
      .then((user)=>{
        console.log(user)
          let date = firebase.fieldValue.serverTimestamp()
          firebase.user(user.user.uid).set({
            username:state.username,
            admin:false,
            lastLogin:date,
            dateJoined:date,
            visits:0,
            measurment:"ft",
            dist:10,
            stance:"Staggered",
            type:"Spin Putt",
            loggedIn:true
          })
          putStats_presets.username = state.username;
          firebase.puttlogstats(user.user.uid).set(putStats_presets)
          LS.updateprogramdata(putStats_presets,["putts","stats"])
          console.log("registered")
      }).then(() => {
        this.setState({ ...default_presets });
        this.props.history.push(ROUTES[0].route);
      }).catch((e)=>{
        if(e.code==="auth/email-already-in-use"){
          this.setState(state => ({
            error: erroro("email","That Email Is Already In Use!"),
            canSubmit: false
          }));
        } else if(e.code === "auth/invalid-email"){
          this.setState(state => ({
            error: erroro("email","That Email Is Invalid!"),
            canSubmit: false
          }));
        } else if(e.code === "auth/weak-password"){
          this.setState(state => ({
            error: erroro("password","That Password Is Too Weak!"),
            canSubmit: false
          }));
        }
        console.log(e)
      })
	}

	render() {
		const { username, email, password, password2, savechecked, error, canSubmit } = this.state
    return (
      <Container>
			<form autoComplete="on" onSubmit={this.onSubmit}>
				<TextField
          onChange = {this.onChange}
					id="R-username-input"
					label="Username"
					name="username"
          value={username}
					error={error && error.type === "email"} 
          helperText={(error &&
						error.type === "username" && error.value
					)} />
				<TextField
          type = "email"
          onChange = {this.onChange}
					id="R-email-input"
					label="Email"
					name="email"
          value={email}
					error={error && error.type === "email"}
          helperText={(error &&
						error.type === "email" && error.value
					)} />
				<TextField
          type = "password"
          onChange = {this.onChange}
					id="R-password-input"
					label="password"
					name="password"
          value={password}
					error={error&&error.type === "password"}
          helperText={(error &&
						error.type === "password" && error.value
					)} />
				<TextField
          type = "password"
          onChange = {this.onChange}
					id="R-password2-input"
					label="password2"
					name="password2"
          value={password2}
					error={error&&error.type === "password"}
          helperText={(error &&
						error.type === "password" && error.value
					)} />
          <Button disabled={!canSubmit} type = "submit" variant="contained" color="secondary">
            Submit
          </Button>
			</form>
      </Container>
		)
	}
}

const RegesterForm = withRouter(addFirebase(RegesterFormBase))

export default RegesterPage

export {RegesterForm}

