import React, {useEffect} from 'react';
import LS from '../../utils/LocalStorage'
import PuttList from './PuttList/index.js'
import PuttSettings from './Settings/index.js'
import PuttBtns from './Logbtns.js'
import { addFirebase } from "../../services/Firebase"

import {convertToFt} from '../../utils/convertTo'
import puttMan, {puttobj} from '../../utils/puttManager'
import { useSelector, useDispatch } from 'react-redux'
import {addPuttToLog,startLogSession,getaddnum,getdist,getmeasurement,getStance,getType} from '../../reducers/putts'

const Default_Settings = {
  dist:10,
  measurement:"ft",
  addnum:1,
  type:"Spin Putt",
  stance:"Staggered",
  putts:null
}

const classToObject = theClass => {
  return JSON.parse(JSON.stringify(theClass))
}

const LogPageBase = ({firebase}) => {
  const addnum = useSelector(getaddnum), dist = useSelector(getdist), measurement = useSelector(getmeasurement),stance = useSelector(getStance), type = useSelector(getType);
  const dispatch = useDispatch()

  const addputts = (made) =>
    dispatch(addPuttToLog(made));

  useEffect(()=>{
   dispatch(startLogSession)
  },[])

  return (
    <div>
        <p>hi</p>
        <PuttList/>
        <PuttSettings/>
        <PuttBtns 
          onClicked = {addputts}
        />
      </div>
  )
}
/*
class LogPageBase extends Component{
  constructor(props) {
    super(props);
    this.state = Default_Settings;
  }

  setdefaults(){
    const userdata = LS.programdata.user
    Object.keys(userdata).forEach((key)=>{
      if(Default_Settings[key]){
        Default_Settings[key] = userdata[key]
      }
    })
    this.setState(Default_Settings);
  }

  LOG = (e) => {
    const Firebase = this.props.firebase
    puttMan.sync();
    //if(navigator.onLine){
      let puttsToStore = [puttMan]
      Firebase.puttlogstats(LS.programdata.user.uid)
      .get()
      .then((data)=>{
        let data2 = data.data();
        let longestPutt = data2.longestputtmade.dist ? data2.longestputtmade.dist : 0;
        let longPutt = data2.longestputtmade
        let longeststreak = data2.beststreak.streak ? data2.beststreak.streak : 0;
        let longstreak = data2.beststreak
        let curstats = data2
        puttsToStore.forEach((putts)=>{
          if(putts.stats.longestPutt.dist>longestPutt){
            longPutt = putts.stats.longestPutt
            longPutt.id = putts.id
            curstats.longestputtmade = longPutt
          }
          if(putts.stats.beststreak.streak>longeststreak){
            longstreak = putts.stats.beststreak
            longstreak.id = putts.id
            curstats.beststreak = longstreak
          }
          Object.keys(putts.stats.madebytype).forEach((key)=>{
            if(!curstats.madebytype[key]){
              curstats.madebytype[key] = putts.stats.madebytype[key];
            } else{
              curstats.madebytype[key].made += putts.stats.madebytype[key].made;
              curstats.madebytype[key].missed += putts.stats.madebytype[key].missed;
            }
          })
        curstats.timeSpentPutting += (putts.starttime - putts.endtime) * -1;
        curstats.made += putts.stats.made
        curstats.missed += putts.stats.missed
        if(!curstats.lastTimePutting){
          curstats.lastTimePutting = 0
        }
        if(curstats.lastTimePutting - putts.stats.lastPuttTime<0){
          curstats.lastTimePutting = putts.stats.lastPuttTime
        }
        console.log(putts.id.toString())
        Firebase
          .puttlog(LS.programdata.user.uid,putts.id.toString())
          .set(classToObject(putts))
          .then(()=>{
            console.log(classToObject(putts))
          })
          .catch((e)=>{
            console.log(e)
          })
        })
      Firebase
        .puttlogstats(LS.programdata.user.uid)
        .update(curstats)
        .then(()=>{
          console.log(curstats)
        })
        .catch((e)=>{
          console.log(e)
        })
      })
    LS.setputts({})
    this.setState(Default_Settings);
  }

  managersync(){
    this.setState(state => ({
      putts:puttMan
    }))
  }

  addputts = (made) =>{
    puttMan.addputt(new puttobj({
      dist:this.state.dist,
      num:this.state.addnum,
      made:made,
      measurement:this.state.measurement,
      type:this.state.type,
      stance:this.state.stance
    }))
    this.managersync()
  }

  saveputts(){
    
  }

  onChange = (e) => {
    LS.updateprogramdata({
      [e.target.name]: e.target.value
    },["user"])
    this.setState(state => ({
      [e.target.name]: e.target.value
    }));
  }
  onChangeSlider = (v,n) => {
    LS.updateprogramdata({
      [n]: v
    },["user"])
    this.setState(state => ({
      [n]: v
    }));
  }

  componentDidMount() {
    this.props.firebase.uputtlog(LS.programdata.user.uid).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, " => ", doc.data());
    });
});

    puttMan.init()
    this.setdefaults()
    window.addEventListener("beforeunload", this.LOG);
  }

  componentWillUnmount() {
    this.LOG()
    window.removeEventListener("beforeunload", this.LOG);
  }

  render () {
    return (
      <div>
        <p>hi</p>
        <PuttList
          putts = {this.state.putts}
          displayType = "Single"
        />
        <PuttSettings/>
        <PuttBtns 
          onClicked = {this.addputts}
          addNum = {this.state.addnum}
        />
      </div>
    )
  }
}*/

const LogPage = addFirebase(LogPageBase)

export default LogPage