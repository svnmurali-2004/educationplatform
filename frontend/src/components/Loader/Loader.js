import React from 'react';
import '../../assets/CSS/Loader.css'; // Import CSS file for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <img src='./Ellipsis-3.8s-200px.svg' alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;
