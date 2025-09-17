import React from "react";
import { Globe, Users, Heart, DollarSign } from "lucide-react";

const stats = [
  {
    value: "2.4M+",
    label: "Dollars Raised",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    value: "45K+",
    label: "Lives Impacted",
    icon: Heart,
    color: "text-red-500",
  },
  {
    value: "200+",
    label: "Partner Projects",
    icon: Globe,
    color: "text-blue-500",
  },
  {
    value: "10K+",
    label: "Active Donors",
    icon: Users,
    color: "text-orange-500",
  },
];

export default function ImpactStats() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-contain bg-center opacity-5"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/az-subtle.png')",
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our Collective Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Together, our community is creating tangible change across the
            globe.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl text-center border border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all duration-300"
            >
              <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
              <div className="text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
