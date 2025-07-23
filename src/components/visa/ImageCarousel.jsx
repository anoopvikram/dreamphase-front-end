import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const images = [
  'https://picsum.photos/seed/vietnam/400/300',
  'https://picsum.photos/seed/vietnam1/400/300',
  'https://picsum.photos/seed/vietnam2/400/300',
  'https://picsum.photos/seed/vietnam3/400/300',
  'https://picsum.photos/seed/vietnam4/400/300',
  'https://picsum.photos/seed/vietnam5/400/300',
  'https://picsum.photos/seed/vietnam6/400/300',
  'https://picsum.photos/seed/vietnam6/400/300',
  'https://picsum.photos/seed/vietnam6/400/300',
  'https://picsum.photos/seed/vietnam6/400/300',
  'https://picsum.photos/seed/vietnam6/400/300',
  'https://picsum.photos/seed/vietnam6/400/300',
];

const ImageCarousel = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
  const total = images.length;
  const angleStep = 360 / total;
  const radius = 600;

  imageRefs.current.forEach((el, i) => {
    const angle = i * angleStep;
    gsap.set(el, {
      rotationY: angle + 180, // flip image to face inside
      transformOrigin: `50% 50% ${-radius}px`,
      z: radius,
    });
  });

  gsap.set(containerRef.current, { rotationY: 180 }); // flip container inward

  gsap.to(containerRef.current, {
    rotationY: "+=540",
    repeat: -1,
    ease: "none",
    duration: 120,
    transformOrigin: "50% 50% 0px",
  });

  gsap.set(containerRef.current, {
  rotationY: 180,
  z: 450, // ✅ Moves the whole ring closer to camera instantly
});

}, []);


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
