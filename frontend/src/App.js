import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './NavBar';
import Home from './Home';
import Error404 from './404';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { ToastContainer, Bounce } from 'react-toastify';
import GuidesPage from './Guides';

// 19/01/2026 - 20/01/2026
// Created app.js
// Imported and put nav in the return so it it is visable on all pages
// added some routes to other pages

function App() {
  return (
    <div className="App">
      <Nav />

      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
      />

      <Routes>
        <Route path = '/' element={<Home />}></Route>
        <Route path = '/Home' element={<Home />}></Route>
        <Route path = '/SignIn' element={<SignIn />}></Route>
        <Route path = '/SignUp' element={<SignUp />}></Route>
        <Route path = '/Guides' element={<GuidesPage />}></Route>
        <Route path = '/*' element={<Error404 />}></Route>
      </Routes>

    </div>
  );
}

export default App;
