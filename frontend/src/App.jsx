import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import InstallPwaBanner from './components/InstallPwaBanner'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // If URL has a hash, scroll to that element; otherwise scroll to top
    const hasHash = Boolean(location.hash);
    setTimeout(() => {
      if (hasHash) {
        const elementId = location.hash.replace('#', '');
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100 min-h-screen transition-colors">
      <ToastContainer
        position="top-center"
        theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
        toastClassName={() => 'relative flex p-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 shadow-lg border border-gray-200 dark:border-gray-700'}
        bodyClassName={() => 'text-sm'}
        closeButton={false}
      />
      <Navbar/>
      <SearchBar/>
      <InstallPwaBanner />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App