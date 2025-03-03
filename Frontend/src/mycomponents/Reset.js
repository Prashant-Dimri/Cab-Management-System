import { useState } from 'react';
import React from 'react';

// left to put password character check , symbol check , length check

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
const Reset = ()=> {
    const {uuid}=useParams();
    const specialCharacters = new Set(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '{', '}', '[', ']', '|', '\\', ':', '"', "'", '<', '>', ',', '.', '?', '/', '~', '`']);
    const [password,setPassword]=useState('');
    const [confirmPassword,setconfirmPassword]=useState('');
    const [validatePassword,setvalidatePassword]=useState(true);
    const navigate=useNavigate();
    const handleSubmit= async ()=>{
        const data={uuid,password};
        if (password === '' || confirmPassword === '') {
            alert('Please fill in both password fields.');
            return;
          }
        const passwordHasSpecialChar = password.split('').some(char => specialCharacters.has(char));
        if (password.length <= 6 || passwordHasSpecialChar===false) {
          setvalidatePassword(false);  // Valid password
        } 
        else {
          setvalidatePassword(true);  // Invalid password
        
        if (password===confirmPassword){
            const res= await axios.post(`http://127.0.0.1:5000/reset`, data);
            if (res.data.status===201){
                alert("Password Updated");
                navigate('/');
            }
            else{
              alert(res.data.errorMessages);
            }
        }}
    }
  return (
    <div className="reset-class" >
        <div style={{margin:"10px"}}>
        <h1>Reset Password</h1>
        </div>
        <div>
          
        <label>Enter New Password: </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update name state
        />
        </div>
        <div>
        <label>Confirm Password: </label>
        <input
          type="text"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)} // Update email state
        />
        </div>
      {validatePassword===false &&(
        <div>
          <p>
            Please Enter Valid Password length {'>='} 7 and contains a special character
          </p>
        </div>
      )}
      <div style={{alignItems:"center",paddingTop:"20px"}}>
      <Button variant="outline-light" onClick={handleSubmit}>Reset</Button>
      </div>
      </div>
  )
}
export default Reset;
