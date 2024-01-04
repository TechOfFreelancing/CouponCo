import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { SITEMAP, ICONS } from "../api/Footer";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import logo from '../assets/images/used/qwiksavingfooter.png'

const CustomForm = ({ status, message, onValidated }) => {
    let email;

    const submit = () =>
        email &&
        email.value.indexOf('@') > -1 &&
        onValidated({
            EMAIL: email.value,
        });

    return (
        <div className='flex flex-col gap-3'>
            <div className="mt-6 flex max-w-md flex-row items-center justify-center w-full rounded-full border border-red-800 overflow-clip">
                <input
                    ref={(node) => (email = node)}
                    type="email"
                    placeholder="Enter Your Email Address Here"
                    className="min-w-0 flex-auto outline-none px-3.5 py-2 text-black shadow-sm text-sm sm:leading-6 w-52 lg:w-full"
                />

                <button
                    type="submit"
                    onClick={submit}
                    className="flex-none bg-[#B33D53] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 max-w-fit"
                >
                    Subscribe
                </button>

            </div>
            {status === 'sending' && <div style={{ color: 'red' }}>Subscribing...</div>}
            {status === 'error' && <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: message }} />}
            {status === 'success' && <div style={{ color: 'green' }}>Subscribed!</div>}
        </div>
    );
};

export default function NewsLetter() {
    return (
        <div className="relative isolate overflow-hidden bg-white px-10 pb-16 mt-5">
            <div className="flex lg:flex-row flex-col lg:justify-around items-center justify-center gap-5 my-10">
                <div className='flex flex-col w-full lg:w-1/4 items-center justify-center'>
                    <img
                        src={logo}
                        alt="Qwik Savings"
                        className="w-1/2 rounded-full m-5"
                    />
                    <p className="text-black-300 text-justify">
                        Find the best coupons, deals, promo codes, and discounts for thousands of your favorite stores at Coupons Co. We may earn a commission when you use one of our coupons/links to make a purchase. Save money at the checkout.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-28">
                    {
                        SITEMAP.map((ele, index) => {
                            return (
                                <div key={index} className='flex flex-col gap-3 items-center lg:items-stretch'>
                                    <div className='font-bold text-xl'>{ele.title}</div>
                                    {
                                        ele.links.map((ele, index) => {
                                            return (
                                                <Link to={ele.href} key={index}>{ele.text}</Link>
                                            )
                                        })
                                    }

                                </div>
                            )
                        })

                    }
                </div>
                <div className="lg:max-w-lg mt-8 lg:mt-0 flex flex-col items-center justify-center ">
                    <h2 className="text-xl tracking-tight text-black whitespace-nowrap font-semibold">Join our newsletter</h2>
                    <p className=" text-gray-600">
                        To get the verified and hand tested Coupons/Deals alerts
                    </p>
                    <MailchimpSubscribe
                        url={import.meta.env.VITE_PUBLIC_MAILCHIMP_URL}
                        render={({ subscribe, status, message }) => (
                            <CustomForm
                                status={status}
                                message={message}
                                onValidated={(formData) => subscribe(formData)}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex icons gap-5 text-black  text-xl justify-center items-center my-10">
                {
                    ICONS.map((ele, index) => {
                        const Icon = ele.icon;
                        return (
                            ele.link &&
                            <Link to={ele.link} key={index}>
                                <Icon className='hover:text-[#B33D53] hover:scale-125 duration-200'></Icon>
                            </Link>
                        )
                    })
                }
            </div>

            <hr className='border-black hidden lg:block border-dashed' />
            <div className="flex flex-col-reverse text-black lg:mx-20 justify-between mt-10 items-center gap-5">
                <div>&copy; {new Date().getFullYear()} QwikSavings.com All rights reserved.</div>
                <div className="contact flex flex-col lg:flex-row gap-5 items-center">
                    Disclosure: If you buy a product or service through Qwik Savings, we may earn a commission
                </div>

            </div>

        </div>
    )
}

CustomForm.propTypes = {
    status: PropTypes.string,
    message: PropTypes.string,
    onValidated: PropTypes.func.isRequired,
};