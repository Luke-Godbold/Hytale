import { Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { navItems, mobileNav, deskNav } from './Styles';
import { toast, Bounce  } from 'react-toastify';

// 19/01/2026 - 20/01/2026
// Made a variable to track if the hamburger menu is open
// Made seperate divs for the mobile and desktop navigation that only show dependent on screen size
// Made a button to show and hide the full menu on mobile
function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [status , setStatus] = useState("");
    const Navigate = useNavigate();

    async function CheckSignedIn () {
        const res = await fetch("http://localhost:5000/API/SignedInCheck", {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        setStatus(data.res);
    }

    async function SignOut () {
        const res = await fetch("http://localhost:5000/API/SignOut", {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        if (data.res === 200){
        toast.success(data["message"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
            Navigate("/signin");
        }
        else{
        toast.error(data["message"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,

          });
      }
      CheckSignedIn(); 
    }

    useEffect(() => {
        CheckSignedIn();
    }, []);

  return (
    <>
    {/* Mobile navbar */}
    <div className='fixed z-50 top-5 lg:hidden w-full'>
        <div className={mobileNav}>
            <div className='flex flex-row'>
                <Link to='/' className='hover:bg-blue-700 cursor-pointer w-1/3 px-5 flex items-center justify-center'><img src='/Hytale_logo.png' className='w-10 ' alt='icon' loading='lazy'></img></Link>
                <button className='ml-auto hover:bg-blue-700 cursor-pointer m-5' onClick={() => setMenuOpen(!menuOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* If the user opens the menu this is displayed*/}
            {menuOpen && (
            <div className='flex flex-col'>
                <Link to='/'>Home</Link>
                <Link to='/'>Home</Link>
                <Link to='/'>Home</Link>
            </div>)}
        </div>
    </div>

    {/* Desktop Navbar */}
    
    <div className='fixed z-50 top-5 hidden lg:flex w-full justify-center gap-5'>
        <div className={deskNav}>
            <Link className={navItems} to='/'><img src='/Hytale_logo.png' className='w-10 ' alt='icon' loading='lazy'></img></Link>
            <Link className={navItems} to='/'>Home</Link>
            <Link className={navItems} to='/Guides'>Guides</Link>
            <Link className={navItems} to='/'>Favourites</Link>
            {status === 200 ? (
                <button className={navItems + " ml-auto"} onClick={() => {SignOut()}}>Sign Out</button>
            ) : (
                <Link className={navItems + " ml-auto"} to='/SignIn'>Sign In</Link>
            )}
        </div>
    </div>

    
    
    
    </>
  );
}

export default Nav;
