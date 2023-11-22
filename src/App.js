import './App.css';
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { logout, fbAuth } from './Firebase';
import Meals from "./Meals.js";
import Login from "./Login.js";
import { AuthContext } from './FirebaseAuthContext';
import { MealProvider } from './MealContext.js';
import { Typography } from '@mui/material';

const handleLogout = () => {
  // logout();
}

export default function App() {

  return (
    <div className="App">
      {console.log(fbAuth)}
      <header className="App-header" style={{marginBottom: "1em"}}>
        <Typography variant="h1" sx={{fontSize: "3rem", borderBottom: "1px solid grey"}} mt={2}>Meal Planner</Typography>
        {/* <nav style={{ paddingBottom: "1rem" }}>
            <button onClick={handleLogout}>Logout</button>
        </nav> */}
      </header>
      <main style={{marginBottom: "5rem"}}>
        <MealProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Meals />} />
              <Route path="/Meals" element={<Meals />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </MealProvider>
      </main>
    </div>
  );
}
