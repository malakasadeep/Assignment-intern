import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Users,
  Plane,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  PlayIcon,
} from "lucide-react";
import planeprogress from "../assets/img/pl.png";
import vid from "../assets/img/vid.mp4";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeekChange = (e) => {
    if (videoRef.current) {
      const newTime = (e.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.volume = newMuted ? 0 : volume;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        console.log("Replay was prevented:", error);
      });
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden h-[400px] group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        src={vid}
        loop
        playsInline
        autoPlay
        muted
      >
        Your browser does not support the video tag.
      </video>

      {/* Video Title Overlay */}
      <div className="absolute top-36 left-48 text-white z-5 justify-center items-center ">
        <h3 className="text-2xl font-bold mb-2">Costa Victoria Cochin</h3>
        <div className="flex items-center gap- ml-9">
          <span className="text-sm">Maldives</span>
          <span className="text-sm">•</span>
          <span className="text-sm">3 Days + 3 Nights</span>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-20 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Center Play/Pause Button */}
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-black/50 bg-opacity-20 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <PlayIcon className="w-6 h-6 text-white ml-1" />
            )}
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeekChange}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
          />

          <div className="flex items-center justify-between mt-2">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-purple-400"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
