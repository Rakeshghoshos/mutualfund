import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import Portfolio from './components/Portfolio';
import Logout from './components/Logout';
import {useSelector} from 'react-redux';
import Register from './components/Register';

export default function App(){
  const s = useSelector(state => state.session.value);

  return(
          <div className="app">
            {s ? (<>
          <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Home}></Route>
        </Routes>
          <Routes>
        <Route exact path="/portfolio" Component={Portfolio}></Route>
        </Routes>
          <Routes>
          <Route exact path="/logout" Component={Logout}></Route>
        </Routes>
        </BrowserRouter>
        </> ):
        (<>
          <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Home}></Route>
        </Routes>
        <Routes>
          <Route exact path="/register" Component={Register}></Route>
        </Routes>
          <Routes>
          <Route exact path="/login" Component={Login}></Route>
        </Routes>
        </BrowserRouter>
        </>)}
    </div>
  );
}