import React from "react";
import { ArrowRight } from "lucide-react";

const causes = [
  {
    title: "Clean Water for Rural Villages",
    description:
      "Help build wells and provide clean, safe drinking water to communities in need.",
    image:
      "https://images.unsplash.com/photo-1598453443831-576f93944321?q=80&w=2070&auto=format&fit=crop",
    raised: 75000,
    goal: 100000,
  },
  {
    title: "Education for Every Child",
    description:
      "Support schools and provide essential learning materials to underprivileged children.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    raised: 45000,
    goal: 60000,
  },
  {
    title: "Wildlife Conservation Efforts",
    description:
      "Protect endangered species and their habitats through conservation projects worldwide.",
    image:
      "https://images.unsplash.com/photo-1497752531616-c3afd9760a11?q=80&w=2070&auto=format&fit=crop",
    raised: 120000,
    goal: 150000,
  },
];

const CauseCard = ({ cause }) => {
  const progress = (cause.raised / cause.goal) * 100;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-64">
        <img
          src={cause.image}
          alt={cause.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 h-20">
          {cause.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6 h-24">
          {cause.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>${cause.raised.toLocaleString()} Raised</span>
            <span>${cause.goal.toLocaleString()} Goal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button className="w-full mt-4 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2">
          Donate Now <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default function FeaturedCauses() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Featured Causes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us in supporting these critical projects. Your contribution can
            make a world of difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <CauseCard key={index} cause={cause} />
          ))}
        </div>
      </div>
    </section>
  );
}
