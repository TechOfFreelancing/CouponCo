// import content from '../assets/images/content.png'

const Content = () => {
    return (
        <div className="flex flex-col items-center justify-center mx-10 lg:mx-28">
            <h1 className="text-xl lg:text-2xl font-bold my-10">Save your hard earned money with CodeSpotr Codes</h1>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
                <div className="text-justify">We trust your choice of choosing qualitative products like clothing, footwear, home decoration, beauty products, health care and many more, but now its your time to trust us in getting those products at lowest rate possible. Let us spin our magic wheel and give you the best hand tested coupon codes and discount offers.</div>

                <div className="text-justify">Our team is in continuous efforts to find a perfect coupon for you so that you dont have to dig deeper into your pockets. We are here for you with our price comparison extentsion browser, that helps you choose the best products at the best prices available. Trust us, we’ll not let you spend more than you need to.</div>
            </div>
            {/* <img src={content} alt="" className='lg:w-1/2 lg:h-auto my-10' /> */}
        </div>
    )
}

export default Content
