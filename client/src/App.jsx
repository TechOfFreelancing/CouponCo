import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/login';
import MobileFooter from './components/MobileFooter'
import Footer from './components/Footer';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import { Header } from './components/Header';


function App() {

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
