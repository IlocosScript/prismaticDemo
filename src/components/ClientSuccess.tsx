import { ArrowRight } from 'lucide-react';

export default function ClientSuccess() {
  return (
    <section className="py-20 bg-white relative">
      {/* Logo watermark */}
      <div className="absolute top-10 right-10 opacity-5">
        <img 
          src="/IMG_7675 (1) - Edited.png" 
          alt="The Prismatic Nomad Logo" 
          className="w-32 h-32 object-contain"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
                Our Approach to
                <span className="gradient-text block">Client Success</span>
              </h2>
              
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                We believe in a client-first approach that puts your unique needs and goals at the center 
                of everything we do. Our commitment to delivering measurable results is backed by years 
                of industry expertise and a proven track record of driving transformational growth for 
                businesses of all sizes.
              </p>
              
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                From initial consultation to ongoing support, we work as your trusted partner, 
                providing strategic insights, innovative solutions, and hands-on execution that 
                delivers tangible business value and sustainable competitive advantages.
              </p>
            </div>
            
            <a 
              href="#contact"
              className="inline-flex items-center bg-amber-500 text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-colors font-medium group"
            >
              GET IN TOUCH
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional businessman"
                className="w-full h-96 lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-900 rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </section>
  );
}