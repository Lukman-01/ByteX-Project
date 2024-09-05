import ImageCarousel from "./Carousel";
// import Carousel from "./Carousel";

const ProductCarousel = () => {
    // provide Images
    const images = [
        "images/home.png",
        "images/home.png"
    ];
    return ( 
        <div className="flex justify-between items-center w-[90%] mx-auto">
            <div>
                <h1 className="title">ByteX Supply Chain Stages</h1>
                <p>
                    Here are stages involved in
                </p>
            </div>
            <ImageCarousel images={images} interval={5000} />

        {/* <Carousel images={images} autoPlay={true} interval={5000} /> */}
      </div>
     );
}
 
export default ProductCarousel;