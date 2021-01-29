import React, { Component } from 'react'
import LS from '../../utils/LocalStorage'
import { addFirebase } from "../../services/Firebase"
import { Link, withRouter } from 'react-router-dom';
import ROUTES from '../../static/routes';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const default_presets = {
	email: "",
	password: "",
	savechecked: false,
	error: null,
  canSubmit:true
}

function erroro (t,v){
  return { type: t, value: v }
}

const LoginPage = () => (
  <div>
    <LoginForm/>
  </div>
)

class LoginFormBase extends Component {
	constructor(props) {
		super(props)
		this.state = default_presets
	}

	onChange = (e) => {
		this.setState(state => ({
			[e.target.name]: e.target.value,
      canSubmit:true
		}));
	}

	onChangeCheckbox = e => {
		this.setState({ [e.target.name]: e.target.checked });
	};

	onSubmit = (e) => {
    e.preventDefault()
    const firebase = this.props.firebase
    const state = this.state
    firebase.signInWithPassword(this.state.email,this.state.password)
      .then((user)=>{
        console.log(user)
        console.log("logged in")
      }).then(() => {
        this.setState({ ...default_presets });
        this.props.history.push(ROUTES[0].route);
      }).catch((e)=>{
        if(e.code==="auth/user-not-found"){
          this.setState(state => ({
            error: erroro("email","That Email Is Not In Use!"),
            canSubmit: false
          }));
        } else if(e.code === "auth/invalid-email"){
          this.setState(state => ({
            error: erroro("email","That Email Is Invalid!"),
            canSubmit: false
          }));
        } else if(e.code === "auth/wrong-password"){
          this.setState(state => ({
            error: erroro("password","That Password Is Too Wrong!"),
            canSubmit: false
          }));
        }
        console.log(e)
      })
	}

	render() {
		const {email, password, savechecked, error, canSubmit } = this.state
    return (
      <Container>
      {
			(!LS.programdata.user ?(
      <form autoComplete="on" onSubmit={this.onSubmit}>
				<TextField
          type = "email"
          onChange = {this.onChange}
					id="L-email-input"
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
					id="L-password-input"
					label="password"
					name="password"
          value={password}
					error={error&&error.type === "password"}
          helperText={(error &&
						error.type === "password" && error.value
					)} />
          <Button disabled={!canSubmit} type = "submit" variant="contained" color="secondary">
            Submit
          </Button>
			</form>) : (<div>already logged in</div>))
      }
      </Container>
		)
	}
}

const LoginForm = withRouter(addFirebase(LoginFormBase))

export default LoginPage

export {LoginForm}

