import { MapPin, Calendar, Award } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 px-6 bg-[#F5F2ED]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[#3D4436] mb-6">About ARTEL</h2>
          <p className="text-lg text-[#4A5242] leading-relaxed mb-8">
            We are a Denver-based team passionate about detail and craftsmanship. Founded in Europe in 1991, 
            ARTEL has built a legacy of excellence in accent walls and ceiling design. Our commitment to quality 
            and innovation has made us the preferred choice for discerning clients who demand nothing but the best.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg border border-[#8A9A7B]/20">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8A9A7B] to-[#A8B69B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-[#3D4436] mb-2">Since 1991</div>
            <p className="text-[#6B7562]">30+ years of expertise</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-[#8A9A7B]/20">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8A9A7B] to-[#A8B69B] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="text-[#3D4436] mb-2">Denver, CO</div>
            <p className="text-[#6B7562]">European heritage</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-[#8A9A7B]/20">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8A9A7B] to-[#A8B69B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-[#3D4436] mb-2">Premium Quality</div>
            <p className="text-[#6B7562]">Crafted with passion</p>
          </div>
        </div>
      </div>
    </section>
  );
}