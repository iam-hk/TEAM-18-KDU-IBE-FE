import React from 'react';
import './Loader1.scss';

const Loader1: React.FC = () => {
  return (
    <div className="simple-loader-container">
      <div className="simple-loader">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="simple-loader-pixel" />
        ))}
      </div>
    </div>
  );
};

export default Loader1;
