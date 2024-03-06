import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import blogs from "../api/blog"
import { FaArrowRight } from "react-icons/fa"
import Footer from "../components/Footer"
import axios from "axios"
const Blog = () => {
  const [showAllBlogs, setShowAllBlogs] = useState(false)
  const navigate = useNavigate()
  const BlogsToShow = showAllBlogs ? blogs.length : 24
  const toggleShowAllBlogs = () => {
    setShowAllBlogs((prev) => !prev)
  }
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs`)
        setData(res.data)
      } catch (error) {
        console.error("Error fetching festival details:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className='px-5 max-w-[1280px] mx-auto flex flex-col text-black mt-24 lg:mb-5'>
        <div className='flex flex-col items-start flex-wrap lg:p-4 gap-2'>
          <ul className='flex items-center'>
            <li className='inline-flex items-center'>
              <Link to='/' className='text-black hover:text-[#B33D53]'>
                <svg
                  className='w-5 h-auto fill-current text-black'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='#000000'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z' />
                </svg>
              </Link>

              <span className='mx-4 h-auto text-black font-medium'>/</span>
            </li>

            <li className='inline-flex items-center'>
              <Link
                to='/blogs'
                className='text-black hover:text-[#B33D53] whitespace-nowrap'
              >
                Blogs
              </Link>
            </li>
          </ul>
          <div
            className='font-bold text-lg lg:text-3xl text-start'
            style={{ fontWeight: 700 }}
          >
            Our Blogs
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:px-4'>
          {data
            .map((ele) => {
              return (
                <div
                  key={ele.id}
                  className='flex flex-col rounded-lg h-[389px] min-w-[280px] max-w-full overflow-clip shadow-boxshadow'
                >
                  {/* {console.log(ele.img)} */}
                  <img
                    src={ele.img}
                    alt=''
                    className='h-[40%] cursor-pointer w-auto'
                    onClick={() => {
                      navigate(`/blogdetails/${ele.slug}`)
                    }}
                  />
                  <div className='h-[60%] p-5 flex flex-col gap-1'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs whitespace-nowrap cursor-pointer bg-[#B33D53]/20 p-1 rounded-md'>
                        {ele.type}
                      </span>
                      <span className='text-xs whitespace-nowrap'>
                        {ele.date}
                      </span>
                    </div>
                    <div
                      className='text-md font-semibold cursor-pointer'
                      style={{ fontWeight: 600 }}
                      onClick={() => {
                        navigate(`/blogdetails/${ele.slug}`)
                      }}
                    >
                      {ele.title.length > 50
                        ? ele.title.substring(0, 50) + "..."
                        : ele.title}
                    </div>
                    <div className='text-sm'>
                      {ele.short_desc.length > 100
                        ? ele.short_desc.substring(0, 100) + "..."
                        : ele.short_desc}
                    </div>

                    <div
                      className='flex items-center gap-2 cursor-pointer border-t-2 border-gray-300 pt-3'
                      onClick={() => {
                        navigate(`/blogdetails/${ele.slug}`)
                      }}
                    >
                      <span>Continue Reading</span>
                      <span>
                        <FaArrowRight></FaArrowRight>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
            .slice(0, BlogsToShow)}
        </div>
        <div className='flex items-center justify-center my-10'>
          {blogs.length > 24 && (
            <button
              className='whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300'
              onClick={toggleShowAllBlogs}
            >
              {showAllBlogs ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Blog
