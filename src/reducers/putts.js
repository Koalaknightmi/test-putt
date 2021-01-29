import { createSlice } from '@reduxjs/toolkit'
import {addputt,totalrecalc,puttobj,defstats} from '../utils/puttManager'
import {getCurrentTimeUTC} from '../utils/UTCtime'

const initialState = {
  settings:{
    dist:10,
    measurement:"ft",
    addnum:1,
    type:"Spin Putt",
    stance:"Staggered",
    display:"single"
  },
  putts:[],
  stats:defstats,
  starttime:"",
  endtime:"",
  id:"",
  sessionStarted:false
}

const getdist = (state) => state.puttsState.settings.dist;
const getmeasurement = (state) => state.puttsState.settings.measurement;
const getaddnum = (state) => state.puttsState.settings.addnum;
const getStance = (state) => state.puttsState.settings.stance;
const getType = (state) => state.puttsState.settings.type;
const getPutts = (state) => state.puttsState.putts;
const getDisplay = (state) => state.puttsState.settings.display;

const changeSomethingr = (state,action) => {
  state.settings[action.payload.name] = action.payload.value
  return state
}

const addPuttToLogr  = (state,action) => {
  let putt = new puttobj({
    dist:state.settings.dist,
    num:state.settings.addnum,
    made:action.payload,
    measurement:state.settings.measurement,
    type:state.settings.type,
    stance:state.settings.stance
  })
  addputt(putt,state)
  return state
}

const startLogSession = (state) => {
  state.sessionStarted = true
  let time = getCurrentTimeUTC()
  state.id = time;
  state.starttime = time
  return state
}

const puttsReducer = createSlice({
  name:"putts",
  initialState: initialState,
  reducers:{
    changeSomething:changeSomethingr,
    addPuttToLog:addPuttToLogr
  }
})

export const {
  addPuttToLog,
  changeSomething
} = puttsReducer.actions

export {getaddnum,getdist,getmeasurement,getStance,getType,getPutts,getDisplay,startLogSession}

export default puttsReducer.reducer