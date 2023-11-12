import Categories from "../api/categories"
const Womanfashion = () => {
    return (

        <div className='lg:mx-28 mx-5'>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <span className="font-semibold text-lg lg:text-3xl">{Categories.filter(ele => ele.filter === "woman-fashion").map(category => category.title)}</span>
                </div>
                <div className="hover:underline h-7 duration-300 ">View All Clothing Offers</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {Categories.filter((ele) => ele.filter === "woman-fashion").map(
                    (category) =>
                        category.data.map((item,index) => (
                            <img key={index} src={item.image} alt={item.link} className="cursor-pointer duration-300 hover:-translate-y-2 hover:shadow-lg" />
                        ))
                )}
            </div>
        </div>
    )
}

export default Womanfashion
