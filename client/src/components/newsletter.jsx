import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Typography } from "@material-tailwind/react";
import SITEMAP from "../api/Footer";
import { BiSolidMap } from 'react-icons/bi';
import { FaMobileAlt } from 'react-icons/fa';
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import PropTypes from 'prop-types';

const CustomForm = ({ status, message, onValidated }) => {
    let email;

    const submit = () =>
        email &&
        email.value.indexOf('@') > -1 &&
        onValidated({
            EMAIL: email.value,
        });

    return (
        <div className="mt-6 flex max-w-md gap-x-4">
            <input
                ref={(node) => (email = node)}
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 !text-black shadow-sm outline-none sm:text-sm sm:leading-6"
            />
            <button
                type="submit"
                onClick={submit}
                className="flex-none rounded-md bg-[#800000] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
                Subscribe
            </button>
            {status === 'sending' && <div style={{ color: 'red' }}>Subscribing...</div>}
            {status === 'error' && <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: message }} />}
            {status === 'success' && <div style={{ color: 'green' }}>Subscribed!</div>}
        </div>
    );
};

export default function NewsLetter() {
    return (
        <div className="relative isolate overflow-hidden bg-white py-16 px-10">
            <div className="w-full ">
                <div className="flex flex-col lg:flex-row -mt-1 ts:-mx-2 justify-between items-center gap-5">
                    <div className="w-full sm:w-1/2 lg:w-1/5 p-2 flex flex-col items-center">
                        <img
                            src="/log.avif"
                            alt="Logo"
                            className="mb-4"
                            style={{ maxWidth: '100px' }}
                        />
                        <p className="text-black-300 text-center">
                            Find the best coupons, deals, promo codes, and discounts for thousands of your favorite stores at Coupons Co. We may earn a commission when you use one of our coupons/links to make a purchase. Save money at the checkout.
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row -mt-1 ts:-mx-2 justify-around ">
                        {SITEMAP.map(({ title, links }, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
                                <Typography
                                    variant="small"
                                    color="black"
                                    className="mb-4 divide-gray-300 uppercase whitespace-nowrap text-center font-bold"
                                >
                                    {title}
                                </Typography>
                                <ul className="space-y-1 text-gray-300">
                                    {links.map(({ text, icon: Icon, href, inputPlaceholder, buttonText }, index) => (
                                        <Typography
                                            key={index}
                                            as="li"
                                            className="font-normal flex flex-row justify-center items-center whitespace-nowrap"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                lineHeight: '26px',
                                                color: '#404040',
                                            }}
                                        >
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="flex justify-center items-center gap-5 py-1 pr-2 text-black transition-transform hover:scale-105 hover:text-black dark:hover:text-black"
                                                >
                                                    {Icon && <Icon />}
                                                    {text}
                                                </a>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    {Icon && <Icon />}
                                                    <div>
                                                        <div className="mb-1">{text}</div>
                                                        {inputPlaceholder && (
                                                            <div className="ml-auto flex">
                                                                <input
                                                                    type="email"
                                                                    placeholder={inputPlaceholder}
                                                                    className=""
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="bg-orange-500 text-black px-4 py-1 rounded-r hover:bg-orange-600 focus:outline-none"
                                                                >
                                                                    {buttonText}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </Typography>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="lg:max-w-lg mt-8 lg:mt-0 pl-10 flex flex-col items-center justify-center">
                        <h2 className="text-xl font-bold tracking-tight text-black sm:text-4xl whitespace-nowrap">Subscribe to our newsletter.</h2>
                        <p className="mt-4 text-sm lg:text-lg leading-8 text-black">
                            Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
                            dolore.
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
            </div>
            <hr className=' border-black hidden lg:block' />
            <div className="flex flex-col lg:flex-row flex-nowrap lg:mx-20 justify-between mt-10 items-center gap-5">
                <div className='text-[#800000]'>&copy; Coupon Co {new Date().getFullYear()}</div>
                <div className="contact flex flex-col lg:flex-row gap-5 text-[#800000] items-center">
                    <span className='whitespace-nowrap'>Email : support@looknbookart.com
                    </span>
                    <span className='whitespace-nowrap'>Phone: +91.96649 70700</span>
                </div>
                <div className="flex icons gap-5 text-[#800000] text-xl">
                    <AiFillInstagram></AiFillInstagram>
                    <BsLinkedin></BsLinkedin>
                    <BsTwitter></BsTwitter>
                    <FaMobileAlt></FaMobileAlt>
                    <BiSolidMap></BiSolidMap>
                </div>
            </div>

        </div>
    )
}

CustomForm.propTypes = {
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onValidated: PropTypes.func.isRequired,
};