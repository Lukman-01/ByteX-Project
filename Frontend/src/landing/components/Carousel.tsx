import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  interval?: number; // Time in milliseconds between slides
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, interval, images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.slide}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          style={styles.image}
        />
      </div>
      <button onClick={handlePrev} style={styles.prevButton}>
        &#10094;
      </button>
      <button onClick={handleNext} style={styles.nextButton}>
        &#10095;
      </button>
      <div style={styles.indicators}>
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              backgroundColor: currentIndex === index ? '#717171' : '#bbb',
            }}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  carouselContainer: {
    position: 'relative',
    margin: 'auto',
    maxWidth: '600px',
  },
  slide: {
    display: 'block',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '16px',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#333',
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '16px',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#333',
  },
  indicators: {
    textAlign: 'center',
    marginTop: '8px',
  },
  dot: {
    height: '15px',
    width: '15px',
    margin: '0 2px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
    cursor: 'pointer',
  },
};

export default ImageCarousel;
