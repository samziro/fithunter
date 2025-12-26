/* eslint-disable react/no-unescaped-entities */
'use client';

export default function WhyChooseUs() {
  const features = [
    {
      icon: 'ri-heart-line',
      title: 'Tailored Plans',
      description: 'Custom fitness coaching Kenya-wide, including defined abs routines and online options starting at KES 2000.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Local Expertise',
      description: 'Unique beach workouts Watamu for engaging, outdoor fitness experiences in Kenya\'s coastal paradise.'
    },
    {
      icon: 'ri-leaf-line',
      title: 'Proven Success',
      description: 'Join clients who\'ve achieved their best selves through our transformative programs—see testimonials below.'
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Fit Hunter as Your Personal Trainer Watamu?
          </h2>
          <p className="text-xl text-slate-100 max-w-3xl mx-auto">
            Fit Hunter offers personalized fitness coaching in Watamu, Kenya. Our sessions help you achieve health goals with effective, coastal-inspired training—preying on fitness goals one rep at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#292929] p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-2xl text-yellow-600`}></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-100 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}