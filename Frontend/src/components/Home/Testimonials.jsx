import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Monthly Donor",
    quote:
      "This is the most transparent donation platform I've ever used. Seeing the direct impact of my contributions is incredibly rewarding.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael B.",
    role: "Project Supporter",
    quote:
      "The process was so simple and secure. I found a cause I was passionate about and was able to donate in minutes. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily L.",
    role: "Community Volunteer",
    quote:
      "Being part of this community is amazing. It's more than just donating; it's about connecting with people who care.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col h-full">
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 leading-relaxed flex-grow mb-6">
      "{testimonial.quote}"
    </p>
    <div className="flex items-center">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <p className="font-bold text-gray-900">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Words From Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our donors and partners have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
