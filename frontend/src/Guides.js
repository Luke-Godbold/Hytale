import './App.css';
import { useState, useEffect } from 'react';
import { guideCard, text, title, contentCard, button2, subTitle, linkText, navItems } from './Styles';
import { toast, Bounce  } from 'react-toastify';
// 02/02/2026
// Created Guides.js
// 03/02/2026
// I made a fetch request to ge the guides from the backend
// I set up a use effect so that guides are fetched when the page is loaded
// I set up a loop to display all the guides in the database
// I set up a fetch for the content for a guide when its clicked on
// I set up an if ternary operation so that if a guide is clicked on it shows the content
// I set up a loop to show all the content
// 04/02/2026
// Added a back to guides button to return to the main guides page
// Added a favourite button to let users favourite guides

function GuidesPage() {
  const [guides, setGuides] = useState([])
  const [content, setContent] = useState([])
  const [guideId, setGuideId] = useState(null)
  const [status, setStatus] = useState("")
  const [updated, setUpdated] = useState(false)

  // sends a get request to the backend to retrieve the different guides from the database
  async function fetchGuides() {
    const res = await fetch("http://localhost:5000/API/GetGuides");
    const data = await res.json();
    setGuides(data.guides);
  }
  // gets the content of a guide that the user has clicked on
  async function fetchContent(g_id) {
    setGuideId(g_id)
    const res = await fetch("http://localhost:5000/API/GetGuideContent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ g_id: g_id })
    });
    const data = await res.json();
    setContent(data.content);
  }

  // Favourites the clicked on guide and sends a post request to the backend with the guide id, it also checks if the user is signed in and if they have already favourited the guide and shows a toast message accordingly
  async function favourite (g_id) {
    const res = await fetch("http://localhost:5000/API/Favourite", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({"g_id": g_id }),
      credentials: "include"
    });
    const data = await res.json();
    if (data.res === 400){
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

          })
    }
    setUpdated(!updated)
  }

  async function CheckFavourited () {
    const res = await fetch("http://localhost:5000/API/FavouriteCheck", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({"g_id": guideId }),
      credentials: "include"
    });
    const data = await res.json();
    setStatus(data.res)
  }

  async function Unfavourite () {
    const res = await fetch("http://localhost:5000/API/Unfavourite", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({"g_id": guideId }),
      credentials: "include"
    });
    const data = await res.json();
    if (data.res === 400){
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

          })
    }
    setUpdated(!updated)
  }

  // runs the fetch guides function when the page is loaded
  useEffect(() => {
    fetchGuides()
  }, [])

  useEffect(() => {
    CheckFavourited();
  }, [content, updated])

  return (
    <>
    {/* If there is no content to show it will show all the guides */}
      {content.length === 0 ?
      // div makes the items inside use a 2 column grid on bigger screens and 1 column on smaller screens
        <div className="w-9/10 mt-40 grid flex lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-center gap-5 items-center justify-self-center">
          {/* loops through each guide and displays its title, description and image */}
          {guides.map((guide) => (
            <div key={guide[0]} className={guideCard} id={guide[0]} onClick={() => fetchContent(guide[0])}>
              <p className='text-5xl'>{guide[1]}</p>
              <p className={text}>{guide[2]}</p>
              <img  src={`/Guides/${guide[3]}`} alt="icon" loading="lazy"></img>
            </div>
          ))}
    </div>:
        <div className={contentCard + " mt-40"}>
          <div className='flex items-center w-full justify-center mb-5 items-center justify-self-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className='size-8 '><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
            <h1 className={title + ' w-full justify-center underline underline-offset-5'}>{guides[guideId-1][1]}</h1>
            {(status === 200) ?
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {Unfavourite(guideId)}} fill="#f9c600" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f9c600" className='size-8 cursor-pointer text-yellow-400 ml-auto flex'><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>:
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {favourite(guideId)}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='size-8 cursor-pointer hover:text-yellow-400 ml-auto flex'><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>}
          </div>

          {content.map((item) => (
            <div className='flex flex-col flex-col-2 items-center gap-5'>
              {/* Checks the type of content so is shown correctly */}
              {item[2] === "image" ? 
                <img src={`/Guides/${item[3]}`} alt="icon" loading="lazy" className='rounded-md '></img>:
              item[2] === "subTitle" ?
                  <h2 className={subTitle}>{item[3]}</h2>:
                  <p className={text}>{item[3]}</p>}
            </div>
          ))}
          <button className={button2 + ' fixed z-50 bottom-5 left-5'} onClick={() => {setContent([]);}}>Back to Guides</button>
        </div>}
    </>
  );
}

export default GuidesPage;