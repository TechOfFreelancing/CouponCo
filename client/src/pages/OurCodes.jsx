import img from '../assets/images/our-coders/Hand-Tested Codes.png';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const OurCodes = () => {
    return (
        <>
            <div className="px-5 lg:px-28 flex flex-col text-black lg:mx-auto mt-28 lg:mt-32 items-start gap-5">
                <div className="flex flex-col items-start flex-wrap lg:p-5 lg:pb-0">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-black hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>

                            <span className="mx-4 h-auto text-black font-medium">/</span>
                        </li>

                        <li className="inline-flex items-center">
                            <Link to="/our-codes" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                Our Codes
                            </Link>
                        </li>
                    </ul>
                    <span className="text-xl lg:text-2xl font-bold ml-2 mt-5">Our  Codes  Guarantee  -  a  gift  card,  if  code
                        not  works</span>
                </div>
                <div className="flex flex-col gap-10 pb-10">
                    <div className="w-full p-5 lg:p-10 text-lg flex flex-col-reverse lg:flex-row justify-between rounded-lg bg-white shadow-boxshadow">
                        <div className='w-full lg:w-1/2 flex flex-col gap-5 text-justify'>
                            <p>We  understand  the  frustration  of  an  inactive
                                coupon  code—there{`'`}s  nothing  more
                                disappointing  than  anticipating  savings  only  to
                                find  the  code  doesn{`'`}t  work  at  checkout.</p>
                            <p>
                                Rest  assured,  we{`'`}re  confident  that  every  online
                                coupon  code  at  Qwik  Savings  will  deliver  as
                                promised.  In  the  rare  instance  that  one  doesn{`'`}t
                                work,  and  you  proceed  with  your  purchase,
                                consider  it  an  opportunity  for  us  to  treat  you.
                                We{`'`}ll  provide  a  gift  card  to  ensure  you  still  get
                                something  special  on  us.
                            </p>
                            <p>Qwik  Savings  values  your  time  and  prioritizes  your  savings,  thus  making  sure  that  we  deliver  on
                                what  we  promise,  and  we  pride  ourselves  for  it.  All  of  our  codes  are  stringently  sorted  and
                                negotiated  with  our  partners.  Additionally,  we  make  sure  to  source  our  codes  only  from  the
                                official  channels,  testing  them  thoroughly  to  avoid  any  sort  of  administrative  slip-ups  and
                                ensuring  a  seamless  shopping  experience  for  you.</p>
                        </div>
                        <div className='w-full lg:w-1/2 flex flex-col items-center lg:-mt-10'>
                            <img className="h-auto  lg:mr-0" src={img} />
                            <span className='text-md lg:text-lg font-semibold lg:font-bold text-center lg:text-start my-2'>All  of  Our  Codes  are  Hand-Tested  By  Real  People</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 p-5 lg:p-10 rounded-lg bg-white shadow-boxshadow'>
                        <span className='text-lg font-semibold lg:font-bold'>How  to  receive  a  gift  card  if  the  code  doesn{`'`}t  work?</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-stretch gap-5 lg:gap-10">
                            <div className='flex flex-col gap-4 p-2 lg:p-5'>
                                <span className='text-lg font-bold'>Step  1.  Reveal  the  Coupon</span>
                                <span className='text-justify'>Simply  click  {`'`}Get  Code{`'`} to  reveal  the  coupon  code,  then  proceed  to  purchase  items  that  meet
                                    the  offer{`'`}s  conditions.  If  in  doubt,  always  refer  to  the  condition  by  clicking  on  {`'`}Show  Details{`'`}
                                    below  the  code  for  clarity.</span>

                            </div>
                            <div className='flex flex-col gap-4 p-2 lg:p-5'>
                                <span className='text-lg font-bold'>Step  2.  Inactive  Code</span>
                                <span className='text-justify'>If  the  coupon  code  doesn’t  work,  forward  your  online  order  confirmation  or  receipt  by  email  to
                                    <a href='mailto:claims@qwiksavings.com' className='mx-1 font-semibold' target='_blank' rel="noreferrer">claims@qwiksavings.com</a>
                                    within  48  hours  of  making  your  order.  Within  your  email,  please  also
                                    include:</span>
                                <ul className='list-disc flex flex-col ml-3 gap-2'>
                                    <li>Your name and email address</li>
                                    <li>Name of online store or brands</li>
                                    <li>Screenshot of product ordered</li>
                                    <li>Purchase confirmation email</li>
                                </ul>
                            </div>
                            <div className='flex flex-col gap-4 p-2 lg:p-5'>
                                <span className='text-lg font-bold'>Step  3.  Get  a  FREE  Gift  Card</span>
                                <span className='text-justify'>Our  dedicated  customer  support  team  will  review  your  claim  within  ten  business  days.  If  it  meets
                                    the  criteria,  you{`'`}ll  receive  a  $10  gift  card  for  the  same  online  store  where  you  made  your
                                    purchase.</span>
                                <span className='text-justify font-semibold'>NOTE  -  Unfortunately,  claims  submitted  after  48  hours  from  the  purchase  time  will  not  be
                                    accepted.</span>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-5 p-5 lg:p-10 rounded-lg bg-white shadow-boxshadow'>
                        <span className='text-lg font-bold'>Acceptable  Code  for  Gift  Cards</span>
                        <span>Our  codes  guarantee  applies  specifically  to  online  coupon  codes.  You  can  recognize  these
                            codes  in  two  simple  ways:</span>
                        <ul className='list-decimal flex flex-col gap-5 pl-2'>
                            <li className='flex flex-col gap-1'><span className='font-lg font-semibold'>1. Button :</span>
                                <div>
                                    A  valid  coupon  code  can  be  identified by the button  used  to  display  the  code,  which  will
                                    typically  say:  {`"`}Get  Code.{`"`}
                                </div>
                            </li>
                            <li className='flex flex-col gap-1'><span className='font-lg font-semibold'>2. Checkout  Page :</span>
                                <div>A  coupon  code  is  used  to  make  online  purchases  and  save  money.  You  can  apply  these
                                    codes  by  entering  them  into  a  designated  box,  often  labeled  as  {`"`}discount  code,{`"`}  at  the
                                    checkout  stage  to  redeem  your  savings.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-5 p-5 lg:p-10 rounded-lg bg-white shadow-boxshadow'>
                        <span className='text-lg font-bold'>Unacceptable  Codes  for  Gift  Cards</span>
                        <span>The  following  types  of  deals  are  not  eligible  under  “Our  Codes”  guarantee:</span>
                        <ul className='list-decimal flex flex-col gap-5 pl-2'>
                            <li className='flex flex-col gap-1'><span className='font-lg font-semibold'>1. Deals:</span>
                                <div>
                                    Deals  which  do  not  require  a  code  to  secure  the  saving.  These  can  be  identified  by  the
                                    “Get  Deal”  button.
                                </div>
                            </li>
                            <li className='flex flex-col gap-1'><span className='font-lg font-semibold'>2. Sale  Deals :</span>
                                <div>Certain  {`"`}Sale{`"`}  offers  don{`'`}t  need  a  code  for  the  discount.  You{`'`}ll  notice  these  by  the  {`"`}Get
                                    Deal{`"`}  button,  allowing  you  to  access  the  discount  directly  without  entering  a  code  during
                                    your  purchase.
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-5 p-5 lg:p-10 rounded-lg bg-white shadow-boxshadow'>
                        <span className='text-lg font-bold'>You  need  to  know  this:</span>
                        <span>We  assure  you  that  if  a  code  doesn{`'`}t  work,  we{`'`}ll  provide  you  with  a  gift  card.  Because  as  we
                            have  already  said,  customer  satisfaction  is  our  top  priority.  Before  contacting  us,  please  ensure
                            you{`'`}ve  reviewed  all  the  terms  and  conditions.  Here  are  a  few  important  ones  to  consider:</span>
                        <ul className='list-disc flex flex-col gap-5 pl-5'>
                            <li>The  coupon  code  you{`'`}re  trying  to  use  must  be  an  online  code,  specifically  one  that  you
                                input  during  the  purchase  process.</li>
                            <li>We  will  provide  gift  cards  only  for  invalid  codes  only.  However,  if  upon  verification
                                process,  the  codes  are  found  valid,  we{`'`}ll  ensure  to  provide  a  screenshot  as  proof.</li>
                            <li>You want to purchase using our coupon code and if the coupon code doesn’t work and
                                you made a purchase then you’re eligible to receive a gift card under our “Our Codes”
                                guarantee. NOTE:- You have to complete the purchase without any other codes!</li>
                            <li>To  redeem  the  coupon  code,  it{`'`}s  crucial  that  you{`'`}ve  ordered  a  product  eligible  for  the
                                discount.  Reviewing  all  terms  and  conditions  is  extremely  important  to  ensure  your
                                product  aligns  with  all  requirements  for  the  code.</li>
                            <li>Our  Codes  guarantee  Gift  Card  Limit  is  set  to  $10  maximum  per  day  and  maximum  of  5
                                claims  per  year  for  per  person.</li>
                            <li>To  receive  a  successful  claim  you  must  include  a  screenshot  of  your  successful
                                purchase  without  any  other  coupon  code.</li>
                            <li>All  claims  should  be  sent  to  the  following  e-mail  address:  claims@qwiksavings.com!</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default OurCodes
