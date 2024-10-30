import React from 'react';
import { Link } from 'react-router-dom';

function Text() {
  return (
    <div className="overlay pb-40 relative flex items-center justify-center flex-col w-full lg:top-[18%] md:top[15%] lg:bg-custom-gradient">
      <div className="text w-[80%] md:w-[60%] flex flex-col gap-[25px] items-center text-center">
        <h1 className="text-white text-3xl md:text-[30px] lg:text-6xl font-bold leading-[120%]">
          Track Landsat Passes & Access Earth Data in Real Time
        </h1>
        <p className="text-[#c7c7c7] text-xl md:text-2xl font-light leading-[120%] tracking-[0.2px]">
          Define your location, get notified when Landsat passes over,
        </p>
        <Link to ="/map" className="w-[160px] md:w-[200px] cursor-pointer p-2 md:p-4 rounded-lg text-white bg-[#4169E1] md:text-xl hover:bg-[#305bd9] transition-all duration-300">
          Explore the earth
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Text); // Using React.memo for performance optimization
