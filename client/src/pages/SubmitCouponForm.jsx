import axios from "axios"
import { useState, useEffect } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom"
import typesData from "../api/AllTypes"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const SubmitCouponForm = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [stores, setStores] = useState([])

  const initialSId = location.state?.storeId

  const [sId, setSID] = useState(initialSId || "")

  const [categories, setCategories] = useState([])
  const [selectedStore, setSelectedStore] = useState("")
  console.log(selectedStore);
  const [formData, setFormData] = useState({
    title: "",
    type: "Codes",
    category: "",
    couponCode: "",
    dueDate: "",
    link: "",
    description: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(sId);
    const { title, type, category, couponCode, dueDate, link, description } =
      formData

    // Construct data object
    const data = {
      store_id : selectedStore,
      title,
      type,
      category,
      couponCode,
      dueDate,
      link,
      description,
      isVerified: false,
    };
    // Validate form data
    if (!title || !type || !dueDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Parse and validate dueDate
    const dueDateStr = data.dueDate; // Assuming formik.values.due_date is '2024-02-10'
    const parts = dueDateStr.split("-");
    const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const currentDate = new Date();
    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const targetDateWithoutTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

    console.log(currentDateWithoutTime);
    console.log(targetDateWithoutTime);

    if (targetDateWithoutTime >= currentDateWithoutTime) {
      console.log("True");
    } else {
      return toast.error("Please select a future date for the due date.");

    }
    if (!selectedStore) {
      return toast.error("Please Select Store");
    }
    // Configure Axios request
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://backend.qwiksavings.com/api/admin/addCoupon`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    };

    // Make Axios request
    axios
      .request(config)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.response.data.message || "An error occurred.");
        console.log(error);
      });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid black",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    outline: "none",
  }

  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://backend.qwiksavings.com/api/getCategories`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        setCategories(response.data.categories)
        const res = await axios.get(
          `https://backend.qwiksavings.com/api/getAllStore`
        )
        if (res) {
          setStores(res.data.stores)
        } else {
          console.log("unable to fetch data")
        }
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch category.")
        console.error("Failed to fetch category:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <Toaster position='top-center'></Toaster>
      <div className='px-5 max-w-[1280px] mx-auto flex flex-col text-black mt-28 lg:mt-32 items-start gap-5'>
        <div className='flex flex-col items-start flex-wrap gap-2 lg:p-5 pt-5 lg:pb-0'>
          <ul className='flex items-center'>
            <li className='inline-flex items-center'>
              <Link to='/' className='text-black hover:text-[#B33D53]'>
                <svg
                  className='w-5 h-auto fill-current mx-2 text-black'
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
                to='/submitcoupon'
                className='text-black hover:text-[#B33D53] whitespace-nowrap'
              >
                Submit A Coupon
              </Link>
            </li>
          </ul>
        </div>

        <div className='w-full lg:w-3/4 flex flex-col justify-between items-start p-5 lg:p-10 rounded-lg bg-white  mt-5 mb-10 shadow-boxshadow mx-auto'>
          <span className='text-xl lg:text-2xl font-bold lg:mx-5'>
            Submit A Coupon & Help Millions Save!
          </span>
          <h1 className='text-gray-600 text-sm text-start lg:mx-5 mb-5'>
            To submit a coupon, simply fill out our form below. Our team will
            carefully review and approve it before sharing it with the public.
            Thank you for your commitment to helping everyone save money!
          </h1>
          <div className='form flex flex-col gap-5 bg-white lg:px-10 lg:py-5'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='title' className='block mb-1 font-medium'>
                  Title:
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleInputChange}
                  className='bg-[#FAF9F5]'
                  style={inputStyle}
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='type' className='block mb-1 font-medium'>
                  Select an Offer Type:
                </label>
                <select
                  id='type'
                  name='type'
                  value={formData.type}
                  onChange={handleInputChange}
                  className='w-full border border-black rounded-lg p-3 bg-[#FAF9F5]'
                  style={inputStyle}
                >
                  <option>Codes</option>
                  <option>Deals</option>
                </select>
              </div>

              <div className='mb-4'>
                <label htmlFor='category' className='block mb-1 font-medium'>
                  Category:
                </label>
                <select
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  <option value=''>Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {!initialSId && (
                <div className='mb-4'>
                  <label htmlFor='store' className='block mb-1 font-medium'>
                    Store:
                  </label>
                  <select
                    id='store' // Corrected id attribute to match the htmlFor attribute
                    name='store' // Set name attribute to 'store'
                    value={selectedStore}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setSelectedStore(selectedId);
                      setSID(selectedId);
                    }}
                    style={inputStyle}
                  >
                    <option value=''>Select Store</option>
                    {stores.map((store, index) => (
                      <option key={index} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {formData.type == "Codes" ?
                <div className='mb-4'>
                  <label htmlFor='couponCode' className='block mb-1 font-medium'>
                    Coupon Code:
                  </label>
                  <input
                    type='text'
                    id='couponCode'
                    name='couponCode'
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    className='bg-[#FAF9F5]'
                    style={inputStyle}
                  />
                </div>
                : null}

              <div className='mb-4'>
                <label htmlFor='dueDate' className='block mb-1 font-medium'>
                  Expired Date:
                </label>
                <input
                  type='date'
                  id='dueDate'
                  name='dueDate'
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className='bg-[#FAF9F5]'
                  style={inputStyle}
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='link' className='block mb-1 font-medium'>
                  Link:
                </label>
                <input
                  type='text'
                  id='link'
                  name='link'
                  value={formData.link}
                  onChange={handleInputChange}
                  className='bg-[#FAF9F5]'
                  style={inputStyle}
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='description' className='block mb-1 font-medium'>
                  Description:
                </label>
                <input
                  type='text'
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  className='bg-[#FAF9F5]'
                  style={inputStyle}
                />
              </div>

              <div className='flex justify-center mb-4'>
                <button
                  type='submit'
                  className='py-2 px-4 hover:bg-[#800000] bg-[#B33D53] duration-300 text-white rounded-md outline-none'
                >
                  Submit
                </button>
              </div>

              <span className='text-gray-600 text-sm'>
                Please only submit publicly available coupon codes and not
                private or internal company codes. When in doubt, please obtain
                permission from the merchant first. See our
                <span className='text-blue-500 cursor-pointer'>
                  <Link to='/terms-of-services'> Terms and Conditions</Link>{" "}
                </span>{" "}
                for more information regarding user-generated content. Thank you
                very much!
              </span>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default SubmitCouponForm
