import { useMemo } from "react";
import {Columns, GroupedColumns} from "./Columns"
import mock_data from "./Data.json"
import {useTable,useSortBy} from "react-table"

const SortedTable = ()=>{
    const columns = useMemo(()=>Columns,[])
    const data = useMemo(()=>mock_data,[])
    
    const tableInstance = useTable({
        columns,
        data
    },useSortBy)

    const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance

    return(
        <table {...getTableProps()} >
            <thead style={{
                position:"sticky",
                top:"5px"
            }}>
                {
                    headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted?(column.isSortedDesc?"⬆️":"⬇️"):"⏹️"}
                                        </span>
                                    </th>
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
            {/* <tfoot style={{
                position:"sticky",
                bottom:"10px"
            }}>
                {footerGroups.map(footerGroup=>(
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {
                            footerGroup.headers.map(column=>(
                                <td {...column.getFooterProps()}>
                                    {column.render('Footer')}
                                </td>
                            ))
                        }
                    </tr>
                ))}
            </tfoot> */}
        </table>
    )
}
export default SortedTable