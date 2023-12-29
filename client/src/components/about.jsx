import about from '../assets/images/about.jpeg'

const About = () => {
    return (
        <div className="flex  flex-col lg:flex-row items-center justify-center gap-20 lg:mx-28 mx-5 my-20">
            <div className="flex flex-col gap-3 items-start justify-center w-full lg:w-1/2">
                <div className='font-semibold text-lg lg:text-3xl'>About CodeSpotr - Codes that always work</div>

                <div className='text-lg font-semibold'>Did you ever put so much effort into finding coupon codes to save money just to realize that they do not work? Annoying, right? Well, this won{`'`}t happen when you are using CodeSpotr{`'`}s coupon codes. Because we are extremely strict about our codes quality.</div>

                <div className='text-lg'>We have a very rigorous team specifically assigned to make sure the coupon codes are fulfilling their purpose. Each coupon codes is checked meticulously by our team members before going on the site. And we are so uncompromising about the quality of coupon codes that we want to avoid even the slightest mistake. And thus we put extra effort and re-check our codes daily. So you can just rest assured and save your hard earned money by using our coupon codes.
                </div>

                <div className='text-md'>Though unlikely if one of our codes doesn{`'`}t give you the discounts that it is supposed to, we offer a gift card for a complimentary treat as a part of {`"`}Our Codes{`"`} assurance guarantee. In addition to that, we{`'`}ll assist you how you can apply your code for the online stores that you want to save money with, so you never miss out on savings during the checkout process.</div>

                <div className='text-md'> Happy Shopping!!!</div>

            </div>

            <img src={about} alt="about" className='w-full lg:w-1/2' />
        </div>
    )
}

export default About
