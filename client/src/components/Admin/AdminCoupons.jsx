import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, CardFooter, Tooltip } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const AdminCoupons = () => {
  const [count, setCount] = useState(1);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://backend.qwiksavings.com/api/coupons?page=${count}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
          }
        );
        setCoupons(response.data.coupons)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch coupons.");
        console.error("Failed to fetch coupons:", error);
      }
    };

    fetchProducts();
  }, [count]);

  const handleCouponDelete = async (cId) => {
    try {
      await axios.delete(`https://backend.qwiksavings.com/api/admin/${cId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      });

      const updatedCoupons = coupons.filter(coupon => coupon.coupon_id !== cId);
      setCoupons(updatedCoupons);
      toast.success("coupon Deleted Successfully!");
    } catch (error) {
      toast.error("Failed to delete coupon");
      console.error('Failed to delete coupon:', error);
    }
  };

  const couponStore = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getStore/${id}`);
      response.data.store.name;
    } catch (error) {
      console.error("Error fetching store:", error);
      return ""; // Handle error gracefully
    }
  };

  let value;

  return (
    <>
      <Toaster position="top-center"></Toaster>
      <div >
        <Card className="h-full w-full">
          <div className="flex flex-col justify-center items-center h-full">
            {coupons.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <img
                  src="/illustration/noData.png"
                  alt="no data"
                  className="w-96 h-auto"
                />
              </div>
            ) : (
              loading ? (
                <div className="flex justify-center items-center h-full">
                  <img
                    src="/illustration/loading.gif"
                    alt="loading..."
                    className="w-96 h-auto"
                  />
                </div>) : (
                < div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:w-[97vw] mt-5 xl:mt-10">
                  {coupons.map((coupon, index) => (
                    <div key={index} className="border border-gray-300 cursor-pointer rounded-lg p-4 mb-4 group relative" onClick={() => navigate("/Admin/updateCoupons", { state: { cId: coupon.coupon_id, sId: coupon.store_id } })}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xl font-bold mr-3">{coupon.title}</div>
                        <span className={`py-1 px-2 rounded-full font-bold ${coupon.type.toLowerCase() === 'codes' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}`}>{coupon.type}</span>
                        <div className="text-sm text-gray-600 mb-2">Due: {new Date(coupon.due_date).toLocaleDateString('en-GB', options)}</div>
                      </div>
                      <div className="text-md text-gray-600 mb-2">{coupon.user_count} uses today</div>
                      <div className="bg-gray-100 text-center rounded p-2 mb-2">{coupon.coupon_code}</div>
                      <div className="bg-gray-100 text-center rounded p-2 mb-2">{coupon.category}</div>
                      <div className="bg-gray-100 text-center rounded p-2 mb-2">{coupon.store_id}</div>
                      <Tooltip content="Delete Coupon">
                        <button
                          className="absolute top-2 right-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCouponDelete(coupon.coupon_id);
                          }
                          }
                        >
                          <MdDelete />
                        </button>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page {count}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" color="blue-gray" size="sm" disabled={count === 1} onClick={() => { setCount(count - 1) }}>
                Previous
              </Button>
              <Button variant="outlined" color="blue-gray" size="sm" disabled={coupons.length === 0} onClick={() => { setCount(count + 1) }}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card >
      </div >
    </>
  )
}
export default AdminCoupons;