import React from 'react';

import Putt from './Putt';

import { useSelector, useDispatch } from 'react-redux'
import {getPutts,getDisplay} from '../../../reducers/putts'
import {convertToFt,convertToM} from '../../../utils/convertTo'
import {getLocalTimeFromUTC} from '../../../utils/UTCtime'
import SuperTable from '../../../components/SuperTable'

import { lighten, makeStyles } from '@material-ui/core/styles';

const rowStyle = makeStyles((theme) => ({
  made:{
    background:"#4caf50"
  },
  missed:{
    background:"#ef5350"
  }
}))
const logTableBodyStyle = makeStyles((theme)=>({
  tablebody:{},
  tableContainer:{
    maxHeight:300,
    overflowY:'scroll'
  }
}))

const columns = [
  { field: 'num', headerName: 'Ammount', width: 120 },
  { field: 'dist', headerName: 'Distance', width: 200 },
  { field: 'type', headerName: 'Type', width: 200 },
  { field: 'made', headerName: 'Made', width: 200 },
  { 
    field: 'time',
    headerName: 'Time',
    width: 120, 
    format: (filtime) => {
      filtime = new Date(getLocalTimeFromUTC(filtime))
      let hrs = Number(filtime.getHours())
      let min = hrs !== "" ? filtime.getMinutes() : filtime.getMinutes() > 0 ? filtime.getMinutes() : ""
      let sec = filtime.getSeconds()
      hrs = hrs > 12 ? hrs - 12 : hrs
      return `${hrs}:${min}:${sec}`
    }
  }
]

const addRowStyler = (row,Component) => (props) => {
  const styleclasses = rowStyle()
  if(row.made){
    return <React.Fragment><Component class = {styleclasses.made}/></React.Fragment>
  }
  return <React.Fragment><Component class = {styleclasses.missed}/></React.Fragment>
}

const PuttList = ({
  editPutt,
  deletePutt
}) => {
  //hooks
  const dispatch = useDispatch()
  const displayType = useSelector(getDisplay)
  let putts = useSelector(getPutts)
  //vars
  const sortPutts = [...putts]
  sortPutts.sort((a,b)=>a.time-b.time)
  putts = sortPutts


  return (
    <div>
      <SuperTable
        style={logTableBodyStyle}
        rows = {putts}
        collums = {columns}
        selectable = {true}
        rowStyler = {addRowStyler}
        stickyHeader = {true}
      />
    </div>
  )
  /*
  return(
    <div>
    { (putts) ?  (
        (displayType === "single") ? 
          (<PuttListSingle
            putts = {putts}
            edit = {editPutt}
            delete = {deletePutt}
          />) : 
          (<PuttListType
            putts = {putts}
            edit = {editPutt}
            delete = {deletePutt}
          />)
        ) : (
          <div>no putts to display</div>
        )
    }
    </div>
  )*/
}

const PuttListSingle = ({
  putts,
  editPutt,
  deletePutt
}) => (
  <ul>
    { 
      putts.map((value)=>(<Putt 
          made = {value.made}
          num = {value.num}
          dist = {value.dist}
          type = {value.type}
          key = {value.time}
          editPutt = {editPutt}
          deletePutt = {deletePutt}
        />))
    }
  </ul>
);

const PuttListType = ({
  putts,
  editPutt,
  deletePutt
}) => (
  <ul>
    {
      Object.entries(putts).forEach(([key,value])=>{
        (<Putt 
          made = {value.stats.made}
          num = {value.stats.num}
          dist = {value.stats.dist}
          type = {value.stats.type}
          editPutt = {editPutt}
          deletePutt = {deletePutt}
        />)
      })
    }
  </ul>
);

export default PuttList;