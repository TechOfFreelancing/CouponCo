import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/login';
import MobileFooter from './components/MobileFooter'
import Footer from './components/Footer';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';

function App() {

  return (
    <div className='w-full max-h-fit overflow-y-clip'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Home />
              <MobileFooter></MobileFooter>
              <Footer></Footer>
            </>
          }
        >
        </Route>
        <Route
          path="/login"
          element={
            <>
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
