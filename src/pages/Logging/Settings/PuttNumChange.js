import React, {useState} from "react"

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import usestyle from './style'

import { useSelector, useDispatch } from 'react-redux'
import {changeSomething,getaddnum} from '../../../reducers/putts'

const PuttType = () => {
  const dispatch = useDispatch()
  const num = useSelector(getaddnum)
  const classes = usestyle()

  const onChange = (e,o) =>{
    dispatch(changeSomething({name:"addnum",value:o}))
  }

  return (
  <span>
    <Typography id="putt-num-slider" gutterBottom>
       Ammount of Putts
      </Typography>
      <Slider
        track="normal"
        aria-labelledby="putt-num-slider"
        defaultValue={num}
        marks={false}
        min={1}
        max={20}
        value={num}
        onChange = {onChange}
        valueLabelDisplay="on"
        name = "num"
      />
  </span>
)}

export default PuttType;