import './App.css';
import { useState, useEffect } from 'react';
import { guideCard, text, title, contentCard } from './Styles';
// 02/02/2026
// Created Guides.js
// 03/02/2026
// I made a fetch request to ge the guides from the backend
// I set up a use effect so that guides are fetched when the page is loaded
// I set up a loop to display all the guides in the database
// I set up a fetch for the content for a guide when its clicked on
// I set up an if ternary operation so that if a guide is clicked on it shows the content
// I set up a loop to show all the content

function GuidesPage() {
  const [guides, setGuides] = useState([])
  const [content, setContent] = useState([])
  const [guideId, setGuideId] = useState(null)

  async function fetchGuides() {
    const res = await fetch("http://localhost:5000/API/GetGuides");
    const data = await res.json();
    setGuides(data.guides);
  }
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

  useEffect(() => {
    fetchGuides()
  }, [])

  return (
    <>
      {content.length === 0 ?
        <div className="w-9/10 mt-40 grid flex lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-center gap-5 items-center justify-self-center">
          {guides.map((guide) => (
            <div key={guide[0]} className={guideCard} id={guide[0]} onClick={() => fetchContent(guide[0])}>
              <p className='text-5xl'>{guide[1]}</p>
              <p className={text}>{guide[2]}</p>
              <img  src={`/Guides/${guide[3]}`} alt="icon" loading="lazy"></img>
            </div>
          ))}
    </div>:
        <div className={contentCard + " mt-40"}>
          <h1 className={title}>{guides[guideId][1]}</h1>
          {content.map((item) => (
            <div className='flex flex-col flex-col-2 items-center gap-5'>
              {item[2] === "image" ? 
              <img src={`/Guides/${item[3]}`} alt="icon" loading="lazy"></img>:
              item[2] === "subTitle" ?
              <h2 className={title}>{item[3]}</h2>:
              <p className={text}>{item[3]}</p>}
            </div>
          ))}
        </div>}
    </>
  );
}

export default GuidesPage;