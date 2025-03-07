import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './mycomponents/HomePage';
import Header from './mycomponents/Header';
import Footer from './mycomponents/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import LP from './mycomponents/LeftPanel';
import Reset from './mycomponents/Reset';
import { useState } from 'react';
function App() {
  const [Bg,setBg]=useState("ab.jpeg");
  const [state,setState]=useState(false);
  const handleDotClick=(imageurl)=>{
    setBg(imageurl);
  }
  return (
    <Router>
      <div id="root">
        <Header st={state} />
        <div className="main-content" style={{backgroundImage:`url(${Bg})`,backgroundSize: 'cover',  // Ensures the image covers the entire container
    backgroundPosition: 'center',  
    backgroundRepeat: 'no-repeat',  
    flexGrow:"1"}}>
          <div className="container-fluid">
            <div className="row"> {/* main thing responsible for partitioning into left mid and right*/}
              {/* Left Panel (col-md-3 means 3/12 width on medium screens) */}
              <div className="col-md-1 col-12"> {/* in this col-md-3 means take 3 space out of 12 in a screen
              while col-12 is for smaller screens less than 786 pixels it takes 100% area on screen */}
                <div className="left-panel" >
                  {/* Add content Of left panel */}
                  <LP handleDotClick={handleDotClick}/>
                </div>
              </div>

              {/* Main Content Area (col-md-6 means 6/12 width on medium screens) */}
              <div className="col-md-10 col-12">
                <div className="content-area">
                  <Routes>
                    <Route path="/" element={<HomePage setState={setState}/>} />
                    <Route path="/reset/:uuid" element={<Reset />} />
                  </Routes>
                </div>
              </div>

              {/* Right Panel (col-md-3 means 3/12 width on medium screens) */}
              <div className="col-md-1 col-12">
                <div className="right-panel">
                  {/* Add content for the right panel here */}
                  <h5>Right Panel</h5>
                  <p>Add Anything here</p>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
