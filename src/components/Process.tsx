import { Play, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Express Diagnostics',
    description: 'Quality assessment of your space based on layout and photos',
  },
  {
    number: '02',
    title: 'Personal Meeting',
    description: 'Discussing project details and your preferences',
  },
  {
    number: '03',
    title: 'Design Concept',
    description: 'Development of unique design project',
  },
  {
    number: '04',
    title: 'Material Selection',
    description: 'Selection of premium materials and finishes',
  },
  {
    number: '05',
    title: 'Installation',
    description: 'Professional mounting and setup',
  },
  {
    number: '06',
    title: 'Final Detailing',
    description: 'Finishing touches and quality inspection',
  },
];

export function Process() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="process" className="py-20 px-6 bg-gradient-to-br from-[#8A9A7B] via-[#7A8A6B] to-[#A8B69B] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white mb-4">How We Work</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our proven process ensures exceptional results from concept to completion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="p-6 bg-white/10 backdrop-blur rounded-lg border border-white/20 hover:bg-white/15 transition-all h-full">
                <div className="text-4xl text-white/50 mb-4">{step.number}</div>
                <h3 className="text-white mb-3">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
              {/* Arrow connector - hidden on mobile and last item */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-white/40" />
                </div>
              )}
              {/* Vertical arrow for mobile/tablet */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <ArrowRight className="w-8 h-8 text-white/40 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-[#3D4436] rounded-lg overflow-hidden relative group cursor-pointer" onClick={() => setShowVideo(true)}>
            {!showVideo ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#8A9A7B] ml-1" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#3D4436]/90 to-transparent">
                  <p className="text-white">Watch Our Process Video</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white">Video player would be embedded here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}