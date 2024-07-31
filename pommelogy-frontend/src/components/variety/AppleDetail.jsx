import React from 'react';
import { useLocation } from 'react-router-dom';
import './AppleDetail.css';

const AppleDetail = () => {
  const location = useLocation();
  const { data } = location.state || {};
  if (!data) {
    return <p>No data available</p>;
  }

  const { predicted_class, confidence, apple_variety, uploaded_image_url } = data;
  return (
    <div className='apple-detail'>
      <div className='apple-detail-image-container'>
        {/* Display uploaded image if available, otherwise fallback to apple variety image */}

        <img
          src={uploaded_image_url || apple_variety.image}
          alt={predicted_class}
          className='apple-detail-image'
        />
      </div>
      <div className='apple-detail-name'>
        <h3>{apple_variety.name}</h3>
      </div>
      <div className='apple-detail-info'>
        <div className='apple-detail-section'>
          <h3>Description:</h3>
          <p>{apple_variety.description}</p>
        </div>
        <div className='apple-detail-section'>
          <h3>Visual Characteristics:</h3>
          <p>{apple_variety.visual_characteristics}</p>
        </div>
        <div className='apple-detail-section'>
          <h3>Taste Profile:</h3>
          <p>{apple_variety.taste_profile}</p>
        </div>
        <div className='apple-detail-section'>
          <h3>Culinary Uses:</h3>
          <p>{apple_variety.culinary_uses}</p>
        </div>
        <div className='apple-detail-section'>
          <h3>Prediction Details:</h3>
          <p>Predicted Variety: {predicted_class}</p>
          <p>Confidence: {confidence}</p>
        </div>
      </div>
    </div>
  );
};

export default AppleDetail;
