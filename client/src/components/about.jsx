import about from '../assets/images/about/about.png'

const About = () => {
    return (
        <div className="flex  flex-col lg:flex-row items-center justify-center gap-20 lg:px-28 px-5 py-20 bg-white">
            <div className="flex flex-col gap-3 items-start justify-center w-full lg:w-1/2">
                <div className='font-bold text-lg lg:text-2xl'>Qwik Savings - Shop Smarter, Save Faster</div>

                <div className='text-md'>There is nothing more disappointing than finding an exciting code only to find it not working at checkout. So, to save you from this, our team at Qwik Savings, works meticulously to ensure that you only get the most authentic and working coupon codes to shop along. Every single code added to our website is checked thoroughly to make sure that you aren’t disappointed.</div>

                <div className='text-md'>We are always ready to go one extra mile to deliver on the promise we make to you, so be ensured that all that you see on our platform is totally functional. We take pride in our system of delivery, thus each of the codes we provide has a name attached to it, to prove our trust and reliability. We are confident that whatever coupons you see on our portal will be delivered to you as it is.
                </div>

                <div className='text-sm'>In a rare instance, where the coupon code falls short, we promise you a guaranteed gift card as a part of our acknowledgement of the issue and gratitude towards you for sticking alongside us.</div>

                <div className='text-sm'>Apart from lending a hand in saving you money through our brilliantly cost effective coupon codes, we even guide you towards a path of a simplified and hassle free online shopping experience through our helpful tips, shopping guides and you can even get to know the brands we work with and whose deals we offer to you. Learn exactly how to apply the provided coupon code to make sure you don’t face any delay during checkouts.</div>

            </div>

            <img src={about} alt="about" className='w-full lg:w-1/2' />
        </div>
    )
}

export default About
