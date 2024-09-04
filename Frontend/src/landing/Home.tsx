import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BigIdea from "./components/BigIdea";

function Home() {
  return (
    <>
      <div className="bg-black text-white ">
        <Navbar />
        <BigIdea />
        <Footer />
      </div>
    </>
  );
}

export default Home;
