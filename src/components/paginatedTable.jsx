import { useMemo } from "react";
import {Columns, GroupedColumns} from "./Columns"
import mock_data from "./Data.json"
import {useTable, usePagination} from "react-table"

const PaginatedTable = ()=>{
    const columns = useMemo(()=>Columns,[])
    const data = useMemo(()=>mock_data,[])
    
    const tableInstance = useTable({
        columns,
        data
    },usePagination)
    const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, nextPage, previousPage, page, state, canNextPage, canPreviousPage, pageOptions,pageCount, gotoPage} = tableInstance
    console.log(tableInstance) 
    const {pageIndex} = state
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
                    page.map(row=>{
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
            <div style={{width:"100%"}}>
                <button disabled={!canPreviousPage} onClick={()=>gotoPage(0)}>⏮️</button>
                <button disabled={!canPreviousPage} onClick={previousPage}>Previous</button>
                {" "} Page {" "}
                <strong>
                {pageIndex+1} of {pageOptions.length} {" "}
                </strong> 
                <button disabled={!canNextPage} onClick={nextPage}>Next</button>
                <button disabled={!canNextPage} onClick={()=>gotoPage(pageCount-1)}>⏭️</button>

            </div>
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
export default PaginatedTable