import { Link, useNavigate } from "react-router-dom";
import categories from "../api/categories";

const Categories = () => {

    const navigate = useNavigate();

    return (
        <div className="lg:mx-28 mx-5">
            <div className="flex flex-col justify-center lg:flex-row lg:justify-between mt-10">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <span className="font-semibold text-lg lg:text-3xl">Categories</span>
                </div>
                <Link to="/AllCategories" className="hover:underline h-7 duration-300 underline">
                    All Categories
                </Link>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 lg:gap-5 my-5 overflow-auto xl:flex scroll-snap-type-x mandatory scrollbar-hide">
                {
                    categories.map((ele, index) => {
                        return (
                            <div key={index} onClick={() => {navigate("/AllStores" ,{state : { type : ele.filter }})}} className="flex flex-col gap-2 h-[10rem] lg:h-[15rem] cursor-pointer group  items-center justify-center">
                                <div className="h-[5rem] w-[5rem] lg:h-[9rem] lg:w-[9rem] p-5 rounded-full flex items-center justify-center border-2 border-black hover:shadow-2xl ">
                                    <img src={ele.image} alt={index} className="h-auto w-auto " />
                                </div>
                                <div className="hover:underline text-center group-hover:underline">
                                    <span className="text-[14px] lg:text-base">{ele.filter}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Categories;
