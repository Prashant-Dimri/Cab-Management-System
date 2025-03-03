import React, { useState } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const Admin=()=> {
    const [users,setUsers]=useState([]);
    const [state,setState]=useState(0);
    //uuid + token
    const reject=async(uuid)=>{
      const token=localStorage.getItem('authToken');
      const data={uuid,token};
      const res= await axios.post('http://127.0.0.1:5000/reject', data);
      if (res.data.status===201){
        alert("Rejected");
        handleclick();
      }
      else{
        alert(res.data.errorMessages);
      }

    }
    const approve=async(uuid)=>{
      const token=localStorage.getItem('authToken');
      const data={uuid,token};
      const ress = await axios.post('http://127.0.0.1:5000/approve', data);
      if (ress.data.status===201){
        alert("Approved");
        handleclick();
      }
      else{
        alert(ress.data.errorMessages);
      }
    }
    const handleclick=async ()=>{
        const token=localStorage.getItem('authToken');
        const data={token}
        const res = await axios.post('http://127.0.0.1:5000/fetch', data);
        if (res.data.status===201){
            setUsers(res.data.data);
            setState(1);
        }
        else{
            console.log("error");
        }
    }
  return (
    <div className="admin-class">
      <div style={{display:"flex",height:"100%",width:"100%",flexDirection:"column",alignItems:"center",padding:"1%",margin:"1%"}}>
        <div>
        {state===0 &&(
          <div>
          <div>
      <h3>
        Welcome Admin 
      </h3>
      </div>
      
      <div>
      <h5>
        Click on the button below for requests approval
      </h5>
      </div>
      <div>
      <Button variant="outline-light" onClick={handleclick}>View Request</Button>
      </div>    
      </div>
    )}
    </div>
    
      <div className="cardd" style={{height:"100%",width:"100%",padding:"1%",margin:"1%"}}>
      {state===1 &&(   
        <div>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div style={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)"}}>
            {users.map((user, index) => (
              <div key={user[0]}>
                {/* Adjust based on the structure of the user data */}
                <Card style={{ width: '18rem' ,backgroundColor:"transparent",color:"white",margin:"5%"}}>
                    <Card.Title>{index+1}</Card.Title>
                    <Card.Body>
                    <p>UUID: {user[0]}</p>
                <p>Name: {user[1]}</p>
                <p>Email: {user[2]}</p>
                <p>Address: {user[3]}</p>
                    <Button variant="outline-light" onClick={()=>approve(user[0])}>Approve</Button>
                <Button variant="outline-light" onClick={()=>reject(user[0])}>Reject</Button>
                  </Card.Body>
                </Card>
                
                
                
                {/* Add more fields based on the user object */}
                </div>
            ))}
          </div>
        )}
      </div>
      )}
      </div>
      </div>
      </div>
  )
}
export default Admin;