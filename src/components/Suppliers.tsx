import { Package } from 'lucide-react';

const suppliers = [
  'Armstrong Ceilings',
  'Hunter Douglas',
  'USG Corporation',
  'CertainTeed',
  'James Hardie',
  'Boral',
  'Sto Corp',
  'Nichiha',
];

export function Suppliers() {
  return (
    <section className="py-20 px-6 bg-[#EDE8E3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-8 h-8 text-[#8A9A7B]" />
            <h2 className="text-[#3D4436]">Our Material Suppliers & Partners</h2>
          </div>
          <p className="text-[#6B7562] max-w-2xl mx-auto">
            We partner with industry-leading suppliers to ensure premium quality materials.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {suppliers.map((supplier, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-[#8A9A7B]/20 rounded-lg text-center hover:border-[#8A9A7B] hover:shadow-lg transition-all"
            >
              <div className="text-[#3D4436]">{supplier}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}