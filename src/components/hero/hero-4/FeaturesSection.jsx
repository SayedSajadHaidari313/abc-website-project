import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: "🏢",
      title: "Register your company or business",
      description: "Quick and easy registration process"
    },
    {
      icon: "📄",
      title: "Get a free company/business page",
      description: "Professional online presence included"
    },
    {
      icon: "📱",
      title: "Generate a free QR code",
      description: "Digital access to your business"
    },
    {
      icon: "💼",
      title: "Receive a free digital business card",
      description: "Modern networking solution"
    }
  ];

  return (
    <section className="features-section" style={{ padding: '60px 0', marginTop: '-30px' }}>
      <div className="auto-container">
        <div className="row justify-content-center">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div 
                className="feature-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                  {feature.icon}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '10px' }}>
                  {feature.title}
                </h4>
                <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
