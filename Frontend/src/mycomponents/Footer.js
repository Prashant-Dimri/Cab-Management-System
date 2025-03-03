import React,{ useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';  // You can use react-icons for social media icons
const Footer = () => {
  const [state,setState]=useState(0);
  const handleabout=()=>{
    setState(1);
  }
  const handleservices=()=>{
    setState(2);
  }
  const handlecontact=()=>{
    setState(3);
  }
  const back=()=>{
    setState(0);
  }
  
  return (
    <footer className="bg-dark text-white py-1" style={{position:"relative"}}>
      <Container>
        <Row>
          {/* Column 1: About Section */}
          <Col md={4} className="mb-2 about">

            <h5>About Us</h5>
            <p>
              We are a forward-thinking company committed to providing top-notch services.
            </p>
          </Col>

          {/* Column 2: Links Section */}
          <Col md={4} className="mb-2 links">
          {state===0 &&(
            <>
          
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Button variant="outline-secondary" onClick={handleabout}>About</Button></li>
              <li><Button variant="outline-secondary" onClick={handleservices}>Services</Button></li>
              <li><Button variant="outline-secondary" onClick={handlecontact}>Contact</Button></li>
            </ul>
          
          </>
          )}
          {state===1 &&(
            <div>
            <p>This is about us we are good</p>
            <Button variant="outline-secondary" onClick={back}>Back</Button>
            </div>
          )}
          {state===2 &&(
            <div>
            <p>These are out services</p>
            <ul>
              <li>
                  IOT
              </li>
              <li>
                Java Development
              </li>
              <li>
                C++ Development
              </li>
              <li>
                C Development
              </li>
              <li>
                Python Development
              </li>
              <li>
                Android Development
              </li>
              <li>
                IOS Development
              </li>
              <li>
                Windows Development
              </li>

              <li>
                Android Development
                </li>
            </ul>
            <Button variant="outline-secondary" onClick={back}>Back</Button>
            </div>
          )}
          {state===3 &&(
            <>
            <p>This is Contact</p>
            <Button variant="outline-secondary" onClick={back}>Back</Button>
            </>
          )}
          </Col>
          {/* Column 3: Social Media Section */}
          <Col md={4} className="mb-2 social-media">
            <h5>Follow Us</h5>
            <div>
              <a href="https://facebook.com" className="text-white me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="text-white" />
        <Row className="text-center">
          <Col className="reserved">
            <p>XYZ.com. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
