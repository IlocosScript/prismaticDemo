import { Calendar, Globe, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <img 
              src="/002c95a3-5b00-4fe9-8fb4-d9f743e9ea2e.png" 
              alt="The Prismatic Nomad Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          
          {/* Content */}
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-8">
            About <span className="gradient-text">Us</span>
          </h2>
          
          <p className="text-xl text-stone-600 leading-relaxed mb-12">
            Founded in Abu Dhabi in 2018, The Prismatic Nomad has grown into a globally recognized 
            business consultation company, dedicated to helping entrepreneurs, startups, and established 
            enterprises achieve unprecedented growth and operational excellence.
          </p>
          
          <p className="text-lg text-stone-600 leading-relaxed mb-12">
            Our expertise spans across business strategy development, comprehensive marketing solutions, 
            distinctive branding initiatives, and operational efficiency optimization. We pride ourselves 
            on delivering innovative, data-driven solutions that transform challenges into opportunities 
            and vision into reality.
          </p>
          
          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Calendar className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-900 mb-2">6+</div>
                <div className="text-stone-600 font-medium">Years of Excellence</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Globe className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-900 mb-2">Global</div>
                <div className="text-stone-600 font-medium">Reach & Impact</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <TrendingUp className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-900 mb-2">100%</div>
                <div className="text-stone-600 font-medium">Client Success Focus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}