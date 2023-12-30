import Categories from "../api/categories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/newsletter";


const uniqueAlphabets = [...new Set(Categories.map(category => category.name[0].toUpperCase()))].sort();

const AllCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    }

    return (
        <>
            <div className="lg:w-[75vw] flex flex-col gap-5 text-black border lg:mx-auto mt-20 lg:mt-32 lg:p-10">
                <span className="text-2xl font-semibold">All Brands & Stores A-Z</span>
                <div className="border-2 border-gray-400">
                    <span className="text-lg text-gray-700 m-2">Browse by stores</span>
                    <div className="flex flex-wrap gap-2 justify-start items-center m-2">
                        <button
                            className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === 'All' ? 'bg-black text-white' : ''}`}
                            onClick={() => handleCategoryClick('All')}
                        >
                            All
                        </button>
                        {uniqueAlphabets.map((letter, index) => (
                            <button
                                key={index}
                                className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === letter ? 'bg-black text-white' : ''}`}
                                onClick={() => handleCategoryClick(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    {selectedCategory === "All" ? (
                        uniqueAlphabets.map((letter, index) => (
                            <div key={index} className="border-2 border-gray-400 mb-3 py-3 cursor-pointer" >
                                <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                                <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                    {Categories
                                        .filter(category => category.filter[0].toUpperCase() === letter)
                                        .map((category, i) => (
                                            <div key={i} onClick={() => { navigate("/Stores", { state: { type: category.name } }) }} className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0">
                                                <div className="flex gap-4 justify-between">
                                                    <div className="flex flex-col justify-evenly">
                                                        <div className="whitespace-nowrap">{category.name}</div>
                                                    </div>
                                                    <img src={category.icon} alt={category.id} className="h-[5rem] w-[5rem] rounded-xl" />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))
                    ) : (Array.from(uniqueAlphabets.map((letter) => letter)).map(
                        (letter, index) => (
                            <div key={index} className={`border-2 border-gray-400 mb-3 py-3 cursor-pointer ${selectedCategory === letter ? '' : 'hidden'}`} >
                                <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                                <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                    {Categories
                                        .filter((store) => store.filter[0].toUpperCase() === selectedCategory)
                                        .map((category, i) => (
                                            <div key={i} onClick={() => { navigate("/Stores", { state: { type: category.name } }) }} className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0">
                                                <div className="flex gap-4 justify-between">
                                                    <div className="flex flex-col justify-evenly">
                                                        <div className="whitespace-nowrap">{category.name}</div>
                                                    </div>
                                                    <img src={category.icon} alt={category.id} className="h-[5rem] w-[5rem] rounded-xl" />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default AllCategories;
