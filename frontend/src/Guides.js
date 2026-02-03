import './App.css';
import { useState, useEffect } from 'react';
import { card } from './Styles';
// 02/02/2026
// Created Guides.js

function GuidesPage() {
  const [guides, setGuides] = useState([])
  async function fetchGuides() {
    const res = await fetch("http://localhost:5000/API/GetGuides");
    const data = await res.json();
    setGuides(data.guides);
  }

  useEffect(() => {
    fetchGuides()
  }, [])

  return (
    <div className="w-full mt-40 flex flex-col-2 justify-center">
      {guides.map((guide) => (
        <div key={guide[0]} className={card}>
          <p className='text-black text-5xl'>{guide[1]}</p>
          <p className='text-black text-2xl'>{guide[2]}</p>
          <img className='text-black text-2xl' src={`/Guides/${guide[3]}`} alt="icon" loading="lazy"></img>
        </div>
      ))}
    </div>
  );
}

export default GuidesPage;