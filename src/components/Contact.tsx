import {Button} from './ui/button';
import {Input} from './ui/input';
import {Textarea} from './ui/textarea';
import {Calculator, Hammer, Loader2, Mail, MapPin, Phone, Ruler} from 'lucide-react'; // Добавил Loader2 для иконки загрузки
import React, {useState} from 'react';

// Типы для материалов и цен
type MaterialType = 'MDF' | 'Hardwood' | 'Slat Wall' | 'Custom Design';

const PRICING: Record<MaterialType, number> = {
    'MDF': 18,
    'Hardwood': 25,
    'Slat Wall': 30,
    'Custom Design': 40,
};

export function Contact() {
    // Состояние для контактной формы
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    // 1. Добавляем состояние загрузки
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Состояние для калькулятора
    const [dimensions, setDimensions] = useState({length: '', width: ''});
    const [material, setMaterial] = useState<MaterialType>('MDF');

    // Логика расчета
    const length = parseFloat(dimensions.length) || 0;
    const width = parseFloat(dimensions.width) || 0;
    const area = length * width;
    const pricePerSqFt = PRICING[material];
    const totalCost = area * pricePerSqFt;

    // 2. Обновляем функцию отправки
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 1. Получаем таймзону пользователя (например: "America/Denver")
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        try {
            const response = await fetch("/api/sendMessage", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                // 2. Добавляем userTimeZone в отправляемые данные
                body: JSON.stringify({
                    ...formData,
                    userTimeZone,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Успех
            alert('Thank you for your inquiry! We will contact you soon.');
            setFormData({name: '', email: '', phone: '', message: ''}); // Очистка формы

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false); // Выключаем "загрузку" в любом случае
        }
    };

    return (
        <section id="contact" className="py-20 px-6 bg-[#F5F2ED]">
            <div className="max-w-7xl mx-auto">
                {/* ... (Верхняя часть с заголовками и калькулятором без изменений) ... */}
                <div className="text-center mb-16">
                    <h2 className="text-[#3D4436] mb-4">Get Your Free Consultation</h2>
                    <p className="text-[#6B7562] max-w-2xl mx-auto">
                        Ready to transform your space? Use our estimator below or contact us directly.
                    </p>
                </div>

                {/* Embedded Cost Calculator */}
                <div
                    className="max-w-3xl mx-auto mb-16 bg-white rounded-2xl shadow-sm border border-[#8A9A7B]/20 overflow-hidden rounded-md">
                    {/* ... (Код калькулятора оставлен без изменений) ... */}
                    <div className="bg-[#3D4436] p-4 text-white flex items-center justify-center gap-2">
                        <Calculator className="w-5 h-5"/>
                        <span className="font-medium">Wall Cost Estimator</span>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {/* Length Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#3D4436] flex items-center gap-2">
                                    <Ruler className="w-4 h-4"/> Length (ft)
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={dimensions.length}
                                    onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
                                    className="border-[#8A9A7B]/30 focus:border-[#8A9A7B] rounded-md"
                                />
                            </div>

                            {/* Width Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#3D4436] flex items-center gap-2">
                                    <Ruler className="w-4 h-4 rotate-90"/> Width (ft)
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={dimensions.width}
                                    onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                                    className="border-[#8A9A7B]/30 focus:border-[#8A9A7B] rounded-md"
                                />
                            </div>

                            {/* Material Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#3D4436] flex items-center gap-2">
                                    <Hammer className="w-4 h-4"/> Material
                                </label>
                                <select
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value as MaterialType)}
                                    className="flex h-10 w-full rounded-md border border-[#8A9A7B]/30 bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#8A9A7B] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {Object.keys(PRICING).map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results Display */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#F5F2ED] p-4 rounded-xl border border-[#8A9A7B]/10 rounded-md">
                            <div className="text-center md:text-left">
                                <div className="text-xs text-[#6B7562] uppercase tracking-wide">Total Area</div>
                                <div className="text-xl font-semibold text-[#3D4436]">{area.toFixed(1)} sq ft</div>
                            </div>

                            <div className="text-center md:text-left">
                                <div className="text-xs text-[#6B7562] uppercase tracking-wide">Material Price</div>
                                <div className="text-xl font-semibold text-[#3D4436]">${pricePerSqFt} / sq ft</div>
                            </div>

                            <div className="mt-2 md:mt-0">
                                <div
                                    className="bg-gradient-to-r from-[#8A9A7B] to-[#A8B69B] text-white p-4 rounded-lg shadow-md text-center">
                                    <div className="text-xs opacity-90 mb-1">Estimated Cost</div>
                                    <div className="text-2xl font-bold">
                                        ${totalCost.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Input
                                    placeholder="Your Name *"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                    disabled={isSubmitting} // Блокируем ввод при отправке
                                />
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Your Email *"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <Textarea
                                    placeholder="Tell us about your project *"
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* 3. Кнопка показывает статус загрузки */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Sending...
                                    </>
                                ) : (
                                    "Request Free Consultation"
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* ... (Остальная часть компонента без изменений) ... */}
                        <div>
                            <h3 className="text-[#3D4436] mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-[#8A9A7B]"/>
                                    </div>
                                    <div>
                                        <div className="text-[#6B7562] mb-1">Phone</div>
                                        <div className="text-[#3D4436]">+1 (720) 555-ARTEL</div>
                                        <div className="text-[#3D4436]">+1 (720) 555-2783</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-[#8A9A7B]"/>
                                    </div>
                                    <div>
                                        <div className="text-[#6B7562] mb-1">Email</div>
                                        <div className="text-[#3D4436]">info@arteldenver.com</div>
                                        <div className="text-[#3D4436]">projects@arteldenver.com</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-white border border-[#8A9A7B]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-[#8A9A7B]"/>
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
        </section>
    );
}