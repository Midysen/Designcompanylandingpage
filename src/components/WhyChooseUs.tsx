import { Gem, Sparkles, Palette, Clock, MessageCircle, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: Gem,
    title: 'Premium Materials',
    description: 'We source only the finest materials for exceptional quality and durability.',
  },
  {
    icon: Sparkles,
    title: 'Clean Finishing',
    description: 'Meticulous attention to detail ensures flawless results every time.',
  },
  {
    icon: Palette,
    title: 'Modern Design',
    description: 'Contemporary aesthetics that elevate your space to the next level.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Efficient processes without compromising on quality or craftsmanship.',
  },
  {
    icon: MessageCircle,
    title: 'Free Design Consultation',
    description: 'Expert guidance to help you visualize and realize your dream space.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Guarantee',
    description: 'We stand behind our work with comprehensive warranty coverage.',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 px-6 bg-[#EDE8E3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#3D4436] mb-4">Why Choose Us</h2>
          <p className="text-[#6B7562] max-w-2xl mx-auto">
            Discover what sets ARTEL apart in craftsmanship and customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white border border-[#8A9A7B]/20 rounded-lg hover:border-[#8A9A7B] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#8A9A7B] to-[#A8B69B] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#3D4436] mb-3">{benefit.title}</h3>
                <p className="text-[#6B7562]">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}