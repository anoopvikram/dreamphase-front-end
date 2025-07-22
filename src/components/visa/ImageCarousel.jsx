import React, { useRef, useEffect } from 'react';

const images = [
  'https://picsum.photos/seed/vietnam/400/300',
  'https://picsum.photos/seed/vietnam1/400/300',
  'https://picsum.photos/seed/vietnam2/400/300',
  'https://picsum.photos/seed/vietnam3/400/300',
  'https://picsum.photos/seed/vietnam4/400/300',
  'https://picsum.photos/seed/vietnam5/400/300',
  'https://picsum.photos/seed/vietnam6/400/300',
];

const ImageCarousel = () => {
  const containerRef = useRef(null);

  // Duplicate images for infinite scroll illusion
  const displayImages = [...images, ...images, ...images];

  useEffect(() => {
    const container = containerRef.current;

    const imageWidth = 256 + 24; // 256px image + 1.5rem gap
    const middle = images.length * imageWidth;
    container.scrollLeft = middle;

    const handleScroll = () => {
      const maxScroll = container.scrollWidth;
      const current = container.scrollLeft;
      const totalWidth = images.length * imageWidth;

      if (current <= 0) {
        container.scrollLeft = totalWidth;
      } else if (current >= maxScroll - container.offsetWidth) {
        container.scrollLeft = totalWidth;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Drag to scroll
  useEffect(() => {
    const container = containerRef.current;
    let isDown = false;
    let startX, scrollLeft;

    const handleDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const handleUp = () => (isDown = false);
    const handleLeave = () => (isDown = false);
    const handleMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleDown);
    container.addEventListener('mouseup', handleUp);
    container.addEventListener('mouseleave', handleLeave);
    container.addEventListener('mousemove', handleMove);

    return () => {
      container.removeEventListener('mousedown', handleDown);
      container.removeEventListener('mouseup', handleUp);
      container.removeEventListener('mouseleave', handleLeave);
      container.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden no-scrollbar cursor-grab select-none"
      style={{ perspective: '1200px' }}
    >
      <div className="flex gap-6 py-6 w-max">
        {displayImages.map((src, i) => {
          const mod = i % images.length;
          const rotation =
            mod === 0
              ? 'rotateY(15deg)'
              : mod === images.length - 1
              ? 'rotateY(-15deg)'
              : 'rotateY(5deg)';

          return (
            <img
              key={i}
              src={src}
              alt={`carousel-${i}`}
              className="w-64 h-40 object-cover rounded-xl shadow-md transition-transform duration-300"
              style={{
                transform: rotation,
                transformStyle: 'preserve-3d',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousel;
