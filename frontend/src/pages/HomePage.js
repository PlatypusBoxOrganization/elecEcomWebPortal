import homepage from "../Assets/frontpage1.png" ; 

import ProductSection from "../features/product/productComponent/ProductSection";
import BestSelling from "../Utils/BestSelling";
import CategorySection from "../Utils/CategorySection";
import SalesSection from "../Utils/SalesSection";
import NavBar from "../pages/NavBar" ;
import Frame2 from "../Assets/frame2.png"
import OurProducts from "../Utils/OurProducts";
import NewArrivals from "../Utils/NewArrivals";
import FeatureComponent from "../Utils/FeatureComponent";
const HomePage = () => {
    return (
      <>
        <div className="HomePage">
          {/* <img
            className="-pt-5 w-full"
            src={homepage}
            alt="error"
            style={{ height: "521px" }}
          ></img> */}
          <NavBar/>
          <ProductSection />
          <div className="mx-20">
            <SalesSection />
            <CategorySection />
            <BestSelling />
            <img src={Frame2} className="-pt-5 w-full" alt="error"></img>
            <OurProducts />
            <NewArrivals />
            <div className="mx-30 my-10">
              <FeatureComponent />
            </div>
          </div>
        </div>
      </>
    );
}
 
export default HomePage;