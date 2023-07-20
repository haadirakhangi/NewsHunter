import './App.css';
import Navbar from './components/Navbar';
// import News from './components/News';
import News from './components/NewsInf';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// just comment the infinite scroll and uncomment the other News to change

function App() {
  const api_key = process.env.REACT_APP_NEWS_API

  return (
    <>
    <div>
    <React.StrictMode>
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<News api = {api_key} key="landing"/>} />
              <Route exact path="/home" element={<News api = {api_key} key="home"/>} />
              <Route exact path="/general" element={<News api = {api_key} key="general"/>} />
              <Route exact path="/business" element={<News api = {api_key} key="business" category="business"/>} />
              <Route exact path="/entertainment" element={<News api = {api_key} key="entertainment" category="entertainment"/>} />
              <Route exact path="/health" element={<News api = {api_key} key="health" category="health"/>} />
              <Route exact path="/science" element={<News api = {api_key} key="science" category="science"/>} />
              <Route exact path="/sports" element={<News api = {api_key} key="sports" category="sports"/>} />
              <Route exact path="/technology" element={<News api = {api_key} key="technology" category="technology"/>} />
            </Routes>
          </Router>
        </React.StrictMode>
    </div>
    </>
  );
}

export default App;
