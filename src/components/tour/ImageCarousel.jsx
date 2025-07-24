import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { fetchDestinations } from '../../api/visaApi';

const ImageCarousel = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [images, setImages] = useState([]);

  // Load images from API
  useEffect(() => {
    async function loadImages() {
      const data = await fetchDestinations();
      const imageUrls = data.map(dest => dest.image);
      setImages(imageUrls);
    }

    loadImages();
  }, []);

  // GSAP carousel animation
  useEffect(() => {
    if (images.length === 0) return;

    const total = images.length;
    const angleStep = 360 / total;
    const radius = 600;

    imageRefs.current.forEach((el, i) => {
      const angle = i * angleStep;
      gsap.set(el, {
        rotationY: angle + 180, // flip image inward
        transformOrigin: `50% 50% ${-radius}px`,
        z: radius,
      });
    });

    gsap.set(containerRef.current, {
      rotationY: 180,
      z: 450,
    });

    gsap.to(containerRef.current, {
      rotationY: '+=540',
      repeat: -1,
      ease: 'none',
      duration: 120,
      transformOrigin: '50% 50% 0px',
    });
  }, [images]);

  return (
    <div
      className="w-full h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        perspective: '550px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        ref={containerRef}
        className="relative w-[400px] h-[300px]"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            ref={(el) => (imageRefs.current[i] = el)}
            src={src}
            alt={`carousel-${i}`}
            className="absolute w-[300px] h-[200px] object-cover shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
