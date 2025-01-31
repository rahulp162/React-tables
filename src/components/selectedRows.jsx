import { useMemo } from "react";
import {Columns, GroupedColumns} from "./Columns"
import mock_data from "./Data.json"
import {useTable, useRowSelect} from "react-table"
import { Checkbox } from "./CheckBox";

const SelectedRowsTable = ()=>{
    const columns = useMemo(()=>GroupedColumns,[])
    const data = useMemo(()=>mock_data,[])
    
    const tableInstance = useTable({
        columns,
        data
    }, useRowSelect,
    (hook)=>{
        hook.visibleColumns.push((columns)=>{
            return[
                {
                    id:'selection',
                    Header:({getToggleAllRowsSelectedProps})=>(
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell:({row})=>(
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]
        })
    })
    const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, selectedFlatRows} = tableInstance
    console.log(selectedFlatRows) 
    return(
        <table {...getTableProps()} >
            <thead>
                {
                    headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps()} >{column.render('Header')}</th>
                                ))
                            }
                        </tr>

                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row=>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()} >
                                {
                                    row.cells.map(cell=>{
                                        return <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default SelectedRowsTable