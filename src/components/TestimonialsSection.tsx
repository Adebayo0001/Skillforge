import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  return (
    <section id="student-testimonials-section" className="py-20 bg-slate-50 border-t border-b border-gray-100 text-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-[0.2em] uppercase font-mono">
            TESTIMONIALS & TRUST
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2044] mt-2 tracking-tight">
            What our students say
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
            Highly practical instruction that respects busy corporate routines. Join graduates making operational waves in Lagos and beyond.
          </p>
        </div>

        {/* Carousel / Responsive Grid */}
        {/* On mobile, it offers a horizontal scroll bar; on desktop, it displays as 3 columns */}
        <div 
          id="testimonials-scroll-grid"
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 scrollbar-thin scroll-smooth snap-x snap-mandatory"
        >
          {TESTIMONIALS.map((t, index) => (
            <div 
              key={index}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-0 snap-align-center flex-1 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-4 right-6 w-12 h-12 text-slate-100 pointer-events-none" />
              
              <div>
                {/* 5 Star Indicator */}
                <div className="flex text-amber-400 gap-0.5 mb-4" id={`testimonial-rating-${index}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-serif italic leading-relaxed relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Student Card Footer profile */}
              <div className="mt-8 flex items-center gap-3 border-t border-gray-50 pt-5">
                <img 
                  src={t.imageUrl} 
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black text-navy-950 truncate leading-snug">
                    {t.name}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate leading-none mt-0.5">
                    {t.profession} at <strong className="text-gray-600">{t.company}</strong>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
