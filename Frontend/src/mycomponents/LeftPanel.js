import React from "react";

const LP = ({handleDotClick}) => {
  return (
    <div
      className="left-panel"
      style={{
        display:"flex",
        flexDirection:"column",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position:"sticky",
        top:"0",
        height: "100vh", // Ensure the panel covers full height of the viewport
      }}
    >
      <div className="dot-container">
        <div
          className="dot"
          onClick={() => handleDotClick("image1.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image2.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image3.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image4.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image5.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image6.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image7.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image8.jpg")}
        ></div>
        <div
          className="dot"
          onClick={() => handleDotClick("image9.jpg")}
        ></div>
        {/* Add more dots as needed */}
      </div>
    </div>
  );
};

export default LP;
