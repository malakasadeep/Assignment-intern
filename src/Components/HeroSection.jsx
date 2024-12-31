import { ArrowRight } from "lucide-react";
import React from "react";

export default function HeroSection() {
  return (
    <div>
      <div className="relative h-[550px] bg-[url('https://assets.travelcenter.uk/images/airline/qatar-airways/airline-class/qatar-airways-class-1.webp')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 "></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-12 md:py-16">
          <div className="max-w-4xl mt-24 mb-14">
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-6 font-mono">
              Explore the World Together
              <br />
              with Premium travel
            </h1>
            <p className="text-white text-xl mb-12">Get upto 50% Discount</p>
            <button className="bg-bg-primary hover:bg-purple-800 text-white px-8 py-3 rounded-full flex items-center space-x-4 transition-all duration-300 shadow-lg hover:shadow-xl relative">
              <span className="pr-8">Book Now</span>
              <div className="bg-white p-2 w-10 h-10 rounded-full flex items-center justify-center absolute right-1  transition-all">
                <ArrowRight className="w-5 h-5 text-bg-primary" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
