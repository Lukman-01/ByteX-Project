const Product = () => {
    return (
        <>
            <div className="text-center bg-[#140D27]">
                <h4 className="title pt-10 ">Our Products</h4>
                <span className="">Get on the Go with our seamless solution, products on ByteX <br />leverage blockchain technology   to empower users to be in control  </span>
                <div className="grid grid-cols-3 w-[80%] mx-auto p-10">
                    <div className="relative pt-5 px-3 cursor-pointer overflow-hidden box  pb-8 lg:w-[363px]  dark-bg rounded-md shadow-lg shadow-black/[0.03]  justify-between flex flex-col">
                        <h4 className="title text-white text-xl">Certify Supplier</h4>
                        <p>
                            Don't trust verify!, Users can verify suppliers on the blockchain and certify them
                        </p>
                    </div>
                    <div className="relative pt-5 px-3 cursor-pointer overflow-hidden box  pb-8 lg:w-[363px]  dark-bg rounded-md shadow-lg shadow-black/[0.03]  justify-between flex flex-col">
                        <h4 className="title text-white text-xl">Verify Product Quality</h4>
                        <p className="">
                            users can monitor products on the go!  Before a product move from one stage to another, it must go through quality check
                        </p>
                    </div>
                    <div className="relative pt-5 px-3 cursor-pointer overflow-hidden box  pb-8 lg:w-[363px]  dark-bg rounded-md shadow-lg shadow-black/[0.03]  justify-between flex flex-col">
                        <h4 className="title text-white text-xl">Secure & Open Transaction</h4>
                        <p>
                            Manages payments, ensuring they are only released when conditions are met, such as successful delivery or passing quality checks.
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Product;