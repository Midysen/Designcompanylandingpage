import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import heroVideo from '../assets/IMG_6686.mp4';

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8A9A7B]/80 via-[#A8B69B]/70 to-[#F9C5B8]/60" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <h1 className="text-white mb-8">
          Accent Walls & Ceilings
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 mb-4 max-w-3xl mx-auto leading-relaxed">
          Premium craftsmanship in Denver, Colorado.
        </p>
        <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto italic">
          Every piece we craft carries a part of our soul—designed with passion, built with purpose.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" variant="default" onClick={scrollToContact} className="bg-white text-black hover:bg-gray-100">
            Get Free Consultation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToGallery} className="border-white text-white hover:bg-white hover:text-black">
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}