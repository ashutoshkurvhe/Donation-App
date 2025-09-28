// src/components/landing/Testimonials.jsx
import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      message: "This platform makes giving easy and transparent!",
    },
    {
      name: "Jane Smith",
      message: "I love tracking the impact of my donations.",
    },
    {
      name: "Alex Johnson",
      message: "Trusted NGOs, secure donations, amazing support.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <div className="space-y-6 mt-10">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded shadow">
              <p className="italic">"{t.message}"</p>
              <p className="mt-4 font-semibold">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
