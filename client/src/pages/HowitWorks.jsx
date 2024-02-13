import { Link } from "react-router-dom";
import img1 from '../assets/images/howitworks/How it Works.jpg'
import howitworks from "../api/howitworks";
import Footer from "../components/Footer";

const HowitWorks = () => {
    return (
        <>
            <div className="max-w-[1280px] mx-auto">
                <div className="px-5 flex flex-col text-black mt-28 lg:mt-32 items-start gap-5">
                    <div className="flex flex-col items-start flex-wrap lg:p-5 lg:pb-0">
                        <ul className="flex items-center">
                            <li className="inline-flex items-center">
                                <Link to="/" className="text-black hover:text-[#B33D53]">
                                    <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                                </Link>

                                <span className="mx-4 h-auto text-black font-medium">/</span>
                            </li>

                            <li className="inline-flex items-center">
                                <Link to="/how-it-works" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                    How it Works
                                </Link>
                            </li>
                        </ul>
                        <span className="text-xl lg:text-2xl font-bold ml-2 mt-5">How  to  use  coupons  using  the  QwikSavings</span>
                    </div>
                    <div className="w-full lg:ml-2 lg:p-5 lg:pt-0 text-lg">
                        <img className="lg:float-right w-full lg:w-[45%] h-auto lg:m-10 lg:-my-20 mix-blend-multiply" src={img1} />
                        <p className="text-justify my-5">
                            Qwik Savings is your one stop
                            platform to save your money. With a
                            wide range of hand-tested coupon
                            codes and deals, our platform
                            connects you with the latest offers
                            on your favorite brands. You can
                            also find Black Friday, Cyber
                            Monday, or Christmas like event
                            coupons and deals which our
                            dedicated team curates, allowing
                            you to enjoy significant discounts
                            throughout the year.
                        </p>
                        <p className="text-justify my-5">
                            For those who love to shop smartly,
                            a coupon is the ultimate solution. It
                            allows you to indulge in everyday,
                            occasional, and seasonal shopping without the hassle of bargaining. Now, you can have the joy
                            of buying branded products at affordable prices with just a few clicks.
                        </p>
                    </div>
                    <div className="w-full lg:ml-2 lg:p-5 lg:pt-0 text-lg">
                        <span className="text-2xl font-bold mt-5">1,2,3  easy  steps</span>
                        <p className="text-justify my-5">
                            It’s quick and easy to get started! Learn how our website works in less than 1 minute! Follow
                            these easy steps to maximize your savings with our codes!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
                            {
                                howitworks.map((ele) => <div key={ele.id} className="flex flex-col gap-2 bg-white p-5 border border-gray-300 hover:shadow-boxshadow_2 duration-300"><span className="font-semibold"><span className="text-xl px-3 py-1 text-white h-[20px] w-[20px] rounded-full bg-[#B33D53] mr-5">{ele.id}</span>{ele.text} :</span><span>{ele.content}</span></div>)
                            }
                        </div>
                        <p className="text-justify my-5">
                            Love the savings? Share your experience with friends and family! Additionally, keep visiting
                            QwikSavings.com for more amazing coupons and deals to continue saving on future purchases. If you
                            have any problems or questions, please don’t hesitate to get in touch with our team using the contact us
                            page or by mailing at contact@qwiksavings.com.
                        </p>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </>
    )
}

export default HowitWorks
