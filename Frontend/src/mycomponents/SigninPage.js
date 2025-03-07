import React, { useState } from 'react';
import axios from 'axios';
import SelectCab from './SelectCab';
import Admin from './Admin';
import ForgotPassword from './ForgotPassword';
import Button from 'react-bootstrap/Button';
const SigninPage = ({setState}) => {
  const [status, setStatus]=useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleForgot =async()=>{
    setStatus(5);
  }
  const handleSubmit = async () => {
    const data = { email, password };
    try {
      const res = await axios.post('http://127.0.0.1:5000/', data);
      console.log(res.data);
      if (res.data.status === 201) {
        setState(true);
        
        // Storing the token in localStorage
        if (res.data.role===0){
          setStatus(3); //Status value For Admin Page
        }
        if (res.data.role===1){
          setStatus(2); //Status value For Customer Page
        }
        if (res.data.role===2){
          setStatus(4); //Status value For Driver Page
        }
        localStorage.setItem('authToken', res.data.data); 
        // Set response state to success
      }}
      
     catch (error) {
      console.error('There was an error!', error);
    }
   // setStatus(0);
  };
  return (
    
    <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center"}}>
      {status===1 &&(
      <div className="signin-class">
        <div>
        <h1>Sign In</h1>
        </div>
        <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        </div>
        <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        </div>
      <div>
      <Button variant="outline-light" onClick={handleSubmit}>Login</Button>
      </div>
      <div>
      <Button variant="outline-light" onClick={handleForgot}>Forgot Password</Button>
      </div>
      </div>
      )}

      {status===2 &&(
        <div style={{height:"100%",width:"100%"}}>
          <SelectCab />
        </div>
      )}
      {status ===3 && (
        <div style={{height:"100%",width:"100%"}}>
          <Admin />
        </div>
      )}
      {status ===4 &&(
        <div>
          <h1>Later</h1>
        </div>)}
      {status ===5 &&(
        <div style={{height:"100%",width:"100%"}}>
          <ForgotPassword />
        </div>
      )}
      </div>)};
  

export default SigninPage;
