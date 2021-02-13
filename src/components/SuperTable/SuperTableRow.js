import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import React, { useState, useEffect } from 'react';

const SuperTableRow = ({
  collums,
  row,
  style,
  selectable,
  editable,
  deleteable,
  onSelectHandler,
  onDeleteHandler,
  onEditHandler,
  selected,
  rowStyler,
}) => {
  let row2 = {}
  for(var i in collums){
    row2[collums[i].field] = {value:row[collums[i].field],format:collums[i].format}
  }

  const onSelect = (e) => {
    onSelectHandler(row.id)
  }

  const Tblrow = (props) =>  {
    return(
    <TableRow className = {props.class}>
      {(selectable && <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={onSelect}
          inputProps={{ 'aria-label': 'select' }}
        />
      </TableCell>)}
      {
        Object.keys(row2).map((cell)=>{
          return (<TableCell key = {`${row.id}_${cell}`}>
            {(row2[cell].format ? row2[cell].format(row2[cell].value).toString() : row2[cell].value.toString())}
          </TableCell>)
        })
      }

    </TableRow>
  )}

  const Row3 = rowStyler ? rowStyler(row,Tblrow) : <Tblrow/>

  return <Row3/>
}

export default SuperTableRow