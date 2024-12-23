import React from 'react';
import ps5 from '../assets/ps5.png';
import woman from '../assets/woman.png';
import speakers from '../assets/speakers.png';
import perfume from '../assets/perfume.png';

const NewArrivalSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <div className="bg-red-500 text-white px-3 py-1 rounded-md">
          Featured
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-8">New Arrival</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PlayStation 5 Section */}
        <div className="relative bg-black text-white rounded-lg overflow-hidden">
          <img src={ps5} alt="PlayStation 5" className="w-full h-[400px] object-contain p-4" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold mb-2">PlayStation 5</h3>
            <p className="mb-4">Black and White version of the PS5 coming out on sale.</p>
            <button className="text-white hover:underline">Shop Now</button>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-rows-2 gap-6">
          {/* Women's Collection */}
          <div className="relative bg-black text-white rounded-lg overflow-hidden">
            <img src={woman} alt="Women's Collection" className="w-full h-[200px] object-cover" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold mb-2">Women's Collections</h3>
              <p className="mb-2">Featured woman collections that give you another vibe.</p>
              <button className="text-white hover:underline">Shop Now</button>
            </div>
          </div>

          {/* Speakers and Perfume Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative bg-black text-white rounded-lg overflow-hidden">
              <img src={speakers} alt="Speakers" className="w-full h-[180px] object-contain p-4" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-bold mb-1">Speakers</h3>
                <p className="text-sm mb-2">Amazon wireless speakers</p>
                <button className="text-white hover:underline text-sm">Shop Now</button>
              </div>
            </div>

            <div className="relative bg-black text-white rounded-lg overflow-hidden">
              <img src={perfume} alt="Perfume" className="w-full h-[180px] object-contain p-4" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-bold mb-1">Perfume</h3>
                <p className="text-sm mb-2">GUCCI INTENSE OUD EDP</p>
                <button className="text-white hover:underline text-sm">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalSection;
