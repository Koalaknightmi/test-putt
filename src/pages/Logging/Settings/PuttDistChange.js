import React, {useState,useEffect} from "react"

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import usestyle from './style'

import { useSelector, useDispatch } from 'react-redux'
import {changeSomething,getdist,getmeasurement} from '../../../reducers/putts'
import {convertToFt,convertToM} from '../../../utils/convertTo'

let marks = [];

const PuttType = () => {
  const dispatch = useDispatch()
  const measurement = useSelector(getmeasurement)
  const dist = useSelector(getdist)
  const classes = usestyle()
  const max = measurement === "m" ? convertToM(60,"ft") : 60
  const min = measurement === "m" ? convertToM(3,"ft") : 3
  const min2 = measurement === "m" ? convertToM(10,"ft") : 10

  function valuetext(value) {
    if(measurement==="m"){
      return convertToM(value,measurement)+measurement
    } else{
      return convertToFt(value,measurement)+measurement;
    }
  }

  useEffect(() => {
    marks = []
    for(let i = min2;i <= max;i+=min2){
      if(measurement==="m"){
        marks.push(
          {
            value: i,
            label: i+measurement,
          }
        )
      } else{
        marks.push(
          {
            value: i,
            label: i+measurement,
          }
        )
      }
    }
  },[measurement]);

  const onChange = (e,o) =>{
    dispatch(changeSomething({name:"dist",value:o}))
  }

  return (
  <span>
    <Typography id="putt-dist-slider" gutterBottom>
       Putt Distance
      </Typography>
      <Slider
        track={false}
        aria-labelledby="putt-dist-slider"
        getAriaValueText={valuetext}
        defaultValue={dist}
        marks={marks}
        min={min}
        max={max}
        value={dist}
        onChange = {onChange}
        valueLabelDisplay="on"
        name = "dist"
      />
  </span>
)}

export default PuttType;