import SuperTableRow from './SuperTableRow'
import TableBody from '@material-ui/core/TableBody';

import { makeStyles } from '@material-ui/core/styles';

const bodyStyles = makeStyles((theme) => ({
  root: {
    overflowY: "auto",
  }
}));

const SuperTableBody = ({
  onSelectHandler,
  style,
  deleteable,
  onDeleteHandler,
  collums,
  selected,
  selectable,
  editable,
  onEditHandler,
  rows,
  rowStyler
}) => {
  const classes = bodyStyles()
  const classes1 = style()

  return (
    <TableBody className = {style.tableBody} className = {classes.root}>
      {rows.map((r)=>{
        return (<SuperTableRow 
          key = {r.id}
          collums = {collums}
          row = {r}
          style = {style}
          selectable = {selectable}
          editable = {editable}
          deleteable = {deleteable}
          onSelectHandler = {onSelectHandler}
          onDeleteHandler = {onDeleteHandler}
          onEditHandler = {onEditHandler}
          selected = {!!selected[r.id]}
          rowStyler = {rowStyler}
        />)
      })}
    </TableBody>
  )
}

export default SuperTableBody