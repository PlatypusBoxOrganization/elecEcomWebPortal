import homepage from "../Assets/frontpage1.png" ; 

import ProductSection from "../features/product/productComponent/ProductSection";
import BestSelling from "../Utils/BestSelling";
import CategorySection from "../Utils/CategorySection";
import SalesSection from "../Utils/SalesSection";

import Frame2 from "../Assets/frame2.png"
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
          <ProductSection />
          <div className="mx-20">
            <SalesSection />
            <CategorySection />
            <BestSelling />
            <img src={Frame2} className="-pt-5 w-full" alt="error"></img>
          </div>
        </div>
      </>
    );
}
 
export default HomePage;