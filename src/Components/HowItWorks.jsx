import React from "react";
import { Search, Users, Plane, Clock } from "lucide-react";
import planeprogress from "../assets/img/pl.png";
import VideoPlayer from "./VideoPlayer/VideoPlayer";

const HowItWorks = () => {
  const steps = [
    {
      no: "1",
      icon: <Search className="w-6 h-6 text-white" />,
      title: "Search Flights",
    },
    {
      no: "2",
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Fill Contact Form",
    },
    {
      no: "3",
      icon: <Plane className="w-6 h-6 text-white" />,
      title: "Choose Your Airline",
    },
    {
      no: "4",
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "Booking in 10 Minutes!",
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-16 px-16">
      {/* Headings */}
      <div className="mb-12 w-px-12 text-center md:w-1/2 md:text-left">
        <h1 className="text-4xl font-extrabold text-black mb-4 tracking-tight">
          How It Works
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Follow these simple steps to make your flight booking process seamless
          and hassle-free. Booking your dream trip has never been easier!
        </p>
      </div>

      <div className="container mx-auto px-12 md:flex md:items-center space-y-16 md:space-y-0">
        {/* Left side - Progress Steps */}
        <div className="relative md:w-1/2">
          <img
            src={planeprogress}
            alt="Plane Progress"
            className="absolute -left-10 top-0 h-full"
          />
          <div className="relative space-y-14 pl-20">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-center gap-6">
                <div className="absolute -left-7 -top-9 text-gray-300 text-8xl font-extrabold opacity-50">
                  {step.no}
                </div>
                <div className="relative z-10 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
                  {step.icon}
                </div>
                <span className="text-lg font-bold text-bg-primary">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Video Player */}
        <div className="relative md:w-1/2 mt-12 md:mt-0">
          <VideoPlayer />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
