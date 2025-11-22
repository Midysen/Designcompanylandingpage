import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const portfolioImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NlbnQlMjB3YWxsJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzMzI3MDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Modern accent wall with elegant design',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1722109997425-40f920848aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwcGFuZWwlMjB3YWxsfGVufDF8fHx8MTc2MzMyNzA3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Wood panel accent wall',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1675350174715-424e25f73c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjZWlsaW5nJTIwZGVzaWdufGVufDF8fHx8MTc2MzI5NjUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Modern ceiling design',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1752123150230-45ef1a1bb9c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHdhbGx8ZW58MXx8fHwxNzYzMzI3MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Luxury interior wall design',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1711915442858-2a5bb7ba67d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlZCUyMHdhbGwlMjBwYW5lbHxlbnwxfHx8fDE3NjMzMjcwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Textured wall panel design',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1753505889211-9cfbac527474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjMzMTI3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Contemporary interior design',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1680965075873-64356db057fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwcGFuZWxpbmclMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MzMyNzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Wall paneling in living room',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1633945089460-5f0a309e10c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwd2FsbHxlbnwxfHx8fDE3NjMzMjcwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Modern bedroom wall design',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGNyYWZ0c21hbnNoaXB8ZW58MXx8fHwxNzYzMzI3MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-full shadow-lg flex items-center justify-center hover:bg-[#8A9A7B] hover:text-white transition-all -translate-x-1/2 md:-translate-x-full"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-full shadow-lg flex items-center justify-center hover:bg-[#8A9A7B] hover:text-white transition-all translate-x-1/2 md:translate-x-full"
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