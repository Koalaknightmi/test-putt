import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

const SuperTableHeader = ({
  collums,
  onSelect,
  onSelectAll,
  style,
  selectable,
  onSort,
  sortable,
  deleteable,
  onDelete,
  types,
  selected,
  rowCount,
  order,
  orderBy
}) => {
  const numSelected = selected.length
  const order2 = order ? "desc" :"asc"

  const createSortHandler = (type,order,key) => (event) => {
    onSort(type,order,key)
  };

  const selectAllHandler = (event) => {
    onSelectAll()
  }

  console.log(types)

  return (
    <TableHead>
      <TableRow>
        {(selectable && <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={selectAllHandler}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>)}
        {collums.map((c,i)=>(
          <TableCell key = {c.headerName} >
            <TableSortLabel
              active = {orderBy === c.headerName}
              direction={orderBy === c.headerName ? order2 : 'asc'}
              onClick = {types.length > 0 ? createSortHandler(types[c.field],order,c.field) : createSortHandler("number",order,c.field)}
            >
              {c.headerName}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default SuperTableHeader