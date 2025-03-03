import axios from 'axios';
import React, { useState } from 'react';
import Booking from './Booking';
const SelectCab=()=>{
    const [status,setStatus] = useState(0); 
    const [type, setType]= useState('small');
    const [message,setMessage]=useState('');
    const getvalue=(event)=>{
      setType(event.target.value);
    }
    const handleSubmit= async ()=>{
    const token = localStorage.getItem('authToken');
    const data={type,token};
    
    try{
      const res = await axios.post('http://127.0.0.1:5000/selectCab',data);
      setMessage(res)
      if (res.data.status===201){
        localStorage.setItem('authToken',res.data.data)
        setStatus(1);
      }
      else{
        setStatus(2);
      }
       }
    catch(error){
      console.log("Error")
    }}
  return (
    <div style={{display:"flex",alignItems:"center",flexDirection:"column",height:"100%",width:"100%"}}>
    <div>
    {status===0 &&(
      <div style={{display:"flex",flexDirection:"column",padding:"1%",width:"100%"}}>
      <h1>Choose Cab Type</h1>
      <div style={{padding:"1%"}}>
      <div style={{padding:"1%"}}>
      <select id="dropdown" name="options" onChange={getvalue}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="luxary">Luxary</option>
      </select>
      </div>
      <div style={{padding:"1%"}}>
      <button onClick={handleSubmit}>Submit</button>
      </div>
      </div>
      </div>

      
    )}
    
    </div>
    <div style={{height:"100%",width:"100%"}}>
    {status===1 &&(
        <Booking />
    )}
    {status===2 &&(
      <div>
        <h1>Error Occured</h1>
        <p>{message}</p>
      </div>
    )}
    </div>
    </div>
  )
}
export default SelectCab;
