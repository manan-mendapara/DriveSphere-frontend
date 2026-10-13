const images = ['/images/carousel-1.png', '/images/carousel-2.png', '/images/carousel-3.png', '/images/carousel-4.png', '/images/carousel-5.png'];
export const withLocalCarImages = (car) => {
  if (!car) return car;
  const index = Math.abs((Number(car.id) || String(car.id || '').length || 1) - 1) % images.length;
  return { ...car, images: { thumbnail: images[index], gallery: [images[index], images[(index + 1) % images.length], images[(index + 2) % images.length]] } };
};
export default withLocalCarImages;
