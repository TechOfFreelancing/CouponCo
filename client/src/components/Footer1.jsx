import { Typography } from "@material-tailwind/react";
import {SITEMAP} from "../api/Footer";


export default function Footer() {
  return (
    <footer className="hidden md:block bg-black text-white w-screen -z-10 border-2 ">
      <div className="w-full p-6">
        <div className="flex flex-wrap -mt-1 ts:-mx-2">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
            <img
              src="/log.avif" 
              alt="Logo"
              className="mb-4"
              style={{ maxWidth: '100px' }} 
            />
            <p className="text-gray-300">
              Find the best coupons, deals, promo codes, and discounts for thousands of your favorite stores at Coupons Co. We may earn a commission when you use one of our coupons/links to make a purchase. Save money at the checkout.
            </p>
          </div>
          {SITEMAP.map(({ title, links }, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
              <Typography
                variant="small"
                className="mb-4 text-[#800000] divide-gray-300 uppercase"
              >
                {title}
              </Typography>
              <ul className="space-y-1 text-gray-300">
                {links.map(({ text, icon: Icon, href, inputPlaceholder, buttonText }, index) => (
                  <Typography
                    key={index}
                    as="li"
                    className="font-normal flex flex-row justify-center items-center"
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
                        className="flex justify-center items-center gap-5 py-1 pr-2 text-white transition-transform hover:scale-105 hover:text-white dark:hover:text-white"
                      >
                        {Icon && <Icon />}
                        {text}
                      </a>
                    ) : (
                      <div className="flex items-center">
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
                                className="bg-orange-500 text-white px-4 py-1 rounded-r hover:bg-orange-600 focus:outline-none"
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
        <div className="flex justify-center items-center text-gray-300 mt-6">
          <p>&copy; Coupon Co {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}