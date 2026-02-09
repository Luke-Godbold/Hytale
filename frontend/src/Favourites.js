import './App.css';
import { useState, useEffect, use } from 'react';
import { guideCard, text, title } from './Styles';
import { toast, Bounce  } from 'react-toastify';

function Favourites() {
    const [favourites, setFavourites] = useState([])

    async function fetchFavourites() {
        const res = await fetch("http://localhost:5000/API/GetFavourites", {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        setFavourites(data.favourites);
    }

    async function Unfavourite (guideId) {
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
    fetchFavourites();
  }

    useEffect(() => {
        fetchFavourites();
    }, []);

  return (
    <div className="w-full">
        <div className='w-9/10 mt-40 grid flex lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-center gap-5 items-center justify-self-center'>
            {favourites.map((item) => (
                <div className={guideCard}>
                    <h1 className={title}>{item[1]}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {Unfavourite(item[0])}} fill="#f9c600" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f9c600" className='size-8 cursor-pointer text-yellow-400 ml-auto flex'><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                    <p className={text}>{item[2]}</p>
                    <img src={`/Guides/${item[3]}`} alt="icon" loading="lazy" className='w-full h-auto mt-2 rounded' />
                </div>
            ))}
        </div>
    </div>
  );
}

export default Favourites;
