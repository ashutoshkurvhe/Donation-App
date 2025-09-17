import React from "react";
import { Search, Heart, Award } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Cause",
    description:
      "Browse our curated list of verified charities and projects. Find a cause that speaks to your heart.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: Heart,
    title: "Donate Securely",
    description:
      "Make a donation with confidence. Our secure platform ensures your contribution goes directly to the cause.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: Award,
    title: "See Your Impact",
    description:
      "Receive transparent updates and stories from the field. Witness the tangible difference you've made.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Making a Difference in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined process makes it easy for you to give with
            confidence and see your impact.
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-3xl shadow-2xl object-cover w-full h-auto aspect-[4/3]"
                />
              </div>
              <div className="md:w-1/2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 text-white rounded-2xl mb-6 shadow-lg">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
