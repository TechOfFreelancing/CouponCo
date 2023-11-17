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


function App() {

  const { role } = useContext(AuthContext);

  const isAdmin = role === "Admin" ? true : false;

  return (
    <div className='w-full max-h-fit overflow-y-clip m-auto'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header></Header>
              <Home />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>
        {isAdmin && (<Route
          path='/Admin'
          element={
            <>
              <AdminPanel />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>)}
        {isAdmin && (<Route
          path='/Admin/addStore'
          element={
            <>
              <AddStores />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>)}
        {isAdmin && (<Route
          path='/Admin/addCoupons'
          element={
            <>
              <AddCoupons />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>)}
        {isAdmin && (<Route
          path='/Admin/updateStore'
          element={
            <>
              <UpdateStores />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>)}
        {isAdmin && (<Route
          path='/Admin/updateCoupons'
          element={
            <>
              <UpdateCoupons />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
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
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <>
              <Header></Header>
              <SignUp />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
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
    </div>
  )
}

export default App