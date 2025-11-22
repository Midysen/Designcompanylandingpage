import { Palette, Code, Smartphone, Megaphone, Package, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Creating memorable visual identities that capture your brand essence and resonate with your audience.',
  },
  {
    icon: Code,
    title: 'Web Design',
    description: 'Beautiful, responsive websites that deliver seamless user experiences across all devices.',
  },
  {
    icon: Smartphone,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces designed with users in mind, combining aesthetics with functionality.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that amplify your message and drive meaningful engagement.',
  },
  {
    icon: Package,
    title: 'Product Design',
    description: 'End-to-end product design services from concept to launch and beyond.',
  },
  {
    icon: Sparkles,
    title: 'Motion Graphics',
    description: 'Engaging animations and motion design that bring your brand to life.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-black mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a full spectrum of design services to help your brand stand out in the digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-black mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
