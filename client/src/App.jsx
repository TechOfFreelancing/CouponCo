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
import AllStores from './pages/Stores';
import Allcategories from './pages/Categories';



function App() {

  const { role } = useContext(AuthContext);

  const isAdmin = role === "Admin" ? true : false;

  return (
    <div className='w-full max-h-fit overflow-y-clip'>
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
          path="/AllStores"
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
          path="/store"
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
    </div>
  )
}

export default App