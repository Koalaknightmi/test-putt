import React from 'react';

import Putt from './Putt';

import { useSelector, useDispatch } from 'react-redux'
import {getPutts,getDisplay} from '../../../reducers/putts'
import {convertToFt,convertToM} from '../../../utils/convertTo'
import SuperTable from '../../../components/SuperTable'

const columns = [
  { field: 'num', headerName: 'Ammount', width: 120 },
  { field: 'dist', headerName: 'Distance', width: 200 },
  { field: 'type', headerName: 'Type', width: 200 },
  { field: 'made', headerName: 'Made', width: 200 },
]

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
    <div style={{ height: 400, width: '100%' }}>
      <SuperTable
        rows = {putts}
        collums = {columns}
        selectable = {true}
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