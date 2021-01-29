import React from "react"

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import usestyle from './style'

import {stances} from '../../../static/PuttingStancesAndTypes'

import { useSelector, useDispatch } from 'react-redux'
import {changeSomething,getStance} from '../../../reducers/putts'

const PuttStance = () => {
  const dispatch = useDispatch()
  const stance = useSelector(getStance)
  const classes = usestyle()

  const onStanceChange = (e) => {
    dispatch(changeSomething({name:e.target.name,value:e.target.value}))
  }

  return (<FormControl variant="outlined" className={classes.formControl}>
  <InputLabel id="putt-stance-select-outlined-label">Stance</InputLabel>
  <Select
    labelId="putt-stance-select-outlined-label"
    id="putt-stance-select-outlined"
    value={stance}
    onChange={onStanceChange}
    label="Stance"
    name = "stance"
  >
    {stances.map((t) => (
      <MenuItem key = {t} value={t}>{t}</MenuItem>
    ))}
  </Select>
</FormControl>);
}

export default PuttStance;