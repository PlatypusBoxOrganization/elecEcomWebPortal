// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const sidebarItems = [
//     {
//       name: "My Shop",
//       itemPath: "/#",
//       subItems: [
//         { name: "Products", path: "/productForm" },
//         { name: "Orders", path: "/default" },
//         { name: "User", path: "/default" },
//       ],
//     },
//     {
//       name: "Business Analytics",
//       itemPath: "/default",
//       subItems: [],
//     },
//     {
//       name: "Promotion",
//       itemPath: "/default",
//       subItems: [],
//     },
//     {
//       name: "Settings",
//       itemPath: "/default",
//       subItems: [],
//     },
//     {
//       name: "Support & Help",
//       itemPath: "/#",
//       subItems: [
//         { name: "Help Center", path: "/default" },
//         { name: "Contact Support", path: "/default" },
//       ],
//     },
//   ];
//   const handleMenuClick = (index) => {
//     setActiveMenu(activeMenu === index ? null : index);
//   };

//   return (
//     <div className="h-screen w-64 p-5">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h2>
//       <ul className="space-y-4">
//         {sidebarItems.map((item, index) => (
//           <li key={index}>
//             <div
//               className="flex items-center text-gray-900 justify-between cursor-pointer hover:bg-red-700 p-2 rounded-md"
//               onClick={() => handleMenuClick(index)}
//             >
//               <span>{item.name}</span>
//               <span className="text-red-400">
//                 {activeMenu === index ? "−" : "+"}
//               </span>
//             </div>
//             {activeMenu === index && item.subItems.length > 0 && (
//               <ul className="pl-6 mt-2 space-y-2">
//                 {item.subItems.map((subItem, subIndex) => (
//                   <li key={subIndex}>
//                     <Link
//                       to={subItem.path}
//                       className="block p-2 hover:bg-red-600 rounded-md cursor-pointer text-gray-700"
//                     >
//                       {subItem.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const sidebarItems = [
    {
      name: "My Shop",
      itemPath: "/#",
      subItems: [
        { name: "Products", path: "productForm" }, // Relative path
        { name: "Orders", path: "default" }, // Relative path
        { name: "User", path: "default" }, // Relative path
      ],
    },
    {
      name: "Business Analytics",
      itemPath: "/default",
      subItems: [],
    },
    {
      name: "Promotion",
      itemPath: "/default",
      subItems: [],
    },
    {
      name: "Settings",
      itemPath: "/default",
      subItems: [],
    },
    {
      name: "Support & Help",
      itemPath: "/#",
      subItems: [
        { name: "Help Center", path: "default" }, // Relative path
        { name: "Contact Support", path: "default" }, // Relative path
      ],
    },
  ];

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div className="h-screen w-64 p-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h2>
      <ul className="space-y-4">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <div
              className="flex items-center text-gray-900 justify-between cursor-pointer hover:bg-red-700 p-2 rounded-md"
              onClick={() => handleMenuClick(index)}
            >
              <span>{item.name}</span>
              <span className="text-red-400">
                {activeMenu === index ? "−" : "+"}
              </span>
            </div>
            {activeMenu === index && item.subItems.length > 0 && (
              <ul className="pl-6 mt-2 space-y-2">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={`/admin/${subItem.path}`} // Adjusted to be relative to /admin
                      className="block p-2 hover:bg-red-600 rounded-md cursor-pointer text-gray-700"
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
