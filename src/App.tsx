import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { About } from './components/About';
import { Suppliers } from './components/Suppliers';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Gallery />
      <WhyChooseUs />
      <Process />
      <About />
      <Suppliers />
      <Contact />
    </div>
  );
}
