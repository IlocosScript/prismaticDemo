export default function Partners() {
  const partners = [
    {
      name: "Femnux",
      logo: "F",
      testimonial: "Their strategic insights helped us scale our operations efficiently and increase our market presence significantly.",
      color: "bg-purple-100 text-purple-800"
    },
    {
      name: "AccountTech",
      logo: "AT",
      testimonial: "Outstanding financial advisory services that transformed our accounting processes and improved our bottom line.",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "ROAS",
      logo: "R",
      testimonial: "Their marketing expertise delivered exceptional results, increasing our ROI by 300% within six months.",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Servcorp",
      logo: "SC",
      testimonial: "Professional service delivery and innovative solutions that helped us optimize our operational efficiency.",
      color: "bg-amber-100 text-amber-800"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Our Valued <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            We take pride in our diverse partnerships with forward-thinking organizations that trust us 
            to deliver exceptional results and drive sustainable business growth.
          </p>
        </div>
        
        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="bg-gradient-to-br from-stone-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-100 group">
              {/* Logo */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white border-2 border-stone-200 group-hover:scale-110 transition-transform overflow-hidden">
                {partner.name === "Femnux" ? (
                  <img 
                    src="/femux.png" 
                    alt="Femnux Logo" 
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <img 
                    src="/002c95a3-5b00-4fe9-8fb4-d9f743e9ea2e.png" 
                    alt="Partner Logo" 
                    className="w-12 h-12 object-contain"
                  />
                )}
              </div>
              
              {/* Company Name */}
              <h3 className="text-xl font-bold text-stone-800 mb-4 group-hover:text-blue-900 transition-colors">
                {partner.name}
              </h3>
              
              {/* Testimonial */}
              <p className="text-stone-600 text-sm leading-relaxed italic">
                "{partner.testimonial}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}