import React, { useState, useEffect } from 'react';
import './PhotoCarousel.css'; 
import photo1 from './Photo/p1.webp';
import photo2 from './Photo/p2.webp';
import photo3 from './Photo/p3.webp';

const photos = [
  { src: photo1, alt: "Attend an offline friend's party scenario" },
  { src: photo2, alt: 'Scenes from the celebration of Canada Day' },
  { src: photo3, alt: 'Share Life on Campus' }
];

const PhotoCarousel = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="photo-carousel">
      <img 
        src={photos[currentPhotoIndex].src} 
        alt={photos[currentPhotoIndex].alt} 
      />
    </div>
  );
};

export default PhotoCarousel;
