import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const portfolioImages = [
  {
    id: 1,
    src: 'https://i.gyazo.com/538ebf7f720045138ce5ac9073742d0d.jpg',
    alt: 'Modern accent wall with elegant design',
  },
  {
    id: 2,
    src: 'https://i.gyazo.com/cbdeee6aeafc472ac8a2835496fb0492.jpg',
    alt: 'Wood panel accent wall',
  },
  {
    id: 3,
    src: 'https://i.gyazo.com/4eee367bca61a74142008697e31de820.jpg',
    alt: 'Modern ceiling design',
  },
  {
    id: 4,
    src: 'https://i.gyazo.com/dddc8af6ae5d86aa721460ec5a5358e1.jpg',
    alt: 'Luxury interior wall design',
  },
  {
    id: 5,
    src: 'https://i.gyazo.com/b5eba847ab3623ea011d5a81295628db.jpg',
    alt: 'Textured wall panel design',
  },
  {
    id: 6,
    src: 'https://i.gyazo.com/8d44edfdf82592da58f063b4cd098a44.jpg',
    alt: 'Contemporary interior design',
  },
  {
    id: 7,
    src: 'https://i.gyazo.com/3763d6dbe2b6843b6181af108239b628.jpg',
    alt: 'Wall paneling in living room',
  },
  {
    id: 8,
    src: 'https://i.gyazo.com/1cde89796d6ff77409df7c1ce3b0087b.jpg',
    alt: 'Modern bedroom wall design',
  },
  {
    id: 9,
    src: 'https://i.gyazo.com/e9623188527ff62553c768827f11c02c.jpg',
    alt: 'Premium craftsmanship detail',
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof portfolioImages[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, itemsPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? portfolioImages.length - itemsPerView : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= portfolioImages.length - itemsPerView ? 0 : prev + 1
    );
  };

  return (
    <>
      <section id="gallery" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#3D4436] mb-4">Our Portfolio</h2>
            <p className="text-[#6B7562] max-w-2xl mx-auto">
              Explore our finest work showcasing premium accent walls and ceilings across Denver.
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-full shadow-lg flex items-center justify-center hover:bg-[#8A9A7B] hover:text-white transition-all -translate-x-1/2 md:-translate-x-full cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-full shadow-lg flex items-center justify-center hover:bg-[#8A9A7B] hover:text-white transition-all translate-x-1/2 md:translate-x-full cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden" ref={carouselRef}>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
                }}
              >
                {portfolioImages.map((image) => (
                  <div
                    key={image.id}
                    className="px-3"
                    style={{
                      minWidth: `${100 / itemsPerView}%`,
                    }}
                  >
                    <div
                      className="aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all border border-[#8A9A7B]/10"
                      onClick={() => setSelectedImage(image)}
                    >
                      <ImageWithFallback
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(portfolioImages.length - itemsPerView + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? 'bg-[#8A9A7B] w-8' : 'bg-[#8A9A7B]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Portfolio Image</DialogTitle>
            <DialogDescription>
              {selectedImage?.alt || 'Portfolio image preview'}
            </DialogDescription>
          </VisuallyHidden>
          {selectedImage && (
            <div className="relative">
              <ImageWithFallback
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}