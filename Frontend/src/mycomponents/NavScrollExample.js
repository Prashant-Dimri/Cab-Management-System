import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

function Navb({login}) {
  const [loggedin, setLoggedin] = useState(false); // Keep track of login state locally
  useEffect(() => {
    setLoggedin(login); // Update the local state when `login` prop changes
  }, [login]);
  return (
    <Navbar expand="lg" style={{backgroundColor:"black"}}>
        <Navbar.Brand href="http://localhost:3000/" style={{color:"White", marginLeft:"20px"}}>Home</Navbar.Brand>
          <Form className="d-flex ms-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            {loggedin ?(
            <Button variant="outline-danger" href='http://localhost:3000/'>Logout </Button>
          ):(
            <p></p>
          )}
          </Form>
    </Navbar>
  );
}

export default Navb;