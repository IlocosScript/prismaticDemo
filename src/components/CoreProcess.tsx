import { Search, Lightbulb, Rocket } from 'lucide-react';

export default function CoreProcess() {
  const processes = [
    {
      icon: Search,
      title: "Discovery & Assessment",
      description: "We begin by thoroughly understanding your unique business needs, strategic goals, market challenges, and growth opportunities through comprehensive analysis and stakeholder consultation."
    },
    {
      icon: Lightbulb,
      title: "Strategy Development", 
      description: "Based on our findings, we create actionable, customized plans that align with your vision, leverage your strengths, and address specific market dynamics to ensure maximum impact."
    },
    {
      icon: Rocket,
      title: "Implementation & Ongoing Support",
      description: "We provide hands-on execution support, continuous monitoring, and ongoing optimization to ensure your strategies deliver measurable results and sustainable long-term success."
    }
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Our Core <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            A proven methodology that transforms business challenges into sustainable growth opportunities
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {processes.map((process, index) => {
            const IconComponent = process.icon;
            return (
              <div key={index} className="relative group">
                {/* Connection Line (hidden on mobile) */}
                {index < processes.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-amber-500 to-blue-900 transform translate-x-4 z-0" />
                )}
                
                <div className="bg-gradient-to-br from-stone-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-100 group-hover:border-amber-200 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6 bg-gradient-to-r from-blue-900 to-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-amber-600" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-stone-800 mb-4 group-hover:text-blue-900 transition-colors">
                    {process.title}
                  </h3>
                  
                  <p className="text-stone-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}