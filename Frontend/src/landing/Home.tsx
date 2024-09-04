import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BigIdea from "./components/BigIdea";
import Product from "./components/Products";
import ProductCarousel from "./components/ProductList";

function Home() {
  return (
    <>
      <div className="bg-black text-white ">
        <Navbar />
        <BigIdea />
        <Product/>
        <ProductCarousel/>
        <Footer />
      </div>
    </>
  );
}

export default Home;
