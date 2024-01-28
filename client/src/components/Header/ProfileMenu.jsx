import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import profile from '../../assets/images/profile/profile.png'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { useContext } from "react";
import axios from "axios";


export function ProfileMenu() {
    const { role, updateUserRole } = useContext(AuthContext);
    const navigate = useNavigate();



    const handleLogout = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response && response.status === 200) {
                updateUserRole("");
                alert(response.data.message);
                localStorage.clear();
                // console.log("logout headerside", role);
                navigate("/");
            } else {
                alert("Logout failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred. Please try again later.");
            }
            console.error(error);
        }
    }
    // useEffect(() => {
    //     console.log("profilemenu side", role);
    // }, [role]);


    return (
        <Menu>
            <MenuHandler>
                <Avatar
                    variant="circular"
                    alt="tania andrew"
                    className="cursor-pointer h-10 w-10"
                    src={profile}
                />
            </MenuHandler>
            <MenuList>
                {role === "Admin" && (<><MenuItem className="flex items-center gap-2">
                    <Link to="/Admin" className="font-medium">
                        Admin Panel
                    </Link>
                </MenuItem>
                    <hr className="my-2 border-blue-gray-50" /></>)}
                <MenuItem className="flex items-center gap-2">
                    <Link to="/profile" className="font-medium">
                        My Profile
                    </Link>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2" onClick={() => handleLogout()}>
                    <div className="font-medium" >
                        Logout
                    </div>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}