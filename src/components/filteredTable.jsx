import { useMemo } from "react";
import {Columns, GroupedColumns} from "./Columns"
import mock_data from "./Data.json"
import {useTable,useGlobalFilter,useFilters} from "react-table"
import GlobalFilter from "./GlobalFilter";

const FilteredTable = ()=>{
    const columns = useMemo(()=>Columns,[])
    const data = useMemo(()=>mock_data,[])
    
    const tableInstance = useTable({
        columns,
        data
    },useFilters,useGlobalFilter)
    const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, setGlobalFilter} = tableInstance
    console.log(tableInstance) 
    const {globalFilter} = state
    return(
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()} >
                <thead>
                    {
                        headerGroups.map((headerGroup)=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column)=>(
                                        <th {...column.getHeaderProps()} >
                                            {column.render('Header')}
                                            <div>
                                                {column.canFilter?column.render('Filter'):null}
                                            </div>
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
        </>
    )
}
export default FilteredTable