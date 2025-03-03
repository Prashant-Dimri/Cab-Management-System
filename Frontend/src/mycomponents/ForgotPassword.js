import React, {useState} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
const ForgotPassword = ()=>{
    const [email, setEmail] = useState('');
    const [state, setState] = useState(0);
    const handleSubmit = async()=>{
        const data= {email}
        try {
        const res = await axios.post('http://127.0.0.1:5000/forgot', data);
        if (res.data.status===201){
            setState(1);
        }
        else{
            console.log(res.data.errorMessages);
        }
        }
        catch{
            //a
        }
    }
    
  return (
    <div className="main-forgot">
    {state===0 &&(
        <div style={{width:"100%"}}>
      <label>Enter Your Email </label>
      <div style={{width:"100%", textAlign:"center",marginTop:"1%"}}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        </div>
        <div style={{width:"100%", textAlign:"center",marginTop:"1%"}}>
        <Button variant="outline-light" onClick={handleSubmit}>Send Reset Link</Button>
        </div>
        </div>
    )}
    {state===1 &&(
        <div style={{marginTop:"20px"}}>
            <h4>Reset Password Link has been sent to your Email</h4>
        </div>
    )}
    </div>
  )
}
export default ForgotPassword;
