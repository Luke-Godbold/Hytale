import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './NavBar';

// 20/01/2026
// Made 404.js and added an erro message

function Error404() {
  return (
    <div className="App">
        <h1 className='text-white text-5xl pt-50 font-semibold'>404 Page not found</h1>

    </div>
  );
}

export default Error404;
