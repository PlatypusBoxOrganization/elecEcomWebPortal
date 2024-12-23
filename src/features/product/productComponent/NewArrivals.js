import ps5Image from "../../../Assets/ps5.png";
import womanImage from "../../../Assets/woman.png";
import speakersImage from "../../../Assets/speakers.png";
import audioImage from "../../../Assets/Audio.webp";
import gamingImage from "../../../Assets/Gaming.webp";
import computingImage from "../../../Assets/Computing.webp";

const NewArrivals = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-red-500 uppercase text-sm font-bold mb-2">Featured</h2>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">New Arrival</h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* PlayStation Image - Main Feature */}
        <div className="relative bg-black rounded-lg overflow-hidden group aspect-w-16 aspect-h-9">
          <img
            src={ps5Image}
            alt="PlayStation 5"
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">PlayStation 5</h3>
              <p className="text-gray-200 text-sm sm:text-base">Experience next-gen gaming</p>
            </div>
          </div>
        </div>

        {/* Other Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Women's Collection */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden group aspect-w-1 aspect-h-1">
            <img
              src={womanImage}
              alt="Women's Collection"
              className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white mb-1">Women's Collection</h3>
                <p className="text-gray-200 text-sm">Latest fashion trends</p>
              </div>
            </div>
          </div>

          {/* Speakers */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden group aspect-w-1 aspect-h-1">
            <img
              src={speakersImage}
              alt="Speakers"
              className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white mb-1">Premium Speakers</h3>
                <p className="text-gray-200 text-sm">Immersive audio experience</p>
              </div>
            </div>
          </div>

          {/* Computing & Gaming */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden group aspect-w-2 aspect-h-1 sm:col-span-2">
            <div className="grid grid-cols-2 h-full">
              <div className="relative overflow-hidden">
                <img
                  src={computingImage}
                  alt="Computing"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">Computing</h3>
                    <p className="text-gray-200 text-sm">Latest tech</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={gamingImage}
                  alt="Gaming"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">Gaming</h3>
                    <p className="text-gray-200 text-sm">Gear up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
