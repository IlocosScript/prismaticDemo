import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Carrie Mendoza",
      role: "CEO, TechStart Solutions",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300",
      testimonial: "The Prismatic Nomad's expertise in business strategy is unmatched. Their team provided invaluable insights that helped us navigate complex market challenges and achieve 40% growth in our first year working together.",
      rating: 5
    },
    {
      name: "David Cruz",
      role: "Founder, InnovateNow",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      testimonial: "Professional, knowledgeable, and results-driven. Their marketing strategies transformed our brand presence and significantly increased our customer acquisition rate. Highly recommend their services.",
      rating: 5
    },
    {
      name: "Jessica Lim",
      role: "Managing Director, Global Ventures",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
      testimonial: "Working with The Prismatic Nomad was a game-changer for our organization. Their comprehensive approach to business optimization delivered exceptional results and exceeded our expectations in every aspect.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Feedback from <span className="gradient-text">Clients</span>
          </h2>
          <h3 className="text-2xl text-amber-600 font-semibold mb-4">
            Why you should choose us
          </h3>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients say about their experience working with us.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-100 group relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6 bg-amber-500 w-8 h-8 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-6 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-stone-600 leading-relaxed mb-8 italic">
                "{testimonial.testimonial}"
              </p>
              
              {/* Client Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 group-hover:text-blue-900 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-stone-500 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}