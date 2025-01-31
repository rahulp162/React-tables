const GlobalFilter = ({filter,setFilter})=>{
    return(
        <div>
            Search:{" "}
            <input type="text" value={filter||""} onChange={(e)=>setFilter(e.target.value)} />
        </div>
    )
}

export default GlobalFilter; 