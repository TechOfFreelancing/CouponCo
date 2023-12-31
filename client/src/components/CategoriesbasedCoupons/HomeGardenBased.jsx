import categoriesBasedCoupons from "../../api/CategoriesBasedCoupons";
import { FaHeart } from 'react-icons/fa6';
import "../../components/couponsbutton.css";
import { Link } from "react-router-dom";

const HomeGardenBased = () => {
  return (
    <div className="Home_Garden">
                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10">
                    <div className="flex flex-col gap-1 lg:gap-5">
                        <span className="font-semibold text-lg lg:text-3xl">Today’s Top Home & Garden Offers</span>
                    </div>
                    <Link to="" className="hover:underline h-7 duration-300 underline">
                        View All Home & Garden Offers
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    {categoriesBasedCoupons.Home_Garden.map((item, index) => (
                        <div key={index}
                            className="group flex flex-col gap-2 items-center justify-start relative h-[325px] w-[300px] border rounded-lg overflow-hidden shadow-lg duration-300 my-5 pb-5 bg-white">
                            <img
                                src={item.bg}
                                className="cursor-pointer w-full h-1/2"
                            />
                            <span
                                className={`hidden group-hover:inline-flex p-2 absolute right-1 top-1 backdrop-blur-sm bg-transparent border border-transparent  rounded-lg `}

                            >
                                <FaHeart className="cursor-pointer text-xl duration-300" />
                            </span>

                            <img src={item.logo} alt="" className="absolute z-10 h-[75px] w-[75px] left-2 bottom-36 border border-white bg-white rounded-full" />
                            <div className="ml-24 flex w-3/5 justify-between items-center text-gray-700">
                                {item.Verified && <span className="text-black bg-blue-200 p-1 rounded-md text-[12px]">Verified</span>}
                            </div>
                            <div className="mx-2">
                                <span className="text-red-600 mr-2">{item.title}</span>
                            </div>
                            <div className="flex justify-between w-full text-sm px-2">
                                <span>{item.used} Used</span>
                            </div>
                            <div className="flex flex-col items-center justify-between">
                                <button className="button has-code">
                                    <span className="is-code">{item.coupon}</span>
                                    <span className="is-code-text"><em>GET CODE</em></span>
                                </button>
                            </div>
                        </div>
                    )).slice(0,4)}
                </div>
            </div>
  )
}

export default HomeGardenBased;
