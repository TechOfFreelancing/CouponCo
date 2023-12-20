import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

    const [userData, setUserData] = useState({});
    const [FavouriteCoupons, setFavouriteCoupons] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('id'); // Retrieve the user's ID from localStorage
        console.log(userId)

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getDetails/${userId}`);
                if (response.data) {
                    setUserData(response.data.user[0] || {}); // Set user data

                    const savedCoupons = response.data.savedCoupons || [];
                    setFavouriteCoupons(savedCoupons); // Set favourite coupons data
                    console.log(FavouriteCoupons);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="lg:w-[75vw] flex flex-col gap-5 text-black border lg:mx-auto mt-20 lg:mt-32 lg:p-10">
            <div className="text-4xl font-bold">Hi {userData?.username}</div>
            <span className="text-lg">your email id is <span className="text-blue-700">{userData?.email}</span></span>
            <span className="text-2xl font-semibold">Favourite Coupons</span>
            <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                {FavouriteCoupons.map((ele, index) => {
                    return (
                        <div key={index} className="w-full mb-3 lg:mb-0">
                            <div className="px-5 py-3 font-thin bg-gray-200 flex flex-col gap-3">
                                <div className="flex gap-4 justify-between items-center">
                                    <div className="flex flex-col justify-evenly">
                                        <div className="">{ele.title}</div>

                                    </div>
                                    <div className="bg-blue-100 rounded-xl p-2 py-1">{ele.type}</div>
                                </div>
                                <div className="flex gap-4 justify-between items-center">
                                    <div className="flex flex-col justify-evenly">
                                        <div className="">Expired : {new Date(ele.due_date).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}</div>

                                    </div>
                                    <div className="flex flex-row-reverse gap-2 items-center justify-center">
                                        <div className="flex gap-1 items-center justify-center">
                                            <CiUser></CiUser>
                                            {ele.user_count}
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default Profile