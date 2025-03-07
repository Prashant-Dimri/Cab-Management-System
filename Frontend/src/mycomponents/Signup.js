import axios from 'axios';
import React, { useState } from 'react'
import HomePage from './SigninPage';
const Signup=({set})=>{
  const [state,setState]=useState(0);
  const [message,setMessage]=useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');
  const [validatePassword,setvalidatePassword]=useState(true);
  const [role,setRole]=useState('customer');
  const specialCharacters = new Set(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '{', '}', '[', ']', '|', '\\', ':', '"', "'", '<', '>', ',', '.', '?', '/', '~', '`']);

  const getvalue=(event)=>{
    setRole(event.target.value);
  }
  const handlesubmit = async () =>{
    const data={name,email,address,password,role};
    const passwordHasSpecialChar = password.split('').some(char => specialCharacters.has(char));
    if (password.length <= 6 || passwordHasSpecialChar===false) {
      setvalidatePassword(false);  // Valid password
    } else {
      setvalidatePassword(true);  // Invalid password
    const res= await axios.post('http://127.0.0.1:5000/signup', data);
    setMessage(res.data.message);
    if (res.data.status===201 && res.data.role==="customer"){
      alert("Successfully Registered");
      setState(1);
    }
    else if(res.data.status===201 && res.data.role==="driver"){
      setState(3);
    }
    else{
      setState(2);
    }
  }}
  return (
    <div className="signup-class">
      {state===0 && (
      <div>
        <div>
      <h1>Sign Up</h1>
        </div>
      <div>
      <label>Name </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
        />
        </div>
        <div>
        <label>Email </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        </div>
        <div>
        <label>address </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Update address state
        />
        </div>
        <div>
        <label>Password </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        {validatePassword===false &&(
          <div>
            <p>
            Please Enter Valid Password length {'>='} 7 and contains a special character
            </p>
          </div>
        )}
        </div>
        <div>
        
          <br />
        <h1>
          Select Role
        </h1>
        <div>
        <select onChange={getvalue}>
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
        </select>
        </div>
        </div>
        <div style={{padding:"20px"}}>
        <button onClick={handlesubmit}>Submit</button>
        </div>
      </div>
      )}
      {state===1 &&(
        <HomePage setState={set}/>
      )}
      {state===2 &&(
        <div>
        {message}
        </div>
      )}
      {state===3 &&(
        <div style={{padding:"80px"}}>
          <h4> Your request is pending kindly wait untill its gets approved</h4>
        </div>
      )}
    </div>
  )
}
export default Signup;