import { BiSolidMap } from 'react-icons/bi';
import { FaMobileAlt } from 'react-icons/fa';
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'


const SITEMAP = [

    {
        id: "1",
        title: "Pages",
        links: [
            { text: "Home", href: "/account", },
            { text: "Product", href: "/account" },
            { text: "Pricing", href: "https://looknbookart.com/pages/faq" },
            { text: "About", href: "https://looknbookart.com/pages/faq" },
            { text: "Contact", href: "https://looknbookart.com/pages/faq" },

        ],
    },
    {
        id: "2",
        title: "Information",
        links: [
            { text: "Privacy Policy", href: "https://looknbookart.com/pages/faq", },
            { text: "Refund Policy", href: "https://looknbookart.com/policies/refund-policy", },
            { text: "Shipping Policy", href: "https://looknbookart.com/policies/shipping-policy", },
            { text: "Terms of Service", href: "https://looknbookart.com/policies/terms-of-service", },
        ],
    },
    {
        id: "3",
        title: "Company",
        links: [
            { text: "About Us", href: "https://looknbookart.com/pages/about-us", },
            { text: "Terms and Condition", href: "https://looknbookart.com/policies/terms-of-service", },
            { text: "Contact", href: "https://looknbookart.com/pages/contact", },
        ],
    },
    {
        id: "4",
        title: "Get in touch",
        links: [
            { text: "7480 Mockingbird Hill undefined", icon: BiSolidMap ,href: "/account"},
            { text: "(239) 555-0108", icon: FaMobileAlt, href: "mailto:?subject=Looknbook%20Art&body=https://looknbookart.com" },
            {
                icon: BsTwitter,href: "/account"

            },
            {
                icon: BsLinkedin,href: "/account"

            },
            {
                icon: AiFillInstagram,href: "/account"

            },


        ],
    },

];


export default SITEMAP;