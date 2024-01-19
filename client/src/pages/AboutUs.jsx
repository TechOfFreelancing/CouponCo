import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { aboutus } from "../api/aboutus";
import img1 from '../assets/images/aboutus/About QS.jpg';
import img2 from '../assets/images/aboutus/Our Mission and Vision.jpg';
import img3 from '../assets/images/aboutus/How We Make Money.jpg';
import img4 from '../assets/images/aboutus/Contact us.jpg';
import { IoIosArrowDropright } from "react-icons/io";


const AboutUs = () => {
    return (
        <>
            <div className="px-5 lg:px-28 flex flex-col text-black lg:mx-auto mt-20 lg:mt-32 items-start gap-5">
                <div className="flex flex-col items-start flex-wrap gap-2 lg:p-5 pt-5 lg:pb-0">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-black hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>

                            <span className="mx-4 h-auto text-black font-medium">/</span>
                        </li>

                        <li className="inline-flex items-center">
                            <Link to="/aboutus" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                About Us
                            </Link>
                        </li>
                    </ul>
                    <span className="text-xl lg:text-2xl font-bold lg:ml-2 lg:mt-5">About Qwik Savings</span>
                </div>
                <div className="w-full lg:ml-2 lg:p-5 pt-0 text-lg">
                    <img className="lg:float-right w-full lg:w-[50%] h-auto lg:m-10 lg:my-0 lg:mr-0 mix-blend-multiply border" src={img1} />
                    <p className="text-justify my-5">
                        True  to  its  name,  Qwik  Savings  is  one  of
                        the  most  trusted  sites  for  all  online
                        shopping  fanatics  who  are  looking  to
                        maximize  their  savings  during  their  online
                        shopping.  With  the  company’s  authentic
                        coupon  codes  and  deals,  customers  are
                        sure  to  experience  an  enriching  shopping
                        experience,  full  of  crazy  discounts  for  you
                        to  grab  from.  Qwik  Savings  has
                        assembled  a  dedicated  team  of
                        individuals  that  work  endlessly  towards
                        finding  the  most  money  effective  deals  for  your  wallet.
                    </p>
                    <p className="text-justify my-5">
                        Not  just  that,  the  team  dedicates  and  diverts  its  resources  towards  the  right  place  to  find  when  it
                        comes  to  finding  the  right  priced  deals  for  their  beloved  customers.  Ranging  from  technology,
                        gadgets  and  sports  to  fashion,  parenting  and  lifestyle,  the  company  has  its  eyes  set  everywhere
                        when  it  comes  to  finding  the  right  pick  of  deals.  All  the  deals  brought  forth  by  the  skilled
                        professionals  of  the  company  have  a  double  check  of  genuineness  that  ensures  trust  and
                        loyalty.
                    </p>
                    <p className="text-justify my-5">
                        The company’s effortless and experienced commitment and hard work towards discovering the
                        right and most efficient deals for the customers makes it an ideal destination to shop top brands
                        from, saving both your time and money.
                    </p>
                </div>
            </div>
            <div className="px-5 lg:px-28 bg-white flex flex-col justify-center text-black lg:mx-auto items-start lg:h-[calc(100vh-200px)] gap-5 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-stretch gap-5 w-full">
                    {
                        aboutus.map((ele, index) => <div key={index} className="bg-[#FAF9F5] rounded-2xl flex flex-col gap-4 items-center justify-center px-5 h-[420px] shadow-boxshadow">
                            <img src={ele.img} alt="" className='h-3/5 w-auto mix-blend-multiply' />
                            <div className="h-1/8 text-xl lg:text-2xl font-bold">
                                {ele.text}
                            </div>
                            <div className="h-1/8 text-xl lg:text-2xl font-bold">
                                {ele.content}
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <div className="px-5 lg:px-28 py-10 flex flex-col justify-center text-black lg:mx-auto items-start gap-5 w-full">
                <div className="w-full lg:ml-2 lg:p-5 lg:pt-0 text-lg">
                    <img className="lg:float-left w-full lg:w-[50%] h-auto m-10 ml-0 mix-blend-multiply" src={img2} />
                    <span className="text-xl lg:text-2xl font-bold my-5 ">Our Mission & Vision</span>
                    <p className="text-justify my-5">
                        Qwik  Savings  aims  to  be  the  most  fonded
                        destination  for  online  shoppers  to  find  the  most
                        legit  and  reliable  coupon  codes  to  provide  them
                        an  ultimate  shopping  experience.  The  company
                        is  on  a  mission  to  curate  a  satisfying  buying
                        experience  for  everyone  coming  across  them,
                        sparing  them  from  the  frustration  of  expired  or
                        misleading  deals.
                    </p>
                    <p className="text-justify my-5">
                        A  massive  believer  of  transparency  among  its  users  and  itself,  the  company  aspires  to  prioritize
                        its  users  and  present  to  them  a  collection  of  irresistible  yet  authentic  offers.  Qwik  Savings  also
                        believes  in  total  accessibility,  thus  having  a  very  comfortable  and  compatible  user  interface.  The
                        company’s  ultimate  mission  is  to  foster  a  community  of  empowered  customers  and  shoppers  by
                        providing  them  with  the  right  tools  and  knowledge,  i.e.  their  coupons,  to  make  informed  and  cost
                        effective  decisions.
                    </p>

                </div>

                <div className="w-full lg:ml-2 lg:p-5 pt-0 text-lg">
                    <img className="lg:float-right w-full lg:w-[50%] h-auto lg:m-10 lg:my-0 lg:mr-0 mix-blend-multiply" src={img3} />
                    <span className="text-xl lg:text-2xl font-bold my-5 ">How  We  Make  Money</span>
                    <p className="text-justify my-5">
                        Our  revenue  model  goes  way  beyond  just
                        commissions.  Our  affiliate  marketing  model
                        enables  us  to  earn  a  small  percentage  of
                        money  through  every  purchase  that  you,
                        shoppers,  make  using  the  deals  and  coupons
                        from  our  platforms.  We,  along  with  our  team
                        work  tirelessly  to  find  and  secure  numerous
                        brands  and  retailers  to  bring  forth  to  you  some
                        exciting  coupons  and  offers  to  take  advantage  of.
                    </p>
                    <p className="text-justify my-5">
                        Apart from that, we also earn through retailers willing to pay to get featured and advertised on
                        our site and newsletters. Doing all this requires a lot of patience, time and effort, but we don’t
                        mind that if it means fulfilling your online shopping experience.
                    </p>

                </div>
            </div>
            <div className="px-5 lg:px-28 bg-white flex flex-col justify-center text-black lg:mx-auto items-start gap-3 w-full mb-10">
                <div className="w-full lg:ml-2 lg:p-5 lg:pt-0 text-lg flex lg:flex-row flex-col justify-between items-start">
                    <img className="lg:float-left w-full lg:w-2/5 h-auto lg:m-10 lg:my-0 lg:ml-0 mix-blend-multiply" src={img4} />
                    <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start justify-between h-full gap-3 mt-10">
                        <span className="text-xl lg:text-2xl font-bold">We’re here to help</span>
                        <p className="text-justify my-5">
                            If you{`'`}re  facing  any  troubles while using
                            our  website,  Don{`'`}t  worry!  We  have
                            supportive  and  friendly  customer  service
                            always  ready  to  resolve  your  issues  with
                            our  website.  Let  us  make  your  shopping
                            and  saving  easy  and  convenient.  Reach
                            out  to  us  now!
                        </p>
                        <Link to="/contactus" className="whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300 w-fit flex items-center gap-2">Contact Us <IoIosArrowDropright className="text-2xl" /></Link>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AboutUs