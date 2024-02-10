import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import { Header } from './components/Header';
import AdminPanel from './pages/AdminPanel';
import AddStores from './components/Admin/addStores';
import UpdateStores from './components/Admin/updateStore';
import AuthContext from './components/AuthContext';
import { useContext } from 'react';
import AddCoupons from './components/Admin/addCoupons';
import UpdateCoupons from './components/Admin/updateCoupon';
import Store from './pages/Store';
import AllStores from './pages/all-stores';
import Allcategories from './pages/all-categories';
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/700.css"; // Specify weight
import "@fontsource/poppins/500-italic.css"; // Specify weight and style
import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import SubmitCouponForm from './pages/SubmitCouponForm';
import OurCodes from './pages/our-codes';
import Profile from './pages/Profile';
import Event from './pages/Event';
import EventDetails from './pages/EventDetails';
import CategoriesDetails from './pages/CategoriesDetails';
import ContactUs from './pages/ContactUs';
import AdvertiseUs from './pages/AdvertiseUs';
import FAQS from './pages/FAQS';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/privacy-policy';
import HowitWorks from './pages/HowitWorks';
import ScrollToTop from './components/scrollToTop';
import AddCategory from './components/Admin/addCategory';
import AddEvent from './components/Admin/addEvent';
import UpdateCategory from './components/Admin/updateCategory';
import UpdateEvent from './components/Admin/updateEvent';



function App() {

  const [loaded, setLoaded] = useState(false);


  const { role } = useContext(AuthContext);
  const isAdmin = role === "Admin" ? true : false;


  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (!hasLoadedBefore) {
      let timer = setTimeout(() => {
        setLoaded(true);
        sessionStorage.setItem('hasLoadedBefore', 'true');
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="w-full max-h-fit overflow-y-clip">
      <ScrollToTop></ScrollToTop>
      {!loaded ? (
        <Loader />
      ) : (
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header></Header>
                <Home />
              </>
            }
          >
          </Route>
          {isAdmin && (<Route
            path='/Admin'
            element={
              <>
                <AdminPanel />
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/addStore'
            element={
              <>
                <AddStores />
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/addCategory'
            element={
              <>
                <AddCategory />
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/addEvent'
            element={
              <>
                <AddEvent/>
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/addCoupons'
            element={
              <>
                <AddCoupons />
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/updateStore'
            element={
              <>
                <UpdateStores />
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/updateCategory'
            element={
              <><UpdateCategory/>
              
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/updateEvent'
            element={
              <>
                <UpdateEvent/>
              </>
            }
          >
          </Route>)}
          {isAdmin && (<Route
            path='/Admin/updateCoupons'
            element={
              <>
                <UpdateCoupons />
              </>
            }
          >
          </Route>)}
          <Route
            path="/login"
            element={
              <>
                <Header></Header>
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <Header></Header>
                <SignUp />
              </>
            }
          ></Route>
          <Route
            path="/all-stores"
            element={
              <>
                <Header></Header>
                <AllStores />
              </>
            }
          ></Route>
          <Route
            path="/all-categories"
            element={
              <>
                <Header></Header>
                <Allcategories />
              </>
            }
          ></Route>
          <Route
            path="/Stores/:store_name"
            element={
              <>
                <Header></Header>
                <Store></Store>
              </>
            }
          ></Route>
          <Route
            path="/Submitcoupon"
            element={
              <>
                <Header></Header>
                <SubmitCouponForm></SubmitCouponForm>
              </>
            }
          ></Route>
          <Route
            path="/our-codes"
            element={
              <>
                <Header></Header>
                <OurCodes></OurCodes>
              </>
            }
          ></Route>
          <Route
            path="/Profile"
            element={
              <>
                <Header></Header>
                <Profile></Profile>
              </>
            }
          ></Route>
          <Route
            path="/events"
            element={
              <>
                <Header></Header>
                <Event></Event>
              </>
            }
          ></Route>
          <Route
            path="/eventdetails"
            element={
              <>
                <Header></Header>
                <EventDetails></EventDetails>
              </>
            }
          ></Route>
          <Route
            path="/categoriesdetails"
            element={
              <>
                <Header></Header>
                <CategoriesDetails></CategoriesDetails>
              </>
            }
          ></Route>
          <Route
            path="/contactus"
            element={
              <>
                <Header></Header>
                <ContactUs></ContactUs>
              </>
            }
          ></Route>
          <Route
            path="/advertisewithus"
            element={
              <>
                <Header></Header>
                <AdvertiseUs></AdvertiseUs>
              </>
            }
          ></Route>
          <Route
            path="/faqs"
            element={
              <>
                <Header></Header>
                <FAQS></FAQS>
              </>
            }
          ></Route>
          <Route
            path="/aboutus"
            element={
              <>
                <Header></Header>
                <AboutUs></AboutUs>
              </>
            }
          ></Route>
          <Route
            path="/privacy-policy"
            element={
              <>
                <Header></Header>
                <PrivacyPolicy></PrivacyPolicy>
              </>
            }
          ></Route>
          <Route
            path="/how-it-works"
            element={
              <>
                <Header></Header>
                <HowitWorks></HowitWorks>
              </>
            }
          ></Route>
          <Route
            path="*"
            element={
              <>
                <Header></Header>
                <NoMatch />
              </>
            }
          ></Route>
        </Routes>
      )}
    </div>
  )
}

export default App