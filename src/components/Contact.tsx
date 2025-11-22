import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Calculator } from 'lucide-react';
import { useState } from 'react';
import { CostCalculatorChat } from './CostCalculatorChat';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon to schedule your free consultation.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#3D4436] mb-4">Get Your Free Consultation</h2>
          <p className="text-[#6B7562] max-w-2xl mx-auto">
            Ready to transform your space? Contact us today for a complimentary design consultation.
          </p>
        </div>

        {/* Calculate Cost Button */}
        <div className="flex justify-center mb-12">
          <Button
            size="lg"
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-[#8A9A7B] to-[#A8B69B] text-white hover:from-[#7A8A6B] hover:to-[#8A9A7B]"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Cost with AI Assistant
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tell us about your project *"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Request Free Consultation
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-[#3D4436] mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#8A9A7B]" />
                  </div>
                  <div>
                    <div className="text-[#6B7562] mb-1">Phone</div>
                    <div className="text-[#3D4436]">+1 (720) 555-ARTEL</div>
                    <div className="text-[#3D4436]">+1 (720) 555-2783</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#8A9A7B]" />
                  </div>
                  <div>
                    <div className="text-[#6B7562] mb-1">Email</div>
                    <div className="text-[#3D4436]">info@arteldenver.com</div>
                    <div className="text-[#3D4436]">projects@arteldenver.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#8A9A7B]" />
                  </div>
                  <div>
                    <div className="text-[#6B7562] mb-1">Location</div>
                    <div className="text-[#3D4436]">Denver, Colorado</div>
                    <div className="text-[#6B7562]">Serving the Greater Denver Area</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#8A9A7B]/20 rounded-lg">
              <div className="text-[#3D4436] mb-2">Business Hours</div>
              <div className="text-[#6B7562] space-y-1">
                <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                <div>Saturday: 9:00 AM - 4:00 PM</div>
                <div>Sunday: By Appointment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-[#8A9A7B]/20 text-center text-[#6B7562]">
        <p>© 2025 ARTEL. Premium Accent Walls & Ceilings. All rights reserved.</p>
      </footer>

      {/* Cost Calculator Chat */}
      <CostCalculatorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
}