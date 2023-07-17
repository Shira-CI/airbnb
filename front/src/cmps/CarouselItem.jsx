import React from "react";

export const CarouselItem = ({ imageUrl, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      <img className="carousel-img stay-preview-image" src={imageUrl} />
    </div>
  )
}


