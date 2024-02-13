import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../assets/images/blogs/1.png';
import Footer from '../components/Footer';



const BlogDetails = () => {
  const [Categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://backend.qwiksavings.com/api/getCategories`,
        headers: {}
      };

      axios.request(config)
        .then((response) => {
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.log(error);
        });

    }
    fetchData();
  }, [])
  return (
    <>
      <div className='px-5 max-w-[1280px] mx-auto flex flex-col text-black mt-24 lg:mb-5 gap-5'>
        <div className="flex flex-col items-start flex-wrap lg:p-4 gap-2">
          <ul className="flex items-center flex-wrap">
            <li className="inline-flex items-center">
              <Link to="/" className="text-black hover:text-[#B33D53]">
                <svg className="w-5 h-auto fill-current text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
              </Link>

              <span className="mx-4 h-auto text-black font-medium">/</span>
            </li>

            <li className="inline-flex items-center">
              <Link to="/blogs" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                Health & Beauty
              </Link>
              <span className="mx-4 h-auto text-black font-medium">/</span>
            </li>
            <li className="inline-flex items-center">
              <Link to="/blogs" className="text-black hover:text-[#B33D53] lg:whitespace-nowrap">
                Beyond Adjustments: Incorporating Functional Medicine into Chiropractic Practices
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full gap-5 mb-5">
          <div className='hidden lg:block lg:w-1/3 min-h-screen rounded-lg'>
            <div className="min-w-full shadow-boxshadow rounded-lg p-5 bg-white">
              <div className="text-md lg:text-xl font-bold my-2">Today{`'`}s Top Categories</div>
              <div className="flex flex-wrap gap-2">
                {
                  Categories.map((ele, index) => (
                    ele.todays_top === 1 &&
                    <div key={index} className="cursor-pointer text-sm p-1 px-2 duration-300 bg-gray-300 hover:bg-red-200 rounded-md"
                      onClick={() => {
                        navigate("/categoriesdetails", { state: { category: ele.name, category_icon: ele.logo_url } })
                      }}>
                      {ele.name}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='w-full lg:w-2/3 min-h-full rounded-lg shadow-boxshadow flex flex-col gap-3 p-5'>
            <span className='text-xs px-2 py-1 bg-primary/30 w-fit rounded-md cursor-pointer'>February 9, 2024 / By Qwik Savings</span>
            <h1 className='text-lg lg:text-2xl'>Beyond Adjustments: Incorporating Functional Medicine into Chiropractic Practices</h1>
            <img src={img} alt="" className='w-full my-2' />
            <div className="blog_content flex flex-col gap-3">
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Introduction</h2>
                <p className='text-sm'>Welcome to the thrilling world of Twitch streaming and gaming, where your ardour for games can turn out to be a platform for international connection or even a source of income. In this ever-evolving landscape of on-line leisure, Twitch stands out as a powerhouse for game enthusiasts and content creators. With hundreds of thousands of users tuning in daily, it’s now not only a platform; it is a community. This guide is your behind the curtain bypass to the magic of Twitch streaming, imparting insights and recommendations for each the rookies and the seasoned Twitch streamers.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Understanding Twitch Streaming</h2>
                <p className='text-sm'>Picture this: Twitch, founded in 2011, is the place in which game enthusiasts, or as we affectionately name them, Twitch streamers, can flip their gaming periods into an actual-time spectacle. It’s now not pretty much gambling games; it’s about fostering a sense of network and interaction. To kickstart your adventure, all you want is a Twitch account, streaming software, and a dependable internet connection. Once you are set up, it is some time to shine—proportion your gaming stories, chat, stay along with your visitors, and construct a fan base that is as committed as you are. There are many famous twitch streamers and one of them is .</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Choosing the Right Games</h2>
                <p className='text-sm'>Now, allow communicating video games. Choosing the proper ones is like selecting the best components in your favorite recipe. Sure, the big titles like Fortnite and League of Legends have large audiences, however don’t forget the appeal of area of interest games—they have got dedicated groups on Twitch. Dive into the arena of trending video games, align them along with your alternatives, and locate that sweet spot that resonates with each you and your audience.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Optimizing Your Twitch Channel</h2>
                <p className='text-sm'>Think of your Twitch channel as your online personality, your virtual self. To make an enduring impact, it is critical to optimize it for max visibility. Start through giving it a makeover—add an eye catching profile picture and banner that screams ‘you.’ Write a bio that introduces yourself, showcases your gaming hobbies, and units the vibe to your content. Sprinkle in some relevant key phrases to boost discoverability, and do not forget to weave in links on your social media bills.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Crafting Compelling Content</h2>
                <p className='text-sm'>Now, the name of the game sauce—crafting content material it really is now not just exciting but downright irresistible. Set up a steady streaming time table to construct anticipation amongst your target market. Engage with them thru stay chat, reply to comments, and lead them to sense like they are a part of your gaming family. Think of overlays, signals, and widgets as the decorations that enhance the visible dinner party you’re serving.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Investing in Quality Equipment</h2>
                <p className='text-sm'>To stand out inside the crowded Twitch universe, put money into nice equipment. Think of it as upgrading your armor before a big boss warfare. A reliable gaming setup, an excessive-definition webcam, and a clear microphone are your essentials. Go the greater mile with devoted streaming gear like seize cards and inexperienced monitors—they’re like energy-america that elevate your content to the following level.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Networking and Collaboration</h2>
                <p className='text-sm'>No one conquers Twitch on my own—it is all approximately building alliances. Connect with fellow streamers, dive into on line boards, and get worried in collaborative efforts. Hosting or joining multiplayer games together with your Twitch friends no longer most effective introduces your channel to new audiences however additionally creates bonds that fuel mutual increase.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Promoting Your Twitch Channel</h2>
                <p className='text-sm'>While Twitch gives the stage, proactive merchandising is your behind the scenes bypass to the spotlight. Use social media platforms to percentage the highlights, updates, and at the back-of-the-scenes moments of your Twitch journey. Join gaming communities, forums, and Discord servers to meet capacity visitors who percentage your interests. Collaborate with different streamers—it’s like sharing the highlight, and once in a while, it truly is in which the magic happens.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Analyzing Twitch Analytics</h2>
                <p className='text-sm'>Become your personal Twitch detective by means of often studying your channel’s analytics. Dive into viewer metrics, track follower boom, and hold a watch on engagement stages. It’s like studying the game tape to locate your triumphing approach. Identify patterns for your popular content material and use these insights to best-tune your streaming technique. Twitch Insights is your toolkit for making informed selections and optimizing your channel for achievement.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Monetizing Your Twitch Channel</h2>
                <p className='text-sm'>Once you’ve built a dedicated viewer base, it’s time to discover the treasure chest of Twitch monetization. The Twitch Affiliate and Partner programs are your golden tickets to earning sales via subscriptions, bits, and ad sales. Diversify your profit streams by exploring sponsorships, merchandise income, and affiliate marketing partnerships. Turning your ardor right into a paycheck? That’s the dream.</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-md lg:text-xl'>Conclusion</h2>
                <p className='text-sm'>In the arena of Twitch streaming and gaming, your ardor is not only an interest—it’s a thrilling street to exhibit your love for video games, hook up with like-minded people, and maybe even flip it right into a career. Understanding the nuances of Twitch, optimizing your channel, crafting compelling content, and actively engaging with your audience unlocks the full capacity of live streaming. Whether you’re a novice gearing up on your first movement or a seasoned pro aiming for growth, allow the hints in this manual to be your compass as you navigate the dynamic international of Twitch with confidence. Here’s to glad streaming and endless adventures!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      </>
  )
}

export default BlogDetails
