import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import MobileFooter from './components/MobileFooter'
import Footer from './components/Footer';
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
import AllStores from './pages/AllStores';
import Allcategories from './pages/Categories';
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/700.css"; // Specify weight
import "@fontsource/poppins/500-italic.css"; // Specify weight and style
import { useState, useEffect } from 'react';
import Loader from './components/Loader';



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
            path="/Stores"
            element={
              <>
                <Header></Header>
                <AllStores />
              </>
            }
          ></Route>
          <Route
            path="/AllCategories"
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
            path="*"
            element={
              <>
                <Header></Header>
                <NoMatch />
                <MobileFooter />
                <Footer />
              </>
            }
          ></Route>
        </Routes>
      )}
    </div>
  )
}

export default App