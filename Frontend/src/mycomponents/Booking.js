import React, { useState } from 'react'
import axios from 'axios';
import BookingConfirmed from './BookingConfirmed';
const Booking=()=>{
  const [status,setStatus]=useState(0);
  const [message,setMessage]=useState('');
  const [pickup,setPickup]=useState('');
  const [destination,setDestination]=useState('');
  const handleSubmit=async ()=>{
    
    const token=localStorage.getItem('authToken');
    const data={pickup,destination,token};
    try{
    const res = await axios.post('http://127.0.0.1:5000/Booking', data);
    setMessage(res.data.message);
    if (res.data.status===201){
      setStatus(1);
    }
    }
    catch(error){
      setStatus(2);
      console.log(error);
    }
  }
  return (
    <div className="booking-class">
    {status===0 &&(
      <div>
        <div>
      <label>Enter Pickup Location </label>
      </div>
      <div>
      <input
        type="text"
        value={pickup}
        onChange={(event) => setPickup(event.target.value)} // Update pickup state
      />
      </div>
      <div>
        <label>Enter Destination </label>
        </div>
        <div>
        <input
          type="text"
          value={destination}
          onChange={(event) => setDestination(event.target.value)} // Update destination state
        />
        </div>
        <div>
        <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )}
    {status===1 &&(
      <BookingConfirmed />
    )}
    {status===2 &&(
      <p>{message}</p>
    )}
    </div>
  )
}
export default Booking;