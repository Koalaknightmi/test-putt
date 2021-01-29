import React from "react"

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import usestyle from './style'

import {convertToFt} from '../../../utils/convertTo'
import {types} from '../../../static/PuttingStancesAndTypes'

import { useSelector, useDispatch } from 'react-redux'
import {changeSomething,getdist,getmeasurement,getType} from '../../../reducers/putts'

const PuttType = () => {
  const dispatch = useDispatch()
  const type = useSelector(getType)
  const dist = useSelector(getdist)
  const measurement = useSelector(getmeasurement)
  const classes = usestyle()

  const onTypeChange = (e) => {
    dispatch(changeSomething({name:e.target.name,value:e.target.value}))
  }

  return (
  <FormControl variant="outlined" className={classes.formControl}>
  <InputLabel id="putt-type-select-outlined-label">Putt Type</InputLabel>
  <Select
    labelId="putt-type-select-outlined-label"
    id="putt-type-select-outlined"
    value={type}
    onChange={onTypeChange}
    label="Type"
    name = "type"
  >
    {types.map((t) => (convertToFt(dist,measurement)>t.minimum &&
      <MenuItem key = {t.name} value={t.name}>{t.name}</MenuItem>
    ))}
  </Select>
</FormControl>
)}

export default PuttType;