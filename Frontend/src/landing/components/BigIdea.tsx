import { useNavigate } from "react-router-dom";
const BigIdea = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <section className="  ">
        <div className="colo w-[90%]  mx-auto py-10 align-baseline">
          <div className="m-auto w- text-center lg:text-left">
            <img
              className="absolute right-0 animate-caret"
              src="images/purplestar.png"
              alt=""
            />

            <h4 className="title text-4xl">
              {" "}
              Transform your Logistics <br /> with ByteX
            </h4>
            <p className=" leading-8 text-md">
              Our decentralized logistics system revolutionizes supply chains by
              eliminating middlemen, empowering you with direct control and
              transparency. Join us in solving real-world problems and shaping
              the future of supply chain management.
            </p>
            <button
              onClick={handleButtonClick}
              className="register my-20 py-2 px-10 font-bold "
            >
              {" "}
              Get Started
            </button>
          </div>
          <div className="">
            <div className="w-full flex items-baseline">
              <img src="images/home.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BigIdea;
