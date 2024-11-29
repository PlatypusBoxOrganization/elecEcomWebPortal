import ps5Image from "../Assets/ps5.png"; // Replace with your image path
import womanImage from "../Assets/woman.png"; // Replace with your image path
import speakersImage from "../Assets/speakers.png"; // Replace with your image path
import perfumeImage from "../Assets/perfume.png"; // Replace with your image path
const NewArrivals = () => {
  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-red-500 uppercase text-sm font-bold">Featured</h2>
        <h1 className="text-3xl font-bold">New Arrival</h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PlayStation Image */}
        <div className="relative bg-black rounded-lg">
          <img
            src={ps5Image}
            alt="PlayStation 5"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Other Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Women's Collection Image */}
          <div className="relative bg-gray-800 rounded-lg">
            <img
              src={womanImage}
              alt="Women's Collection"
              className="w-full h-full object-contain bg-black rounded-lg"
            />
          </div>

          {/* Speakers Image */}
          <div className="relative bg-gray-100 rounded-lg">
            <img
              src={speakersImage}
              alt="Speakers"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* Perfume Image */}
          <div className="relative bg-gray-100 rounded-lg">
            <img
              src={perfumeImage}
              alt="Perfume"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="relative bg-gray-100 rounded-lg">
            <img
              src={perfumeImage}
              alt="Perfume"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
