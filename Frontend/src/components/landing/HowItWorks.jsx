// src/components/landing/HowItWorks.jsx
import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">1. Choose a Cause</h3>
            <p>
              Browse through verified NGOs and campaigns to find a cause you
              care about.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">2. Donate Securely</h3>
            <p>
              Make secure donations through our platform and receive a digital
              receipt instantly.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">3. Track Impact</h3>
            <p>
              Follow the progress of campaigns and see the real-life impact of
              your support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
