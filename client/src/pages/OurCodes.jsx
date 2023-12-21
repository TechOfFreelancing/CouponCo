import Ourcodes from '../assets/images/our-coders/Our-Codes.jpg'
import acceptable from '../assets/images/our-coders/Acceptable-Codes.png'
import NewsLetter from '../components/newsletter'

const OurCodes = () => {
    return (
        <>
        <div className="lg:w-[80vw] mx-auto flex flex-col gap-20 text-black border mt-20 lg:mt-32 lg:p-10 px-10">
            <div className='flex lg:flex-row flex-col gap-10 items-center justify-center'>
                <div className='flex flex-col lg:w-3/5 text-justify items-center gap-5'>
                    <span className='text-3xl font-bold'>Gift Card, If Not Code</span>
                    <div>Isn’t it annoying when you spend time searching for codes and they don’t work? We know how irritating that is and we also know the value of your time.</div>
                    <div>We assure you that our codes are legit and will work. We always prioritize customer satisfaction and thus, by any chance if they don’t work and you’ve made your purchase, don’t worry! We will provide a gift card, and it will be on us.</div>
                    <div>
                        The most important and valuable thing for us is customer happiness and thus at Codespotr, we make sure that our codes are giving you the discounts that you have been promised. Our codes are always collected from the official channels or are personally negotiated with our partners. We never overlook any kind of administrative mistakes and we are extremely strict about the quality of our code, so we go above and beyond by checking our coupon codes daily.
                    </div>
                </div>
                <div className='lg:w-2/5 flex'>
                    <img src={Ourcodes} alt="ourcodes" />
                </div>
            </div>
            <div className='flex flex-col gap-8 '>
                <div className='text-3xl font-bold'>How you can get a gift card if the code doesn’t work? </div>
                <div className='flex flex-col lg:flex-row items-start justify-center gap-16'>
                    <div className='flex flex-col gap-3'>
                        <div className='text-xl'>1. Reveal the Code </div>
                        <div>Click on the “Get Code” button to claim the coupon code then shop whatever the product meets the terms of the code. Remember to doble check the coupon description below the code if you arn’t sure.</div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='text-xl'>2. If code doesn’t work  </div>
                        <div>If the code doesn’t work, forward your online order confirmation or receipt by email to <a href="" className='text-blue-700'> claims@codespotr.com</a> within 48 hours of making your order. Within your email, please also include:</div>
                        <ul className='list-disc'>
                            <li> Your full name and email address</li>
                            <li> Name of Store</li>
                            <li> Screenshot of product ordered</li>
                            <li> Purchase confirmation email</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='text-xl'>3. Finally Receive your Gift Card </div>
                        <div>Our hard working customer support team will verify your claim within 7 business days and if eligible will send you a $10 gift card on same online store you ordered.</div>
                        <div>
                            Claims made after 48 hours from the point of purchase will not be accepted.
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-10 items-center justify-center '>
                <div className='lg:w-2/5 flex flex-col items-center justify-center gap-8'>
                    <span className='text-xl font-bold'>Acceptable Codes</span>
                    <div>Our 100% working codes guarantee covers online coupon codes only. You can identify codes in one of two ways:</div>
                    <div className='flex flex-col items-center justify-center'>
                        <div>– 1. Button</div>
                        <div>An acceptable code can be identified by the button used to reveal the codes which will read: “Get Code”</div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <div>– 2. Checkout Page</div>
                        <div>A code is used to make a purchase and save money online. This involves entering the code into a special box called “promo codes” or “discount code”at the checkout to redeem the rebate.</div>
                    </div>

                </div>
                <div className='lg:w-3/5'>
                    <img src={acceptable} alt="acceptable" />
                </div>

            </div>
            <div className='flex flex-col gap-5 items-center justify-center'>
                <span className='text-xl font-bold'>Unacceptable Codes </span>
                <div>The following types of code are not eligible under “our code” guarantee:</div>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-5 my-10">
                    <div className='lg:w-3/5'>
                        <img src={acceptable} alt="view_offer" />
                    </div>
                    <div className='flex flex-col lg:w-2/5 gap-5'>
                        <div className='text-xl'>1. Discount Offers </div>
                        <div>Discount offers which do not require an code to secure the saving. These can be identified by the “View Offer” button.</div>
                    </div>
                </div>

            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-5 my-10">
                <div className='lg:w-3/5'>
                    <img src={acceptable} alt="view_offer" />
                </div>
                <div className='flex flex-col lg:w-2/5 gap-5'>
                    <div className='text-xl'>2. Sale Offers </div>
                    <div>Specific “Sale” offers which also do not require an code to get the discount on your purchase. These can be also identified by the “View Offer” button.</div>
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                <div className='text-3xl font-bold'>You need to know this: </div>
                <div>We promise you to provide the gift card for the code that didn’t work. Because as we have already said, customer happiness comes first. However, before reaching out to us make sure you have read all the terms and conditions. Following are a few important ones:</div>
                <ul className='list-disc flex flex-col gap-3'>
                    <li> The coupon code you are trying to use must be an online code, that is the code that you enter while purchasing</li>
                    <li> We will provide gift cards only for invalid codes. If they are found valid when we check we will make sure to provide a screenshot of it.</li>
                    <li>You want to purchase using our codes and if code doesn’t work and you made purchase then you’re eligible to receive a gift card under our “Our Codes” promise.<b>NOTE:- You have to complete the purchase without any other codes!</b> </li>
                    <li> You must have ordered the product that is eligible for the coupon code. It is extremely important to review all the terms and conditions to make sure that the product meets all the requirements.</li>
                    <li>Our Codes gurantee Gift Card Limit is set to $10 maximum per day and maximum of 5 claims per year for per person.</li>
                    <li> To receive a successfully claims you must be including screenshot of your successful purchase without any other codes.</li>
                    <li>All claims should be sent to the following e-mail address: <a href="" className='text-blue-600'>claims@codesport.com!</a> </li>
                </ul>
            </div>
        </div>
        <NewsLetter></NewsLetter>
        </>
    )
}

export default OurCodes
