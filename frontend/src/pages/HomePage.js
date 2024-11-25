import homepage from "../Assets/frontpage1.png" ; 

import ProductSection from "../features/product/productComponent/ProductSection";
const HomePage = () => {
    return (
      <>
        <div className="HomePage">
          <img
            className="-pt-5 w-full"
            src={homepage}
            alt="error"
            style={{ height: "521px" }}
          ></img>
        <ProductSection/>
        </div>
      </>
    );
}
 
export default HomePage;