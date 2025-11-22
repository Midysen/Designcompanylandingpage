import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/26f10afa-cf96-4e56-a168-e6007a4b84a4.png';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2ED]/95 backdrop-blur-md border-b border-[#8A9A7B]/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <img src="https://i.gyazo.com/61a1663e5719570462b02fe73ee1c268.png" alt="ARTEL" className="h-10 w-auto" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('gallery')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors cursor-pointer">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('why-choose-us')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors cursor-pointer">
              Why Us
            </button>
            <button onClick={() => scrollToSection('process')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors cursor-pointer">
              Process
            </button>
            <button onClick={() => scrollToSection('about')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors cursor-pointer">
              About
            </button>
            <Button onClick={() => scrollToSection('contact')}>
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-[#3D4436]" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
            <button onClick={() => scrollToSection('gallery')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors text-left">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('why-choose-us')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors text-left">
              Why Us
            </button>
            <button onClick={() => scrollToSection('process')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors text-left">
              Process
            </button>
            <button onClick={() => scrollToSection('about')} className="text-[#6B7562] hover:text-[#3D4436] transition-colors text-left">
              About
            </button>
            <Button onClick={() => scrollToSection('contact')} className="w-full">
              Contact
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}