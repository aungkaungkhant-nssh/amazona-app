import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

function SearchBox({getQueryname}) {
  const [name,setName] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
 
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    let category =searchParams.get("category");
    
    if(category){
      navigate(`/search?name=${name || "all"}&category=${category}`);
    }else{
      navigate(`/search?name=${name || "all"}`);
    }
    
    getQueryname(name || "");
    setName("");
  }
  useEffect(()=>{
    getQueryname(searchParams.get("name") || "");
  },[name])
  return (
    <form  className="search" onSubmit={handleSubmit}>
        <div className="row">
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button className="primary" type="submit">
                     <i className="fa fa-search"></i>
            </button>
        </div>
    </form>
  )
}

export default SearchBox