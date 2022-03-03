import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function SearchBox() {
  const [name,setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/search?name=${name || "all"}`);
  }
  return (
    <form  className="search" onSubmit={handleSubmit}>
        <div className="row">
            <input type="text" onChange={(e)=>setName(e.target.value)}/>
            <button className="primary" type="submit">
                     <i className="fa fa-search"></i>
            </button>
        </div>
    </form>
  )
}

export default SearchBox