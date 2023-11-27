import { useNavigate } from "react-router-dom";
import categories from "../api/categories";

const Allcategories = () => {

  const navigate = useNavigate();

  return (
    <div className="mt-14">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-5 xl:mt-10">
          {categories.map((ele, index) => (
            <div key={index} onClick={() => {navigate("/Stores" ,{state : { type : ele.filter }})}} className="flex flex-col gap-2 h-[10rem] lg:h-[15rem] cursor-pointer group items-center justify-center">
              <div className="h-[5rem] w-[5rem] lg:h-[9rem] lg:w-[9rem] p-5 rounded-full flex items-center justify-center border-2 border-black hover:shadow-2xl">
                <img src={ele.image} alt={index} className="h-auto w-auto" />
              </div>
              <div className="hover:underline text-center group-hover:underline">
                <span className="text-[14px] lg:text-base">{ele.filter}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );

}
export default Allcategories;