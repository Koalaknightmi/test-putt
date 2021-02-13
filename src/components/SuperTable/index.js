import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import SuperTableHeader from './SuperTableHeader'
import SuperTableBody from './SuperTableBody'
import SuperTableToolbar from './SuperTableToolbar'

const doSort = (array,type,desc,key) =>{
  switch(type){
    case"number":
      if(desc){
        array.sort((a,b) => {
          return b[key]-a[key]
        })
      } else{
        array.sort((a,b) => {
          return a[key]-b[key]
        })
      }
    break;
    case"string":
      if(desc){
        array.sort((a, b) => {
          let fa = a[key].toLowerCase(), 
          fb = b[key].toLowerCase();

          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
        })
        
      } else{
        array.sort((a, b) => {
          let fa = a[key].toLowerCase(), 
          fb = b[key].toLowerCase();

          if (fa < fb) {
              return 1;
          }
          if (fa > fb) {
              return -1;
          }
          return 0;
        })
      }
    break;
    case"boolean":
      if(desc){
        array.sort(function(a, b) {
          return (a[key] === b[key])? 0 : a[key]? 1 : -1;
        });
      } else{
        array.sort(function(a, b) {
          return (a[key] === b[key])? 0 : a[key]? -1 : 1;
        });
      }
    break;
  }
  return array
}

const SuperTable = (props) => {
  /*   --- defaults ---   */ 
  let props2 = {...props}
  console.log(props2)
  const defaults = {
    rows:[],
    collums:[],
    onedit:() => {},
    onSelect:() => {},
    style:{},
    editable:true,
    selectable:true,
    onSort:() => {},
    sortable:true,
    deleteable:true,
    onDeleteonSort:() => {},
    id:"SuperTable",
    collapseable:false,
    toolbar:true,
    rowStyler:null,
    stickyHeader:true
  }
  useEffect(()=>{
    for(var i in defaults){
      if(!props2[i]){
        props2[i] = defaults[i]
      }
    }
  },[])
  const {
    rows,
    collums,
    onedit,
    onSelect,
    style,
    editable,
    selectable,
    onSort,
    sortable,
    deleteable,
    onDelete,
    id,
    collapseable,
    toolbar,
    rowStyler,
    stickyHeader
  } = props2
  const classes = style()
  /*   --- state ---   */ 
  const [types,settypes] = useState([])
  const [selected,setSelected] = useState([])
  const [order,setOrder] = useState(true)
  const [orderBy,setOrderBy] = useState(collums[0].headerName)
  const [displayRows,setDisplayRows] = useState(rows)
  const rowCount = rows.length
  /*   --- functions ---   */ 
  const onRowSelect = (id) => {
    setSelected(prevSelected => [...prevSelected,id])
    onSelect(selected)
  }

  const onSelectAll = () => {
    if(selected.length===0){
      setSelected([])
      rows.forEach((v)=>{
        onRowSelect(v.id)
      })
    } else if (selected.length>0){
      setSelected([])
      onSelect(selected)
    }
  }

  const onSelectHandler = () => {
    onSelect()
  }
  const onSortHandler = (type,order,key) => {
    console.log(displayRows,doSort(displayRows,type,order,key))
    console.log(type,order,key)
    setDisplayRows(doSort(displayRows,type,order,key))
    setOrderBy(key)
    setOrder(!order)
  }
  const onDeleteHandler = () => {
    onDelete()
  }

  useEffect(()=>{
    if(rows[0]){
      settypes([])
      Object.keys(rows[0]).forEach((v) => {
        settypes(prevtypes => ({...prevtypes,[v]:typeof rows[0][v]}))
      })
    }
    setDisplayRows(rows)
  },[rows])
  
  return (
      <TableContainer Component = {Paper} className = {classes.tableContainer}>
        <Table stickyHeader = {stickyHeader}>
          <SuperTableHeader
            onSelect = {onSelectHandler}
            style = {style}
            onSort = {onSortHandler}
            sortable = {sortable}
            deleteable = {deleteable}
            onDelete = {onDeleteHandler}
            collums = {collums}
            onSelectAll = {onSelectAll}
            rowCount = {rowCount}
            selected = {selected}
            selectable = {selectable}
            order = {order}
            orderBy = {orderBy}
            types = {types}
          />
          <SuperTableBody
            onSelect = {onSelectHandler}
            style = {style}
            deleteable = {deleteable}
            onDelete = {onDeleteHandler}
            selected = {selected}
            selectable = {selectable}
            collums = {collums}
            rows = {displayRows}
            rowStyler = {rowStyler}
          />
        </Table>
      </TableContainer>
  )
}

export default SuperTable