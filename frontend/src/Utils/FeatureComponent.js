import { FaTruck, FaHeadphonesAlt, FaShieldAlt } from "react-icons/fa";
const FeatureComponent = () => {
  const features = [
    {
      id: 1,
      icon: <FaTruck size={40} />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      id: 2,
      icon: <FaHeadphonesAlt size={40} />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      id: 3,
      icon: <FaShieldAlt size={40} />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];
  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center">
              {/* Icon with background */}
              <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-4">
                <div className="text-black">{feature.icon}</div>
              </div>
              {/* Title */}
              <h3 className="text-lg font-bold text-black">{feature.title}</h3>
              {/* Description */}
              <p className="text-sm text-gray-600 mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureComponent;
