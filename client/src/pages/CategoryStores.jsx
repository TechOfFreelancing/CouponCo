import Allstores from "../api/Allstories";
import { useState } from "react";
import logo from '../assets/images/Store/1.webp';
import { Link } from "react-router-dom";

const firstLatter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const CategoryStores = () => {

    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        // console.log(category);
    }
    return (
        <div className="lg:w-[75vw] flex flex-col gap-5 text-black border lg:mx-auto mt-20 lg:mt-32 lg:p-10">
            <ul className="flex items-center">
                <li className="inline-flex items-center">
                    <Link to="/" className="text-gray-900 hover:text-[#B33D53]">
                        <svg className="w-5 h-auto fill-current mx-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                    </Link>
                    <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                </li>
                <li className="inline-flex items-center">
                    <Link to="/categoriesStore" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                        All Brands
                    </Link>
                </li>
            </ul>
            <span className="text-2xl font-semibold">All Brands & Stores A-Z</span>
            <div className="border-2 border-gray-400">
                <span className="text-lg text-gray-700 m-2">Browse by stores</span>
                <div className="flex flex-wrap gap-2 justify-start items-center m-2">
                    <button className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === 'All' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleCategoryClick('All')}>All</button>
                    {firstLatter.map((letter, index) => (
                        <button
                            key={index}
                            className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === letter ? 'bg-black text-white' : ''}`}
                            onClick={() => handleCategoryClick(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                    <button
                        className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === '#' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleCategoryClick('#')}
                    >
                        #
                    </button>
                </div>
            </div>
            <div>
                {selectedCategory === "All" ? (
                    Array.from([...firstLatter, '0-9']).map(
                        (letter, index) => (
                            <div key={index} className="border-2 border-gray-400 mb-3">
                                <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                                <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                    {Allstores
                                        .filter((store) => {
                                            if (letter === '0-9') {
                                                // Filter for numbers
                                                return /\d/.test(store.charAt(0));
                                            } else {
                                                return store.charAt(0).toUpperCase() === letter;
                                            }
                                        })
                                        .map((ele, index) => (
                                            <Link to="/categoriesdetails" key={index} className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0">
                                                <div className="flex gap-4">
                                                    <div className="border border-black p-1 h-[75px] w-[75px] rounded-full overflow-clip object-cover flex flex-wrap items-center justify-center"><img src={logo} alt={ele} /></div>
                                                    <div className="flex flex-col justify-evenly">
                                                        <div className="whitespace-pre-wrap">{ele}</div>
                                                        <div className=" text-sm text-gray-800">7 Offers | 9 Coupns</div>

                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        )
                    )

                ) : selectedCategory === "#" ? (
                    Array.from(Array.from({ length: 10 }).map((_, i) => `${i}`)).map(
                        (letter, index) => (
                            <div key={index} className="border-2 border-gray-400 mb-3">
                                <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                                <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                    {Allstores
                                        .filter((store) => store.charAt(0) === letter)
                                        .map((ele, index) => (
                                            <Link to="/categoriesdetails" key={index} className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0">
                                                <div className="flex gap-4">
                                                    <div className="border border-black p-1 h-[75px] w-[75px] rounded-full overflow-clip object-cover flex flex-wrap items-center justify-center"><img src={logo} alt={ele} /></div>
                                                    <div className="flex flex-col justify-evenly">
                                                        <div className="whitespace-pre-wrap">{ele}</div>
                                                        <div className=" text-sm text-gray-800">7 Offers | 9 Coupns</div>

                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        )
                    )
                ) : (Array.from(firstLatter.map((letter) => letter)).map(
                    (letter, index) => (
                        <div key={index} className={`border-2 border-gray-400 mb-3 ${selectedCategory === letter ? '' : 'hidden'}`}>
                            <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                            <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                {Allstores
                                    .filter((store) => store.charAt(0) === selectedCategory)
                                    .map((ele, index) => (
                                        <Link to="/categoriesdetails" key={index} className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0">
                                            <div className="flex gap-4">
                                                <div className="border border-black p-1 h-[75px] w-[75px] rounded-full overflow-clip object-cover flex flex-wrap items-center justify-center"><img src={logo} alt={ele} /></div>
                                                <div className="flex flex-col justify-evenly">
                                                    <div className="whitespace-pre-wrap">{ele}</div>
                                                    <div className=" text-sm text-gray-800">7 Offers | 9 Coupns</div>

                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    )
                ))}



            </div>
        </div>
    )
}
export default CategoryStores