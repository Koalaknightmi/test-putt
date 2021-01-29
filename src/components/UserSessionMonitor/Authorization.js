import React from 'react'
import LS from '../../utils/LocalStorage'
import AuthContext from './AuthContext'
import {addFirebase} from "../../services/Firebase"

const AddUserdata = Component => {
  class UserAuth extends React.Component {
    constructor(props){
      super(props)

      this.state = {
        user: LS.programdata.user
      }
    }
    componentDidMount() {
      this.userListener = this.props.firebase.authListener(
        (data) =>{
          LS.updateprogramdata(data,["user"])
          this.setState(state => ({
            user: LS.programdata.user
          }));
        },
        () => {
          LS.updateprogramdata(null,["user"])
          this.setState(state => ({
            user: LS.programdata.user
          }));
        }
      )
    }

    componentWillUnmount() {
      this.userListener()
    }
    
    render(){
      return (
        <AuthContext.Provider value = {this.state.user}>
          <Component {...this.props}/>
        </AuthContext.Provider>
      )
    }
  }
  return addFirebase(UserAuth)
}


export default AddUserdata