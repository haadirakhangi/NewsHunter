import './App.css';
import Navbar from './components/Navbar';
// import News from './components/News';
import News from './components/NewsInf';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// just comment the infinite scroll and uncomment the other News to change

function App() {
  return (
    <>
    <div>
    <React.StrictMode>
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<News key="landing"/>} />
              <Route exact path="/home" element={<News key="home"/>} />
              <Route exact path="/general" element={<News key="general"/>} />
              <Route exact path="/business" element={<News key="business" category="business"/>} />
              <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment"/>} />
              <Route exact path="/health" element={<News key="health" category="health"/>} />
              <Route exact path="/science" element={<News key="science" category="science"/>} />
              <Route exact path="/sports" element={<News key="sports" category="sports"/>} />
              <Route exact path="/technology" element={<News key="technology" category="technology"/>} />
            </Routes>
          </Router>
        </React.StrictMode>
    </div>
    </>
  );
}

export default App;
