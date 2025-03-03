import React, { useState } from 'react';
import First from './First';
import Signup from './Signup';
import Button from 'react-bootstrap/Button';
const Firstt =({setState}) =>{
    const [Currpage,Setcurrpage]=useState('');
    const handlepage=(page)=>{
        Setcurrpage(page);};
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",Width:"100%",height:"100%",justifyContent:"center"}}>
    <div>
        <h1>Cab Management System</h1>
        </div>
    {Currpage==='' && (
        <div style={{paddingTop:"50px",padding:"20px",alignItems:"center"}}>
            <div className="login-btn" style={{alignItems:"center"}}>
        <Button  variant="outline-light" onClick={()=>handlepage('Login')}>CLick For Login</Button>
        </div>
        <div className="signup-btn" style={{paddingTop:"20px"}}>
        <Button variant="outline-light" onClick={()=>handlepage('Signup')}>CLick For Signup</Button>
        </div>
        </div>
    )}
    <div style={{height:"100%",width:"100%"}}>
    {Currpage==='Login' && <First setState={setState}/>}
    {Currpage==='Signup' && <Signup set={setState}/>}
    </div>
    </div>
)};
export default Firstt;
