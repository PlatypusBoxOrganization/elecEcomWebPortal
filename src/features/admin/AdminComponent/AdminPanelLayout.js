import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const AdminPanelLayout = () => {
    return (
      <div className="flex">
        {/* Sidebar */}
        <Sidebar/>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
         <Outlet/>
        </div>
      </div>
    );
}
 
export default AdminPanelLayout;