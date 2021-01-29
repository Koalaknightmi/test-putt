import React, {Component} from 'react';

class Putt extends Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      editmode:false,
      editnum:this.props.num,
      editdist:this.props.dist,
      edittype:this.props.type
    }
  }
  
  getcolor = () => {
    return this.props.made ? {color:"green"} : {color:"red"}
  }

  render() {
    return(
      <li style = {this.getcolor()}>
        <span>ammount: {this.props.num} </span>
        <span>distance: {this.props.dist} </span>
        <span>type: {this.props.type} </span>
      </li>
    )
  }
}

export default Putt