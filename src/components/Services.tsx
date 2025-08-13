import { BarChart3, DollarSign, Megaphone, Settings, Users, Smartphone } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: BarChart3,
      title: "Business Strategy & Planning",
      description: "Comprehensive strategic planning and business model optimization"
    },
    {
      icon: DollarSign,
      title: "Financial Advisory",
      description: "Expert financial guidance and investment strategy consulting"
    },
    {
      icon: Megaphone,
      title: "Marketing & Brand Development",
      description: "Innovative marketing strategies and brand positioning solutions"
    },
    {
      icon: Settings,
      title: "Operations & Process Improvement",
      description: "Operational efficiency enhancement and workflow optimization"
    },
    {
      icon: Users,
      title: "Human Capital & Organizational Development",
      description: "Talent management and organizational structure optimization"
    },
    {
      icon: Smartphone,
      title: "Technology & Digital Transformation",
      description: "Digital innovation and technology integration strategies"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Business meeting presentation"
                className="w-full h-96 lg:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400 rounded-full opacity-20 animate-bounce" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-900 rounded-full opacity-10 animate-pulse" />
          </div>
          
          {/* Services Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-8">
              Our <span className="gradient-text">Services</span>
            </h2>
            
            <p className="text-lg text-stone-600 mb-12 leading-relaxed">
              We offer a comprehensive suite of business services designed to drive growth, 
              enhance efficiency, and unlock your organization's full potential across all operational areas.
            </p>
            
            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 group cursor-pointer">
                    <div className="bg-white p-3 rounded-lg shadow-md group-hover:shadow-lg transition-all group-hover:bg-amber-50 border border-stone-200 group-hover:border-amber-200">
                      <IconComponent className="w-6 h-6 text-blue-900 group-hover:text-amber-600 transition-colors" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-blue-900 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}