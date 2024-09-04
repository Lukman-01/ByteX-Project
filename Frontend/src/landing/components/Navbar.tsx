import { CustomConnectButton } from '../../components/CustomConnectButton';
import './landing.css'
const Navbar = () => {


    return (
        <>
            <header className="sticky w-full top-0 z-20   bg-img">
                <div className="container mx-auto py-6 w-[90%]  flex justify-between items-center">
                   
                    <div className="lg:col-span-3">
                            <h1 className=" text-4xl  text-white title">go<span className="text-[#D434FE]">ByteX</span></h1>
                       
                    </div>
                    

                    <button className="register text-white py-2 px-8 col-span-1 text-base " >Connect Wallet</button>
                    <CustomConnectButton/>
                </div>

            </header>
            
        </>
    );
}

export default Navbar;