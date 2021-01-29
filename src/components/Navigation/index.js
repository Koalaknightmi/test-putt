import ROUTES from '../../static/routes';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import React, { Component } from 'react';

import {AuthContext} from '../UserSessionMonitor'
import theme from '../../styles/theme'

const style = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
};

class Nav extends Component {
  constructor(props){
    super(props)

    this.state = {
      openSidbar:false
    }
  }

  toggleDrawer = (o) => (event) =>{
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState(state => ({
      openSidbar: o
    }))
  }
  /*componentDidMount() {
    this.setdefaults()
    window.addEventListener("beforeunload", this.LOG);
  }

  componentWillUnmount() {
    this.LOG()
    window.removeEventListener("beforeunload", this.LOG);
  }*/
  testperms = (r,user) => {
    if(r.enabled) {
      if(r.permissions){
        if(r.permissions.loggedin&&user){
          return true
        }
      } else{
        return true
      }
    }
    return false
  }

  render() {
    return (
    <AuthContext.Consumer>
      {user => (
      <AppBar>
        <Toolbar>
          <IconButton onClick = {this.toggleDrawer(true)} edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={this.props.classes.title}>
            News
          </Typography>
          {!user && (<Button color="inherit" to = "/Login" component = {Link}>
            Login
          </Button>)}
        </Toolbar>
        <Drawer
          anchor="left"
          open={this.state.openSidbar}
          onClose={this.toggleDrawer(false)}
        >
          <List>
                {
                  ROUTES.map(r => ( 
                  this.testperms(r,user)  && 
                   <ListItem onClick = {this.toggleDrawer(false)} key={r.route} button to={r.route} component={Link}>
                      <ListItemText primary = {r.file.replace("/", "")}/>
                    </ListItem>
                  ))
                }
          </List>
        </Drawer>
      </AppBar>
       )
      }
    </AuthContext.Consumer>
    );
  }
}

export default withStyles(style)(Nav)