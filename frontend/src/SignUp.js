import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Nav from './NavBar';
import { card, title, inputBox, inputDiv, button, linkText } from './Styles';
import { useState } from 'react';
import { toast, Bounce  } from 'react-toastify';
// 20/01/2026
// Created Sign Up.js
// Changed the name of the Tab
// Started making the sign up forms frontend

// 21/01/2026
// I added inputs for email, names, password and confirm password
// I added a button to let users show and hide their passwords

// 28/01/2026
// I added a a fetch request to the backend to check the users inputs and sign them up if its okay
// I added toast to display error messages


function SignUp() {

  const [view, setView] = useState(false);
  const [type, setType] = useState("password");
  const [view2, setView2] = useState(false);
  const [type2, setType2] = useState("password");
  const navigate = useNavigate();


  async function SignUpRequest() {
    let email = document.getElementById("Email").value
    let name = document.getElementById("Name").value
    let pass = document.getElementById("Pass").value
    let cPass = document.getElementById("cPass").value

    const res = await fetch("http://localhost:5000/API/SignUp",{
          method: "POST",
          headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json"
          },
          credentials: "include",
          body: 
              JSON.stringify({
                  "email":email,
                  "name":name,
                  "pass":pass,
                  "cPass":cPass
              }            
          )
      });
  
      const data = await res.json()
      

      if (data["res"] === 201){
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
        navigate("/SignIn");}
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
  }
  
  // If the view of password is updated it updates if the user clicks the toggle visability
  useEffect(()=>{
    if (view === false){
      setType("password")
    }
    else{
      setType("text")
    }
  },[view])

  // If the view of confirm password is updated it updates if the user clicks the toggle visability
  useEffect(()=>{
    if (view2 === false){
      setType2("password")
    }
    else{
      setType2("text")
    }
  },[view2])

  // This sets the name of the tab to be Sign Up - Hytale
  useEffect(()=>{
    document.title="Sign Up - Hytale"})

  return (
    <>
    
    <div className="w-full">
        
        <div className={card}>
            <h1 className={title}>Sign Up</h1>
            {/* Emails input box */}
            <div className={inputDiv}>
              <p>Email:</p>
              <input placeholder='Email' id='Email' type='email' className={inputBox}></input>
            </div>

            <div className={inputDiv}>
              <p>Name:</p>
              <input placeholder='Name' id='Name' type='Text' className={inputBox}></input>
            </div>

            {/* password input box */}
            <div className={inputDiv}>
              <p>Password:</p>
              <div className='relative w-full'>
                <input placeholder='Password' id='Pass' type={type} className={inputBox + " pr-10 w-[calc(100%-2.5rem)]"}></input>
                {/* changes weather the password is hown by swiching true to false and vice versa */}
                <button onClick={() => setView(!view)} className='absolute right-7 top-1/2 -translate-y-1/2 cursor-pointer'>
                  {/* shows a different icon depending on if the password is shown */}
                  {(view === false)?
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>}
                </button>
              </div>
            </div>

            {/* Confirm input box */}
            <div className={inputDiv}>
              <p>Confirm Password:</p>
              <div className='relative w-full'>
                <input placeholder='Confirm Password' id='cPass' type={type2} className={inputBox + " pr-10 w-[calc(100%-2.5rem)]"}></input>
                {/* changes weather the password is hown by swiching true to false and vice versa */}
                <button onClick={() => setView2(!view2)} className='absolute right-7 top-1/2 -translate-y-1/2 cursor-pointer'>
                  {/* shows a different icon depending on if the password is shown */}
                  {(view2 === false)?
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>}
                </button>
              </div>
            </div>
            
            {/* Sign Up button */}
            <button className={button} onClick={() => SignUpRequest()}>Sign Up</button>
            <p className='flex gap-1 flex-wrap'>Already have an account? <Link to='/SignIn' className={linkText}>Sign In</Link></p>


        </div>
    </div></>
  );
}

export default SignUp;